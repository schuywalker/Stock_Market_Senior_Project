from flask import jsonify, request
from flask_restful import Resource, reqparse
import services.external_API_calls.finnhubCalls as fh
from services.external_API_calls.finnhubCalls import *
import mysql.connector
from mysql.connector import Error
import hashlib
import base64
from services.watchlist import *
from services.analystCalls import *
from services.user import *

fh_calls = fh.finh_API_Requester()

class getQuote(Resource):
    def get(self):
        data = fh_calls.getQuote('AAPL')
        return (data, 200)

# WATCHLISTS
class getUserWatchlists(Resource):
    def get(self):
        data = WatchlistService.getUserWatchlists(request.args.get('user_ID'), request.args.get('includeDeleted'))
        return (data, 200)

class createWatchlist(Resource):
    def get(self):
        returnCode = WatchlistService.createWatchlists(request.args.get('user_ID'), request.args.get('watchlistName'), request.args.get('tickers'))
        return returnCode

class deleteWatchlist(Resource):
    def get(self):
        data = WatchlistService.deleteWatchlist(request.args.get('wl_ID'))
        return (data, 200)

class renameWatchlist(Resource):
    def get(self):
        data = WatchlistService.renameWatchlist(request.args.get('wl_ID'), request.args.get('new_name'))
        return (data, 200)

# WATCHLIST_TICKERS
class getWatchlistTickers(Resource):
    def get(self):
        data = WatchlistService.getTickersInWatchlist(request.args.get('wl_ID'))
        return (data, 200)
    
class addTickersToWatchlist(Resource):
    def get(self):
        data = WatchlistService.addTickersToWatchlist(request.args.get('wl_ID'),request.args.get('user_ID'),request.args.get('returnWL'),request.args.get('tickers'))
        return (data, 200)

class deleteTickersFromWatchlist(Resource):
    def get(self):
        data = WatchlistService.deleteTickersFromWatchlist(request.args.get('wl_ID'),request.args.get('user_ID'),request.args.get('returnWL'),request.args.get('tickers'))
        return (data, 200)

class getAnalystCallsDefaultList(Resource):
    def get(self):
        newList = AnalystCallsService.getAnalystCalls()
        return (jsonify(newList))

class getAnalystCalls(Resource):
    def get(self):
        ticker = request.args.get('ticker')
        data = fh_calls.getAnalystCalls(ticker)
        return data, 200

#class for Login
class Login(Resource):
    def post(self):
        username = request.args['username']
        password = request.args['password']
        hashpass = hashlib.sha256(password.encode()).hexdigest()
        try:
            hst = prt = usr = pswrd = db = ''
            with open('./secrets/db_secrets.txt') as f:
                hst = f.readline().strip()
                prt = f.readline().strip()
                usr = f.readline().strip()
                pswrd = f.readline().strip()
                db = f.readline().strip()
                f.close()
                print(hst,prt,usr,pswrd,db)
                prt = int(prt)
            mydb = mysql.connector.connect(
                host=hst,
                port=prt,
                user=usr,
                password=pswrd,
                database=db
            )
            #User attempts to log in and then will check here if he is in the database
            cursor = mydb.cursor()
            query = "SELECT username, password FROM USERS WHERE username = %s AND password = %s"
            cursor.execute(query, (username, hashpass))
            result = cursor.fetchall()
            if cursor.rowcount == 1:
                response = {"message": "Logged in"}
                mydb.close()
                return response, 200
            else:
                response = {"message": "Invalid credentials"}
                mydb.close()
                return response, 200
        except Error as e:
            print("Error while connecting to MySQL", e)
            #log if any errors happen with connection
            response = {"message": "Error while connecting to MySQL"}
            mydb.close()
            return response, 500
            

