var https = require('https');
var superagent = require('superagent');
var eventproxy = require('eventproxy');
//var url = require('url');
var fs = require('fs');
var cheerio = require('cheerio');
var nodemailer = require('nodemailer');
var schedule = require('node-schedule');//may be replace by setInterval
var log4js = require('log4js');
log4js.configure({
    appenders: [
        { type: 'console' },
        { type: 'file', filename: '../logs/12306.log', category: 'log' }
    ]
});
var logger = log4js.getLogger('log');
var config = {
    url: 'http://cbadata.sports.sohu.com/sch/all/',
    time: '2017-01-21',//
    train_num: 'G370',//
};
var yz_temp = '', yw_temp = '';//保存余票状态
function queryTickets(config) {
    superagent.get(config.url)
        .end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                return next(err);
            }
            var topicUrls = [];
            // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
            var $ = cheerio.load(sres.text);
            var items = [];

            $('.cutE').find('table').find('tr').each(function (idx, element) {
                var $element = $(element);
                var href = "";//url.resolve(config.url, $element.attr('href'));
                items.push({
                    title: $element.attr('title'),
                    href: $element.attr('href')
                });
                topicUrls.push(href);
            });

        });
};
var rule = new schedule.RecurrenceRule();
rule.second = [0];
schedule.scheduleJob(rule, function () {
    queryTickets(config);
    console.log('scheduleCronstyle:' + new Date());
}); 