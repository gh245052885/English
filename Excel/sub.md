### VLOOKUP

* VLOOKUP（查找目标，查找范围，返回值的列数，精确OR模糊查找)
* VLOOKUP(A13,$B$2:$D$8,3,0)
* =VLOOKUP($A13,$B$2:$F$8,COLUMN(B1),0)
* 公式=VLOOKUP("*"&A10&"*",A2:B6,2,0)  

上海市松江区城松路58弄13号304室

明天的任务：
1.存储问题
2.<a href="/Document/DownFile?filePath=@item.Value&fileName=@item.Key">下载</a>  

### Excel table
* http://www.contextures.com/xlExcelTable01.html
* http://www.jkp-ads.com/Articles/Excel2007TablesVBA.asp
* http://www.jkp-ads.com/articles/styles06.asp
* https://dev.office.com/docs/add-ins/excel/format-tables-in-add-ins-for-excel
 ListObject tbl = mWorksheet_TAM_Project_Report.ListObjects.Add(XlListObjectSourceType.xlSrcRange, rng, XlYesNoGuess.xlNo);
            tbl.Name = "Master";
            tbl.TableStyle = "TableStyleLight20";




