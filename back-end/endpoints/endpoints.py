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
from services.insiderTrades import InsiderTradesService
from services.assetScreener import *

fh_calls = fh.finh_API_Requester()

### ASSET SCREENER ENDPOINTS ###
class getAssetScreenerData(Resource):
    def get(self):
        data = AssetScreenerService.assetScreener(request.args.get('ticker'))
        return (data, 200)

# WATCHLISTS
class getUserWatchlists(Resource):
    def get(self):
        data = WatchlistService.getUserWatchlists(request.args.get('user_id','includeDeleted'))
        return (data, 200)

class createWatchlist(Resource):
    def get(self):
        returnCode = WatchlistService.createWatchlists(request.args.get('user_id'), request.args.get('wl_name'))
        return returnCode

class deleteWatchlist(Resource):
    def get(self):
        data = WatchlistService.deleteWatchlist(request.args.get('wl_id'))
        return (data, 200)

class renameWatchlist(Resource):
    def get(self):
        data = WatchlistService.renameWatchlist(request.args.get('user_id'), request.args.get('wl_id'), request.args.get('new_name'))
        return (data, 200)

# WATCHLIST_TICKERS
class getWatchlistTickers(Resource):
    def get(self):
        data = WatchlistService.getTickersInWatchlist(request.args.get('wl_id'))
        return (data, 200)
    
class addTickersToWatchlist(Resource):
    def get(self):
        data = WatchlistService.addTickersToWatchlist(request.args.get('wl_id'),request.args.get('user_id'),request.args.get('returnWL'),request.args.get('tickers'))
        return (data, 200)

class deleteTickersFromWatchlist(Resource):
    def get(self):
        data = WatchlistService.deleteTickersFromWatchlist(request.args.get('wl_id'),request.args.get('user_id'),request.args.get('returnWL'),request.args.get('tickers'))
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

#class for Login
class Login(Resource):
    def post(self):
       
        data = UserService.login(request.args.get('username'), request.args.get('password'))
        return data, 200        

class CreateUser(Resource):
    def post(self):
        if(UserService.isUserNameAvailable(request.args.get('username'))):
            data = UserService.createUser(request.args.get('username'), request.args.get('password'), request.args.get('email'), request.args.get('first'), request.args.get('last'))
            return data, 200
        else:
            return {"message": "Username already exists"},400



### WATCHLIST ENDPOINTS ###
class populateWatchlist(Resource):
    def get(self):
        data = WatchlistService.populateWatchlist(request.args.get('user_id'), request.args.get('wl_id'))
        return data, 200
        
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
        return (jsonify(data.get("earningsCalendar")))
        # return (jsonify(((data.get("earningsCalendar"))[0]).get("date"))) # to grab specific value

class getCandles(Resource):
    def get(self):
        ticker = request.args.get('ticker')
        data = fh_calls.getCandles(ticker)
        return (data), 200
    



### USER ENDPOINTS ###    
class deleteUser(Resource):
    def post(self):
        data = UserService.deleteUser(request.args.get('user'))
        return data, 200

class getUserData(Resource):
    def get(self):
        return (UserService.getUserData(request.args["user"])), 200


class alterUserFirstName(Resource):
    def post(self):
        return (UserService.alterUserFirstName(request.args["firstName"], request.args["user"]))

class alterUserLastName(Resource):
    def post(self):
        return (UserService.alterUserLastName(request.args["lastName"], request.args["user"]))

class alterUserEmail(Resource):
    def post(self):
        return (UserService.alterUserEmail(request.args["email"], request.args["user"]))

class alterUsername(Resource):
    def post(self):
        if(UserService.isUserNameAvailable(request.args["user"])):
           return (UserService.alterUsername(request.args["originalUser"], request.args["user"]))
        else:
            return  {"message": "Username already exists"},400
        
class checkPassword(Resource):
    def get(self):
        return UserService.checkPassword(request.args['user'],request.args['password'])

class alterPassword(Resource):
    def post(self):
        return UserService.alterPassword(request.args['user'],request.args['password'])
    
#INSIDER TRADES
class getInsiderTrades(Resource):
    def get(self):
        page = int(request.args['pageNumber'])
        if(len(request.args) > 1):
            ticker = request.args['ticker']
            return InsiderTradesService.getTrades(page,ticker)
        else:
            return InsiderTradesService.getTrades(page)
