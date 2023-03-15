import utilities.finnhubCalls as fh
from utilities.finnhubCalls import *


fh_calls = fh.finh_API_Requester()

class AnalystCallsService:

    @staticmethod
    def getAnalystCalls(tickers = ['AAPL', 'MSFT', 'TSLA', 'RBlX', 'LYFT', 'UBER']):
        ret = []
        for ticker in tickers:
            ret.append(fh_calls.getAnalystCalls(ticker))
        return ret
