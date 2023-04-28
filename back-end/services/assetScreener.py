import services.external_API_calls.finnhubCalls as fh
from services.external_API_calls.finnhubCalls import *
from config.database import db_controller
import datetime
from mysql.connector import Error
from mysql.connector import errorcode
from yahooquery import Ticker


fh_calls = fh.finh_API_Requester()

class AssetScreenerService:
    
    @staticmethod
    def assetScreener(ticker):
        basicFinancials = fh_calls.getBasicFinancials(ticker)
        if basicFinancials is None:
            raise(AttributeError("basicFinancials is None"))
        

        ret = {
            "chartData": "yo",
            "basicInfo": {
                "marketCap": round(basicFinancials.get("metric").get("marketCapitalization"), 2),
                "dividendYield": basicFinancials.get("metric").get("dividendYieldIndicatedAnnual"),
                "dividendGrowthRate5Y": basicFinancials.get("metric").get("dividendGrowthRate5Y"),
            },
            "valuation": {
                "peRatio": basicFinancials.get("metric").get("peExclExtraAnnual"),
                "peRatioTTM": basicFinancials.get("metric").get("peBasicExclExtraTTM"),

                "priceToSales": basicFinancials.get("metric").get("psAnnual"),
                "priceToSalesTTM": basicFinancials.get("metric").get("psTTM"),

                "pFreeCashFlowShareAnnual": basicFinancials.get("metric").get("pfcfShareAnnual"),
                "pFreeCashFlowShareTTM": basicFinancials.get("metric").get("pfcfShareTTM"),

                "pCashFlowShareTTM": basicFinancials.get("metric").get("pcfShareTTM"),

                "psAnnual": basicFinancials.get("metric").get("psAnnual"),
                "psTTM": basicFinancials.get("metric").get("psTTM"),

                "priceToBook": basicFinancials.get("metric").get("ptbvAnnual"),
                "pbAnnual": basicFinancials.get("metric").get("pbAnnual"),

                "quickRatioAnnual": basicFinancials.get("metric").get("quickRatioAnnual"),
            },

            "priceMetrics": 24,
            "financials": 25,
            # "priceMetrics": {
            #     "beta": basicFinancials.get("metric").get("beta"),
            #     "priceReturnYTD": basicFinancials.get("metric").get("yearToDatePriceReturnDaily"),
            #     "10DayAverageTradingVolume": basicFinancials.get("metric").get("10DayAverageTradingVolume"),
            #     "52WeekHigh": basicFinancials.get("metric").get("52WeekHigh"),
            #     "52WeekLow": basicFinancials.get("metric").get("52WeekLow"),
            #     "yearToDatePriceReturnDaily": basicFinancials.get("metric").get("yearToDatePriceReturnDaily"),
            #     "52WeekPriceReturnDaily": basicFinancials.get("metric").get("52WeekPriceReturnDaily"),
            #     "5DayPriceReturnDaily": basicFinancials.get("metric").get("5DayPriceReturnDaily"),
            #     "monthToDatePriceReturnDaily": basicFinancials.get("metric").get("monthToDatePriceReturnDaily"),
            #     "priceRelativeToS&P50013Week": basicFinancials.get("metric").get("priceRelativeToS&P50013Week"), 
            #     "priceRelativeToS&P50026Week": basicFinancials.get("metric").get("priceRelativeToS&P50026Week"), 
            #     "priceRelativeToS&P5004Week": basicFinancials.get("metric").get("priceRelativeToS&P5004Week"), 
            #     "priceRelativeToS&P500Ytd": basicFinancials.get("metric").get("priceRelativeToS&P500Ytd"), 

            # },
            # "financials": {
            #     "cash_flow":{
            #         "cashFlowPerShareAnnual": basicFinancials.get("metric").get("cashFlowPerShareAnnual"),
            #         "cashFlowPerShareTTM": basicFinancials.get("metric").get("cashFlowPerShareTTM"),
            #         "currentDividendYieldTTM": basicFinancials.get("metric").get("currentDividendYieldTTM"),
            #     },
            #     "income_statement":{
            #         "netProfitMarginAnnual": basicFinancials.get("metric").get("netProfitMarginAnnual"),  
            #         "grossMarginTTM": basicFinancials.get("metric").get("grossMarginTTM"),  
            #         "epsGrowthTTMYoy": basicFinancials.get("metric").get("epsGrowthTTMYoy"),
            #         "epsGrowth3Y": basicFinancials.get("metric").get("epsGrowth3Y"),
            #         "epsGrowth5Y": basicFinancials.get("metric").get("epsGrowth5Y"),
            #         "revenueGrowth5Y": basicFinancials.get("metric").get("revenueGrowth5Y"),

            #         "netMarginGrowth5Y": basicFinancials.get("metric").get("netMarginGrowth5Y"),
            #         "netProfitMargin5": basicFinancials.get("metric").get("netProfitMargin5"),
            #         "netProfitMarginAnnual": basicFinancials.get("metric").get("netProfitMarginAnnual"),
            #         "netProfitMarginTTM": basicFinancials.get("metric").get("netProfitMarginTTM"),
            #         "operatingMargin5Y": basicFinancials.get("metric").get("operatingMargin5Y"),
            #         "operatingMarginAnnual": basicFinancials.get("metric").get("operatingMarginAnnual"),
            #         "operatingMarginTTM": basicFinancials.get("metric").get("operatingMarginTTM"),

            #         "roeTTM": basicFinancials.get("metric").get("roeTTM"),
            #     "roiAnnual": basicFinancials.get("metric").get("roiAnnual"),
            #         "roiTTM": basicFinancials.get("metric").get("roiTTM"),
            #     },
            #     "balance_sheet":{
            #         "longTermDebt/equityAnnual": basicFinancials.get("metric").get("longTermDebt/equityAnnual"),  
            #         "totalDebt/totalEquityAnnual": basicFinancials.get("metric").get("totalDebt/totalEquityAnnual"),
            #         "totalDebt/totalEquityQuarterly": basicFinancials.get("metric").get("totalDebt/totalEquityQuarterly"),
            #     },
            # }
        }
        
        return ret
