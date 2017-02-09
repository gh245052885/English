$git config --global user.name "John Doe"
$git config --global user.email johndoe@ example.com
 git config --list 命令： 查看配置

git commit是将本地修改过的文件提交到`本地库`中。
git push是将本地库中的最新信息发送给`远程库`。

初始化一个Git仓库，使用git init命令。

添加文件到Git仓库，分`两`步：

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
* 2.$ git clone git@github.com:wyyyy/library.git
后面的地址可以到网站上面参考一下,clone可能会出现publickey的问题
打开 Git Bash 命令工具生成密码ssh key problem:
step1:注册github
step2:终端输入:$ ssh-keygen -t rsa -C "wyyyy"//注意。xxxxxx为用户名
step3:一直按回车
step4:$ cat /home/xxxxxx/.ssh/id_rsa.pub
step5:github----setting------ssh----add-----ssh-rsa 

### 分支
* 查看分支：git branch

* 创建分支：git branch <name>

* 切换分支：git checkout <name>

* 创建+切换分支：git checkout -b <name>

* 合并某分支到当前分支：git merge <name>

* 删除分支：git branch -d <name>

* 首先，我们创建dev分支，然后切换到dev分支：

* $ git checkout -b dev
* Switched to a new branch 'dev'
* git checkout命令加上-b参数表示创建并切换，相当于以下两条命令：

* $ git branch dev
* $ git checkout dev   // Switched to branch 'dev'
* 然后，用git branch命令查看当前分支：

* * $ git branch
* * dev
* 现在，dev分支的工作完成，我们就可以切换回master分支：
* $ git checkout master  // Switched to branch 'master'
