import hashlib
import base64
import mysql.connector
from mysql.connector import Error
#needs to be indiviuallized for each user and password
#host, port, database are the same regardless of user1
class db_controller:

    mydb = None
    # cursor = None

    def connect(self):
        try:
            hst = prt=usr=pswrd=db=''
            with open('./secrets/db_secrets.txt') as f:
                    hst = f.readline().strip()
                    prt = f.readline().strip()
                    usr = f.readline().strip()
                    pswrd = f.readline().strip()
                    db = f.readline().strip()
            f.close()
            print(hst,prt,usr,pswrd,db)
            prt = int(prt)
            
            self.mydb = mysql.connector.connect(
                host=hst,
                port=prt,
                user=usr,
                password=pswrd,
                database=db    
            )  
            # If the connection was successful, print information about the connection
            if self.mydb.is_connected():
                db_Info = self.mydb.get_server_info()
                print("Connected to MySQL Server version ", db_Info)
                cursor = self.mydb.cursor()
                cursor.execute("select database();")
                record = cursor.fetchone()
                print("You're connected to database: ", record)

        except Error as e:
            print("Error while connecting to MySQL", e)
            #Ultimately we will need to log failures with date and time
            #this closes the database connection
            self.mydb.close()

        
        # lambda: service

        return self.mydb.cursor()
        # cursor.execute("SELECT * FROM USERS")
        # result = cursor.fetchall()
        # for row in result:
        #     print(row)


    def close(self):    
        if self.mydb.is_connected():
            self.mydb.close()
            print("MySQL connection is closed")

    def helloWorld(self):
        print("\n\nhello World \n\n")