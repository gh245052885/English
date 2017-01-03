// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();

// 创建事件处理程序　EventEmitter 的核心就是事件触发与事件监听器功能的封装。
var connectHandler = function connected() {
   console.log('连接connection成功。');
   // 触发 data_received 事件 
   console.log('触发-data_received');
   eventEmitter.emit('data_received');
}

// 绑定 connection 事件处理程序
eventEmitter.on('connection', connectHandler);
 
// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', function(){
   console.log('Execute:data_received');
});

console.log("-触发emit('connection')");
// 触发 connection 事件 
eventEmitter.emit('connection');

console.log("程序执行完毕。");