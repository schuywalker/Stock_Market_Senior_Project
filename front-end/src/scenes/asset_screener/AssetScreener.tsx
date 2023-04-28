import SearchIcon from '@mui/icons-material/Search'
import {Box, Button, IconButton, Paper, Tab, Tabs, TextField, Typography, useTheme} from '@mui/material'
import {useEffect, useState} from 'react'
import {tokens} from '../../theme'
import AssetScreenerCategories from './AssetScreenerInterfaces/AssetScreenerCategories'

// https://stackoverflow.com/questions/22885995/how-do-i-initialize-a-typescript-object-with-a-json-object

const AssetScreener = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const [financialInfoJson, setFinancialInfoJson] = useState<null | [string, unknown][]>(null)
    const [currentTicker, setCurrentTicker] = useState<string | null>(null)
    const [chartData, setChartData] = useState('')
    const [basicInfo, setBasicInfo] = useState<null | [string, any][]>(null)
    const [valuation, setValuation] = useState<null | [string, any][]>(null)
    const [priceMetrics, setPriceMetrics] = useState<null | [string, any][]>(null)
    const [financials, setFinancials] = useState<null | [string, any][]>(null)

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
                    setFinancials(Object.entries(obj.financials))
                })
        } catch (err) {
            console.log(err)
        }
    }

    /*
Todo:
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
                    <Tab value="one" label="chartData" disabled={currentTicker == null} />
                    <Tab value="two" label="basicInfo" disabled={currentTicker == null} />
                    <Tab value="three" label="valuation" disabled={currentTicker == null} />
                    <Tab value="four" label="priceMetrics" disabled={currentTicker == null} />
                    <Tab value="five" label="financials" disabled={currentTicker == null} />
                </Tabs>
                {/* <Box sx={{m: 2}}>
                    {chartData && currentTab == 'one' ? (
                        chartData.map((item: [string, unknown]) => {
                            return (
                                <Box sx={{display: 'flex'}}>
                                    <Box sx={{flexGrow: 1}}>
                                        <Typography sx={{fontSize: theme.typography.h5, mr: 3}}>{item[0]}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{fontSize: theme.typography.h5}}>{item[1] as number}</Typography>
                                    </Box>
                                </Box>
                            )
                        })
                    ) : (
                        <></>
                    )}
                </Box> */}
                <Box sx={{m: 2}}>
                    {basicInfo && currentTab == 'two' ? (
                        basicInfo.map((item: [string, unknown]) => {
                            return (
                                <Box sx={{display: 'flex'}}>
                                    <Box sx={{flexGrow: 1}}>
                                        <Typography sx={{fontSize: theme.typography.h5, mr: 3}}>{item[0]}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{fontSize: theme.typography.h5}}>{item[1] ? (item[1] as number) : 'N/A'}</Typography>
                                    </Box>
                                </Box>
                            )
                        })
                    ) : (
                        <></>
                    )}
                </Box>
                <Box sx={{m: 2}}>
                    {valuation && currentTab == 'three' ? (
                        valuation.map((item: [string, unknown]) => {
                            return (
                                <Box sx={{display: 'flex'}}>
                                    <Box sx={{flexGrow: 1}}>
                                        <Typography sx={{fontSize: theme.typography.h5, mr: 3}}>{item[0]}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{fontSize: theme.typography.h5}}>{item[1] ? (item[1] as number) : 'N/A'}</Typography>
                                    </Box>
                                </Box>
                            )
                        })
                    ) : (
                        <></>
                    )}
                </Box>
                <Box sx={{m: 2}}>
                    {priceMetrics && currentTab == 'four' ? (
                        priceMetrics.map((item: [string, unknown]) => {
                            return (
                                <Box sx={{display: 'flex'}}>
                                    <Box sx={{flexGrow: 1}}>
                                        <Typography sx={{fontSize: theme.typography.h5, mr: 3}}>{item[0]}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{fontSize: theme.typography.h5}}>{item[1] ? (item[1] as number) : 'N/A'}</Typography>
                                    </Box>
                                </Box>
                            )
                        })
                    ) : (
                        <></>
                    )}
                </Box>
                <Box sx={{m: 2}}>
                    {financials && currentTab == 'five' ? (
                        financials.map((item: [string, unknown]) => {
                            return (
                                <Box sx={{display: 'flex'}}>
                                    <Box sx={{flexGrow: 1}}>
                                        <Typography sx={{fontSize: theme.typography.h5, mr: 3}}>{item[0]}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{fontSize: theme.typography.h5}}>{item[1] ? (item[1] as number) : 'N/A'}</Typography>
                                    </Box>
                                </Box>
                            )
                        })
                    ) : (
                        <></>
                    )}
                </Box>
            </Box>
        </>
    )
}
export default AssetScreener
