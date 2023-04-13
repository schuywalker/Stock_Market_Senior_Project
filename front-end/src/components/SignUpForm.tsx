import { Box, Button, Modal, TextField, Typography, styled } from '@mui/material';
import * as React from 'react';
import axios from "axios";
import Cookies from 'universal-cookie';
import {backendBaseAddress} from '../config/globalVariables'

const userEndPointConnection = axios.create({
    baseURL: backendBaseAddress,
})

const style = {
    position: 'absolute' as 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    p: 4,
}
const textfieldStyle = {
  fontSize: 18,
}
const CustomTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'white',
  },
  '& label.Mui-error': {
    color: '#f43414',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused.Mui-error fieldset': {
      borderColor: '#f43414',
    },
  },
});
const helperTextStyle = {
  fontSize: 12
}

const cookies = new Cookies();

export default function SignUpForm(props: any){
    const [username,setUsername] = React.useState("");
    const [userValidated,setUserValidated] = React.useState(false);
    const [userTextFieldError, setUserTextFieldError] = React.useState(false);
    const [usernameHelperText,setUsernameHelperText] = React.useState("");

    const [password,setPass] = React.useState("");
    const [passwordValidated,setPasswordValidated] = React.useState(false);
    const [passwordTextFieldError, setPasswordTextFieldError] = React.useState(false);
    const [passwordHelperText,setPasswordHelperText] = React.useState("");

    const [email,setEmail] = React.useState("");
    const [emailValidated,setEmailValidated] = React.useState(false);
    const [emailTextFieldError, setEmailTextFieldError] = React.useState(false);
    const [emailHelperText,setEmailHelperText] = React.useState("");

    const [first,setFirst] = React.useState("");
    const [firstNameValidated,setFirstNameValidated] = React.useState(false);
    const [firstNameTextFieldError, setFirstNameTextFieldError] = React.useState(false);
    const [firstNameHelperText,setFirstNameHelperText] = React.useState("");

    const [last,setLast] = React.useState("");
    const [lastNameValidated,setLastNameValidated] = React.useState(false);
    const [lastNameTextFieldError, setLastNameTextFieldError] = React.useState(false);
    const [lastNameHelperText,setLastNameHelperText] = React.useState("");

    const canSubmit = () =>{
        if(userValidated && passwordValidated && emailValidated && firstNameValidated && lastNameValidated){
          return true;
        }
        else{
          if(userValidated){
            setUserTextFieldError(false)
            setUsernameHelperText("")
          }
          else{
            setUserTextFieldError(true)
            if(usernameHelperText ==="")setUsernameHelperText("Invalid Username Entered")
          }
          if(passwordValidated){
            setPasswordTextFieldError(false)
            setPasswordHelperText("")
          }
          else{
            setPasswordTextFieldError(true)
            setPasswordHelperText("Invalid Password Entered")
          }
          if(emailValidated){
            setEmailTextFieldError(false)
            setEmailHelperText("")
          }
          else{
            setEmailTextFieldError(true)
            setEmailHelperText("Invalid Email Entered")
          }
          if(firstNameValidated){
            setFirstNameTextFieldError(false)
            setFirstNameHelperText("")
          }
          else{
            setFirstNameTextFieldError(true)
            setFirstNameHelperText("Invalid Name")
          }
          if(lastNameValidated){
            setLastNameTextFieldError(false)
            setLastNameHelperText("")
          }
          else{
            setLastNameTextFieldError(true)
            setLastNameHelperText("Invalid Name")
          }
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
    const resetFields = ()=>{
      setUserTextFieldError(false);
      setUserValidated(false);
      setUsernameHelperText("")

      setPasswordTextFieldError(false);
      setPasswordValidated(false);
      setPasswordHelperText("")

      setEmailTextFieldError(false)
      setEmailHelperText("")
      setEmailValidated(false)

      setFirstNameHelperText("")
      setFirstNameTextFieldError(false)
      setFirstNameValidated(false)

      setLastNameHelperText("")
      setLastNameTextFieldError(false)
      setLastNameValidated(false)
    }
    
  return (
    <div>
      <Modal
        sx = {style}
        open= {props.open}
        onClose={props.close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop= {true}      >
        <Box sx={{
            display:'flex',
            flexDirection: 'column',
            rowGap : 4,
            background : 'black',
            paddingTop: 1,
            paddingLeft : 3,
            paddingRight : 3,
            paddingBottom : 3
           
        }}>
          
          <Box sx={{display: 'flex',flexDirection: 'row',justifyContent: 'space-between', alignItems:'center'}}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontSize: 18}}>
              Create New Account
            </Typography>
            <Button sx={{
              background: 'black',
              color: 'white',
              fontSize: 20,
              '&:hover':{
                  background: 'black',
                  color:'grey'
              },
              textAlign: 'right'
            }} 
            onClick={()=>{
              props.close()
              resetFields()
              }}>X</Button>
          </Box>
          
          <CustomTextField InputProps={{sx: textfieldStyle}} InputLabelProps={{sx: textfieldStyle}} FormHelperTextProps={{sx: helperTextStyle}} id="username_field" label="Username" variant="outlined" required error = {userTextFieldError} helperText = {usernameHelperText}
           onChange = {(event)=>{
            validateUserName(event.target.value)
            if(userValidated){
              setUsername(event.target.value)}
            }
            } 
            
            />
          <CustomTextField type='password' InputProps={{sx: textfieldStyle}} InputLabelProps={{sx: textfieldStyle}} FormHelperTextProps={{sx: helperTextStyle}} id="password_field" label="Password" variant="outlined" required 
          error = {passwordTextFieldError} helperText = {passwordHelperText} onChange = {(event)=>{
            validatePassword(event.target.value)
            if(passwordValidated){
              setPass(event.target.value)}
            }
            
            }/>
          <CustomTextField InputProps={{sx: textfieldStyle}} InputLabelProps={{sx: textfieldStyle}} FormHelperTextProps={{sx: helperTextStyle}} id="email_field" label="Email" variant="outlined" required 
         error = {emailTextFieldError} helperText = {emailHelperText} onChange = {(event)=>{
            validateEmail(event.target.value)
            if(emailValidated){
              setEmail(event.target.value)}
            }
            
            }/>
          <CustomTextField InputProps={{sx: textfieldStyle}} InputLabelProps={{sx: textfieldStyle}} FormHelperTextProps={{sx: helperTextStyle}} id="firstname_field" label="First Name" variant="outlined" required 
          error = {firstNameTextFieldError} helperText = {firstNameHelperText} onChange = {(event)=>{
            validateFirstName(event.target.value)
            if(firstNameValidated){
              setFirst(event.target.value)}
            }
            
            }/>
          <CustomTextField InputProps={{sx: textfieldStyle}} InputLabelProps={{sx: textfieldStyle}} FormHelperTextProps={{sx: helperTextStyle}} id="lastname_field" label="Last Name" variant="outlined" required 
          error = {lastNameTextFieldError} helperText = {lastNameHelperText} onChange = {(event)=>{
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
                setUserTextFieldError(false)
                setUsernameHelperText("")
                setPasswordTextFieldError(false)
                setPasswordHelperText("")
                setEmailTextFieldError(false)
                setEmailHelperText("")
                setFirstNameTextFieldError(false)
                setFirstNameHelperText("")
                setLastNameTextFieldError(false)
                setLastNameHelperText("")

                if(response.data['message']==='Username already exists'){
                  setUserValidated(false)
                  setUserTextFieldError(true)
                  setUsernameHelperText("Username already exists")
                }
                else{
                  //login
                  cookies.set("user",username,{ path: '/' })
                  cookies.set("password",password,{ path: '/' })
                  cookies.set("user_id",response.data[0]['user_id']);
                  props.close()
                  props.login()
                } 
              }).catch(e=>{
                console.log(e);
              })
            }
            
          }}>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
}
