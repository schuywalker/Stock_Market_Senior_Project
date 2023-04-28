import BasicInfoCategories from './BasicInfo'
import ChartDataCategories from './ChartData'
import FinancialsCategories from './Financials'
import PriceMetricsCategories from './PriceMetrics'
import ValuationCategories from './Valuation'

interface AssetScreenerCategories {
    chartData: ChartDataCategories
    basicInfo: BasicInfoCategories
    valuation: ValuationCategories
    priceMetrics: PriceMetricsCategories
    financials: FinancialsCategories
}

export default AssetScreenerCategories
