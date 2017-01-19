//https://zhuanlan.zhihu.com/p/24730075?refer
var http = require('http');			// http 网路
var cheerio = require('cheerio');	// html 解析
var fs = require("fs");				// 流

var queryHref = "http://www.haha.mx/topic/1/new/"; 	// 设置被查询的目标网址
var querySearch = 1;								// 设置分页位置
var urls = [];

var sumConut = 0;
var reptCount = 0;		// 重复的
var downCount = 0;		// 实际下载的
var pagemax = 30;		// 获取到多少页的内容
var startindex = 1;		// 从多少页开始获取
var img = '';
/**
 * 下载图片
 * @param {String} imgurl：图片地址
 */
exports.myDownImg = function downImg(imgurl) {
    var narr = imgurl.replace("http://image.haha.mx/", "").split("/")
    // 做一步优化，如果存在文件，则不下载
    var filename = "./upload/topic1/" + narr[0] + narr[1] + narr[2] + "_" + narr[4];
    fs.exists(filename, function (b) {
        if (!b) {
            // 文件不存则进行 下载
            http.get(imgurl.replace("/small/", "/big/"), function (res) {
                var imgData = "";
                //一定要设置response的编码为binary否则会下载下来的图片打不开
                res.setEncoding("binary");
                res.on("data", function (chunk) {
                    imgData += chunk;
                });

                res.on("end", function () {
                    var savePath = "./upload/topic2/" + narr[0] + narr[1] + narr[2] + "_" + narr[4];
                    fs.writeFile(savePath, imgData, "binary", function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(narr[0] + narr[1] + narr[2] + "_" + narr[4]);
                            if (urls.length > 0) {
                                downImg(urls.shift());
                                downCount++;
                                console.log("other count....");
                            }
                        }
                    });
                });
            });
        } else {
            // 统计重复的图片
            console.log("Repeat.");
            reptCount++;
            if (urls.length > 0) {
                downImg(urls.shift());
            }
        }
    });

    if (urls.length <= 0) {
        console.log("down done");
        console.log("reptCount:" + reptCount);
        console.log("downCount:" + downCount);
    }
}

