import SearchIcon from '@mui/icons-material/Search'
import {Box, Button, IconButton, Paper, Tab, Tabs, TextField, Typography, useTheme} from '@mui/material'
import {ReactNode, useEffect, useState} from 'react'
import {tokens} from '../../theme'
import AssetScreenerCategories from './AssetScreenerInterfaces/AssetScreenerCategories'

import BasicInfo from './tabContents/BasicInfo'
import PriceMetrics from './tabContents/PriceMetrics'
import Valuation from './tabContents/Valuation'
import Financials from './tabContents/Financials'

// https://stackoverflow.com/questions/22885995/how-do-i-initialize-a-typescript-object-with-a-json-object

const AssetScreener = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const [currentTicker, setCurrentTicker] = useState<string | null>(null)

    // TABS (chart doesnt necessarily need to be in Tabs - design decision)
    const [chartData, setChartData] = useState('')
    const [basicInfo, setBasicInfo] = useState<null | [string, any][]>(null)
    const [valuation, setValuation] = useState<null | [string, any][]>(null)
    const [priceMetrics, setPriceMetrics] = useState<null | [string, any][]>(null)
    const [incomeStatement, setIncomeStatement] = useState<null | [string, any][]>(null)
    const [balanceSheet, setBalanceSheet] = useState<null | [string, any][]>(null)
    const [cashFlow, setCashFlow] = useState<null | [string, any][]>(null)

    let obj: AssetScreenerCategories

    const handleNewSearch = async (ticker: string | null | undefined) => {
        if (!ticker) {
            console.log('null ticker')
            return
        }
        try {
            //use webcall API
            const response = await fetch(`http://127.0.0.1:8080/assetScreener?ticker=${ticker}`)
                .then((response) => response.json())
                .then((jsonResponse) => {
                    obj = jsonResponse
                    // setChartData(Object.entries(obj.chartData))
                    setBasicInfo(Object.entries(obj.basicInfo))
                    setValuation(Object.entries(obj.valuation))
                    setPriceMetrics(Object.entries(obj.priceMetrics))
                    setBalanceSheet(Object.entries(obj.financials.balance_sheet))
                    setIncomeStatement(Object.entries(obj.financials.income_statement))
                    setCashFlow(Object.entries(obj.financials.cash_flow))
                })
        } catch (err) {
            console.log(err)
        }
    }

    /*
Todo:
takes ticker as prop
same stock search bug
revise modal on stock.
size/ color of tabs
formatting (override typography with props for % or $, rounding, etc?)

autocomplete
slide: expand and collapse when search button clicked

chart (separate branch)


*backend* 
EXCHANGE NO NDAQ??? handle stocks that dont return because of exchange API error (e.g. snap, lyft)
^^ one off - correct BRK.B to BRKB / BRK.A BRKA
categorize data (DO FIRST)
*/

    const [currentTab, setCurrentTab] = useState('one')

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue)
    }

    return (
        <>
            <Box sx={{border: 0, p: 1, flexGrow: 1}}>
                <Box sx={{}}>
                    <Box sx={{display: 'flex', flexGrow: 1}}></Box>
                    <Box sx={{display: 'flex', flexShrink: 1}}>
                        <Paper
                            sx={{
                                m: 1,
                                p: '2px 4px',
                                display: 'flex',
                                alignItems: 'center',
                                bgcolor: colors.primary[400],
                            }}
                        >
                            <IconButton type="button" sx={{p: '10px', fontSize: 20}} aria-label="search">
                                <SearchIcon />
                            </IconButton>

                            <TextField
                                id="standard-search"
                                label="search ticker"
                                type="search"
                                variant="standard"
                                sx={{flexGrow: 1, m: 0.5}}
                                inputProps={{style: {fontSize: theme.typography.h5.fontSize}}}
                                InputLabelProps={{
                                    style: {fontSize: theme.typography.h6.fontSize},
                                }}
                                onChange={(e) => setCurrentTicker(e.target.value)}
                            />
                            <Button sx={{backgroundColor: colors.green[300], margin: 1, ml: 3}} onClick={() => handleNewSearch(currentTicker)}>
                                Search
                            </Button>
                        </Paper>
                    </Box>
                </Box>
                <Tabs value={currentTab} onChange={handleChange} textColor="secondary" indicatorColor="secondary" aria-label="secondary tabs example">
                    <Tab value="one" label="chart" disabled={currentTicker == null} />
                    <Tab value="two" label="basic info" disabled={currentTicker == null} />
                    <Tab value="three" label="valuation" disabled={currentTicker == null} />
                    <Tab value="four" label="price metrics" disabled={currentTicker == null} />
                    <Tab value="five" label="financials" disabled={currentTicker == null} />
                </Tabs>
                <Box sx={{m: 2}}>{basicInfo && currentTab == 'two' ? <BasicInfo contents={basicInfo} /> : <></>}</Box>
                <Box sx={{m: 2}}>{valuation && currentTab == 'three' ? <Valuation contents={valuation} /> : <></>}</Box>
                <Box sx={{m: 2}}>{priceMetrics && currentTab == 'four' ? <PriceMetrics contents={priceMetrics} /> : <></>}</Box>
                <Box sx={{m: 2}}>
                    {incomeStatement && balanceSheet && cashFlow && currentTab == 'five' ? (
                        <Financials balanceSheet={balanceSheet} incomeStatement={incomeStatement} cashFlow={cashFlow} />
                    ) : (
                        <></>
                    )}
                </Box>
            </Box>
        </>
    )
}
export default AssetScreener
