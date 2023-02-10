import json
import pandas as pd
import yfinance as yf
# https://medium.com/nerd-for-tech/all-you-need-to-know-about-yfinance-yahoo-finance-library-fa4c6e48f08e


class API_Calls:

    def __init__(self):
        print('api instantiated')

    def analystRecommendations(self, ticker):
        ret = yf.Ticker(ticker)
        return ret.recommendations.tail(10)


    def downloadTicker(self, ticker):
                data = yf.download(ticker, period="ytd",
                                group_by='ticker', actions=False)
                print(data)
                return data


    def formatToJson(self, ticker):
        data = yf.Ticker(ticker)
        recs = data.recommendations.tail(10)
        recs.to_csv()
        print(recs)
        return recs