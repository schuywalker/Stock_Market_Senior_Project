from math import ceil
import services.external_API_calls.finnhubCalls as fh
import time


fh_calls = fh.finh_API_Requester()

class InsiderTradesService:
    
    @staticmethod
    def getTrades(page=-1,ticker = "",pageSize = 10):
        result = fh_calls.getInsiderTrades(ticker)
        num_pages = ceil(len(result[0]['data'])/pageSize)
        startSlice = pageSize * (page-1)
        endSlice = (pageSize * (page-1))+pageSize
        if(endSlice >= len(result[0]['data'])):
            endSlice = len(result[0]['data'])
        placeholder = result[0]['data'][startSlice:endSlice]
        result[0]['data'] = placeholder
        result[0]['num_pages'] = num_pages    
        return result, 200