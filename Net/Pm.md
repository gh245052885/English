#用 Hashcat 每秒计算1.4亿个密码，破解隔壁WIFI密码
http://www.cnblogs.com/diligenceday/p/6359661.html
https://hashcat.net/hashcat/用Hashcat每秒计算1.4亿个密码，破解隔壁WIFI密码


### abstract

### async（C# 参考）

使用 async 修饰符可将方法、lambda 表达式或匿名方法指定为异步

#### const

使用 const 关键字来声明某个常量字段或常量局部变量。 
常量字段和常量局部变量不是变量并且不能修改。 
常量可以为数字、布尔值、字符串或 null 引用。 不要创建常量来表示你需要随时更改的信息。 
例如，不要使用常量字段来存储服务的价格、产品版本号或公司的品牌名称。
这些值会随着时间发生变化；因为编译器会传播常量，所以必须重新编译通过库编译的其他代码以查看更改。
 另请参阅 readonly 关键字。 
 readonly 关键字与 const 关键字不同。 const 字段只能在该字段的声明中初始化。 
 
 readonly 字段可以在声明或构造函数中初始化。 
 因此，根据所使用的构造函数，readonly 字段可能具有不同的值。
 
  另外，const 字段为编译时常数，而 readonly 字段可用于运行时常数，
 
 ### out
 * https://msdn.microsoft.com/zh-cn/library/dd469487.aspx
 对于泛型类型参数，out 关键字指定该类型参数是协变的。 可以在泛型接口和委托中使用 out 关键字。
通过协变，可以使用与泛型参数指定的派生类型相比，派生程度更大的类型。 这样可以对委托类型和实现变体接口的类进行隐式转换。

 引用类型支持协变和逆变，但值类型不支持。