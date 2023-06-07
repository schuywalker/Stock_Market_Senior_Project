import json
from flask import jsonify
from services.utils.utils import serviceUtils
import services.external_API_calls.finnhubCalls as fh
from services.external_API_calls.finnhubCalls import *
from config.database import db_controller
import datetime
from mysql.connector import Error
from mysql.connector import errorcode
from yahooquery import Ticker


class GraphService:

    @staticmethod
    def getCandlestickData(ticker, period, interval):
        assert(not(period == None and interval == None))
        assert(ticker != None)
        ticker = Ticker(ticker)
        
        if(period != None and interval != None):
            assert(period in ['1d', '5d', '1mo', '3mo', '6mo', '1y', '2y', '5y', '10y', 'ytd', 'max'])
            assert(interval in ['1m', '2m', '5m', '15m', '30m', '60m', '90m', '1h', '1d', '5d', '1wk', '1mo', '3mo'])
            response = ticker.history(period=period, interval=interval)
        elif(period != None):
            assert(period in ['1d', '5d', '1mo', '3mo', '6mo', '1y', '2y', '5y', '10y', 'ytd', 'max'])
            response = ticker.history(period=period)

        elif(interval != None):
            assert(interval in ['1m', '2m', '5m', '15m', '30m', '60m', '90m', '1h', '1d', '5d', '1wk', '1mo', '3mo'])
            response = ticker.history(interval=interval)
        
        response_dict = response.to_dict(orient='records')
        
        start_date  = datetime.datetime.today() - datetime.timedelta(days=len(response_dict))
        
        for i, item in enumerate(response_dict):
            item['date'] = (start_date + datetime.timedelta(days=i)).strftime('%Y-%m-%d')
            item['open'] = round(float(item['open']), 2)
            item['high'] = round(float(item['high']), 2)
            item['low'] = round(float(item['low']), 2)
            item['close'] = round(float(item['close']), 2)
        # Filter out and only include date and open keys
        filtered_response_dict = [{ 'date': item['date'], 'open': item['open'], 'high': item['high'], 'low': item['low'],'close': item['close'], 'volume': item['volume'] } for item in response_dict] # using filter likely more performant

        return filtered_response_dict, 200
    
    @staticmethod
    def getStockDataAAPL(): 
        ticker = Ticker('aapl')
        response = ticker.history(period='1y')
        response_dict = response.to_dict(orient='records')
        start_date  = datetime.datetime.today() - datetime.timedelta(days=len(response_dict))
        
        for i, item in enumerate(response_dict):
            item['date'] = (start_date + datetime.timedelta(days=i)).strftime('%Y-%m-%d')
            item['open'] = round(float(item['open']), 2)
        # Filter out and only include date and open keys
        filtered_response_dict = [{ 'date': item['date'], 'open': item['open'] } for item in response_dict]

        return json.dumps(filtered_response_dict), 200