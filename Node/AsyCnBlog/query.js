var https = require('https');
var superagent = require('superagent');
var eventproxy = require('eventproxy');
var url = require('url');
var fs = require('fs');
var cheerio = require('cheerio');
var schedule = require('node-schedule');//may be replace by setInterval//supervisor
var log4js = require('log4js');
log4js.configure({
    appenders: [
        { type: 'console' },
        { type: 'file', filename: '../logs/jzz.log', category: 'log' }
    ]
});
var logger = log4js.getLogger('log');
var config = {
    //juzhuzheng
    rooturl: 'http://www.962222.net/jzz.jsp?name=%CD%F5%D5%BC%BB%AA&registerCode=411282198409190516',
    time: '2017-01-21',//
};
var yz_temp = '', yw_temp = '';//
function queryTickets(config) {
    //.query({ name: '%CD%F5%D5%BC%BB%AA', registerCode: '1..5' })
    // .query({ name: '%CD%F5%D5%BC%BB%AA' }) 
    //.query({ registerCode: '411282198409190516' }) 
    superagent.get(config.rooturl)
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            var topicUrls = [];
            var $ = cheerio.load(sres.text);
            console.log('Res:' + new Date());
        });
};

function query() {
    console.log('query Time:' + new Date());
    var rule = new schedule.RecurrenceRule();
    rule.second = [0];
    schedule.scheduleJob(rule, function () {
        queryTickets(config);
        console.log('schedule:' + new Date());
    });
}
//Query Ju zhu zheng
exports.query = query;
