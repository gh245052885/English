### 5.0  的版本新增的`async`和`await`两个关键字

在.NET 2.0，.NET 4.0和.NET 4.5中，微软都有推出新的方式来解决同步代码的问题，
他们分别为基于事件的异步模式，基于任务的异步模式和提供`async`和`await`关键字来对异步编程支持。

使用async 和await定义异步方法不会创建新线程,  
        // 它运行在现有线程上执行多个任务.  

        图 1 异步编程指导原则总结

		
		

名称| 说明 | 异常| 
---|------|------|------
避免 Async Void |.最好使用 async Task 方法而不是 async void 方法	| 事件处理程序| 
始终使用 Async | 不要混合阻塞式代码和异步代码| 控制台 main 方法| 
配置上下文 | 尽可能使用 ConfigureAwait(false)|需要上下文的方法| 

##   返回值
* Async 方法有三种可能的返回类型： Task、Task<T> 和 void，
* 但是 async 方法的固有返回类型只有 Task 和 Task<T>。


###　Task

创建Task有两种方式，一种是使用构造函数创建，另一种是使用 Task.Factory.StartNew 进行创建。