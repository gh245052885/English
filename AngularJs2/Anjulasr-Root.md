## Route
视图之间的路由
## 模块
看一下其提供哪些模块
##　数据绑定
在页面加载时使用 {{}} 取值表达式有可能会因为js没有及时加载或用户频繁刷新导致显示取值表达式,
这样用户体验不是特别好;  使用 ng-bind 可以取值, 但需要有一个标签;

解决方案是在第一个页面加载时使用 ng-bind , 在后续的页面中可以自由选择使用表达式取值;
sublime中删除一行ctrl + shift + K


* ng-app − This directive starts an AngularJS Application.

* ng-init − This directive initializes application data.

* ng-model − This directive defines the model that is variable to be used in AngularJS.

* ng-repeat − This directive repeats html elements for each item in a collection.

##  $scope 

当在控制器中添加 $scope 对象时，视图 (HTML) 可以获取了这些属性。
视图中，你不需要添加 $scope 前缀, 只需要添加属性名即可，如： {{carname}}。

##  $rootScope
所有的应用都有一个 $rootScope，它可以作用在 ng-app 指令包含的所有 HTML 元素中。
$rootScope 可作用于整个应用中。是各个 controller 中 scope 的桥梁。用 rootscope 定义的值，
可以在各个 controller 中使用。

控制器的 $scope （相当于作用域、控制范围）用来保存AngularJS Model(模型)的对象。
控制器在作用域中创建了两个属性 (firstName 和 lastName)。

## AngularJS - Filters

Sr.No.	Name	Description
* 1	uppercase	converts a text to upper case text.
* 2	lowercase	converts a text to lower case text.
* 3	currency	formats text in a currency format.
* 4	filter	filter the array to a subset of it based on provided criteria.
* 5	orderby	orders the array based on provided criteria.

Demo Name in Lower Case: {{student.fullName() | lowercase}}
 <li ng-repeat = "subject in student.subjects | orderBy:'marks'">


 Sr.No.	Name	Description
* 1	ng-disabled	disables a given control.
* 2	ng-show	shows a given control.
* 3	ng-hide	hides a given control.
* 4	ng-click	represents a AngularJS click event.

具体的实现 https://www.tutorialspoint.com/angularjs/angularjs_html_dom.htm


UIRount  路由  angular-ui.github.io    ui-router


## 指令
AngularJS 四大核心特性：1.MVC
                                            * 2.模块化和依赖注入
                                            * 3.双向数据绑定
                                            * 4.指令
                                            * 当你发现你的CTROL里面有许我相同的东西时
                                            你就需要试着把他抽象出来成为服务。
 常用的东西
* http://ng-table.com/     

npm install cnpm -g --registry=https://registry.npm.taobao.org

这是一个完整 npmjs.org 镜像，你可以用此代替官方版本(只读)                        

## gulp

* 11.1、安装nodejs；
* 11.2、新建package.json文件； cnpm init
* 11.3、全局和本地安装gulp；
* 11.4、安装gulp插件；
* 11.5、新建gulpfile.js文件；
* 11.6、通过命令提示符运行gulp任务。


1.选装cnpm
npm install cnpm -g --registry=https://registry.npm.taobao.org
* 1.1 全局安装 gulp：

$ npm install --global gulp
* 1.2. 作为项目的开发依赖（devDependencies）安装：

$ npm install --save-dev gulp