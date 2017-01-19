var https = require('https');
var fs = require('fs');
var moment = require('moment');
var ca = fs.readFileSync('./cert/srca.cer.pem');
var nodemailer = require('nodemailer');
var schedule = require('node-schedule');//may be replace by setInterval
var log4js = require('log4js');
var superAgent = require('SuperAgent');
log4js.configure({
    appenders: [
        { type: 'console' },
        { type: 'file', filename: '../logs/12306.log', category: 'log' }
    ]
});
var logger = log4js.getLogger('log');
var url12306 = 'https://kyfw.12306.cn/otn/leftTicket/queryZ?leftTicketDTO.train_date=2017-01-21&leftTicketDTO.from_station=ZZF&leftTicketDTO.to_station=SHH&purpose_codes=ADULT';
var config = {
    time: '2017-01-21',//日期格式必须是这样
    from_station: 'ZZF',//始发站车站代码，这里是
    end_station: 'SHH',//
    train_num: 'G370',//车次
    your_mail: 'xfxbnb@163.com',
    mail_pass: '88'//放心写吧
};
var urlweather = 'http://op.juhe.cn/onebox/weather/query';
var yz_temp = '', yw_temp = '';//保存余票状态
function queryTickets(config) {
    superAgent
        .get(url12306)
        .ca(ca)
        .end(function (err, res) {
            if (err || !res.ok) {
                logger.info('Oh no! error' + err);
            } else {
                //logger.info('yay got data' + JSON.stringify(res.body));
            }
            var title = '编号   车次   商务座   ';
            logger.info(title);
            logger.info("superAgent:" + moment().format('YYYY-MM-DD HH:mm:ss'));
            logger.info("superAgent:" + JSON.parse(JSON.stringify(res.body)).status);
            var jsonData = JSON.parse(JSON.stringify(res.body)).data;
            for (var i = 0; i < jsonData.length; i++) {
                var cur = jsonData[i];
                if (true) {
                    var str = "" + (i + 1) + ":   ";
                    str += cur.queryLeftNewDTO.station_train_code.toString() + "   ";
                    str += cur.queryLeftNewDTO.train_type_code + "   ";
                    str += cur.queryLeftNewDTO.swz_num + "   ";
                    str += cur.queryLeftNewDTO.canWebBuy + "   ";
                    logger.info(str);
                } else {

                }
            }
            //logger.info("GetUrl:" + (res));
            //logger.info("GetUrl-JSON:" + JSON.parse(res));
        });



}

var rule = new schedule.RecurrenceRule();
rule.second = [0];
schedule.scheduleJob(rule, function () {
    queryTickets(config);
    console.log('scheduleCronstyle:' + moment().format('YYYY-MM-DD HH:mm:ss'));
}); 