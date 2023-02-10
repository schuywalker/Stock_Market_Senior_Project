from yfinCalls import *
import pandas as pd
import os

# https://pandas.pydata.org/Pandas_Cheat_Sheet.pdf

calls = API_Calls()

analystRecs = calls.analystRecommendations('MSFT')
# print(type(analystRecs))
# print(type(analystRecs.index[0]))
# print(analystRecs)

# print(anaylstRecs.head(2))
# print(anaylstRecs.tail(1))
# print("\ncolumns:\n", anaylstRecs.columns)
# # print("\nrows:\n", anaylstRecs)
# print("\naccessing specific columns:\n", anaylstRecs[["Firm", "To Grade"]])
# print("\n\naccessing specific rows:", anaylstRecs.iloc[[1, 2, 3]])


analystRecs.reset_index(inplace=True)
analystRecs.set_index('Firm', inplace=True)
analystRecs["Date"] = pd.to_datetime(analystRecs['Date'])
analystRecs["Date"] = analystRecs["Date"].dt.strftime('%d-%m-%Y')

print("\n\n\n")
# print(analystRecs)


recs_json_str = analystRecs.to_json(orient='table', indent=2, date_format='iso')

print("\n\n")
# print(recs_json_str) 
        
ret = json.loads(recs_json_str)
# print(ret)

# data = data.to_json()
# recs_json_str= recs_json_str.loads(analystRecs)
# recs_json_str

# return {'json':recs_json_str},200
# return jsonify(recs_json_str)

# json = analystRecs.to_json(orient='index', date_format='iso', indent=2)
# print("\nindex"+json)

# print(analystRecs)

# json = anaylstRecs.to_json(orient='split', indent=4) # dont use
# print("\nsplit"+json)
# json = anaylstRecs.to_json(orient='records', indent=4) # dont use
# print("\nrecords"+json)

# json = anaylstRecs.to_json(orient='table', indent=2, date_format='iso', index=["Firm"])
# print("\ntable"+json)

# print(anaylstRecs.index)
# df2 = anaylstRecs.append({'dateTime':anaylstRecs.index})
# print("\n\n"+df2)





# jsonRecs = calls.formatToJson('AMZN')
# msft = yf.Ticker("MSFT")
#
# recs = msft.get_recommendations()
# print(recs)
