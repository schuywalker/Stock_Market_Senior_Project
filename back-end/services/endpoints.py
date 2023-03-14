from flask import jsonify, request
from flask_restful import Resource, reqparse
import utilities.finnhubCalls as fh
from utilities.finnhubCalls import *
import mysql.connector
from mysql.connector import Error
import hashlib
import base64
'''
CORS only enforced by browser. (curl gets around).
prefetch: what origins (urls) are allowed to access this asset.
cant use other peoples endpoints specifically from Javascript in the browser (if CORS enabled)

'''


fh_calls = fh.finh_API_Requester()

class getQuote(Resource):
    def get(self):
        data = fh_calls.getQuote('AAPL')
        return (data, 200)
    
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
        data = fh_calls.getQuote('AAPL')
        return (data), 200
