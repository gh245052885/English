var https = require('https');
var superagent = require('superagent');
var eventproxy = require('eventproxy');
var url = require('url');
var fs = require('fs');
var cheerio = require('cheerio');
var nodemailer = require('nodemailer');
var schedule = require('node-schedule');//may be replace by setInterval//supervisor
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
    rooturl: 'http://cbadata.sports.sohu.com/',
    time: '2017-01-21',//
};
var yz_temp = '', yw_temp = '';//
function queryTickets(config) {
    superagent.get(config.url)
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            var topicUrls = [];
            var $ = cheerio.load(sres.text);
            var items = [];
            $('.cutE').find('table').find('tr').each(function (idx, element) {
                var tdArr = $(this).children();
                for (var i = 0; i < tdArr.length; i++) {
                    //console.log((i+1) +": "+ tdArr.eq(i).find('a').attr('href'));
                }
                var bs_team = tdArr.eq(0).text();
                var bs_url = tdArr.eq(3).find('a').attr('href');
                var href = '';
                if (typeof (bs_url) == 'undefined') {
                    console.log('true'+bs_team);
                } else {
                    href = url.resolve(config.rooturl, bs_url);
                }
                items.push({
                    title: bs_team,
                    href: href
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