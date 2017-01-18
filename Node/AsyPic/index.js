var schedule = require('node-schedule');//may be replace by setInterval
var qiu=require("./qiu");
var rule = new schedule.RecurrenceRule();
rule.second = [0];
schedule.scheduleJob(rule, function () {
    qiu.start();
    console.log("scheduleJob"+new Date());
}); 
