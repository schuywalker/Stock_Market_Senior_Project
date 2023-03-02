import json
import yfinance as yf
from flask import Flask, jsonify, json, request
from flask_restful import Resource, Api, reqparse
import pandas as pd
from yfinCalls import *
from flask_cors import CORS
import finnhubCalls as fh

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

class smallCard(Resource):
    def get(self):
        ticker = request.args.get('ticker')
        dataBasicFin = fh_calls.getBasicFinancials(ticker)
        dataQuote = fh_calls.getQuote(ticker)
        dataNews = fh_calls.getNews(ticker)
        dataEarnings = fh_calls.getEarningsCalendar(ticker)
        print(type(dataEarnings))
        print(dataEarnings)
        newDict = {
            "price": dataQuote.get('c'),
            "perChange": dataQuote.get('dp'),
            
            "threeArticles": dataNews[:3]
        }
        earningsDict = {"earnings": dataEarnings.get("earningsCalendar")}
        newDict.update(earningsDict)
        return(jsonify(newDict))
        # return(newDict, 200)

class getQuote(Resource):
    def get(self):
        ticker = request.args.get('ticker')
        data = fh_calls.getQuote(ticker)
        return (jsonify(data), 200)
'''# class getNews(Resource):
#     def get(self):
#         ticker = request.args.get('ticker')
#         data = fh_calls.getNews(ticker)
#         return (jsonify(data))
#
# class getBasicFinancials(Resource):
#     def get(self):
#         ticker = request.args.get('ticker')
#         data = fh_calls.getBasicFinancials(ticker)
#         return (jsonify(data))'''
class getEarningsCalendar(Resource):
    def get(self):
        ticker = request.args.get('ticker')
        data = fh_calls.getEarningsCalendar(ticker)
        print(type(data))
        print(data)
        return (jsonify(data.get("earningsCalendar")))
        # return (jsonify(((data.get("earningsCalendar"))[0]).get("date")))

class getCandles(Resource):
    def get(self):
        ticker = request.args.get('ticker')
        data = fh_calls.getCandles(ticker)
        return (jsonify(data))

class AnalystRec(Resource):
    def get(self):
        analystRecs = yfin_calls.analystRecommendations('MSFT')
        analystRecs.reset_index(inplace=True)
        analystRecs.set_index('Firm', inplace=True)
        analystRecs["Date"] = pd.to_datetime(analystRecs['Date'])
        analystRecs["Date"] = analystRecs["Date"].dt.strftime("%d-%m-%Y")
        
        recs_json_str = analystRecs.to_json(orient='table', indent=2, date_format='iso')
        ret = json.loads(recs_json_str)
        return { "analystRecs": ret }, 200

    # how to add arguments to path (restful API)
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
# api.add_resource(getBasicFinancials, '/basicFinancials')
# api.add_resource(getNews, '/news')
api.add_resource(getEarningsCalendar, '/earningsDate')
api.add_resource(getCandles, '/stockCandles')
api.add_resource(smallCard, '/smallCard')
api.add_resource(User, '/user')
api.add_resource(ReturnString, '/returnString')
api.add_resource(AnalystRec, '/analystRec')

if __name__ == '__main__':
    app.run(debug=True, port=8080)

    