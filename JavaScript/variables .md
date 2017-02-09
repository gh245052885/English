## 全局变量
在JavaScript中，全局变量有两种声明方式
### 显示声明
### 隐式
使用 var 显示声明的全局变量
不使用 var 声明的隐式全局变量
两者的区别在于是否能通过 delete 操作符删除

先看一段代码

var a = 'a'; // 显式声明的全局变量
b = 'b'; // 隐式声明的全局变量
 
console.log(a); // a
console.log(b); // b
console.log(window.a); // a
console.log(window.b); // b
在 js 中全局变量其实是global对象(window)的属性，因此两种方式声明的全局变量都可以通过 window 拿到

尝试用 delete 删除

// 显式声明的全局变量不能被删除
delete a; // 返回 false 
 
// 隐式声明的全局变量可以被删除
delete b; // 返回 true 
 
// 删除情况
console.log(typeof a); // string
console.log(typeof b); // undefined
delete 操作符可以删除一个对象的属性，但如果属性是一个不可配置（non-configurable）属性，删除时则会返回 false（严格模式下会抛出异常）

这就表示使用 var 声明的变量是不可配置的，使用 getOwnPropertyDescriptor 来获取描述属性特性的对象来验证这一点

Object.getOwnPropertyDescriptor(window, a); // {value: "a", writable: true, enumerable: true, configurable: false}
Object.getOwnPropertyDescriptor(window, b); // {value: "b", writable: true, enumerable: true, configurable: true}
两者的根本区别在于显式声明的变量不可配置，不能通过 delete 操作符删除

需要注意的是 configurable 值一旦为 false，描述属性特性的对象就不能被修改，因此不能通过修改属性描述符使得显示声明的全局变量能被 delete 删除，
但反过来，可以使隐式声明的全局变量也不能被 delete 删除

b = 'b';
var descriptor = Object.getOwnPropertyDescriptor(window, b);
descriptor.configurable = false;
Object.defineProperty(window, b, descriptor);
delete b; //  false 