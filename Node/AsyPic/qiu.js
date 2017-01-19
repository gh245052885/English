var http = require("http"),
    url = require("url"),
    superagent = require("superagent"),
    cheerio = require("cheerio"),
    async = require("async"),
    moment = require('moment'),
    eventproxy = require('eventproxy');
var log4js = require('log4js'); var fs = require("fs");
var util = require('util');
//var filedown=require("./filedown");
log4js.configure({
    appenders: [
        { type: 'console' },
        { type: 'file', filename: '../logs/qiu.log', category: 'log' }
    ]
});
var logger = log4js.getLogger('log');
var config = {
    url: 'http://www.qiushibaike.com/pic/page/3/?s=4949019',
    time: '2017-01-21',//日期格式必须是这样
    mail_pass: '88'//放心写吧
};
var ep = new eventproxy();

var catchFirstUrl = 'http://www.qiushibaike.com/pic/',	//入口页面
    deleteRepeat = {},	//去重哈希数组
    urlsArray = [],	//存放爬取网址
    doneImgArray = [],	//存放爬取网址
    catchDate = [],	//存放爬取数据
    pageUrls = [],	//存放收集文章页面网站
    pageNum = 15,	//要爬取文章的页数
    startDate = new Date(),	//开始时间
    endDate = false;	//结束时间
var strurl = '';
var sumConut = 0;
var reptCount = 0;		// 重复的
var downCount = 0;		// 实际下载的

pageUrls.push(catchFirstUrl);
for (var i = 2; i <= pageNum; i++) {
    strurl = 'http://www.qiushibaike.com/pic/page/' + i + '/?s=4949019';
    pageUrls.push(strurl);
}
function contains(arr, str) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === str) {
            return true;
        }
    }
    return false;
}
// 主start程序
function start() {
    console.log("start");
    // 当所有 'BlogArticleHtml' 事件完成后的回调触发下面事件
    ep.after('BlogArticleHtml', pageUrls.length * 20, function (articleUrls) {
        var s2 = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        for (var i = 0; i < articleUrls.length; i++) {
        }
        console.log('articleUrls.length is:' + articleUrls.length);

        //控制并发数
        var curCount = 0;
        var reptileMove = function (url, callback) {
            //延迟毫秒数
            var delay = parseInt((Math.random() * 30000000) % 1000, 10);
            curCount++;
            console.log('现在的并发数是', curCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
            downImg(url);
            setTimeout(function () {
                curCount--;
                callback(null, url + 'Call back content');
            }, delay);
        };

        // 使用async控制异步抓取 	
        // mapLimit(arr, limit, iterator, [callback])
        // 异步回调
        async.mapLimit(articleUrls, 2, function (url, callback) {
            reptileMove(url, callback);
        }, function (err, result) {
            endDate = new Date();
            console.log('async-final:' + url);
        });
    });

    // 轮询 所有文章列表页
    pageUrls.forEach(function (pageUrl) {
        var s2 = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        superagent.get(pageUrl)
            .end(function (err, res) {
                logger.info('fetch ' + pageUrl + ' ');
                logger.info('res.status: [' + res.status + ']');
                // 常规的错误处理
                if (err) {
                    logger.error('get url err:' + pageUrl);
                }
                if (res.status === 200) {
                    // var $ = cheerio.load(pres.text);
                }
                var $ = cheerio.load(res.text);
                $('.thumb').each(function (idx, element) {
                    var tdArr = $(this).children();
                    for (var i = 0; i < tdArr.length; i++) {
                    }
                    var bs_url = tdArr.eq(0).find('img').attr('src');
                    var picurl = bs_url;
                    urlsArray.push(picurl);
                    ep.emit('BlogArticleHtml', picurl);
                });

            })
    })
}
function downImg(imgurl) {
    var narr = imgurl.replace("http://pic.qiushibaike.com/system/", "").split("/")
    // 做一步优化，如果存在文件，则不下载
    //console.log('imgurl:'+narr.length);
    var tempfilename = narr[0] + narr[1] + narr[2] + "_" + narr[4];
    var filename = "./upload/topic2/" + tempfilename;
    contains(doneImgArray, tempfilename);
    logger.info("dasdfasd"+contains(doneImgArray, tempfilename));
    fs.stat(filename, (err, stats) => {
        logger.info("exists:" + err + " /");
        logger.info(console.log(stats));
        var exists = true;
        if (!exists) {
            logger.info('myfile already exists:' + tempfilename);
        } else {
            http.get(imgurl, function (res) {
                var imgData = "";
                //一定要设置response的编码为binary否则会下载下来的图片打不开
                res.setEncoding("binary");
                res.on("data", function (chunk) {
                    imgData += chunk;
                });
                res.on("end", function () {
                    var savePath = "./upload/topic2/" + tempfilename;
                    fs.writeFile(savePath, imgData, "binary", function (err) {
                        if (err) {
                            console.log('downerr');
                        } else {
                            console.log('downImg-writeFile:' + tempfilename);
                            doneImgArray.push(tempfilename);
                        }
                    });
                });
            });
        }
    });

}

exports.start = start;