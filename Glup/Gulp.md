## Gulp
### 安装
* 首先确保你已经正确安装了nodejs环境。然后以全局方式安装gulp：

npm install -g gulp
* 全局安装gulp后，还需要在每个要使用gulp的项目中都单独安装一次。把目录切换到你的项目文件夹中，
   然后在命令行中执行：

npm install gulp
* 如果想在安装的时候把gulp写进项目package.json文件的依赖中，则可以加上--save-dev：

npm install --save-dev gulp
* 这样就完成了gulp的安装，接下来就可以在项目中应用gulp了

### gulp的使用

### 常用插件

* css gulp-clean-css
npm install --save-dev gulp-clean-css 
* fileconcat  gulp-concat
* js   gulp-uglify
*  rename = require('gulp-rename'),
*

### Tip
项目当中基本所有的插件基本都在JS文件中

###  好的文章
* https://zhuanlan.zhihu.com/p/20309820