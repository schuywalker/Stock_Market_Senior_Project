import services.external_API_calls.finnhubCalls as fh
from services.external_API_calls.finnhubCalls import *
from config.database import db_controller
import datetime
from mysql.connector import Error
from mysql.connector import errorcode


fh_calls = fh.finh_API_Requester()

class WatchlistService:

    # WATCHLIST - done
    @staticmethod
    def getUserWatchlists(user_id, includeDeleted:bool = False):
        try:
            dbc = db_controller()
            cnx, cursor = dbc.connect()
            if (includeDeleted == True):
                cursor.execute("""SELECT * FROM WATCHLISTS WHERE user_id = %s""", (user_id,))
            else:
                cursor.execute("""SELECT * FROM WATCHLISTS WHERE user_id = %s and deleted IS NULL""", (user_id,))
            result = cursor.fetchall()
            cursor.close()
            dbc.close()
            response= {"message": "Success"}, 200
        except(Error) as e:
            print("Error while connecting to MySQL", e)
            response = {"message": "Error while connecting to MySQL"}, 500
            result = None
        finally:
            return result, response
    
    @staticmethod
    def createWatchlists(user_id, wl_name:str, *tickers):
        ret = None
        dbc = db_controller()
        try:
            cnx, cursor = dbc.connect()
            nullWrapper = None
            createdTime = datetime.datetime.now().timestamp()
            cursor.execute("""INSERT INTO WATCHLISTS (user_id, wl_name, created, updated, deleted) VALUES
            (%s, %s, %s, %s,%s)""", (user_id, wl_name,createdTime,createdTime,nullWrapper))
            cnx.commit()
            cursor = cnx.cursor(buffered=True)
            cursor.execute("""SELECT wl_id FROM WATCHLISTS WHERE user_id = %s and wl_name = %s and deleted is null""", (user_id, wl_name))
            wl_id = cursor.fetchone()[0]
            
            ret = wl_id

        except Error as e:
            if (e.errno == errorcode.ER_DUP_ENTRY):
                ret = ("Error: Duplicate Entry",409)
            else:
                ret = ("Error: ",e,400)   
        finally:
            cursor.close()
            dbc.close()
            return ret,200


    @staticmethod
    def renameWatchlist(wl_id, new_name):
        dbc = db_controller()
        try:
            cnx, cursor = dbc.connect()
            updatedTime = datetime.datetime.now().timestamp()
            cursor.execute("""UPDATE WATCHLISTS SET wl_name = %s, updated = %s WHERE wl_id = %s""", (new_name, updatedTime, wl_id,))
            cnx.commit()
            response = {"message": "Success"}, 200
        except Error as e:
            print("Error: ",e)
            response = {"message": "Error: "}, 500
        finally:
            WatchlistService.updateWLTime(wl_id, cnx, cursor)
            cursor.close()
            dbc.close()
        
        return response
    
    @staticmethod
    def deleteWatchlist(wl_id):
        dbc = db_controller()
        print("wl_id: ",wl_id)
        try:
            cnx, cursor = dbc.connect()
            deletedTime = datetime.datetime.now().timestamp()
            cursor.execute("""UPDATE WATCHLISTS SET deleted = %s WHERE wl_id = %s""", (deletedTime, wl_id,))
            cnx.commit()
            response = {"message": "Success"}, 200
        except Error as e:
            response = {"message": "Error: "}, 500
        finally:
            cursor.close()
            dbc.close()
        
        return response
    
    # helper method
    @staticmethod
    def updateWLTime(wl_id, cnx, cursor):
        try:
            updatedTime = datetime.datetime.now().timestamp()
            cursor.execute("""UPDATE WATCHLISTS SET updated = %s WHERE wl_id = %s""", (updatedTime, wl_id,))
            cnx.commit()
            response = {"message": "Success"}, 200
        except Error as e:
            response = {"message": "Error: "}, 500
            
        finally:
            cursor.close()
            return response
    
    # TICKERS
    @staticmethod
    def getTickersInWatchlist(wl_id):
        try:
            dbc = db_controller()
            cnx, cursor = dbc.connect()
            
            cursor.execute("""select ticker from WATCHLIST_TICKERS where wl_id = %s""", (wl_id,))
            result = cursor.fetchall()
            
            
            cursor.execute("""SELECT wl_name FROM WATCHLISTS WHERE wl_id = %s""", (wl_id,))
            name = cursor.fetchone()
            response = {"message": "Success"}, 200
        except:
            response = {"message": "Error: "}, 500
        finally:
            dbc.close()
            return result, name, response
    
    @staticmethod
    def addTickersToWatchlist(wl_id, user_id, returnWL:bool = True, *tickers:str ):
        try:    
            dbc = db_controller()
            cnx, cursor = dbc.connect()
            epochTime = datetime.datetime.now().timestamp()
            
            post_data = str(tickers)
            post_data = post_data[1:-1]
            
            post_data = post_data.replace("'", "")
            post_data = post_data.split(',')
            while '' in post_data:
                post_data.remove('')
            try:
                for ticker in post_data:
                    cursor.execute("""INSERT INTO `WATCHLIST_TICKERS` ( `wl_id`, `ticker`, `created`, `user_id`) VALUES
                    (%s, %s, %s,%s)""", (wl_id, ticker,epochTime,user_id))
                    cnx.commit()
                    response = {"message": "Success"}, 200
                if (returnWL):
                    return (WatchlistService.getTickersInWatchlist(wl_id)),response
            except Error as e:
                if (e.errno == errorcode.ER_DUP_ENTRY):
                    response = {"Error: Duplicate Entry"},409
                else:
                    response = {"message": "Error connecting to database "}, 400
            finally:
                WatchlistService.updateWLTime(wl_id, cnx, cursor)
                cursor.close()
                dbc.close()
        except Error as e:
            response = {"message": "Error: "}, 500
        finally:
            return response

    @staticmethod
    def deleteTickersFromWatchlist(wl_id, user_id, returnWL: bool = True, *tickers: str):
        try:    
            dbc = db_controller()
            cnx, cursor = dbc.connect()

            post_data = str(tickers)
            post_data = post_data[1:-1]

            post_data = post_data.replace("'", "")
            post_data = post_data.split(',')
            while '' in post_data:
                post_data.remove('')
            try:
                print(f'delete tickers post_data: {post_data}\n')
                for ticker in post_data:
                    print('deleting ticker: ', ticker, '\n')
                    cursor.execute("""DELETE FROM `WATCHLIST_TICKERS` WHERE wl_id = %s AND user_id = %s AND ticker = %s""",
                        (wl_id, user_id, ticker))
                    print(f'row count: {cursor.rowcount}\n')
                    cnx.commit()
                    response = {"message": "Success"}, 200
                if (returnWL):
                    return (WatchlistService.getTickersInWatchlist(wl_id)), response
            except Error as e:
                response = {"message": "Error connecting to database "}, 400
            finally:
                WatchlistService.updateWLTime(wl_id, cnx, cursor)
                cursor.close()
                dbc.close()
        except Error as e:
            response = {"message": "Error: "}, 500
            return response

# TODO: change from default list
    @staticmethod
    def populateWatchlist(user_id, wl_id):
        dbc = db_controller()
        cnx, cursor = dbc.connect()
        cursor.execute("""select ticker from WATCHLIST_TICKERS where user_id = %s AND wl_id = %s""", (user_id, wl_id))
        responseFromDB = cursor.fetchall()
        print(f'\n\npopulateWatchlist response is {responseFromDB} \n\n')
        if (responseFromDB == []):
            return []
        # if (responseFromDB[0][0]=='None'):
        #     return []
        
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
        return ret
    

    @staticmethod
    def basicFinancials(ticker):
        basicFinancials = fh_calls.getBasicFinancials(ticker)
        if basicFinancials is None:
            raise(AttributeError("basicFinancials is None"))
        return {
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