import {useState} from 'react'
import {delTickersFromWL, getControllerSignal} from '../../../config/WebcallAPI'
import {Box, Button, Modal, Typography, colors} from '@mui/material'
import modalStyle from '../WatchlistStyles'
import Searchbar from '../stock/Searchbar'

type DeleteTickersButtonProps = {
    user_id: string
    wl_id: number
    wl_name: string
    wlUpdatedFunction: any
    wlUpdated: any
}

const DeleteTickersButton = (props: DeleteTickersButtonProps) => {
    const [watchlistDel, setWatchlistDel] = useState([])
    const [stockList, setStockList] = useState<String[][]>([[]])

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    async function delTickersFromWatchlist(wlDelTickers: string) {
        handleClose()
        const signal = getControllerSignal()
        const response = await fetch(delTickersFromWL(wlDelTickers, props.wl_id, props.user_id), {signal}).then((response) => {
            response.json().then((json) => {
                console.log(json)
                props.wlUpdatedFunction(!props.wlUpdated)
            })
        }).catch((err)=>{
            
        })
    }

    return (
        <>
            {/* DELETE TICKERS */}
            <Button variant="contained" onClick={handleOpen}>
                Delete Tickers
            </Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={modalStyle}>
                    <Box sx={{m: 1}}>
                        <Typography variant="h4" sx={{marginBottom: 1}}>
                            Delete Tickers
                        </Typography>
                        <Typography fontSize="16px">Delete tickers from "{props.wl_name}"</Typography>
                    </Box>
                    <Box sx={{display: 'flex'}}>
                        <Searchbar changeTickersInWL={setWatchlistDel} autoCompleteList={stockList} />
                        <Button
                            variant="contained"
                            sx={{
                                color: colors.green[400],
                                m: 1,
                            }}
                            onClick={() => delTickersFromWatchlist(watchlistDel.toString().toUpperCase())}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}
export default DeleteTickersButton
