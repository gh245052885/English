$git config --global user.name "John Doe"
$git config --global user.email johndoe@ example.com
 git config --list 命令： 查看配置

git commit是将本地修改过的文件提交到本地库中。
git push是将本地库中的最新信息发送给远程库。

初始化一个Git仓库，使用git init命令。

添加文件到Git仓库，分两步：

* 第一步，使用命令git add <file>，注意，可反复多次使用，添加多个文件；

* 第二步，使用命令git commit，完成。
* 
git commit -m "wrote a readme file" 
* -m 是指说明

* git status命令可以让我们时刻掌握仓库当前的状态
* git diff

### 远程仓库
添加远程库：
git remote add origin git@github.com:wyyyy/learngit.git
### 库的管理
那么最好的方式是先创建远程库，然后，从远程库克隆。
* 1.先在网站建立一个库
* 2.$ git clone git@github.com:wyyyy/gitskills.git
后面的地址可以到网站上面参考一下
打开 Git Bash 命令工具生成密码