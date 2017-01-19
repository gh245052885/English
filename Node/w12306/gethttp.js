var https = require('https');
var fs = require('fs');
var moment = require('moment');
var ca = fs.readFileSync('./cert/srca.cer.pem');
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
//https://kyfw.12306.cn/otn/leftTicket/queryZ?leftTicketDTO.train_date=2017-01-21&leftTicketDTO.from_station=ZZF&leftTicketDTO.to_station=SHH&purpose_codes=ADULT
var config = {
    time: '2017-01-21',//日期格式必须是这样
    from_station: 'ZZF',//始发站车站代码，这里是
    end_station: 'SHH',//
    train_num: 'G370',//车次
    your_mail: 'xfxbnb@163.com',
    mail_pass: '88'//放心写吧
};
var yz_temp = '', yw_temp = '';//保存余票状态
function queryTickets(config) {
    var options = {
        hostname: 'kyfw.12306.cn',//12306
        path: '/otn/leftTicket/queryZ?leftTicketDTO.train_date=' + config.time + '&leftTicketDTO.from_station=' + config.from_station
        + '&leftTicketDTO.to_station=' + config.end_station + '&purpose_codes=ADULT',
        ca: [ca]//证书
    };
    var req = https.get(options, function (res) {
        var data = '';
        res.on('data', function (buff) {
            data += buff;
        });
        res.on('end', function () {
            // logger.info("data:" + JSON.stringify(data));
            if (JSON.parse(data).status == 'false') {
                logger.info("GetUrl:" + JSON.parse(data).status);
                return;
            }
            var title='编号   车次   商务座   ';
            logger.info(title);
            var jsonData = JSON.parse(data).data;
            for (var i = 0; i < jsonData.length; i++) {
                var cur = jsonData[i];
                if (true) {
                    var str=""+(i+1)+":   ";
                    str+=cur.queryLeftNewDTO.station_train_code.toString() + "   ";
                    str+=cur.queryLeftNewDTO.train_type_code + "   " ;
                    str+=cur.queryLeftNewDTO.swz_num + "   " ;
                    str+=cur.queryLeftNewDTO.canWebBuy + "   " ;
                    logger.info(str);
                } else {

                }
                if (cur.queryLeftNewDTO.station_train_code == config.train_num) {
                    // console.log(cur);
                    console.log(config.train_num);
                    console.log('商务座:' + cur.queryLeftNewDTO.swz_num);
                    var yz = cur.queryLeftNewDTO.yz_num;//硬座数目
                    var yw = cur.queryLeftNewDTO.yw_num;//硬卧数目
                    var trainNum = cur.queryLeftNewDTO.station_train_code;//车次
                    if (yz != '无' && yz != '--' || yw != '无' && yw != '--') {
                        if (yw_temp == yw && yz_temp == yz) {//当余票状态发生改变的时候就不发送邮件
                            console.log('状态没改变，不重复发邮件');
                            return;
                        }
                        var mailOptions = {
                            from: config.your_mail, // 
                            to: config.your_mail, // 
                            subject: trainNum + '有票啦，硬座：' + yz + '，硬卧：' + yw, // 邮件标题
                            text: trainNum + '有票啦\n' + '时间是' + cur.queryLeftNewDTO.start_train_date + ',\n出发时间:' + cur.queryLeftNewDTO.start_time + ',\n到达时间:' + cur.queryLeftNewDTO.arrive_time + ',\n历时：' + cur.queryLeftNewDTO.lishi + ',\n始发站：' + cur.queryLeftNewDTO.from_station_name + ',\n到达：' + cur.queryLeftNewDTO.to_station_name, // 邮件内容
                        };
                    } else {
                        console.log('硬座/硬卧无票');
                        //logger.info("piao:" + cur.queryLeftNewDTO.station_train_code);
                        //logger.error("WU piao");
                    }
                    break;
                }
            }
        })
    });
    req.on('error', function (err) {
        logger.error('error:' + err.code);
        console.error('error:' + err.code);
    });
}
var rule = new schedule.RecurrenceRule();
rule.second = [0];
schedule.scheduleJob(rule, function () {
    queryTickets(config);
    console.log('scheduleCronstyle:' + moment().format('YYYY-MM-DD HH:mm:ss'));
}); 