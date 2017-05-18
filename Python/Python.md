市场现在大多数不用3.0的版本，这一个说明是针对V2.7的版本
在环境变量中添加Python目录：
在命令提示框中(cmd) : 输入 
path=%path%;C:\Python
debug launch.json 中的配置文件
  "program": "${file}",
 ## 文件类型
 e3种 均可以直接执行
  ##错误说明 
  SyntaxError  语法错误
  TypeErroe http://www.pythondoc.com/pythontutorial27/controlflow.html
  python 中一切都是对象，严格意义我们不能说值传递还是引用传递，我们应该说传不可变对象和传可变对象
  在 python 中，strings, tuples, 和 numbers 是``不可更改的对象``，
  而 list,dict 等则是`可以修改`的对象。
更改不可更改的对象，相当于重新生成了一个对象，
list dict 修改其的值是修改其内部空间的值 
## list
* 因其是动态语言，所以LIST中包含的元素并不要求都必需是同一种数据类型。
* list的增加append()  insert(p1,p2) 删除 pop
## tuples
* 因其不能修改，所以只能有查询的属性。
* 定义单元素的元组时，要加一个逗号。
* 要深刻理解指向不变
## IF EXLE
## Dict
* if 'paul' id d:
* d.get('paul')
*  内部是无序的。
## 集合是指包含一组元素的数据结构
* 有序集合：list，tuple，str和unicode； 
* 2. 无序集合：set *
* 3. 无序集合并且具有 key-value 对：dict

