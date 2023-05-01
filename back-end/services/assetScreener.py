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
                "market cap": round(basicFinancials.get("metric").get("marketCapitalization"), 2),
                "dividend yield": basicFinancials.get("metric").get("dividendYieldIndicatedAnnual"),
                "dividend growth rate 5Y": basicFinancials.get("metric").get("dividendGrowthRate5Y"),
            },
            "valuation": {
                "price/earnings FWD": basicFinancials.get("metric").get("peExclExtraAnnual"),
                "price/earnings TTM": basicFinancials.get("metric").get("peBasicExclExtraTTM"),

                "price/sales": basicFinancials.get("metric").get("psAnnual"),
                "price/sales TTM": basicFinancials.get("metric").get("psTTM"),

                "price/free cash-flow": basicFinancials.get("metric").get("pfcfShareAnnual"),
                "price/free cash-flow TTM": basicFinancials.get("metric").get("pfcfShareTTM"),

                "price/free cash-flow TTM": basicFinancials.get("metric").get("pcfShareTTM"),

                "price/sales": basicFinancials.get("metric").get("psAnnual"),
                "price/sales TTM": basicFinancials.get("metric").get("psTTM"),

                "price/book": basicFinancials.get("metric").get("ptbvAnnual"),
                "price/book": basicFinancials.get("metric").get("pbAnnual"),

                "quick ratio": basicFinancials.get("metric").get("quickRatioAnnual"),
            },

            "priceMetrics":{          
                "beta": basicFinancials.get("metric").get("beta"),
                "price return YTD": basicFinancials.get("metric").get("yearToDatePriceReturnDaily"),
                "10 day average trading volume": basicFinancials.get("metric").get("10DayAverageTradingVolume"),
                "52 week high": basicFinancials.get("metric").get("52WeekHigh"),
                "52 week low": basicFinancials.get("metric").get("52WeekLow"),
                "year to date price return daily": basicFinancials.get("metric").get("yearToDatePriceReturnDaily"),
                "52 week price return daily": basicFinancials.get("metric").get("52WeekPriceReturnDaily"),
                "5 day price return daily": basicFinancials.get("metric").get("5DayPriceReturnDaily"),
                "month to date price return daily": basicFinancials.get("metric").get("monthToDatePriceReturnDaily"),
                "price relative to S&P500 26 week": basicFinancials.get("metric").get("priceRelativeToS&P50026Week"), 
                "price relative to S&P500 13 week": basicFinancials.get("metric").get("priceRelativeToS&P50013Week"), 
                "price relative to S&P500 4 week": basicFinancials.get("metric").get("priceRelativeToS&P5004Week"), 
                "price relative to S&P500 YTD": basicFinancials.get("metric").get("priceRelativeToS&P500Ytd"), 
            },
            "financials": {
                "cash_flow":{
                    "cash flow per share (annual)": basicFinancials.get("metric").get("cashFlowPerShareAnnual"),
                    "cash flow per share TTM": basicFinancials.get("metric").get("cashFlowPerShareTTM"),
                    "current dividend yield TTM": basicFinancials.get("metric").get("currentDividendYieldTTM"),
                },
                "income_statement":{
                    "net profit margin (annual)": basicFinancials.get("metric").get("netProfitMarginAnnual"),  
                    "gross margin TTM": basicFinancials.get("metric").get("grossMarginTTM"),  
                    "EPS growth TTM YOY": basicFinancials.get("metric").get("epsGrowthTTMYoy"),
                    "EPS growth 3Y": basicFinancials.get("metric").get("epsGrowth3Y"),
                    "EPS growth 5Y": basicFinancials.get("metric").get("epsGrowth5Y"),
                    "revenue growth 5Y": basicFinancials.get("metric").get("revenueGrowth5Y"),
                    "net margin growth 5Y": basicFinancials.get("metric").get("netMarginGrowth5Y"),
                    "net profit margin 5Y": basicFinancials.get("metric").get("netProfitMargin5"),
                    # 5 or 5Y ^^^^ ?
                    "net profit margin TTM": basicFinancials.get("metric").get("netProfitMarginTTM"),
                    "operating margin 5Y": basicFinancials.get("metric").get("operatingMargin5Y"),
                    "operating margin": basicFinancials.get("metric").get("operatingMarginAnnual"),
                    "operating margin TTM": basicFinancials.get("metric").get("operatingMarginTTM"),
                    "Return on Equity TTM": basicFinancials.get("metric").get("roeTTM"),
                    "Return on Interest": basicFinancials.get("metric").get("roiAnnual"),
                    "Return on Interest TTM": basicFinancials.get("metric").get("roiTTM"),
                },
                "balance_sheet":{
                    "total debt/total equity": basicFinancials.get("metric").get("totalDebt/totalEquityAnnual"),
                    "long term debt/equity": basicFinancials.get("metric").get("longTermDebt/equityAnnual"),  
                    "total debt/total equity (quarterly)": basicFinancials.get("metric").get("totalDebt/totalEquityQuarterly"),
                },
            }
            }
        
        
        return ret
