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
        data = WatchlistService.getUserWatchlists(request.args.get('userID'))
        return (data, 200)

class createWatchlist(Resource):
    def get(self):
        returnCode = WatchlistService.createWatchlists(request.args.get('userID'), request.args.get('watchlistName'))
        return returnCode

class deleteWatchlist(Resource):
    def get(self):
        data = WatchlistService.getUserWatchlists(request.args.get('userID'))
        return (data, 200)

# WATCHLIST_TICKERS
class getWatchlistTickers(Resource):
    def get(self):
        data = WatchlistService.getTickersInWatchlist(request.args.get('userID'),request.args.get('watchlistName'))
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
    
class User(Resource):
    def post(self):
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
            username = "root"
            passwordEntered = "root"  
            verification = hashlib.sha256(passwordEntered.encode()).hexdigest()  
            #query the database
            query = "SELECT COUNT(username) FROM USERS WHERE username = %s AND password = %s"
            cursor.execute(query, (username, verification))
            passwordFetched = cursor.fetchall()
            #check if in db
            if passwordFetched is not None:
                dbPasswordFetched = passwordFetched[0]
                response = "Your password is correct"
            else:
                 response = "Username/password is incorrect please try again.."
            mydb.close()
        except Error as e:
            print("Error while connecting to MySQL", e)
            #log if any errors happen with connection

        return username, passwordEntered, response, verification, passwordFetched, 200 #returns correctly

class ReturnString(Resource):
    def get(self):
        data = "howdy Gamers"
        return data, 200

class populateWatchlist(Resource):
    def get(self):
        return WatchlistService.populateWatchlist(), 200
        
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
        print(type(data))
        print(data)
        return (jsonify(data.get("earningsCalendar")))
        # return (jsonify(((data.get("earningsCalendar"))[0]).get("date"))) # to grab specific value

class getCandles(Resource):
    def get(self):
        ticker = request.args.get('ticker')
        data = fh_calls.getCandles(ticker)
        return (data), 200
