import services.external_API_calls.finnhubCalls as fh
from services.external_API_calls.finnhubCalls import *


fh_calls = fh.finh_API_Requester()

class AnalystCallsService:

# args* will let us have a variable number of arguments
# so we can combine default list and single ticker
# https://www.scaler.com/topics/variable-length-argument-in-python/
    @staticmethod
    def getAnalystCalls(tickers = ['AAPL', 'MSFT', 'TSLA', 'RBlX', 'LYFT', 'UBER']):
        # ret = []
        # for ticker in tickers:
        #     ret.append(fh_calls.getAnalystCalls(ticker))
        # return ret
        data = fh_calls.getAnalystCalls('AAPL')
        data2 = fh_calls.getAnalystCalls('AMZN')
        data3 = fh_calls.getAnalystCalls('MSFT')
        data4 = fh_calls.getAnalystCalls('GOOG')
        data5 = fh_calls.getAnalystCalls('CVX')
        return [data[0], data2[0], data3[0], data4[0], data5[0]]
