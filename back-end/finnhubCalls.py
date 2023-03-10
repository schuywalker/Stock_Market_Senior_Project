import finnhub as fn
import requests
import pandas as pd

#generate Dictionary
analystCallsDictionary = {
    
}
# finnhub_client = None
class finh_API_Requester(): 
    
    def __init__(self):
        key = ''
        with open('./secrets/finnhub_api_key.txt') as f:
            key = f.readline()
        f.close()
        
        finh_API_Requester.finnhub_client = fn.Client(api_key=key)
        #print(f"\n\n\n in init: {self.finnhub_client.quote('AAPL')}\n\n")

    def test_get_candles(self, ticker='AAPL'):
        #connect with the client
        res = self.finnhub_client.stock_candles(ticker, 'D', 1590988249, 1591852249)
        print(res)
        print("--------------------------------------------------------------------------------")
        pd.set_option('display.max_rows', None)
        pd.set_option('display.max_columns', None)

        #Convert to Pandas Dataframe
        print(pd.DataFrame(res))
        print("--------------------------------------------------------------------------------")

        # Basic financials
        basic = self.finnhub_client.company_basic_financials('AAPL', 'all')
        pd.DataFrame(basic)

    def getQuote(self, ticker):
        
        quote = finh_API_Requester.finnhub_client.quote(ticker)
        print("QUOTE: ",quote)
        print(f"quote type: {type(quote)}")
        return quote
    
    #creating method for Analyst Calls Component
    def getAnalystCalls(self, ticker):
        
        #ideally this will be self updating to whatever the user wants to search for so i believe this will work just need to test
        analystCall = self.finnhub_client.recommendation_trends(ticker)
        #using pandas on newly retrieved analyst call for the specifc stock
        analystCallsDictionary = analystCall
        pdAnalystCall = pd.DataFrame(analystCall).to_json(orient='index')
        return analystCall

    