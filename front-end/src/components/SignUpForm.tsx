import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import * as React from 'react';
import axios from "axios";

const userEndPointConnection = axios.create({
    baseURL: 'http://127.0.0.1:8080',
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
}

export default function SignUpForm(props: any){
    const [username,setUsername] = React.useState("");
    const [userValidated,setUserValidated] = React.useState(false);
    const [password,setPass] = React.useState("");
    const [passwordValidated,setPasswordValidated] = React.useState(false);
    const [email,setEmail] = React.useState("");
    const [emailValidated,setEmailValidated] = React.useState(false);
    const [first,setFirst] = React.useState("");
    const [firstNameValidated,setFirstNameValidated] = React.useState(false);
    const [last,setLast] = React.useState("");
    const [lastNameValidated,setLastNameValidated] = React.useState(false);

    const canSubmit = () =>{
        if(userValidated && passwordValidated && emailValidated && firstNameValidated && lastNameValidated){
          return true;
        }
        return false;
    }
    const validateUserName = (name:string)=>{
      
      if(name.length > 0){
        setUserValidated(true);
      }
      else{
        setUserValidated(false);
      }
        
    }
    const validatePassword = (password:string)=>{
      
      if(password.length > 0){
        setPasswordValidated(true);
      }
      else{
        setPasswordValidated(false);
      }
        
    }
    const validateEmail = (email:string)=>{
      
      if(email.length > 0){
        setEmailValidated(true);
      }
      else{
        setEmailValidated(false);
      }
        
    }
    const validateFirstName = (firstName:string)=>{
      
      if(firstName.length > 0){
        setFirstNameValidated(true);
      }
      else{
        setFirstNameValidated(false);
      }
        
    }
    const validateLastName = (lastName:string)=>{
      
      if(lastName.length > 0){
        setLastNameValidated(true);
      }
      else{
        setLastNameValidated(false);
      }
        
    }
    
  return (
    <div>
      <Modal
        sx = {style}
        open= {props.open}
        onClose={props.close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"      >
        <Box sx={{
            display:'flex',
            flexDirection: 'column',
            rowGap: 5
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create New Account
          </Typography>
          <TextField id="username_field" label="Username" variant="outlined" onChange = {(event)=>{
            validateUserName(event.target.value)
            if(userValidated){
              setUsername(event.target.value)}}
              } />
          <TextField id="password_field" label="Password" variant="outlined" onChange = {(event)=>{
            validatePassword(event.target.value)
            if(passwordValidated){
              setPass(event.target.value)}
            }
            
            }/>
          <TextField id="email_field" label="Email" variant="outlined" onChange = {(event)=>{
            validateEmail(event.target.value)
            if(emailValidated){
              setEmail(event.target.value)}
            }
            
            }/>
          <TextField id="firstname_field" label="First Name" variant="outlined" onChange = {(event)=>{
            validateFirstName(event.target.value)
            if(firstNameValidated){
              setFirst(event.target.value)}
            }
            
            }/>
          <TextField id="lastname_field" label="Last Name" variant="outlined" onChange = {(event)=>{
            validateLastName(event.target.value)
            if(lastNameValidated){
              setLast(event.target.value)}
            }
            
            }/>
          <Button sx={{
            background: 'white',
            '&:hover':{
                background: 'grey',
                color:'white'
            }
          }}
           onClick={async()=>{
            if(canSubmit()){
              await userEndPointConnection.post("/createUser?username="+username+"&password="+password+"&email="+email+"&first="+first+"&last="+last).then((response)=>{
                props.close()
              }).catch(e=>{
                alert("Username already exists");
              })
            }
            else{
              alert("Some fields are incorrect");
            }
            
          }}>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
}
