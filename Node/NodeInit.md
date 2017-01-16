## 常见的难点
* 思维方式 ===> 非线性思维需要多使用锻炼，适应这种思维方式。
* 异常捕获 ===> 遵守node.js统一的回调函数格式，将异常信息传入回调函数。
* 函数嵌套 ===> 相应解决方案，专门课程讲解。

学习使用 superagent 抓取网页
学习使用 cheerio 分析网页
## nodejs中Async库介绍
https://my.oschina.net/huangsz/blog/176203
http://caolan.github.io/async/
* series(tasks, [callback]) （多个函数依次执行，之间没有数据交换）
* parallel(tasks, [callback]) （多个函数并行执行）

并行执行多个函数，每个函数都是立即执行，不需要等待其它函数先执行。传给最终callback的数组中的数据按照tasks中声明的顺序，

而不是执行完成的顺序
### supervisor

在开发过程中，每次修改代码保存后，我们都需要手动重启程序，才能查看改动的效果。使用 supervisor 可以解决这个繁琐的问题，全局安装 supervisor：
npm install -g supervisor
运行 supervisor --harmony index 启动程序，如下所示：

supervisor 会监听当前目录下 node 和 js 后缀的文件，当这些文件发生改动时，supervisor 会自动重启程序。

通过应用生成器工具 express 可以快速创建一个应用的骨架。
$ npm install express-generator -g

面的示例就是在当前工作目录下创建一个命名为 myapp 的应用。

express myapp
var cheerio = require('cheerio');	// html 解析
npm install log4js//log
