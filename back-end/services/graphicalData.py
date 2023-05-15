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
    def getCandlestickData(ticker, period='1y'):
        assert(period in ['1d', '5d', '1mo', '3mo', '6mo', '1y', '2y', '5y', '10y', 'ytd', 'max'])
        ticker = Ticker(ticker)
        response = ticker.history(period=period)
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