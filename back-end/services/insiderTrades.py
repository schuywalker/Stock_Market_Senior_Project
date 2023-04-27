import services.external_API_calls.finnhubCalls as fh
import finnhub as fn
import time


fh_calls = fh.finh_API_Requester()
class InsiderTradesService:

    @staticmethod
    def testMethod():
        start = time.time()
        result = fh_calls.getInsiderTrades()
        #print(result)
        end = time.time() 
        print(end - start)
        return result, 200