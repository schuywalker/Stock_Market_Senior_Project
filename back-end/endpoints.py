import json
import yfinance as yf
from flask import Flask, jsonify
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
# CORS(app)
CORS(app, origins=["*"])
api = Api(app)


calls = API_Calls()


class ReturnString(Resource):
    def get(self):
        data = "howdy Gamers"
        return data, 200



@app.route('/quote')
class getQuote(Resource):
    def get(self):
        data = getQuote()
        return (jsonify(data), 200)
        


# class ReturnJSON(Resource):
#     def get(self):
#         data = calls.downloadTicker()
#         data = 'AMZN',  data.to_json()
#         return jsonify(data)

class AnalystRec(Resource):
    def get(self):
        analystRecs = calls.analystRecommendations('MSFT')
        analystRecs.reset_index(inplace=True)
        analystRecs.set_index('Firm', inplace=True)
        analystRecs["Date"] = pd.to_datetime(analystRecs['Date'])
        analystRecs["Date"] = analystRecs["Date"].dt.strftime("%d-%m-%Y")
        
        recs_json_str = analystRecs.to_json(orient='table', indent=2, date_format='iso')
        # recs_json_str = recs_json_str.strip()
        # print("to json type", type(recs_json_str))
        # print(recs_json_str)
        ret = json.loads(recs_json_str)
        # print("ret type", type(ret))
        
        # #print(ret)
        
        return { "analystRecs": ret },200
        # # data = data.to_json()
        # recs_json_str= recs_json_str.loads(analystRecs) # NO LOADS. 
        # return {'json':recs_json_str},200
        # return jsonify(recs_json_str)


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


api.add_resource(User, '/user')
# api.add_resource(ReturnJSON, '/returnJson')
api.add_resource(ReturnString, '/returnString')
api.add_resource(AnalystRec, '/analystRec')
# api.add_resource(ReturnJSON,'/')

if __name__ == '__main__':
    app.run(debug=True, port=8080)