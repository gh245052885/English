@echo off 
::CMD里显示彩色文字 
chcp 437>nul&&graftabl 936>nul 
if not exist CONFIG.NT copy %WinDir%\System32\CONFIG.NT CONFIG.NT 
@cls 
echo DEVICE=%WinDir%\System32\ANSI.SYS /x >%WinDir%\System32\CONFIG.NT 
@echo. 
command /cecho  
command /cecho [1;36m                                 登鹳雀楼 
@echo. 
@echo. 
command /cecho [1;35m                          白日依山尽，[33m黄河入海流。 
@echo. 
command /cecho [1;32m                          欲穷千里目，[31m更上一层楼。 
@echo. 
@echo. 
@echo. 
@echo. 
command /cecho [1;33m                                   下江陵 
@echo. 
@echo. 
command /cecho [1;32m                       朝辞白帝彩云间，[36m千里江陵一日还。 
@echo. 
command /cecho [1;31m                       两岸猿声啼不住，[35m轻舟已过万重山。 
@echo. 
@echo. 
command /cecho [1;32m 继续下页 
pause>nul 
@cls 
@echo. 
@echo. 
@echo. 
command /cecho [1;31m                                 关山月 
@echo. 
@echo. 
command /cecho [1;32m                         明月出天山，苍茫云海间。 
@echo. 
command /cecho [1;33m                         长风几万里，吹度玉门关。 
@echo. 
command /cecho [1;35m                         汉下白登道，胡窥青海湾。 
@echo. 
command /cecho [1;36m                         由来征战地，不见有人还。 
@echo. 
command /cecho [1;37m                         戍客望边色，思归多苦颜。 
@echo. 
command /cecho [1;31m                         高楼当此夜，叹息未应闲。 
@echo. 
@echo. 
pause>nul 
copy  CONFIG.NT  %WinDir%\System32\CONFIG.NT 
copy  CONFIG.NT  %WinDir%\System32\CONFIG.NT 
del  CONFIG.NT 
exit 

:: color 颜色代码说明： 
:: 0 －－ 默认颜色（黑屏白字） 
:: 1 －－ 高亮度字体颜色 
:: 5 －－ 字符闪烁 
:: 8 －－ 取消字符属性 

:: 30 －－ 黑色前景       40 －－ 黑色背景 
:: 31 －－ 红色前景       41 －－ 红色背景 
:: 32 －－ 绿色前景       42 －－ 绿色背景 
:: 33 －－ 黄色前景       43 －－ 黄色背景 
:: 34 －－ 蓝色前景       44 －－ 蓝色背景 
:: 35 －－ 紫色前景       45 －－ 紫色背景 
:: 36 －－ 青色前景       46 －－ 青色背景 
:: 37 －－ 白色前景       47 －－ 白色背景 
