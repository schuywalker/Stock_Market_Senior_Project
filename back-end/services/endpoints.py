from flask import jsonify, request
from flask_restful import Resource, reqparse
import utilities.finnhubCalls as fh
from utilities.finnhubCalls import *
'''
CORS only enforced by browser. (curl gets around).
prefetch: what origins (urls) are allowed to access this asset.
cant use other peoples endpoints specifically from Javascript in the browser (if CORS enabled)

'''


fh_calls = fh.finh_API_Requester()

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



