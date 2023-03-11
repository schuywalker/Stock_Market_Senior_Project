import json
import yfinance as yf
from flask import Flask, jsonify, json, request
from flask_restful import Resource, Api, reqparse
import pandas as pd
from yfinCalls import *
from flask_cors import CORS
import finnhubCalls as fh


app = Flask(__name__)
CORS(app, origins=["*"])
api = Api(app)


yfin_calls = yfin_API_Requester()
fh_calls = fh.finh_API_Requester()

class ReturnString(Resource):
    def get(self):
        data = "howdy Gamers"
        return data, 200

class populateWatchlist(Resource):
    def get(self):
        responseFromDB = ["AAPL", "MSFT", "TSLA", "RBlX", "LYFT", "UBER"]
        #needs userID and watchlist name
        #ticker = request.args.get('ticker')
        ret = []
        for ticker in responseFromDB:
            smallBasicFinancials = fh_calls.getBasicFinancials(ticker)
            dataQuote = fh_calls.getQuote(ticker)
            # dataNews = fh_calls.getNews(ticker)
            dataEarnings = fh_calls.getEarningsCalendar(ticker)
            dataName = fh_calls.getSymbolInfo(ticker)
            ret.append({
                "ticker": ticker,
                "name": dataName.get("result")[0].get("description"),
                "price": dataQuote.get('c'),
                "perChange": dataQuote.get('dp'),
                "earnings": dataEarnings.get("earningsCalendar"),
                # "threeArticles": dataNews[:3],
                "marketCap": smallBasicFinancials.get("metric").get("marketCapitalization"),
                "peRatio": smallBasicFinancials.get("metric").get("peExclExtraAnnual"),
                "peRatioTTM": smallBasicFinancials.get("metric").get("peBasicExclExtraTTM"),
                "dividendYield": smallBasicFinancials.get("metric").get("dividendYieldIndicatedAnnual"),
            })
        return(ret, 200)


class getQuote(Resource):
    def get(self):
        ticker = request.args.get('ticker')
        data = fh_calls.getQuote(ticker)
        return (data, 200)

'''class getNews(Resource):
    def get(self):
        ticker = request.args.get('ticker')
        data = fh_calls.getNews(ticker)
        return (jsonify(data))
'''
class getSymbolInfo(Resource):
    def get(self):
        ticker = request.args.get('ticker')
        data = fh_calls.getSymbolInfo(ticker)
        return jsonify((data.get("result"))[0].get("description"))

