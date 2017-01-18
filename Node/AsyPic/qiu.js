var http = require("http"),
    url = require("url"),
    superagent = require("superagent"),
    cheerio = require("cheerio"),
    async = require("async"),
    moment = require('moment'),
    eventproxy = require('eventproxy');
var log4js = require('log4js');
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
    from_station: 'ZZF',//始发站车站代码，这里是
    end_station: 'SHH',//
    train_num: 'G370',//车次
    your_mail: 'xfxbnb@163.com',
    mail_pass: '88'//放心写吧
};
var ep = new eventproxy();

var catchFirstUrl = 'http://www.qiushibaike.com/pic',	//入口页面
    deleteRepeat = {},	//去重哈希数组
    urlsArray = [],	//存放爬取网址
    catchDate = [],	//存放爬取数据
    pageUrls = [],	//存放收集文章页面网站
    pageNum = 2,	//要爬取文章的页数
    startDate = new Date(),	//开始时间
    endDate = false;	//结束时间
var strurl = '';
for (var i = 1; i <= pageNum; i++) {
    strurl = 'http://www.qiushibaike.com/pic/page/' + i + '/?s=4949019';
    pageUrls.push(strurl);
}

// 抓取昵称、入园年龄、粉丝数、关注数
function personInfo(url) {
    var infoArray = {};
    superagent.get(url)
        .end(function (err, ares) {
            if (err) {
                console.log(err);
                return;
            }

            var $ = cheerio.load(ares.text),
                info = $('thumb a'),
                len = info.length,
                age = "",
                flag = false,
                curDate = new Date();
            logger.info("wzh:" + info);
            // 小概率异常抛错	
            try {
                age = "20" + (info.eq(1).attr('title').split('20')[1]);
            }
            catch (err) {
                console.log(err);
                age = "2012-11-06";
            }

            infoArray.name = info.eq(0).text();
            infoArray.age = parseInt((new Date() - new Date(age)) / 1000 / 60 / 60 / 24);

            if (len == 4) {
                infoArray.fans = info.eq(2).text();
                infoArray.focus = info.eq(3).text();
            } else if (len == 5) {// 博客园推荐博客
                infoArray.fans = info.eq(3).text();
                infoArray.focus = info.eq(4).text();
            }
            console.log('用户信息:' + JSON.stringify(infoArray));
            logger.info('用户信息:' + JSON.stringify(infoArray));
            catchDate.push(infoArray);
        });
}

// 判断作者是否重复
function isRepeat(authorName) {
    if (deleteRepeat[authorName] == undefined) {
        deleteRepeat[authorName] = 1;
        return 0;
    } else if (deleteRepeat[authorName] == 1) {
        return 1;
    }
}

// 主start程序
function start() {
    console.log("start");
    superagent.get(config.url)
        .end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                return next(err);
            }
            var topicUrls = [];
            logger.info("wzh:" + "start");
            var $ = cheerio.load(sres.text);
            var items = [];
            $('.thumb').each(function (idx, element) {
                var tdArr = $(this).children();
                for (var i = 0; i < tdArr.length; i++) {
                }
                var bs_url = tdArr.eq(0).find('img').attr('src');
                //logger.info(bs_url);
                var $element = $(element);
                //var href = url.resolve(config.url, $element.attr('href'));
                var href = '';
                items.push({
                    title: $element.attr('title'),
                    href: bs_url
                });
                topicUrls.push(bs_url);
            });
            logger.info("usrlength:" + topicUrls.length);
        });
    // 当所有 'BlogArticleHtml' 事件完成后的回调触发下面事件
    ep.after('BlogArticleHtml', pageUrls.length, function (articleUrls) {
        var s2 = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        console.log("s2=ep.after");
        // 获取 BlogPageUrl 页面内所有文章链接
        for (var i = 0; i < articleUrls.length; i++) {
            logger.info(articleUrls[i] + '<br/>');
        }
        console.log('articleUrls.length is' + articleUrls.length);

        //控制并发数
        var curCount = 0;
        var reptileMove = function (url, callback) {
            //延迟毫秒数
            var delay = parseInt((Math.random() * 30000000) % 1000, 10);
            curCount++;
            console.log('现在的并发数是', curCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');

            superagent.get(url)
                .end(function (err, sres) {
                    // 常规的错误处理
                    if (err) {
                        console.log(err);
                        return;
                    }

                    //sres.text 里面存储着请求返回的 html 内容
                    var $ = cheerio.load(sres.text);
                    //收集数据
                    //1、收集用户个人信息，昵称、园龄、粉丝、关注
                    //var currentBlogApp = $('script').eq(1).text().split(',')[0].split('=')[1].trim().replace(/'/g,""),
                    var currentBlogApp = url.split('/p/')[0].split('/')[3],
                        requestId = url.split('/p/')[1].split('.')[0];

                    res.write('currentBlogApp is ' + currentBlogApp + ' , ' + 'requestId id is ' + requestId + '<br/>');
                    console.log('currentBlogApp is ' + currentBlogApp + '\n' + 'requestId id is ' + requestId);

                    res.write('the article title is :' + $('title').text() + '<br/>');

                    var flag = isRepeat(currentBlogApp);

                    if (!flag) {
                        var appUrl = "http://www.cnblogs.com/mvc/blog/news.aspx?blogApp=" + currentBlogApp;
                        personInfo(appUrl);
                    }
                });

            setTimeout(function () {
                curCount--;
                callback(null, url + 'Call back content');
            }, delay);
        };

        // 使用async控制异步抓取 	
        // mapLimit(arr, limit, iterator, [callback])
        // 异步回调
        async.mapLimit(articleUrls, 5, function (url, callback) {
            reptileMove(url, callback);
        }, function (err, result) {
            endDate = new Date();
            console.log('final:');
            console.log(result);
            console.log(catchDate);
            var len = catchDate.length,
                aveAge = 0,
                aveFans = 0,
                aveFocus = 0;

            for (var i = 0; i < len; i++) {
                var eachDate = JSON.stringify(catchDate[i]),
                    eachDateJson = catchDate[i];

                // 小几率取不到值则赋默认值	
                eachDateJsonFans = eachDateJson.fans || 110;
                eachDateJsonFocus = eachDateJson.focus || 11;

                aveAge += parseInt(eachDateJson.age);
                aveFans += parseInt(eachDateJsonFans);
                aveFocus += parseInt(eachDateJsonFocus);
            }


        });
    });

    // 轮询 所有文章列表页
    pageUrls.forEach(function (pageUrl) {

        var s2 = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        console.log("s2-pageUrls.forEach=" + s2);
        superagent.get(pageUrl)
            .end(function (err, pres) {
                console.log('fetch ' + pageUrl + ' successful');
                // 常规的错误处理
                if (err) {
                    console.log(err);
                }
                var $ = cheerio.load(pres.text);
                $('.thumb').each(function (idx, element) {
                    var tdArr = $(this).children();
                    for (var i = 0; i < tdArr.length; i++) {
                    }
                    var bs_url = tdArr.eq(0).find('img').attr('src');
                    var picurl = bs_url;
                    urlsArray.push(picurl);
                    logger.info("here-----------");
                    ep.emit('BlogArticleHtml', picurl);
                });

            })
    })
}


exports.start = start;