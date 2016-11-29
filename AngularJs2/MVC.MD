## Controller实用过程中的注意事项：
* 1 不要复用Controller，一个控制器一般只负责一小块视图；
* 2 不要在Controller中操作dom;
* 3 不要在Controller里面做数据格式化 ng有很好用的表单控件；
* 4 不要在Controller里面做数据过滤操作，ng有$filter服务；
* 5 一般来说，Controller是不会互相协调的，控制器之间的交互会通过 `事件` 进行。
* 6.把通用的逻辑抽出来做成一个 service ，然后用控制器调用而不是继承这个公共的功能


## $scope生命周期  作用域
* 1 创建
* 2 注册监控
* 3 检测模型变化
* 4 观察模型脏值
* 5 销毁(自动手动)

## AngularJS的MVC是借助于$scope实现的

## Directive实现视图模板 复用


mvc是通过`$scope` 及 `$rootScope`来实现的 重要的 inspect anjula scope插件


* $scope是一个POJP （Plain Old JavaScript Object）
* $scope提供了一些工具方法$watch()/$apply()
* $scope是表达式的执行环境(或者叫作用域)
* $scope是一个树形结构，与DOM标签平行
* 可以用anfular.element($0).scope()进行调试
* 子$scope对象会继承父$scope上的属性和方法
* 么一个Angular应用只有一根$scope对象(一般位于ng-app上)
* $scope可以传播事件，类似DOM事件，可以向上也可以向下
* $scope不仅是MVC的基础，也是后面实现双向数据绑定的基础
