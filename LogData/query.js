var https = require('https');
var superagent = require('superagent');
var eventproxy = require('eventproxy');
var url = require('url');
var fs = require('fs');
var cheerio = require('cheerio');
var schedule = require('node-schedule');//may be replace by setInterval//supervisor
var file=require("./file");

function query() {
    console.log(new Date());
    var rule = new schedule.RecurrenceRule();
    rule.second = [0];
    schedule.scheduleJob(rule, function () {
        //queryTickets(config);
        file.start();
        console.log('schedule:' + new Date());
    });
}
//Query Ju zhu zheng
exports.query = query;
