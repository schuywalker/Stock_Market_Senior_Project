from services.utils.utils import serviceUtils
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
                "market cap": serviceUtils.formatResponse(basicFinancials.get("metric").get("marketCapitalization"), '$'),
                "dividend yield": serviceUtils.formatResponse(basicFinancials.get("metric").get("dividendYieldIndicatedAnnual")),
                "dividend growth rate 5Y": serviceUtils.formatResponse(basicFinancials.get("metric").get("dividendGrowthRate5Y")),
            },
            "valuation": {
                "price/earnings FWD": serviceUtils.formatResponse( basicFinancials.get("metric").get("peExclExtraAnnual"),None),
                "price/earnings TTM": serviceUtils.formatResponse(basicFinancials.get("metric").get("peBasicExclExtraTTM"), None),

                "price/sales": serviceUtils.formatResponse(basicFinancials.get("metric").get("psAnnual"), None),
                "price/sales TTM": serviceUtils.formatResponse(basicFinancials.get("metric").get("psTTM"), None),

                "price/free cash-flow": serviceUtils.formatResponse(basicFinancials.get("metric").get("pfcfShareAnnual"), None),
                "price/free cash-flow TTM": serviceUtils.formatResponse(basicFinancials.get("metric").get("pfcfShareTTM"), None),

                "price/free cash-flow TTM": serviceUtils.formatResponse(basicFinancials.get("metric").get("pcfShareTTM"), None),

                "price/sales": serviceUtils.formatResponse(basicFinancials.get("metric").get("psAnnual"), None),
                "price/sales TTM": serviceUtils.formatResponse(basicFinancials.get("metric").get("psTTM"), None),

                "price/book": serviceUtils.formatResponse(basicFinancials.get("metric").get("ptbvAnnual"), None),
                "price/book": serviceUtils.formatResponse(basicFinancials.get("metric").get("pbAnnual"), None),

                "quick ratio": serviceUtils.formatResponse(basicFinancials.get("metric").get("quickRatioAnnual"), None),
            },

            "priceMetrics":{          
                "beta": serviceUtils.formatResponse(basicFinancials.get("metric").get("beta"), None),
                "price return YTD": serviceUtils.formatResponse( basicFinancials.get("metric").get("yearToDatePriceReturnDaily")),
                "10 day average trading volume": serviceUtils.formatResponse(basicFinancials.get("metric").get("10DayAverageTradingVolume")), # is it in $ amount???
                "52 week high": serviceUtils.formatResponse(basicFinancials.get("metric").get("52WeekHigh"), '$'),
                "52 week low": serviceUtils.formatResponse(basicFinancials.get("metric").get("52WeekLow"), '$'),
                "year to date price return": serviceUtils.formatResponse(basicFinancials.get("metric").get("yearToDatePriceReturnDaily")),
                "52 week price return": serviceUtils.formatResponse(basicFinancials.get("metric").get("52WeekPriceReturnDaily")),
                "5 day price return": serviceUtils.formatResponse(basicFinancials.get("metric").get("5DayPriceReturnDaily")),
                "month to date price return": serviceUtils.formatResponse(basicFinancials.get("metric").get("monthToDatePriceReturnDaily")),
                "price relative to S&P500 26 week": serviceUtils.formatResponse(basicFinancials.get("metric").get("priceRelativeToS&P50026Week")), 
                "price relative to S&P500 13 week": serviceUtils.formatResponse(basicFinancials.get("metric").get("priceRelativeToS&P50013Week")), 
                "price relative to S&P500 4 week": serviceUtils.formatResponse(basicFinancials.get("metric").get("priceRelativeToS&P5004Week")), 
                "price relative to S&P500 YTD": serviceUtils.formatResponse(basicFinancials.get("metric").get("priceRelativeToS&P500Ytd")), 
            },
            "financials": {
                "cash_flow":{
                    "cash flow per share (annual)": serviceUtils.formatResponse(basicFinancials.get("metric").get("cashFlowPerShareAnnual"), '$'),
                    "cash flow per share TTM": serviceUtils.formatResponse(basicFinancials.get("metric").get("cashFlowPerShareTTM"), '$'),
                    "current dividend yield TTM": serviceUtils.formatResponse(basicFinancials.get("metric").get("currentDividendYieldTTM")),
                },
                "income_statement":{
                    "net profit margin (annual)": serviceUtils.formatResponse(basicFinancials.get("metric").get("netProfitMarginAnnual")),  
                    "gross margin TTM": serviceUtils.formatResponse(basicFinancials.get("metric").get("grossMarginTTM")),  
                    "EPS growth TTM YOY": serviceUtils.formatResponse(basicFinancials.get("metric").get("epsGrowthTTMYoy")),
                    "EPS growth 3Y": serviceUtils.formatResponse(basicFinancials.get("metric").get("epsGrowth3Y")),
                    "EPS growth 5Y": serviceUtils.formatResponse(basicFinancials.get("metric").get("epsGrowth5Y")),
                    "revenue growth 5Y": serviceUtils.formatResponse(basicFinancials.get("metric").get("revenueGrowth5Y")),
                    "net margin growth 5Y": serviceUtils.formatResponse(basicFinancials.get("metric").get("netMarginGrowth5Y")),
                    "net profit margin 5Y": serviceUtils.formatResponse(basicFinancials.get("metric").get("netProfitMargin5")),
                    # 5 or 5Y ^^^^ ?
                    "net profit margin TTM": serviceUtils.formatResponse(basicFinancials.get("metric").get("netProfitMarginTTM")),
                    "operating margin 5Y": serviceUtils.formatResponse(basicFinancials.get("metric").get("operatingMargin5Y")),
                    "operating margin": serviceUtils.formatResponse(basicFinancials.get("metric").get("operatingMarginAnnual")),
                    "operating margin TTM": serviceUtils.formatResponse(basicFinancials.get("metric").get("operatingMarginTTM")),
                    "Return on Equity TTM": serviceUtils.formatResponse(basicFinancials.get("metric").get("roeTTM")),
                    "Return on Interest": serviceUtils.formatResponse(basicFinancials.get("metric").get("roiAnnual")),
                    "Return on Interest TTM": serviceUtils.formatResponse(basicFinancials.get("metric").get("roiTTM")),
                },
                "balance_sheet":{
                    "total debt/total equity": serviceUtils.formatResponse(basicFinancials.get("metric").get("totalDebt/totalEquityAnnual"), None),
                    "long term debt/equity": serviceUtils.formatResponse(basicFinancials.get("metric").get("longTermDebt/equityAnnual"), None),  
                    "total debt/total equity (quarterly)": serviceUtils.formatResponse(basicFinancials.get("metric").get("totalDebt/totalEquityQuarterly"), None),
                },
            }
            }
        
        
        return ret

