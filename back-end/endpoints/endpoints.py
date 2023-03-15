from flask import jsonify, request
from flask_restful import Resource, reqparse
import utilities.finnhubCalls as fh
from utilities.finnhubCalls import *
import mysql.connector
from mysql.connector import Error
import hashlib
import base64
from services.watchlist import *
from services.analystCalls import *
# from services.user import *
# from services.* import *



fh_calls = fh.finh_API_Requester()

class getQuote(Resource):
    def get(self):
        data = fh_calls.getQuote('AAPL')
        return (data, 200)
    
class getAnalystCallsDefaultList(Resource):
    def get(self):
        #default data to display the latest month of analystcalls for the specifc stocks
        #this data will be moved to another list called newList
        # data = fh_calls.getAnalystCalls('AAPL')
        # data2 = fh_calls.getAnalystCalls('AMZN')
        # data3 = fh_calls.getAnalystCalls('MSFT')
        # data4 = fh_calls.getAnalystCalls('GOOG')
        # data5 = fh_calls.getAnalystCalls('CVX')
        # newList = [data[0], data2[0], data3[0], data4[0], data5[0]]
        newList = AnalystCallsService.getAnalystCalls()
        return (jsonify(newList))
#test    
#this is the ticker version of the above method
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
