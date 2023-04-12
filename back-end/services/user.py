# skipping this one since the return is fairly complex and I don't want to mess anyone elses code up
from config.database import db_controller
import datetime
from mysql.connector import Error
from mysql.connector import errorcode
from flask import jsonify, request
import hashlib
import base64


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
    
    @staticmethod
    #class for Login
    def login(username, password):
        dbc = db_controller()
        hashpass = hashlib.sha256(password.encode()).hexdigest()
        try:
            cnx, cursor = dbc.connect()
            #User attempts to log in and then will check here if he is in the database
            cursor = cnx.cursor()
            query = "SELECT username, password FROM USERS WHERE username = %s AND password = %s"
            cursor.execute(query, (username, hashpass))
            result = cursor.fetchall()
            if cursor.rowcount == 1:
                response = {"message": "Logged in"}
                cnx.close()
                return response, 200
            else:
                response = {"message": "Invalid credentials"}
                cnx.close()
                return response, 200
        except Error as e:
            print("Error while connecting to MySQL", e)
            #log if any errors happen with connection
            response = {"message": "Error while connecting to MySQL"}
            cnx.close()
            return response, 500
        
    @staticmethod
    def createUser(username, password, email, first, last):
        dbc = db_controller()
        #hash the password
        hashpass = hashlib.sha256(password.encode()).hexdigest()
        try:
            cnx, cursor = dbc.connect()
            #User attempts to log in and then will check here if he is in the database
            cursor = cnx.cursor()
            #Check if username already exists
            query = "SELECT username FROM USERS WHERE username = %s"
            cursor.execute(query, (username,))
            result = cursor.fetchall()
            #check if username exists in database
            if cursor.rowcount == 0:
            #add the user if Username doesnt exist in db
                query = "INSERT INTO USERS (first_name, last_name, email, password, username) VALUES (%s, %s, %s, %s, %s)"
                cursor.execute(query, (first, last, email, hashpass, username))
                cnx.commit()
                response = {"message": "User created"}
                cnx.close()
                return response, 200
            else:
                response = {"message": "Username already exists"}
                cnx.close()
                return response, 200
         
        except Error as e:
            print("Error while connecting to MySQL", e)
            #log if any errors happen with connection
            response = {"message": "Error while connecting to MySQL"}
            cnx.close()
            return response, 500
        
    @staticmethod
    def deleteUser(user):
        dbc = db_controller()
        user = request.args['user']
        try:
            cnx, cursor = dbc.connect()
            #User attempts to log in and then will check here if he is in the database
            cursor = cnx.cursor()
            watchlistsQuery = "delete from WATCHLISTS where user_id = (select user_id from USERS where username = %s)"
            watchlistsTickerQuery = "delete from WATCHLIST_TICKERS where user_id = (select user_id from USERS where username = %s)"
            usersQuery = "delete from USERS where username = %s"
            cursor.execute(watchlistsQuery, (user,))
            cnx.commit()
            cursor.execute(watchlistsTickerQuery, (user,))
            cnx.commit()
            cursor.execute(usersQuery, (user,))
            cnx.commit()
            response = {'message':'Account Deleted'}
            cnx.close()
            return response, 200
         
        except Error as e:
            print("Error while connecting to MySQL", e)
            #log if any errors happen with connection
            response = {"message": "Error while connecting to MySQL"}
            cnx.close()
            return response, 500
        