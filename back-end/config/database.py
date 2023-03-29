import hashlib
import base64
import mysql.connector
from mysql.connector import Error
#needs to be indiviuallized for each user and password
#host, port, database are the same regardless of user1
class db_controller:

    mydb = None

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

        except Error as e:
            print("Error while connecting to MySQL", e)
            #Ultimately we will need to log failures with date and time
            self.mydb.close()

        return self.mydb.cursor()


    def close(self):    
        if self.mydb.is_connected():
            self.mydb.close()
            print("MySQL connection is closed")
