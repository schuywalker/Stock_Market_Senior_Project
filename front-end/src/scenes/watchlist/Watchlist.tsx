import {ThemeProvider} from '@emotion/react'
import {Box, Button, FormGroup, Modal, Stack, TextField, Typography, useTheme} from '@mui/material'
import Paper from '@mui/material/Paper'
import Switch from '@mui/material/Switch'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import {useContext, useEffect, useState} from 'react'
import Stock from '../../components/stock/Stock'
import {ColorModeContext, tokens} from '../../theme'
import DisplayGroup from './DisplayGroup'
import Cookies from 'universal-cookie'
import modalStyle from './WatchlistStyles'
import Searchbar from '../../components/UI/Searchbar'
import {addTickersToWL, createWL, delTickersFromWL, deleteWL, getWLAssets, renameWL} from '../../config/WebcallAPI'

// TODO:
// more info button (noGutter?)
// collapsable table (with more info data)
// fontsize on table.. how to get it bigger without manually doing each table cell?
// gradient in stock card background
// font color on cards.. probably a theme thing.
// OH CRAP the space-between makes them go to the sides there are 2 per line.. gotta fix sizing..

type WatchlistProps = {
    wl_name: string
    set_wl_name: any
    wl_id: number
    wlUpdated: boolean
    wlDeleted: boolean
    setWLDeleted: any
    controller: AbortController
}

// const Watchlist = (props:WatchlistProps) => {
const Watchlist = (props: WatchlistProps) => {
    const cookies = new Cookies()
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext)

    const [stocks, setStocks] = useState<DisplayGroup[]>([])

    let fetchAssetsInProgress = false

    useEffect(() => {
        if(props.wlDeleted){
            setStocks([])
            props.set_wl_name("Select a Watchlist")
            props.setWLDeleted(false)
        } else {
            if (fetchAssetsInProgress === true) {
                props.controller.abort()
            }
            fetchWatchlistAssets()
        }
    }, [props.wl_id, props.wlUpdated])

    // potentially add atmoicity to fetchAssetsInProgress? still have problems with latency of differently sized watchlists
    async function fetchWatchlistAssets() {
        if (props.wl_id === 0) {
            setStocks([])
            return
        }
        try {
            fetchAssetsInProgress = true
            const response = await fetch(getWLAssets(cookies.get('user_id'), props.wl_id), {}).then((response) => {
                response.json().then((json) => {
                    if (json.length > 0) {
                        setStocks(json)
                    } else setStocks([])
                })
            })
            cookies.get('user_id')
        } catch (err) {
            console.log(err)
        } finally {
            fetchAssetsInProgress = false
        }
    }

    const [gridView, setGridView] = useState<boolean>(true)

    return (
        <>
            <Box sx={{mx: '3%'}}>
                <Box display="flex" sx={{my: 2}}>
                    <Typography
                        sx={{
                            flexGrow: 1,
                            fontSize: theme.typography.h2,
                            color: colors.green[500],
                        }}
                    >
                        {props.wl_name}
                    </Typography>
                    <FormGroup>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography
                                sx={{
                                    fontSize: theme.typography.h5,
                                }}
                            >
                                Table View
                            </Typography>
                            <Switch defaultChecked color="secondary" onClick={() => setGridView(!gridView)} />
                            <Typography
                                sx={{
                                    fontSize: theme.typography.h5,
                                }}
                            >
                                Grid View
                            </Typography>
                        </Stack>
                    </FormGroup>
                </Box>

                {gridView ? (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            flexWrap: 'wrap',
                            m: 1,
                            justifyContent: 'flex-start',
                        }}
                    >
                        {stocks.map((_stock: any, i: number) => (
                            <Stock
                                key={i}
                                name={_stock.name}
                                ticker={_stock.ticker}
                                price={_stock.price}
                                perChange={_stock.perChange}
                                earnings={_stock.earnings}
                                marketCap={_stock.marketCap}
                                forwardPE={_stock.forwardPE}
                                dividendYield={_stock.dividendYield}
                            />
                        ))}
                    </Box>
                ) : (
                    <ThemeProvider theme={theme}>
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow
                                        sx={{
                                            '&:last-child td, &:last-child th': {
                                                fontSize: theme.typography.h4,
                                            },
                                        }}
                                    >
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Ticker</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">Daily Change</TableCell>
                                        <TableCell align="right">Market Cap</TableCell>
                                        <TableCell align="right">peRatio</TableCell>
                                        <TableCell align="right">peRatioTTM</TableCell>
                                        <TableCell align="right">Dividend Yield</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {stocks.map((_stock) => (
                                        <TableRow
                                            key={_stock['ticker']}
                                            sx={{
                                                '& > *': {
                                                    borderBottom: 'unset',
                                                },
                                            }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {_stock['name']}
                                            </TableCell>
                                            <TableCell align="right">{_stock['ticker']}</TableCell>
                                            <TableCell align="right">{_stock['price']}</TableCell>
                                            <TableCell align="right">{_stock['perChange']}</TableCell>
                                            <TableCell align="right">{_stock['marketCap']}</TableCell>
                                            <TableCell align="right">{_stock['forwardPE']}</TableCell>
                                            <TableCell align="right">{_stock['dividendYield']}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </ThemeProvider>
                )}
            </Box>
        </>
    )
}

export default Watchlist
