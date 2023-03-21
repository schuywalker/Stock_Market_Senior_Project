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
    
class getAnalystCallsDefaultList(Resource):
    def get(self):
        newList = AnalystCallsService.getAnalystCalls()
        return (jsonify(newList))

class getAnalystCalls(Resource):
    def get(self):
        ticker = request.args.get('ticker')
        data = fh_calls.getAnalystCalls(ticker)
        return data, 200
    
class CreateUser(Resource):
    def post(self):
        username = request.args['username']
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
            #passwordEntered = "root"  
            #verification = hashlib.sha256(passwordEntered.encode()).hexdigest()  
            #Check if username already exists
            query = "SELECT username FROM USERS WHERE username = %s"
            cursor.execute(query, (username,))
            cursor.fetchall()
            #check if in db
            if cursor.rowcount == 0:
                response = "Username is available"
            else:
                 response = "Username already exists"
                 
            return response, 200 
            mydb.close()
        except Error as e:
            print("Error while connecting to MySQL", e)
            #log if any errors happen with connection

        return 404 #returns correctly

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
