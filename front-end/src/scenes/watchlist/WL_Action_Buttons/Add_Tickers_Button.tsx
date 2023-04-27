import {useState} from 'react'
import {addTickersToWL} from '../../../config/WebcallAPI'
import {Box, Button, Modal, Typography, colors} from '@mui/material'
import modalStyle from '../WatchlistStyles'
import Searchbar from '../stock/Searchbar'

type AddTickersButtonProps = {
    user_id: string
    wl_id: number
    wl_name: string
}

const AddTickersButton = (props: AddTickersButtonProps) => {
    const [watchlistAdd, setWatchlistAdd] = useState([])

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    async function addTickers(wlAddTickers: string) {
        handleClose()
        const response = await fetch(addTickersToWL(wlAddTickers, props.wl_id, props.user_id), {}).then((response) => {
            response.json().then((json) => {
                console.log(json)
            })
        })
    }

    return (
        <>
            {/* ADD TICKERS */}
            <Button variant="contained" onClick={handleOpen}>
                Add Tickers
            </Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Box sx={{m: 1}}>
                        <Typography variant="h4" sx={{marginBottom: 1}}>
                            Add Tickers
                        </Typography>
                        <Typography fontSize="16px">Add tickers to "{props.wl_name}"</Typography>
                    </Box>
                    <Box sx={{display: 'flex'}}>
                        <Searchbar changeTickersInWL={setWatchlistAdd} />
                        <Button
                            variant="contained"
                            sx={{
                                color: colors.green[400],
                                m: 1,
                            }}
                            onClick={() => addTickers(watchlistAdd.toString().toUpperCase())}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}
export default AddTickersButton
