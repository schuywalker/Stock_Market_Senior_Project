import {useState} from 'react'
import {createWL, getControllerSignal} from '../../../config/WebcallAPI'
import {Box, Button, Modal, TextField, Typography} from '@mui/material'
import modalStyle from '../WatchlistStyles'

type CreateWLButtonProps = {
    user_id: string
    wlUpdatedFunction: any
    wlUpdated: boolean
}

const CreateWLButton = (props: CreateWLButtonProps) => {
    const [newWLName, setNewWLName] = useState('')

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    async function createWatchlist() {
        handleClose()
        const signal = getControllerSignal()
        const response = await fetch(createWL(props.user_id, newWLName), {signal}).then((response) => {
            response.json().then((json) => {
                console.log(json)
                props.wlUpdatedFunction(!props.wlUpdated)
            })
        }).catch((err)=>{
            
        })
    }

    return (
        <>
            {/* CREATE WL */}
            <Button variant="contained" onClick={handleOpen}>
                Create Watchlist
            </Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h4" component="h2" sx={{marginBottom: 1}}>
                        Create New Watchlist
                    </Typography>
                    <TextField id="outlined-basic" label="New Watchlist Name" variant="outlined" onChange={(e) => setNewWLName(e.target.value)} />
                    <Button sx={{backgroundColor: 'white', margin: 1}} onClick={() => createWatchlist()}>
                        Submit
                    </Button>
                </Box>
            </Modal>
        </>
    )
}
export default CreateWLButton
