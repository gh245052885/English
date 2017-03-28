counter = 4
miles = 1000.0 # 浮点型
name = "John" # 字符串
print (str(counter))
print (miles)
print (name)
def printme( str ):
   "pp"
   print (str);
   return;
 
# 调用函数
printme("fasdf!");
printme("dfasdf");
def fib(n):
	if n==1 or n==2:
		return 1
	return fib(n-1)+fib(n-2)

# 输出了第10个斐波那契数列
print (fib(10))
print (fib(0))
print (fib(1))