class getBasicFinancials(Resource):
    def get(self):
        ticker = request.args.get('ticker')
        basicFinancials = fh_calls.getBasicFinancials(ticker)
        retDict = {
            # TO DO: Categorize dict by commented sections
            "marketCap": basicFinancials.get("metric").get("marketCapitalization"),
            "dividendYield": basicFinancials.get("metric").get("dividendYieldIndicatedAnnual"),
            "dividendGrowthRate5Y": basicFinancials.get("metric").get("dividendGrowthRate5Y"),
            
            # VALUATION
            "peRatio": basicFinancials.get("metric").get("peExclExtraAnnual"),
            "peRatioTTM": basicFinancials.get("metric").get("peBasicExclExtraTTM"),
            
            "priceToSales": basicFinancials.get("metric").get("psAnnual"),
            "priceToSalesTTM": basicFinancials.get("metric").get("psTTM"),
            
            "pFreeCashFlowShareAnnual": basicFinancials.get("metric").get("pfcfShareAnnual"),
            "pFreeCashFlowShareTTM": basicFinancials.get("metric").get("pfcfShareTTM"),
            
            "pCashFlowShareTTM": basicFinancials.get("metric").get("pcfShareTTM"),
            
            "psAnnual": basicFinancials.get("metric").get("psAnnual"),
            "psTTM": basicFinancials.get("metric").get("psTTM"),
            
            "priceToBook": basicFinancials.get("metric").get("ptbvAnnual"),
            "pbAnnual": basicFinancials.get("metric").get("pbAnnual"),
        
            "quickRatioAnnual": basicFinancials.get("metric").get("quickRatioAnnual"),
            
            
            # PRICE
            "beta": basicFinancials.get("metric").get("beta"),
            "priceReturnYTD": basicFinancials.get("metric").get("yearToDatePriceReturnDaily"),
            "10DayAverageTradingVolume": basicFinancials.get("metric").get("10DayAverageTradingVolume"),
            "52WeekHigh": basicFinancials.get("metric").get("52WeekHigh"),
            "52WeekLow": basicFinancials.get("metric").get("52WeekLow"),
            "yearToDatePriceReturnDaily": basicFinancials.get("metric").get("yearToDatePriceReturnDaily"),
            "52WeekPriceReturnDaily": basicFinancials.get("metric").get("52WeekPriceReturnDaily"),
            "5DayPriceReturnDaily": basicFinancials.get("metric").get("5DayPriceReturnDaily"),
            "monthToDatePriceReturnDaily": basicFinancials.get("metric").get("monthToDatePriceReturnDaily"),
            "priceRelativeToS&P50013Week": basicFinancials.get("metric").get("priceRelativeToS&P50013Week"), 
            "priceRelativeToS&P50026Week": basicFinancials.get("metric").get("priceRelativeToS&P50026Week"), 
            "priceRelativeToS&P5004Week": basicFinancials.get("metric").get("priceRelativeToS&P5004Week"), 
            "priceRelativeToS&P500Ytd": basicFinancials.get("metric").get("priceRelativeToS&P500Ytd"), 
            
            # CASH FLOW
            "cashFlowPerShareAnnual": basicFinancials.get("metric").get("cashFlowPerShareAnnual"),
            "cashFlowPerShareTTM": basicFinancials.get("metric").get("cashFlowPerShareTTM"),
            "currentDividendYieldTTM": basicFinancials.get("metric").get("currentDividendYieldTTM"),
            
            # PROFITABILITY / INCOME STATEMENT
            "netProfitMarginAnnual": basicFinancials.get("metric").get("netProfitMarginAnnual"),  
            "grossMarginTTM": basicFinancials.get("metric").get("grossMarginTTM"),  
            "epsGrowthTTMYoy": basicFinancials.get("metric").get("epsGrowthTTMYoy"),
            "epsGrowth3Y": basicFinancials.get("metric").get("epsGrowth3Y"),
            "epsGrowth5Y": basicFinancials.get("metric").get("epsGrowth5Y"),
            "revenueGrowth5Y": basicFinancials.get("metric").get("revenueGrowth5Y"),

            "netMarginGrowth5Y": basicFinancials.get("metric").get("netMarginGrowth5Y"),
            "netProfitMargin5": basicFinancials.get("metric").get("netProfitMargin5"),
            "netProfitMarginAnnual": basicFinancials.get("metric").get("netProfitMarginAnnual"),
            "netProfitMarginTTM": basicFinancials.get("metric").get("netProfitMarginTTM"),
            "operatingMargin5Y": basicFinancials.get("metric").get("operatingMargin5Y"),
            "operatingMarginAnnual": basicFinancials.get("metric").get("operatingMarginAnnual"),
            "operatingMarginTTM": basicFinancials.get("metric").get("operatingMarginTTM"),

            "roeTTM": basicFinancials.get("metric").get("roeTTM"),
            "roiAnnual": basicFinancials.get("metric").get("roiAnnual"),
            "roiTTM": basicFinancials.get("metric").get("roiTTM"),
            
            # BALANCE SHEET
            "longTermDebt/equityAnnual": basicFinancials.get("metric").get("longTermDebt/equityAnnual"),  
            "totalDebt/totalEquityAnnual": basicFinancials.get("metric").get("totalDebt/totalEquityAnnual"),
            "totalDebt/totalEquityQuarterly": basicFinancials.get("metric").get("totalDebt/totalEquityQuarterly"),
        }
        
        return (retDict, 200)
    
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