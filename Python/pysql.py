import pymysql
from builtins import int


def connDB():
    conn = pymysql.connect(host="localhost", user="root", passwd="123456", db="tool")
    cur = conn.cursor()
    return (conn, cur)


def exeUpdate(conn, cur, sql):
    sta = cur.execute(sql)
    conn.commit()
    return (sta)


def exeDelete(conn, cur, IDs):
    sta = 0
    for eachID in IDs.split(' '):
        sta += cur.execute("delete from students where Id=%d" % (int(eachID)))
    conn.commit()
    return (sta)


def exeQuery(cur, sql):
    cur.execute(sql)
    return (cur)


def connClose(conn, cur):
    cur.close()
    conn.close()


result = True
print("1、update，2、add，3、query，4、del.(exit:q)")
conn, cur = connDB()
number = input()
while(result):
    if(number == 'q'):
        print("end")
        break
    elif(int(number) == 1):
        sql = input("up")
        try:
            exeUpdate(conn, cur, sql)
            print("ok")
        except Exception:
            print("error")
            raise
    elif(int(number) == 2):
        sql = input("insert:");
        try:
            exeUpdate(conn, cur, sql)
            print("ok")
        except Exception:
            print("error")
            raise
    elif(int(number) == 3):
        sql = input("select")
        try:
            cur = exeQuery(cur, sql)
            for item in cur:
                print("Id=" + str(item[0]) + " name=" + item[1])
        except Exception:
            print("query erro")
            raise
    elif(int(number) == 4):
        Ids = input("id")
        try:
            exeDelete(conn, cur, Ids)
            print("del ok")
        except Exception:
            print("del eror")
            raise
    else:
        print("erro!")
        result = False
        break
    print("1、update，2、add，3、query，4、del.(exit:q)")
    
    number = input("choice")
