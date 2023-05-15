from flask import Flask
from endpoints.endpoints import *
from flask_cors import CORS
from flask_restful import Api
from config.database import db_controller

app = Flask(__name__)
CORS(app, origins=["*"])
api = Api(app)



#TODO: extract this to a separate file or a static init_API() function
api.add_resource(getBasicFinancials, '/basicFinancials')
api.add_resource(getSymbolInfo, '/symbolInfo')
api.add_resource(getEarningsCalendar, '/earningsDate')
api.add_resource(getCandles, '/stockCandles')
api.add_resource(getAnalystCallsDefaultList, '/analystCallsDefaultList')
api.add_resource(getAnalystCalls, '/analystCalls')

# WATCHLISTS
api.add_resource(populateWatchlist, '/populateWatchlist')
api.add_resource(getUserWatchlists, '/getUserWatchlists')
api.add_resource(getWatchlistTickers, '/getWatchlistTickers')

# WATCHLIST CRUD
api.add_resource(createWatchlist, '/createWatchlist') # NEEDS TO BE PUT OR POST
api.add_resource(deleteWatchlist, '/deleteWatchlist') # NEEDS TO BE DEL
api.add_resource(renameWatchlist, '/renameWatchlist')
api.add_resource(addTickersToWatchlist, '/addTickersToWatchlist') # NEEDs TO BE POST
api.add_resource(deleteTickersFromWatchlist, '/deleteTickersFromWatchlist')


# ACCOUNT MANAGEMENT
api.add_resource(getUserData, '/getUserData')
api.add_resource(alterUserFirstName, '/alterUserFirstName')
api.add_resource(alterUserLastName, '/alterUserLastName')
api.add_resource(alterUserEmail, '/alterUserEmail')
api.add_resource(alterUsername, '/alterUsername')
api.add_resource(checkPassword, '/verifyPassword')

# ACCOUNT CRUD
api.add_resource(CreateUser,'/createUser')
api.add_resource(deleteUser,'/deleteUser')
api.add_resource(Login, '/userLogin')
api.add_resource(alterPassword, '/alterPassword')

#INSIDER TRADES
api.add_resource(getInsiderTrades,"/getInsiderTrades")

# ASSET SCREENER
api.add_resource(getAssetScreenerData, '/assetScreener')

#graphical data
api.add_resource(getCandlestickData, '/getCandleStickData')
api.add_resource(getStockDataAAPL, '/getStockDataAAPL')

if __name__ == '__main__':
    app.run(debug=True, port=8080)
    