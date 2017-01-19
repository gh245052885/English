## 启动服务

```
mongod.exe 
--bind_ip yourIPadress 
--logpath "C:\data\dbConf\mongodb.log" 
--logappend --dbpath "C:\data\db" 
--port yourPortNumber 
--serviceName "YourServiceName" 
--serviceDisplayName "YourServiceName" 
--install
```