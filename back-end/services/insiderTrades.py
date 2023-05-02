from math import ceil
import services.external_API_calls.finnhubCalls as fh
import finnhub as fn
import time


fh_calls = fh.finh_API_Requester()
class InsiderTradesService:

    @staticmethod
    def testMethod(page=-1):
        #start = time.time()
        result = fh_calls.getInsiderTrades()
        num_pages = ceil(len(result[0]['data'])/10)
        startSlice = 10 * (page-1)
        endSlice = (10 * (page-1))+10
        if(endSlice >= num_pages):
            endSlice = num_pages-startSlice;
        if(page != -1):
            placeholder = result[0]['data'][startSlice:endSlice]
            result[0]['data'] = placeholder
            result[0]['num_pages'] = num_pages
        #end = time.time() 
        #print(end - start)
        return result, 200