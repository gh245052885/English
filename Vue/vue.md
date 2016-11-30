## 安装
$ npm install vue
`# 获取CSP兼容版本：
`$ npm install vue@csp
`# 获取最新开发版本(来自于GitHub):
$ npm install yyx990803/vue#dev


##　vue入门学习总结：

js表达式
过滤器
指令
计算属性

Class对象语法

vue的一个组件包括三部分：template、style、script。
vue的数据在data中定义使用。
数据渲染指令：v-text、v-html、{{}}。
隐藏未编译的标签：v-cloak 。
控制模块隐藏:v-if（值为false时不会渲染到dom上）、v-show（相当于display属性的show和hide）。
template v-if  v-for  template v-for 特殊变量 $index
事件绑定：v-on、@语法，一般方法写在methods里面，需要操作dom的方法写在mounted里面，此时dom渲染完毕。
属性绑定:v-bind、:用法，例如:class= " {red:isRed}"。
定义的组件，引用时import到相应模块后，需要在components注册。
组件之间的通信：父组件通过props传参给子组件，子组件通过$emit通知父组件。


Vue.js是一个构建数据驱动的web界面的库。技术上，它重点集中在MVVM模式的ViewModel层
它意味着我们在普通HTML模板中使用特殊的语法将DOM “绑定”到底层数据。


## Style对象语法
　　v-bind:style的对象语法十分直观——看着非常像 CSS，其实它是一个JavaScript对象。CSS属性名可以用驼峰式（camelCase）或短横分隔命名（kebab-case）：

数组

# 文本输入框
<input type="text" v-model="msg" placeholder="edit me">
# 多选框  # 单选按钮  # 下拉列表
# 参数特性