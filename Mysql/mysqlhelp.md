##Event
SHOW VARIABLES LIKE 'event_scheduler'
开启event_scheduler sql指令：
SET GLOBAL event_scheduler = ON;
SET @@global.event_scheduler = ON;
SET GLOBAL event_scheduler = 1;
SET @@global.event_scheduler = 1;

show tables
describe tablename

show variables like 'log_%';

net stop mysql57
net start mysql57
select DATE_ADD(curdate(),interval -day(curdate())+1 day);
select curdate();                       --获取当前日期
select last_day(curdate());                    --获取当月最后一天。
select DATE_ADD(curdate(),interval -day(curdate())+1 day);   --获取本月第一天
select date_add(curdate()-day(curdate())+1,interval 1 month); -- 获取下个月的第一天
select DATEDIFF(date_add(curdate()-day(curdate())+1,interval 1 month ),DATE_ADD(curdate(),interval -day(curdate())+1 day)) from dual; --获取当前月的天数

## 基本语法
- 查看表定义

        DESC emp
- ReName Table

        ALTER TABLE emp RENAME emp2
- Templete Create Table

        --mysql
        create table xx like xx;  只复制表结构
        create table xx as select * from xx; 复制表结构和表数据

## 运算符
    LEAST GREATEST  GREATEST(值1，值2，...值n)，其中n表示参数列表中有n个值
        当参数中是整数或者浮点数时，GREATEST将返回其中最大的值；
        当参数为字符串时，返回字母中顺序最靠后的字符；
        当比较值列表中有NULL时，不能判断大小，返回值为NULL
        特殊字符需要在输入时加反斜线符号开头

## 函数
     取UTC的时间：     SELECT UTC_DATE(),UTC_TIME()
     MONTHNAME(DATE)函数返回日期date对应月份的英文全名
     QUARTER(DATE)返回date对应的一年中的季度值，范围是从1~4
     MINUTE(TIME)返回time对应的分钟数，范围是从0~59
     SECOND(time) 返回time对应的秒数，范围是从0~59
     获取日期的指定值的函数EXTRACT(type FROM date)
     TIME_TO_SEC(time)返回已转化为秒的time参数
     还有其他的相关时间函数

 ## 基本查询
 、查看 MySQL 数据库服务器和数据库字符集。

　mysql> show variables like '%char%';

二、查看 MySQL 数据表（table） 的字符集。

　mysql> show table status from sqlstudy_db like '%countries%';

三、查看 MySQL 数据列（column）的字符集。

　mysql> show full columns from countries;

四、查看当前安装的 MySQL 所支持的字符集。

　　mysql> show charset;

　　mysql> show char set;