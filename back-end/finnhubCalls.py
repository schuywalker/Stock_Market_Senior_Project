import finnhub as fn
import requests
import pandas as pd

#connect with the client
with open('./secrets/finnhub_api_key.txt') as f:
    key = f.readline()
f.close()
finnhub_client = fn.Client(api_key=key)

res = finnhub_client.stock_candles('AAPL', 'D', 1590988249, 1591852249)
print(res)
print("--------------------------------------------------------------------------------")
pd.set_option('display.max_rows', None)
pd.set_option('display.max_columns', None)

#Convert to Pandas Dataframe
print(pd.DataFrame(res))
print("--------------------------------------------------------------------------------")

# Basic financials
basic = finnhub_client.company_basic_financials('AAPL', 'all')
pd.DataFrame(basic)

def getQuote(ticker: str):
    quote = finnhub_client.quote(ticker)
    print("QUOTE: ",quote)
    return quote

getQuote('AAPL')