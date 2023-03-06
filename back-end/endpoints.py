import json
import yfinance as yf
from flask import Flask, jsonify, json, request
from flask_restful import Resource, Api, reqparse
import pandas as pd
from yfinCalls import *
from flask_cors import CORS
import finnhubCalls as fh
from finnhubCalls import *
'''
CORS only enforced by browser. (curl gets around).
prefetch: what origins (urls) are allowed to access this asset.
cant use other peoples endpoints specifically from Javascript in the browser (if CORS enabled)

'''

app = Flask(__name__)
CORS(app, origins=["*"])
api = Api(app)


yfin_calls = yfin_API_Requester()
fh_calls = fh.finh_API_Requester()

class ReturnString(Resource):
    def get(self):
        data = "howdy Gamers"
        return data, 200

class getQuote(Resource):
    def get(self):
        data = fh_calls.getQuote('AAPL')
        return (jsonify(data))
    
class getAnalystCallsDefaultList(Resource):
    def get(self):
        #default data to display the latest month of analystcalls for the specifc stocks
        #this data will be moved to another list called newList
        data = fh_calls.getAnalystCalls('AAPL')
        data2 = fh_calls.getAnalystCalls('AMZN')
        data3 = fh_calls.getAnalystCalls('MSFT')
        data4 = fh_calls.getAnalystCalls('GOOG')
        data5 = fh_calls.getAnalystCalls('CVX')
        newList = [data[0], data2[0], data3[0], data4[0], data5[0]]
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
        parser = reqparse.RequestParser()
        parser.add_argument('username', required=True, type=str)
        parser.add_argument('age', required=True, type=int)
        args = parser.parse_args()
        return {
            'username': args['username'],
            'age': args['age'],
        }, 200


api.add_resource(getQuote, '/quote')
api.add_resource(User, '/user')
api.add_resource(ReturnString, '/returnString')
api.add_resource(getAnalystCallsDefaultList, '/analystCallsDefaultList')
api.add_resource(getAnalystCalls, '/analystCalls')

if __name__ == '__main__':
    app.run(debug=True, port=8080)