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