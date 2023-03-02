from datetime import date, timedelta

import finnhub as fn
import requests
import pandas as pd


# finnhub_client = None

class finh_API_Requester(): 

    def __init__(self):
        key = ''
        with open('./secrets/finnhub_api_key.txt') as f:
            key = f.readline()
        f.close()
        
        finh_API_Requester.finnhub_client = fn.Client(api_key=key)

    def getCandles(self, ticker):
        #connect with the client
        candles = self.finnhub_client.stock_candles(ticker, 'D', 1590988249, 1591852249)
        return candles

    def getQuote(self, ticker):
        quote = finh_API_Requester.finnhub_client.quote(ticker)
        return quote

    def getBasicFinancials(self, ticker):
        basic_fin = self.finnhub_client.company_basic_financials(ticker, 'all')
        return basic_fin

    def getNews(self, ticker):
        today = date.today()
        yesterday = today - timedelta(days=1)
        news = self.finnhub_client.company_news(ticker, _from=yesterday, to=today)
        return news

    def getEarningsCalendar(self, ticker):
        today = date.today()
        lastMonth = today - timedelta(days=31)
        earnings_calendar = self.finnhub_client.earnings_calendar(_from=lastMonth, to=today, symbol=ticker)
        return earnings_calendar


