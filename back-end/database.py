import mysql.connector
from mysql.connector import Error
#needs to be indiviuallized for each user and password
#host, port, database are the same regardless of user
mydb = mysql.connector.connect(
    host="10.219.0.50",
    port=3306,
    user="root",
    password="root",
    database="SeniorProject_testConnection"    
)
#test connection to database
if mydb.is_connected():
    db_Info = mydb.get_server_info()
    print("Connected to MySQL Server version ", db_Info)
    cursor = mydb.cursor()
    cursor.execute("select database();")
    record = cursor.fetchone()
    print("You're connected to database: ", record)

#easier way to organize
sql = "INSERT INTO SeniorProject_testConnection.SeniorProject_testTable (name, age) VALUES (%s, %s)"
val = ("John", 36)
#modular maybe?
#insertOperator = cursor.execute(sql, val)
#need to commit when inserting

#mydb.commit()

cursor.execute("SELECT * FROM SeniorProject_testConnection.SeniorProject_testTable")
#retrieves all rows associated and values
for row in cursor.fetchall():
    print(row)

#this closes the database connection
mydb.close()