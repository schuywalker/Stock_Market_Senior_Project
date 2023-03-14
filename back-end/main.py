from flask import Flask
from services.endpoints import *
from flask_cors import CORS
from flask_restful import Api

app = Flask(__name__)
CORS(app, origins=["*"])
api = Api(app)

api.add_resource(getQuote, '/quote')
api.add_resource(getBasicFinancials, '/basicFinancials')
api.add_resource(getSymbolInfo, '/symbolInfo')
api.add_resource(getEarningsCalendar, '/earningsDate')
api.add_resource(getCandles, '/stockCandles')
api.add_resource(populateWatchlist, '/populateWatchlist')
api.add_resource(ReturnString, '/returnString')
api.add_resource(getAnalystCallsDefaultList, '/analystCallsDefaultList')
api.add_resource(getAnalystCalls, '/analystCalls')

if __name__ == '__main__':
    app.run(debug=True, port=8080)
    