class CreateUser(Resource):
    def post(self):
        #request the POST information args
        username = request.args['username']
        password = request.args['password']
        email = request.args['email']
        first = request.args['first']
        last = request.args['last']
        #hash the password
        hashpass = hashlib.sha256(password.encode()).hexdigest()
        try:
            hst = prt = usr = pswrd = db = ''
            with open('./secrets/db_secrets.txt') as f:
                hst = f.readline().strip()
                prt = f.readline().strip()
                usr = f.readline().strip()
                pswrd = f.readline().strip()
                db = f.readline().strip()
                f.close()
                print(hst,prt,usr,pswrd,db)
                prt = int(prt)
    
            mydb = mysql.connector.connect(
                host=hst,
                port=prt,
                user=usr,
                password=pswrd,
                database=db    
            )
            #User attempts to log in his credentials will be stored here for a time
            cursor = mydb.cursor()
            #Check if username already exists
            query = "SELECT username FROM USERS WHERE username = %s"
            cursor.execute(query, (username,))
            result = cursor.fetchall()
            #check if username exists in database
            if cursor.rowcount == 0:
            #add the user if Username doesnt exist in db
                query = "INSERT INTO USERS (first_name, last_name, email, password, username) VALUES (%s, %s, %s, %s, %s)"
                cursor.execute(query, (first, last, email, hashpass, username))
                mydb.commit()
                response = {"message": "User created"}
                mydb.close()
                return response, 200
            else:
                response = {"message": "Username already exists"}
                mydb.close()
                return response, 200
         
        except Error as e:
            print("Error while connecting to MySQL", e)
            #log if any errors happen with connection
            response = {"message": "Error while connecting to MySQL"}
            mydb.close()
            return response, 500

class ReturnString(Resource):
    def get(self):
        data = "howdy Gamers"
        return data, 200

class populateWatchlist(Resource):
    def get(self):
        data = WatchlistService.populateWatchlist(request.args.get('user_ID'), request.args.get('wl_ID'))
        return data, 200
        
class getSymbolInfo(Resource):
    def get(self):
        ticker = request.args.get('ticker')
        data = fh_calls.getSymbolInfo(ticker)
        return jsonify((data.get("result"))[0].get("description"))

class getBasicFinancials(Resource):
    def get(self):
        return (WatchlistService.basicFinancials(request.args.get('ticker')), 200)

class getEarningsCalendar(Resource):
    def get(self):
        ticker = request.args.get('ticker')
        data = fh_calls.getEarningsCalendar(ticker)
        # print(type(data))
        # print(data)
        return (jsonify(data.get("earningsCalendar")))
        # return (jsonify(((data.get("earningsCalendar"))[0]).get("date"))) # to grab specific value

class getCandles(Resource):
    def get(self):
        ticker = request.args.get('ticker')
        data = fh_calls.getCandles(ticker)
        return (data), 200
    
class deleteUser(Resource):
    def post(self):
        user = request.args['user']
        try:
            hst = prt = usr = pswrd = db = ''
            with open('./secrets/db_secrets.txt') as f:
                hst = f.readline().strip()
                prt = f.readline().strip()
                usr = f.readline().strip()
                pswrd = f.readline().strip()
                db = f.readline().strip()
                f.close()
                print(hst,prt,usr,pswrd,db)
                prt = int(prt)
    
            mydb = mysql.connector.connect(
                host=hst,
                port=prt,
                user=usr,
                password=pswrd,
                database=db    
            )
            cursor = mydb.cursor()
            watchlistsQuery = "delete from WATCHLISTS where user_id = (select user_id from USERS where username = %s)"
            watchlistsTickerQuery = "delete from WATCHLIST_TICKERS where user_id = (select user_id from USERS where username = %s)"
            usersQuery = "delete from USERS where username = %s"
            cursor.execute(watchlistsQuery, (user,))
            mydb.commit()
            cursor.execute(watchlistsTickerQuery, (user,))
            mydb.commit()
            cursor.execute(usersQuery, (user,))
            mydb.commit()
            response = {'message':'Account Deleted'}
            mydb.close()
            return response, 200
         
        except Error as e:
            print("Error while connecting to MySQL", e)
            #log if any errors happen with connection
            response = {"message": "Error while connecting to MySQL"}
            mydb.close()
            return response, 500

class getUserData(Resource):
    def get(self):
        return (UserService.getUserData(request.args["user"]))

class alterUserFirstName(Resource):
    def get(self):
        return (UserService.getUserData(request.args["newFName"], request.args["username"]))

class alterUserLastName(Resource):
    def get(self):
        return (UserService.getUserData(request.args["newLName"], request.args["username"]))

class alterUserEmail(Resource):
    def get(self):
        return (UserService.getUserData(request.args["newEmail"], request.args["username"]))
