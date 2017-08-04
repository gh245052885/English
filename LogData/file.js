var http = require("http"),
	url = require("url"),
	superagent = require("superagent"),
	cheerio = require("cheerio"),
	async = require("async"),
	moment = require('moment'),
	fs = require('fs'),
	{URL} = require('url'),
	eventproxy = require('eventproxy');
var log4js = require('log4js');
// 主start程序

function getAllFiles(dir, callback) {
	var filesArr = [];
	console.log('file:' + dir);
	fs.readFileSync((dir));
	return filesArr;
}

function start() {
	console.log('file:' + new Date());
	getAllFiles("C:\\wzh\\Jupyter", null);
}
exports.start = start;
