import hashlib
import base64
import mysql.connector
from mysql.connector import Error
#needs to be indiviuallized for each user and password
#host, port, database are the same regardless of user
try:
    mydb = mysql.connector.connect(
        host="10.219.0.50",
        port=3306,
        user="mszymanski",
        password="Senior*2023",
        database="SeniorProject_DB"    
    )  
   # If the connection was successful, print information about the connection
    if mydb.is_connected():
        db_Info = mydb.get_server_info()
        print("Connected to MySQL Server version ", db_Info)
        cursor = mydb.cursor()
        cursor.execute("select database();")
        record = cursor.fetchone()
        print("You're connected to database: ", record)

except Error as e:
    print("Error while connecting to MySQL", e)
    #Ultimately we will need to log failures with date and time
    #this closes the database connection
    mydb.close()

cursor.execute("SELECT * FROM USERS")
result = cursor.fetchall()
for row in result:
    print(row)


#this closes the database connection
if mydb.is_connected():
    mydb.close()
    print("MySQL connection is closed")
