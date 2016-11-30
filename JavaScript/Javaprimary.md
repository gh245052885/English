## 数据类型
基础类型：Number、String、Boolean、Null、Undefined

对象类型：object
### 基础类型

* 数字
* 字符串

    注意其中一些的转义字符
* 布尔值
* Undefined null
     
     alert(null == undefined);//会弹出true。
Undefined 这个值表示变量不含有值。可以通过将变量的值设置为 null 来清空变量。
* 对象

 判断某个属性是否属于某个对象 mouse.hasOwnProperty("name"); // true
* 函数
这个函数接收两个函数。第一个参数是一个函数，第二个参数是要传递给该函数的一个值
function funcName(someFunc, someParam){
    return someFunc(someParam)
}
function sum(num){
    return num + 3;
}
var result = funcName(sum, 5);
alert(result);  //=>8

## 函数调用
* 1.方法调用模式；
* 2.函数调用模式；
* 3.构造器调用模式；
* 4.apply调用模式。


## 高阶函数
高阶函数英文叫Higher-order function。那么什么是高阶函数？

JavaScript的函数其实都指向某个变量。既然变量可以指向函数，函数的参数能接收变量，

那么一个函数就可以接收另一个函数作为参数，这种函数就称之为高阶函数。

编写高阶函数，就是让函数的参数能够接收别的函数。

其中一些有代表性的高阶函数  
比如：map  filter  sort


##  闭包