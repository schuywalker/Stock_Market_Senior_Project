import BasicInfoCategories from './BasicInfo'
import ChartDataCategories from './ChartData'
import {FinancialsCategories, balance_sheet, cash_flow, income_statement} from './Financials'
import PriceMetricsCategories from './PriceMetrics'
import ValuationCategories from './Valuation'

interface AssetScreenerCategories {
    chartData: ChartDataCategories
    basicInfo: BasicInfoCategories
    valuation: ValuationCategories
    priceMetrics: PriceMetricsCategories
    financialsCategories: FinancialsCategories
    financials: {
        balance_sheet: balance_sheet
        cash_flow: cash_flow
        income_statement: income_statement
    }
}

export default AssetScreenerCategories
