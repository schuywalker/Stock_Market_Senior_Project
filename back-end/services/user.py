# skipping this one since the return is fairly complex and I don't want to mess anyone elses code up
from config.database import db_controller
import datetime
from mysql.connector import Error
from mysql.connector import errorcode


class UserService:

    # WATCHLIST - done
    @staticmethod
    def getUserData(username):
        dbc = db_controller()
        cnx, cursor = dbc.connect()
        cursor.execute("""SELECT first_name, last_name, username, email FROM USERS WHERE username = %s""", (username,))
        result = cursor.fetchall()
        cursor.close()
        dbc.close()
        return result, 200



    @staticmethod
    def alterUserFirstName(newFName, username):
        dbc = db_controller()
        cnx, cursor = dbc.connect()
        print(username)
        print(newFName)
        cursor.execute("""UPDATE USERS SET first_name = %s WHERE username = %s""", (newFName, username,))
        cnx.commit()
        cursor.close()
        dbc.close()
        return 200

    @staticmethod
    def alterUserLastName(newLName, username):
        dbc = db_controller()
        cnx, cursor = dbc.connect()
        cursor.execute("""UPDATE USERS SET last_name = %s WHERE username = %s""", (newLName, username,))
        cnx.commit()
        cursor.close()
        dbc.close()
        return 200

    @staticmethod
    def alterUserEmail(newEmail, username):
        dbc = db_controller()
        cnx, cursor = dbc.connect()
        cursor.execute("""UPDATE USERS SET email = %s WHERE username = %s""", (newEmail, username,))
        cnx.commit()
        cursor.close()
        dbc.close()
        return 200
    
    @staticmethod
    def alterUsername(originalUsername, username):
        dbc = db_controller()
        try:
            cnx, cursor = dbc.connect()
            cursor.execute("""UPDATE USERS SET username = %s WHERE username = %s""", (username, originalUsername,))
            cnx.commit()
        except Error as e:
            print("Error: ",e)
            return ("Error: ",500)
        finally:
            cursor.close()
            dbc.close()
        