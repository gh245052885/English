## 文件说明
* package.json  
用来标记出本项目所需的 npm 依赖包。
* tsconfig.json  
 定义了TypeScript 编译器如何从项目源文件生成 JavaScript 代码。
* systemjs.config.js  
 为模块加载器提供了该到哪里查找应用模块的信息，并注册了所有必备的依赖包。 它还包括文档中后面的例子需要用到的包。
 其实是通用模块加载器  支持ES6等各种格式的JS模块加载
* traceur -
 ES6转码器，将ES6代码转换为当前浏览器支持的ES5代码。systemjs会自动加载 这个模块

 每个 Angular 应用都至少有一个模块： 根模块 ，在这里它叫做 AppModule 

 @Component和@View都是给类EzApp附加的元信息， 被称为注解/Annotation。

 @Component最重要的作用是通过selector属性（值为CSS选择符），指定这个组件渲染到哪个DOM对象上。 
 @View最重要的作用是通过template属性，指定渲染的模板。

 @View({
    template : `<h1>hello</h1>
                <div>...</div>`
})
@View({
    templateUrl : "ezcomp-tpl.html"
})

 模块 (Modules)

## 组件 (Components)
组件负责控制屏幕上的一小块区域，称之为视图。
组件由 HTML 模板和'组件'类组成，组件类控制视图
实现一个组件很简单，定义一个类，然后给这加注解
selector 属性为 Angular 指定了在index.html中的自定义<my-app>标签里显示该组件
@Component({selector:"ez-app"})
@View({template:"<h1>Hello,Angular2</h1>"})
class EzApp{}

@Component和@View都是给类EzApp附加的元信息
@Component最重要的作用是通过selector属性（值为CSS选择符），指定这个组件渲染到哪个DOM对象上。 @View最重要的作用是通过template属性，指定渲染的模板。
bootstrap(EzApp);
模板 (Templates)

元数据 (Metadata)

数据绑定 (Data Binding)

* 指令 (Directives)
一个组件的模板内除了可以使用标准的HTML元素，也可以使用自定义的组件。
Angular2  无偏差地对特标准的HMTL元素和你自己定义的组件。

不过，在使用自定义组件之前，必需在组件的ViewAnnotation中通过directives属性声明这个组件：

@View({
    directives : [EzComp],
    template : "<ez-comp></ez-comp>"
})

服务 (Services)

依赖注入 (Dependency Injection)