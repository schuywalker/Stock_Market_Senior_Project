import {ThemeProvider} from '@emotion/react'
import {
    Box,
    Button,
    FormGroup,
    Modal,
    Stack,
    TextField,
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
import {
    addTickersToWL,
    createWL,
    delTickersFromWL,
    deleteWL,
    getWLAssets,
    renameWL,
} from '../../config/WebcallAPI'

// TODO:
// more info button (noGutter?)
// collapsable table (with more info data)
// fontsize on table.. how to get it bigger without manually doing each table cell?
// gradient in stock card background
// font color on cards.. probably a theme thing.
// OH CRAP the space-between makes them go to the sides there are 2 per line.. gotta fix sizing..

type WatchlistProps = {
    wl_name: string
    wl_id: number
    wlUpdated: any
}

// const Watchlist = (props:WatchlistProps) => {
const Watchlist = (props: WatchlistProps) => {
    const cookies = new Cookies()
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext)

    const [watchlistDel, setWatchlistDel] = useState([])
    const [stockList, setStockList] = useState<String[][]>([[]])

    const [stocks, setStocks] = useState<DisplayGroup[]>([])
    const [open3, setOpen3] = useState(false)
    const [open4, setOpen4] = useState(false)
    const [open5, setOpen5] = useState(false)
    const handleOpen3 = () => setOpen3(true)
    const handleOpen4 = () => setOpen4(true)
    const handleOpen5 = () => setOpen5(true)
    const handleClose3 = () => setOpen3(false)
    const handleClose4 = () => setOpen4(false)
    const handleClose5 = () => setOpen5(false)

    useEffect(() => {
        fetchWatchlistAssets()
        console.log(props.wl_id, 'wl_id')
    }, [props.wl_id])

    async function fetchWatchlistAssets() {
        try {
            const response = await fetch(
                getWLAssets(cookies.get('user_id'), props.wl_id),
                {}
            ).then((response) => {
                response.json().then((json) => {
                    console.log(json)
                    if (json.length > 0) {
                        setStocks(json)
                    } else setStocks([])
                })
            })
            cookies.get('user_id')
        } catch (err) {
            console.log(err)
        }
    }

    const [gridView, setGridView] = useState<boolean>(true)

    const [newName, setNewName] = useState('')

    async function delTickersFromWatchlist(wlDelTickers: String) {
        handleClose3()
        const response = await fetch(
            delTickersFromWL(wlDelTickers, props.wl_id, cookies.get('user_id')),
            {}
        ).then((response) => {
            response.json().then((json) => {
                console.log(json)
            })
        })
    }

    async function renameWatchlist(wlUpdated: any) {
        handleClose4()
        const response = await fetch(
            renameWL(props.wl_id, cookies.get('user_id'), newName),
            {}
        ).then((response) => {
            response.json().then((json) => {
                console.log(json)
                wlUpdated()
            })
        })
    }

    async function delWatchlist(wlUpdated: any) {
        handleClose5()
        const response = await fetch(
            deleteWL(props.wl_id, cookies.get('user_id')),
            {}
        ).then((response) => {
            response.json().then((json) => {
                console.log(json)
                wlUpdated()
            })
        })
    }

    return (
        <>
            <Box sx={{margin: 2}}>
                <>
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
                            <Box sx={{m: 1}}>
                                <Typography variant="h4" sx={{marginBottom: 1}}>
                                    Delete Tickers
                                </Typography>
                                <Typography fontSize="16px">
                                    Delete tickers from "{props.wl_name}"
                                </Typography>
                            </Box>
                            <Box sx={{display: 'flex'}}>
                                <Searchbar
                                    changeTickersInWL={setWatchlistDel}
                                    autoCompleteList={stockList}
                                />
                                <Button
                                    variant="contained"
                                    sx={{
                                        color: colors.green[400],
                                        m: 1,
                                    }}
                                    onClick={() =>
                                        delTickersFromWatchlist(
                                            watchlistDel
                                                .toString()
                                                .toUpperCase()
                                        )
                                    }
                                >
                                    Submit
                                </Button>
                            </Box>
                        </Box>
                    </Modal>
                    {/* RENAME WL */}
                    <Button variant="contained" onClick={handleOpen4}>
                        Rename Watchlist
                    </Button>
                    <Modal
                        open={open4}
                        onClose={handleClose4}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={modalStyle}>
                            <Typography variant="h4" sx={{marginBottom: 1}}>
                                Rename Watchlist
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                label="New Name"
                                variant="outlined"
                                onChange={(e) => setNewName(e.target.value)}
                            />
                            <Typography fontSize="16px">
                                Are you sure you want to rename watchlist "
                                {props.wl_name}"?
                            </Typography>
                            <Button
                                sx={{backgroundColor: 'white', margin: 1}}
                                onClick={() => renameWatchlist(props.wlUpdated)}
                            >
                                Yes
                            </Button>
                            <Button
                                sx={{backgroundColor: 'white', margin: 1}}
                                onClick={() => handleClose4()}
                            >
                                No
                            </Button>
                        </Box>
                    </Modal>
                    {/* DELETE WL */}
                    <Button variant="contained" onClick={handleOpen5}>
                        Delete Watchlist
                    </Button>
                    <Modal
                        open={open5}
                        onClose={handleClose5}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={modalStyle}>
                            <Typography variant="h4" sx={{marginBottom: 1}}>
                                Delete Watchlist
                            </Typography>
                            <Typography fontSize="16px">
                                Are you sure you want to delete watchlist "
                                {props.wl_name}"?
                            </Typography>
                            <Button
                                sx={{backgroundColor: 'white', margin: 1}}
                                onClick={() => delWatchlist(props.wlUpdated)}
                            >
                                Yes
                            </Button>
                            <Button
                                sx={{backgroundColor: 'white', margin: 1}}
                                onClick={() => handleClose5()}
                            >
                                No
                            </Button>
                        </Box>
                    </Modal>
                </>
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
