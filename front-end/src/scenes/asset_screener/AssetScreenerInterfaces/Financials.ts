type FinancialsCategories = 'cash_flow' | 'income_statement' | 'balance_sheet'

interface income_statement {
    netProfitMarginAnnual: number
    grossMarginTTM: number
    epsGrowthTTMYoy: number
    epsGrowth3Y: number
    epsGrowth5Y: number
    revenueGrowth5Y: number

    netMarginGrowth5Y: number
    netProfitMargin5: number

    netProfitMarginTTM: number
    operatingMargin5Y: number
    operatingMarginAnnual: number
    operatingMarginTTM: number

    roeTTM: number
    roiAnnual: number
    roiTTM: number
}

interface cash_flow {
    cashFlowPerShareAnnual: number
    cashFlowPerShareTTM: number
    currentDividendYieldTTM: number
}

interface balance_sheet {
    'totalDebt/totalEquityAnnual': number
    'longTermDebt/equityAnnual': number
    'totalDebt/totalEquityQuarterly': number
}

export type {balance_sheet, cash_flow, income_statement}
export type {FinancialsCategories}
