import BasicInfoCategories from './BasicInfo'
import ChartDataCategories from './ChartData'
import {FinancialsCategories, Financials} from './Financials'
import PriceMetricsCategories from './PriceMetrics'
import ValuationCategories from './Valuation'

interface AssetScreenerCategories {
    chartData: ChartDataCategories
    basicInfo: BasicInfoCategories
    valuation: ValuationCategories
    priceMetrics: PriceMetricsCategories
    financialsCategories: FinancialsCategories
    financials: Financials
}

export default AssetScreenerCategories
