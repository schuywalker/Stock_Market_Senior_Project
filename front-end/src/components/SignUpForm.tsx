import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import * as React from 'react';
import axios from "axios";
import { async } from 'q';

const userEndPointConnection = axios.create({
    baseURL: "http://127.0.0.1:8080"
})

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 650,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


export default function SignUpForm(props: any){
    const [close,setClose] = React.useState(false);
    
  return (
    <div>
      <Modal
        sx = {style}
        open= {props.open}
        onClose={props.close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
            display:'flex',
            flexDirection: 'column',
            rowGap: 5
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create New Account
          </Typography>
          <TextField id="outlined-basic" label="Username" variant="outlined" />
          <TextField id="outlined-basic" label="Password" variant="outlined" />
          <TextField id="outlined-basic" label="Email" variant="outlined" />
          <TextField id="outlined-basic" label="First Name" variant="outlined" />
          <TextField id="outlined-basic" label="Last Name" variant="outlined" />
          <Button sx={{
            background: 'white',
            '&:hover':{
                background: 'grey',
                color:'white'
            }
          }} onClick={async()=>{
            let data = await userEndPointConnection.post("/user")
          }}>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
}