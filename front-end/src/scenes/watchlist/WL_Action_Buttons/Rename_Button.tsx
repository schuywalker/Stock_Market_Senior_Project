import {useState} from 'react'
import {renameWL} from '../../../config/WebcallAPI'
import {Box, Button, Modal, TextField, Typography, colors} from '@mui/material'
import modalStyle from '../WatchlistStyles'

type RenameWLProps = {
    user_id: string
    wl_id: number
    wl_name: string
}

const RenameWLButton = (props: RenameWLProps) => {
    const [newName, setNewName] = useState('')

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    async function renameWatchlist() {
        handleClose()
        const response = await fetch(renameWL(props.wl_id, props.user_id, newName), {}).then((response) => {
            response.json().then((json) => {
                console.log(json)
            })
        })
    }

    return (
        <>
            {/* RENAME WL */}
            <Button variant="contained" onClick={handleOpen}>
                Rename Watchlist
            </Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={modalStyle}>
                    <Typography variant="h4" sx={{marginBottom: 1}}>
                        Rename Watchlist
                    </Typography>
                    <TextField id="outlined-basic" label="New Name" variant="outlined" onChange={(e) => setNewName(e.target.value)} />
                    <Typography fontSize="16px">Are you sure you want to rename watchlist "{props.wl_name}"?</Typography>
                    <Button sx={{backgroundColor: 'white', margin: 1}} onClick={() => renameWatchlist()}>
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
export default RenameWLButton
