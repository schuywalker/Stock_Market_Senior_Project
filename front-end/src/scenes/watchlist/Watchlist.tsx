import {ThemeProvider} from '@emotion/react'
import {
    Box,
    Button,
    FormGroup,
    Modal,
    Stack,
    Typography,
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
import Cookies from 'universal-cookie'
import modalStyle from './WatchlistStyles'
import Searchbar from '../../components/UI/Searchbar'

// TODO:
// more info button (noGutter?)
// collapsable table (with more info data)
// fontsize on table.. how to get it bigger without manually doing each table cell?
// gradient in stock card background
// font color on cards.. probably a theme thing.
// OH CRAP the space-between makes them go to the sides there are 2 per line.. gotta fix sizing..

type WatchlistProps = {
    wl_name: string
    wl_ID: number
}

// const Watchlist = (props:WatchlistProps) => {
const Watchlist = (props: WatchlistProps) => {
    const cookies = new Cookies()
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext)

    const [stocks, setStocks] = useState<DisplayGroup[]>([])
    const [open1, setOpen1] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [open3, setOpen3] = useState(false)
    const [open4, setOpen4] = useState(false)
    const handleOpen1 = () => setOpen1(true)
    const handleOpen2 = () => setOpen2(true)
    const handleOpen3 = () => setOpen3(true)
    const handleOpen4 = () => setOpen4(true)
    const handleClose1 = () => setOpen1(false)
    const handleClose2 = () => setOpen2(false)
    const handleClose3 = () => setOpen3(false)
    const handleClose4 = () => setOpen4(false)

    useEffect(() => {
        fetchWatchlistAssets()
        console.log(props.wl_ID, 'wl_ID')
    }, [props.wl_ID])

    async function fetchWatchlistAssets() {
        try {
            const response = await fetch(
                `http://127.0.0.1:8080/populateWatchlist?user_ID=${cookies.get(
                    'user_id'
                )}&wl_ID=${props.wl_ID}`,
                {}
            ).then((response) => {
                response.json().then((json) => {
                    setStocks(json)
                })
            })
            cookies.get('user_id')
            console.log(cookies.get('user_id'))
        } catch (err) {
            console.log(err)
        }
    }

    const [gridView, setGridView] = useState<boolean>(true)

    // async function postAddTickers()

    return (
        <>
            <Box sx={{margin: 2}}>
                {/* CREATE WL */}
                <Button variant="contained" onClick={handleOpen1}>
                    Create Watchlist
                </Button>
                <Modal
                    open={open1}
                    onClose={handleClose1}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Create New Watchlist
                        </Typography>
                        <Typography id="modal-modal-description" sx={{mt: 2}}>
                            Enter the name of your new watchlist
                        </Typography>
                    </Box>
                </Modal>
                {/* ADD TICKERS */}
                <Button variant="contained" onClick={handleOpen2}>
                    Add Tickers
                </Button>
                <Modal open={open2} onClose={handleClose2}>
                    <Box sx={modalStyle}>
                        <Box sx={{m: 1}}>
                            <Typography
                                id="modal-title"
                                sx={{fontSize: theme.typography.h4}}
                            >
                                Add Tickers
                            </Typography>
                        </Box>
                        <Box sx={{display: 'flex'}}>
                            <Searchbar />
                            <Button
                                variant="contained"
                                sx={{
                                    color: colors.green[400],
                                    m: 1,
                                }}
                                // onClick={() => {postAddTickers(watchlistAdditions)}}
                                onClick={() => handleClose2()}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Modal>
                {/* DELETE TICKERS */}
                <Button variant="contained" onClick={handleOpen3}>
                    Delete Tickers
                </Button>
                <Modal
                    open={open3}
                    onClose={handleClose3}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Delete Tickers
                        </Typography>
                        <Typography id="modal-modal-description" sx={{mt: 2}}>
                            Enter tickers you want to remove from this watchlist
                        </Typography>
                    </Box>
                </Modal>
                {/* DELETE WL */}
                <Button variant="contained" onClick={handleOpen4}>
                    Delete Watchlist
                </Button>
                <Modal
                    open={open4}
                    onClose={handleClose4}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Delete Watchlist
                        </Typography>
                        <Typography id="modal-modal-description" sx={{mt: 2}}>
                            Remove this watchlist
                        </Typography>
                    </Box>
                </Modal>
            </Box>
            <Box sx={{mx: '3%'}}>
                <Box display="flex" sx={{my: 2}}>
                    <Typography
                        sx={{
                            flexGrow: 1,
                            fontSize: theme.typography.h2,
                            color: colors.green[500],
                        }}
                    >
                        {/* {props.name} */}
                        Watchlist Name
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
                            display: 'flex',
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
