import { Box, Button, Modal, TextField, Typography, styled } from '@mui/material';
import * as React from 'react';
import axios from "axios";
import Cookies from 'universal-cookie';
import {backendBaseAddress} from '../config/globalVariables'

const userEndPointConnection = axios.create({
    baseURL: backendBaseAddress
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

        export default function LoginForm(props: any){
        const [username, setUsername] = React.useState("");
        const [usernameValidated, setUsernameValidated] = React.useState(false);
        const [usernameTextFieldError, setUsernameTextFieldError] = React.useState(false);
        const [usernameHelperText, setUsernameHelperText] = React.useState("");

        const [password, setPassword] = React.useState("");
        const [passwordValidated, setPasswordValidated] = React.useState(false);
        const [passwordTextFieldError, setPasswordTextFieldError] = React.useState(false);
        const [passwordHelperText, setPasswordHelperText] = React.useState("");

        const canSubmit = () =>{
            if(usernameValidated && passwordValidated){
                return true;
            }
            else{
                if(usernameValidated){
                    setUsernameTextFieldError(false)
                    setUsernameHelperText("")
                }
                else{
                    setUsernameTextFieldError(true)
                    if(usernameHelperText == "")setUsernameHelperText("Invalid Username Entered")
                }
                if(passwordValidated){
                    setPasswordTextFieldError(false)
                    setPasswordHelperText("")
                }
                else{
                    setPasswordTextFieldError(true)
                    if(passwordHelperText == "")setPasswordHelperText("Invalid Password Entered")
                }
            }
            return false;
        }
        const validateUsername = (name:string)=>{
            if(name.length > 0){
                setUsernameValidated(true)
            }
            else{
                setUsernameValidated(false)
            }
        }
        const validatePassword = (password:string)=>{
            if(password.length > 0){
                setPasswordValidated(true)
            }
            else{
                setPasswordValidated(false)
            }
        }

        const resetFields = ()=>{
            setUsernameTextFieldError(false)
            setUsernameValidated(false)
            setUsernameHelperText("")

            setPasswordTextFieldError(false)
            setPasswordValidated(false)
            setPasswordHelperText("")
        }
    
    return(
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
                            Login
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
                    <CustomTextField InputProps={{sx: textfieldStyle}} InputLabelProps={{sx: textfieldStyle}} FormHelperTextProps={{sx: helperTextStyle}} id="username_field" label="Username" variant="outlined" required error = {usernameTextFieldError} helperText = {usernameHelperText}
                        onChange = {(event)=>{
                            validateUsername(event.target.value)
                            if(usernameValidated){
                            setUsername(event.target.value)}
                            }
                            } 
                            
                    />
                    <CustomTextField type='password' InputProps={{sx: textfieldStyle}} InputLabelProps={{sx: textfieldStyle}} FormHelperTextProps={{sx: helperTextStyle}} id="password_field" label="Password" variant="outlined" required 
                        error = {passwordTextFieldError} helperText = {passwordHelperText} onChange = {(event)=>{
                            validatePassword(event.target.value)
                            if(passwordValidated){
                            setPassword(event.target.value)}
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
                          await userEndPointConnection.post("/userLogin?username="+username+"&password="+password).then((response)=>{
                            setUsernameTextFieldError(false)
                            setUsernameHelperText("")
                            setPasswordTextFieldError(false)
                            setPasswordHelperText("")
                            
            
                            if(response.data['message']=='Username already exists'){
                              setUsernameValidated(false)
                              setUsernameTextFieldError(true)
                              setUsernameHelperText("Username already exists")
                            }
                            else{
                              //login
                              cookies.set("user",username,{ path: '/' })
                              cookies.set("password",password,{ path: '/' })
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
    )


}