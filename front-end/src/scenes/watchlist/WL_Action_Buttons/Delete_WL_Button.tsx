import {useState} from 'react'
import {deleteWL} from '../../../config/WebcallAPI'
import {Box, Button, Modal, Typography, colors} from '@mui/material'
import modalStyle from '../WatchlistStyles'

type DeleteWLButtonProps = {
    user_id: string
    wl_id: number
    wl_name: string
}

const DeleteWLButton = (props: DeleteWLButtonProps) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    async function delWatchlist() {
        handleClose()
        const response = await fetch(deleteWL(props.wl_id, props.user_id), {}).then((response) => {
            response.json().then((json) => {
                console.log(json)
            })
        })
    }

    return (
        <>
            {/* DELETE WL */}
            <Button variant="contained" onClick={handleOpen}>
                Delete Watchlist
            </Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={modalStyle}>
                    <Typography variant="h4" sx={{marginBottom: 1}}>
                        Delete Watchlist
                    </Typography>
                    <Typography fontSize="16px">Are you sure you want to delete watchlist "{props.wl_name}"?</Typography>
                    <Button sx={{backgroundColor: 'white', margin: 1}} onClick={() => delWatchlist()}>
                        Yes
                    </Button>
                    <Button sx={{backgroundColor: 'white', margin: 1}} onClick={() => handleClose()}>
                        No
                    </Button>
                </Box>
            </Modal>
        </>
    )
}
export default DeleteWLButton
