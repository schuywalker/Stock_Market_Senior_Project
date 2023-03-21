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
    const [username,setUsername] = React.useState("");
    const [password,setPass] = React.useState("");
    const [email,setEmail] = React.useState("");
    const [first,setFirst] = React.useState("");
    const [last,setLast] = React.useState("");
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
          <TextField id="username_field" label="Username" variant="outlined" onChange = {(event)=>setUsername(event.target.value)} />
          <TextField id="password_field" label="Password" variant="outlined" onChange = {(event)=>setPass(event.target.value)}/>
          <TextField id="email_field" label="Email" variant="outlined" onChange = {(event)=>setEmail(event.target.value)}/>
          <TextField id="firstname_field" label="First Name" variant="outlined" onChange = {(event)=>setFirst(event.target.value)}/>
          <TextField id="lastname_field" label="Last Name" variant="outlined" onChange = {(event)=>setLast(event.target.value)}/>
          <Button sx={{
            background: 'white',
            '&:hover':{
                background: 'grey',
                color:'white'
            }
          }} onClick={async()=>{
            let data = await userEndPointConnection.post("/createUser?username="+username+"&password="+password+"&email="+email+"&first="+first+"&last="+last)
            console.log(data);
          }}>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
}