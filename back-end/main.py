from flask import Flask
from endpoints.endpoints import *
from flask_cors import CORS
from flask_restful import Api

app = Flask(__name__)
CORS(app, origins=["*"])
api = Api(app)


#TODO: extract this to a separate file or a static init_API() function
api.add_resource(getQuote, '/quote')
api.add_resource(getBasicFinancials, '/basicFinancials')
api.add_resource(getSymbolInfo, '/symbolInfo')
api.add_resource(getEarningsCalendar, '/earningsDate')
api.add_resource(getCandles, '/stockCandles')
api.add_resource(populateWatchlist, '/populateWatchlist')
api.add_resource(ReturnString, '/returnString')
api.add_resource(getAnalystCallsDefaultList, '/analystCallsDefaultList')
api.add_resource(getAnalystCalls, '/analystCalls')
api.add_resource(CreateUser,'/createUser')

if __name__ == '__main__':
    app.run(debug=True, port=8080)
    