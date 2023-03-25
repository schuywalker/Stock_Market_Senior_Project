import {
    Box,
    FormGroup,
    Stack,
    Typography,
    styled,
    useTheme,
} from '@mui/material'
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
import {ThemeProvider} from '@emotion/react'

// TODO:
// more info button (noGutter?)
// collapsable table (with more info data)
// fontsize on table.. how to get it bigger without manually doing each table cell?
// gradient in stock card background
// font color on cards.. probably a theme thing.
// OH CRAP the space-between makes them go to the sides there are 2 per line.. gotta fix sizing..

const Watchlist = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext)

    const [stocks, setStocks] = useState<DisplayGroup[]>([])

    useEffect(() => {
        fetchWatchlistAssets()
    }, [])

    async function fetchWatchlistAssets() {
        try {
            // const response = await fetch(`http://127.0.0.1:8080/populateWatchlist?WL=${props.name}?userID=${userID}`, {}).then(
            const response = await fetch(
                `http://localhost:8080/populateWatchlist`,
                {}
            ).then((response) => {
                response.json().then((json) => {
                    setStocks(json)
                })
            })
        } catch (err) {
            console.log(err)
        }
    }

    const [gridView, setGridView] = useState<boolean>(true)

    return (
        <>
            <Box sx={{mx: '3%'}}>
                <Box display="flex" sx={{my: 2, flexWrap: 'nowrap'}}>
                    <Typography
                        sx={{
                            flexGrow: 1,
                            fontSize: theme.typography.h2,
                            color: colors.green[500],
                        }}
                    >
                        Watchlist Name Here
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
                            <Switch
                                defaultChecked
                                color="secondary"
                                onClick={() => setGridView(!gridView)}
                            />
                            {/* sx={{ color: colors.green[300] }} */}
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
                        display="flex"
                        flexWrap="wrap"
                        sx={{justifyContent: 'space-between'}}
                    >
                        {stocks.map((_stock: any, i: number) => (
                            <Stock
                                key={i}
                                name={_stock.name}
                                ticker={_stock.ticker}
                                price={_stock.price}
                                perChange={_stock.perChange}
                                earnings={_stock.earnings}
                                threeArticles={_stock.threeArticles} // not on the object
                                marketCap={_stock.marketCap}
                                peRatio={_stock.peRatio}
                                peRatioTTM={_stock.peRatioTTM}
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
                                            '&:last-child td, &:last-child th':
                                                {
                                                    fontSize:
                                                        theme.typography.h4,
                                                },
                                        }}
                                    >
                                        {/* I think we can map the keys of stocks? that way we only have to style one TableCell */}
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">
                                            Ticker
                                        </TableCell>
                                        <TableCell align="right">
                                            Price
                                        </TableCell>
                                        <TableCell align="right">
                                            Daily Change
                                        </TableCell>
                                        <TableCell align="right">
                                            Market Cap
                                        </TableCell>
                                        <TableCell align="right">
                                            peRatio
                                        </TableCell>
                                        <TableCell align="right">
                                            peRatioTTM
                                        </TableCell>
                                        <TableCell align="right">
                                            Dividend Yield
                                        </TableCell>
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
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {_stock['name']}
                                            </TableCell>
                                            <TableCell align="right">
                                                {_stock['ticker']}
                                            </TableCell>
                                            <TableCell align="right">
                                                {_stock['price']}
                                            </TableCell>
                                            <TableCell align="right">
                                                {_stock['perChange']}
                                            </TableCell>
                                            <TableCell align="right">
                                                {_stock['marketCap']}
                                            </TableCell>
                                            <TableCell align="right">
                                                {_stock['peRatio']}
                                            </TableCell>
                                            <TableCell align="right">
                                                {_stock['peRatioTTM']}
                                            </TableCell>
                                            <TableCell align="right">
                                                {_stock['dividendYield']}
                                            </TableCell>
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
