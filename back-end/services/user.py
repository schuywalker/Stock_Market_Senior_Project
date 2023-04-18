# skipping this one since the return is fairly complex and I don't want to mess anyone elses code up
from config.database import db_controller
import datetime
from mysql.connector import Error
from mysql.connector import errorcode
from flask import jsonify, request
import hashlib
import base64


class UserService:

    @staticmethod
    def getUserData(username):
        try:
            dbc = db_controller()
            cnx, cursor = dbc.connect()
            cursor.execute("""SELECT first_name, last_name, username, email FROM USERS WHERE username = %s""", (username,))
            result = cursor.fetchall()
            response = {"message": "Success"}, 200
        except:
            response = {"message": "Error while connecting to MySQL to get data"}, 500
        finally:
            cursor.close()
            dbc.close()
            return result, response


    @staticmethod
    def alterUserFirstName(newFName, username):
        try:
            dbc = db_controller()
            cnx, cursor = dbc.connect()
            print(username)
            print(newFName)
            cursor.execute("""UPDATE USERS SET first_name = %s WHERE username = %s""", (newFName, username,))
            cnx.commit()
            response = {"message": "Successful alteration of FirstName"}, 200
        except:
            response = {"message": "Error while connecting to MySQL for firstname"}, 500
        finally:
            cursor.close()
            dbc.close()
            return response

    @staticmethod
    def alterUserLastName(newLName, username):
        try:
            dbc = db_controller()
            cnx, cursor = dbc.connect()
            cursor.execute("""UPDATE USERS SET last_name = %s WHERE username = %s""", (newLName, username,))
            cnx.commit()
            response = {"message": "Successful alteration of lastname"}, 200
        except:
            response = {"message": "Error while connecting to MySQL for lastname"}, 500
        finally:
            cursor.close()
            dbc.close()
            return response

    @staticmethod
    def alterUserEmail(newEmail, username):
        try:
            dbc = db_controller()
            cnx, cursor = dbc.connect()
            cursor.execute("""UPDATE USERS SET email = %s WHERE username = %s""", (newEmail, username,))
            cnx.commit()
            response = {"message": "Successful alteration of email"}, 200
        except:
            response = {"message": "Error while connecting to MySQL to access email"}, 500
        finally:
            cursor.close()
            dbc.close()
            return response
    
    @staticmethod
    def alterUsername(originalUsername, username):
        dbc = db_controller()
        try:
            cnx, cursor = dbc.connect()
            cursor.execute("""UPDATE USERS SET username = %s WHERE username = %s""", (username, originalUsername,))
            cnx.commit()
            response = {"message": "Successful alteration of username"}, 200
        except Error as e:
            print("Error: ",e)
            response = {"message": "Error while connecting to MySQL to access username"}, 500
        finally:
            cursor.close()
            dbc.close()
            return response
    
    @staticmethod
    #class for Login
    def login(username, password):
        dbc = db_controller()
        hashpass = hashlib.sha256(password.encode()).hexdigest()
        try:
            cnx, cursor = dbc.connect()
            #User attempts to log in and then will check here if he is in the database
            cursor = cnx.cursor()
            query = "SELECT user_id FROM USERS WHERE username = %s AND password = %s"
            cursor.execute(query, (username, hashpass))
            result = cursor.fetchall()
            if (not result):
                response = {"message": "Invalid credentials"}, 400
                cnx.close()
                return response, 400      
            else:
                response = {"message": "Logged in"}, 200
                cnx.close()   
                return response, 200   
        except Error as e:
            print("Error while connecting to MySQL", e)
            #log if any errors happen with connection
            response = {"message": "Error while connecting to MySQL"}, 500
            cnx.close()
            return response, 500
        finally:
            return response
        
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
            cursor.fetchall()
            #check if username exists in database
            if cursor.rowcount == 0:
            #add the user if Username doesnt exist in db
                query = "INSERT INTO USERS (first_name, last_name, email, password, username) VALUES (%s, %s, %s, %s, %s)"
                cursor.execute(query, (first, last, email, hashpass, username))
                user_id =cursor.lastrowid
                cnx.commit()
                response = {"message": "User created","user_id":user_id}
                cnx.close()
                return response, 200
            else:
                response = {"message": "Username already exists"}
                cnx.close()
                return response, 400
         
        except Error as e:
            print("Error while connecting to MySQL", e)
            #log if any errors happen with connection
            response = {"message": "Error while connecting to MySQL"}
            cnx.close()
            return response, 400
        
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
        
    @staticmethod
    def isUserNameAvailable(username):
        dbc = db_controller()
        returnValue = True
        try:
            cnx, cursor = dbc.connect()
            query = "SELECT username FROM USERS WHERE username = %s"
            cursor.execute(query, (username,))
            cursor.fetchall()
            if(cursor.rowcount > 0):
                returnValue = False
            cnx.close()
            return returnValue
        except Error as e:
            cnx.close()
            return False
        
    @staticmethod
    def checkPassword(username, password):
        dbc = db_controller()
        hashpass = hashlib.sha256(password.encode()).hexdigest()
        try:
            cnx, cursor = dbc.connect()
            query = "SELECT username FROM USERS WHERE username = %s and password = %s"
            cursor.execute(query, (username,hashpass))
            cursor.fetchall()
            if(cursor.rowcount == 1):
                cnx.close()
                response={"message":"Correct Password"}, 200
                return response
            else:
                cnx.close()
                response = {"message": "Incorrect Password"}
                return response, 400
        except Error as e:
            cnx.close()
            response = {"message": "Error while connecting to MySQL"}
            return response,500   

    @staticmethod
    def alterPassword(username, password):
        dbc = db_controller()
        hashpass = hashlib.sha256(password.encode()).hexdigest()
        try:
            cnx, cursor = dbc.connect()
            cursor.execute("""UPDATE USERS SET password = %s WHERE username = %s""", (hashpass, username,))
            cnx.commit()
            response = {"message": "Successful alteration of password"}, 200
        except Error as e:
            cnx.close()
            response = {"message": "Error while connecting to MySQL"}
            return response,500
        finally:
            cursor.close()
            dbc.close() 
            return response