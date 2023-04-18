import * as React from 'react';
import axios from "axios";
import Cookies from 'universal-cookie';
import { Box, Button, Link, Modal, TextField, Typography, styled } from '@mui/material';
import {getUserData,alterUsername,alterUserFirstName,alterUserLastName,alterUserEmail, isCorrectPassword, alterPassword} from '../config/WebcallAPI'

const cookies = new Cookies();

/*
    Styled Modal so the backdrop covers the whole screen and is slightly transparent
*/
const CustomModal = styled(Modal)({
    '.MuiBackdrop-root': {
      display: 'fixed',
      top: '0%',
      height: "100vh",
      width: "100vw",
      backgroundColor: 'rgba(10,10,10,0.5)'//Dark backdrop with 50% opacity
    }
  });
  /*
  Styled text field so the outline and text of the text field is visible when edited
  */
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
  
/*
    FieldProps:
            fieldName: The static name the field should display

            endpoint: An array containing a function to get the endpoint which updates the user's information and 
                      an indexed array containing parameters that are needed for the function. 

            passwordEndpoint: Optional array containing a function to get the endpoint which checks the user's original password and 
                              an indexed array containing parameters that are needed for the function.
            
            password: Optional boolean to use a ModalPasswordField instead of a ModalField. passwordEndpoint is required

            displayValue: Optional value that is dynamically displayed

            displayedValueFunction: Optional state function to change the displayedValue

            validationFunction: The stateless function to validate if the new input is correct

            errorMessage: Optional string to display as an error message if the field is wrong. Defaults
                          to invalid if nothing is provided
*/
type FieldProps={
    fieldName: string
    endpoint:[{(val:{[key:string]:string}):string;},{[key:string]:string}] 
    passwordEndpoint?:( [{(val:{[key:string]:string}):string;},{[key:string]:string}] | undefined ) //union type
    displayValue?: string
    displayedValueFunction?: (value:string)=>void
    validationFunction: (value:string)=>boolean
    errorMessage?: string 
    password?:boolean
}
/*
        ModalFieldProps:
            open: Same as the MUI open prop, governs if the modal is displayed

            onClose: State function that hides the modal

            displayValue: The value displayed on the AccountManagement field and in the Modal

            displayedValueFunction: The state function to change the displayedValue

            validationFunction: The stateless function to validate if the new input is correct 

            endpoint: An array containing a function to get the endpoint which updates the user's information and 
                      an indexed array containing parameters that are needed for the function. 

            errorMessage: String to display as an error message if the field is wrong. 
*/
type ModalFieldProps={
    open: boolean
    onClose: VoidFunction
    displayValue: string
    displayedValueFunction: (value:string)=>void
    validationFunction: (value:string)=>boolean
    endpoint:[{(val:{[key:string]:string}):string;},{[key:string]:string}] 
    errorMessage: string
}
/*
        ModalPasswordFieldProps:
            open: Same as the MUI open prop, governs if the modal is displayed

            onClose: State function that hides the modal

            validationFunction: The stateless function to validate if the new input is correct 

            endpoint: An array containing a function to get the endpoint which updates the user's password and 
                      an indexed array containing parameters that are needed for the function. 

            passwordEndpoint: An array containing a function to get the endpoint which checks the user's original password and 
                              an indexed array containing parameters that are needed for the function.
*/
type ModalPasswordFieldProps={
    open: boolean
    onClose: VoidFunction
    endpoint:[{(val:{[key:string]:string}):string;},{[key:string]:string}] 
    passwordEndpoint: [{(val:{[key:string]:string}):string;},{[key:string]:string}]|undefined
    validationFunction: (value:string)=>boolean
}
/*
    Modal for changing a user's password
*/

function passwordError(){
    throw new Error("passwordEndpoint is undefined!");
}

const ModalPasswordField: React.FunctionComponent<ModalPasswordFieldProps>=({
    open,onClose,endpoint,validationFunction,passwordEndpoint
})=>{
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left:'50%',
        pt: 2,
        
    };
    const[oldErrorText,setOldErrorText] = React.useState("")
    const[showOldError,setShowOldError]= React.useState(false)

    const[newErrorText,setNewErrorText] = React.useState("")
    const[showNewError,setShowNewError]= React.useState(false)
    const checkOldPasswordFunction = passwordEndpoint?.[0]as (val:{[key:string]:string})=>string??passwordError();//? means only execute if not undefined/null, ?? causes passwordError() to run if is undefined/null
    let endpointFunction = endpoint[0] as (val:{[key:string]:string})=>string
    let parameters:{[key:string]:string} =endpoint[1] as {[key:string]:string} 
    var originalPassword:string = "";
    var newPassword:string = "";
    React.useEffect(()=>{
        if(open){
            setOldErrorText("")
            setNewErrorText("")
            setShowOldError(false)
            setShowNewError(false)
        }
    },[open])
    return(
        <React.Fragment>
            <CustomModal
            sx = {style}
            open= {open}
            onClose={onClose}
            >
                    <Box sx={{display:'flex', flexDirection:'column', background:'black', width:'fit-content',padding:1, rowGap:1}}>
                        <CustomTextField type='password' required error = {showOldError} helperText={oldErrorText} InputProps={{
                                  style: {fontSize:16}
                            }} FormHelperTextProps ={{style:{fontSize:10}}} label="Original Password" onChange={(event)=>{
                                originalPassword = event.target.value;
                        }}/>
                        <CustomTextField type='password' required error = {showNewError} helperText={newErrorText} InputProps={{
                                  style: {fontSize:16}
                            }} FormHelperTextProps ={{style:{fontSize:10}}} label="New Password" onChange={(event)=>{
                                newPassword = event.target.value;
                        }}/>
                        <Button sx={{height: "100%",backgroundColor:"white", margin:1,marginTop:2,'&:hover': {
                                    background: 'grey', color: 'white',
                                    },}}
                        onClick={async ()=>{
                            if(validationFunction(originalPassword)&&validationFunction(newPassword)){
                                setOldErrorText("")
                                setNewErrorText("")
                                setShowOldError(false)
                                setShowNewError(false)
                                parameters['originalPassword'] = originalPassword
                                await axios.get(checkOldPasswordFunction(parameters)).then(async()=>{
                                    parameters['newPassword'] = newPassword
                                    await axios.post(endpointFunction(parameters)).then((response)=>{
                                        setOldErrorText("")
                                        setNewErrorText("")
                                        setShowOldError(false)
                                        setShowNewError(false)
                                        onClose()
                                        
                                    }).catch((error)=>{
                                        console.log(error)
                                    })

                                }).catch((error)=>{
                                    if(error.response.request.status ===400){
                                        setShowOldError(true)
                                        setOldErrorText(error.response.data['message'])
                                    }
                                    else console.log(error)
                                })
                                
                            }
                            else{
                                if(!validationFunction(originalPassword)){
                                    setOldErrorText("Invalid Password")
                                    setShowOldError(true)
                                }
                                else{
                                    setOldErrorText("")
                                    setShowOldError(false)
                                }
                                if(!validationFunction(newPassword)){
                                    setNewErrorText("Invalid Password")
                                    setShowNewError(true)
                                }
                                else{
                                    setNewErrorText("")
                                    setShowNewError(false) 
                                }  
                            }   
                        }}>Submit</Button>
                    </Box>

            </CustomModal>
        </React.Fragment>
    )
}

/*
    Component to display a modal dialog for a user to change a non-password field
*/

const ModalField: React.FunctionComponent<ModalFieldProps>=({
    open,onClose,displayValue,displayedValueFunction,endpoint,validationFunction,errorMessage
})=>{
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left:'40%',
        pt: 2,
        
    };
    const[errorText,setErrorText] = React.useState("")
    const[showError,setShowError]= React.useState(false)
    var newValue:string = displayValue;
    let endpointFunction = endpoint[0] as (val:{[key:string]:string})=>string
    let parameters:{[key:string]:string} =endpoint[1] as {[key:string]:string}  
    React.useEffect(()=>{
        if(open){
            setErrorText("")
            setShowError(false)
        }
    },[open])
    return(
        <React.Fragment>
            <CustomModal
            sx = {style}
            open= {open}
            onClose={onClose}
            >
                    <Box sx={{display:'flex', flexdirection:'row', background:'black', width:'fit-content',padding:1}}>
                        <TextField error = {showError} helperText={errorText} InputProps={{
                                style: {fontSize:16}
                            }} FormHelperTextProps ={{style:{fontSize:10}}} defaultValue={displayValue} onChange={(event)=>{
                            newValue = event.target.value;
                        }}/>
                        <Button sx={{height: "100%",backgroundColor:"white", margin:1,marginTop:2,'&:hover': {
                                    background: 'grey', color: 'white',
                                    },}}
                        onClick={async ()=>{
                            if(validationFunction(newValue)){
                                parameters['newValue'] = newValue
                                await axios.post(endpointFunction(parameters)).then((response)=>{
                                    setShowError(false)
                                    setErrorText("")
                                    displayedValueFunction(newValue)
                                    onClose()
                                    
                                }).catch((error)=>{
                                    if(error.response.request.status ===400){
                                        setShowError(true)
                                        setErrorText(error.response.data['message'])
                                    }
                                    else console.log(error)
                                    
                                })
                                
                            }
                            else{
                                setShowError(true)
                                setErrorText(errorMessage)
                            }   
                        }}>Submit</Button>
                    </Box>

            </CustomModal>
        </React.Fragment>
    )
}
/*
    Component to display one part of a user's info
*/
const FieldStyle={
    display: "flex",
    flexDirection:"row",
    border:'1px solid grey',
    justifyContent:'space-between',
    alignItems: 'center',
    padding: 1,
    backgroundColor:"black",
    borderRadius: 2,
    
}
const Field: React.FunctionComponent<FieldProps> = ({
    fieldName,endpoint,displayValue,displayedValueFunction,validationFunction,errorMessage,password, passwordEndpoint
})=>{
    const [showModal,setShowModal] = React.useState(false)

    if(!errorMessage)errorMessage = "Invalid"
    if(!displayValue)displayValue=""
    if(!displayedValueFunction)displayedValueFunction = ()=>{}
    //if(!passwordEndpoint)passwordEndpoint = []

    if(password){
        return(
            <Box sx={FieldStyle}>
                <Typography sx={{marginRight: 2, fontSize:20}}>{fieldName} <Typography component={'span'} sx={{display: 'inline', fontSize:20,color:"#ADD8E6"}}>{displayValue}</Typography></Typography>
                
                <Link onClick={()=>{
                    setShowModal(true)
                }} 
                sx={{color:"#0096FF",fontSize:16}}>
                EDIT</Link>
                <ModalPasswordField open = {showModal} onClose={()=>setShowModal(false)} endpoint={endpoint} validationFunction={validationFunction} passwordEndpoint={passwordEndpoint}/>
            </Box>
        )
    }
    else{
        return(
            <Box sx={FieldStyle}>
                <Typography sx={{marginRight: 2, fontSize:20}}>{fieldName}: &nbsp;&nbsp;<Typography component={'span'} sx={{display: 'inline', fontSize:20,color:"#ADD8E6"}}>{displayValue}</Typography></Typography>
                
                <Link onClick={()=>{
                    setShowModal(true)
                }} 
                sx={{color:"#0096FF",fontSize:16}}>
                EDIT</Link>
                <ModalField errorMessage={errorMessage} open = {showModal} onClose={()=>setShowModal(false)}displayValue={displayValue} displayedValueFunction={displayedValueFunction} 
                endpoint={endpoint} validationFunction={validationFunction}/>
            </Box>
        )
    }
    
}
/*
    Component which handles changing a user's information
*/

const AccountManagementStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(1,1fr)',
    gap:'10px',
    gridAutoRows:"minmax(100px,auto)",
    margin:5
}

export default function AccountManagement(props:any){

   //State variables/functions
   const[rendered, setRendered] = React.useState(false)
   const[username,setUserName] = React.useState("")
   const[firstName,setFirstName] = React.useState("");
   const[lastName,setLastName] = React.useState("");
   const[email,setEmail] = React.useState("");
   const updateSiteUsernameFunction = props.updateUsername;
   
   React.useEffect(() => {
            axios.get(getUserData(cookies.get('user'))).then((response)=>{
            let data = response.data[0][0]
            
            let first_name = data[0]
            let last_name = data[1]
            let user = data[2]
            let e = data[3]

            setUserName(user)
            setFirstName(first_name)
            setLastName(last_name)
            setEmail(e)
            setRendered(true)
        }
    )
   },[]);//Only called on component mount since the dependencies are empty

   React.useEffect(()=>{
        if(username !== ""){
            cookies.set('user',username)
            updateSiteUsernameFunction(username)
        }
   },[username])

   //Validation Functions
   const validateUsername= (name:string)=>{
        if(name.length >0 && name !== username){
            return true
        }
        return false
   }
   
   const validateFirstName=(name:string)=>{
    if(name.length >0 && name !== firstName){
        return true
    }
    return false
   }

   const validateLastName=(name:string)=>{
    if(name.length >0 && name !== lastName){
        return true
    }
    return false
   }

   const validateEmail=(e:string)=>{
    let reg = /[a-zA-Z0-9].*@..*\.com/
    if(e.length >0 && e !== email && reg.test(e)){
        return true
    }
    return false
   }
   const validatePassword=(password:string)=>{
    if(password.length >0){
        return true
    }
    return false
   }
   
   if(rendered){
        return(
            <div>
                <Box sx={AccountManagementStyle}>
                    <Field errorMessage='Invalid Username' fieldName='Username' endpoint={[alterUsername,{"originalUsername":username}]} displayValue={username} displayedValueFunction={(val:string)=>{setUserName(val)}} validationFunction={validateUsername}/>
                    <Field fieldName='First Name' endpoint={[alterUserFirstName,{'username':username}]} displayValue={firstName} displayedValueFunction={(val:string)=>{setFirstName(val)}} validationFunction={validateFirstName}/>
                    <Field fieldName = 'Last Name' endpoint={[alterUserLastName,{'username':username}]} displayValue={lastName} displayedValueFunction={(val:string)=>{setLastName(val)}} validationFunction={validateLastName}/>
                    <Field errorMessage='Invalid Email' fieldName = 'Email' endpoint={[alterUserEmail,{'username':username}]} displayValue={email} displayedValueFunction={(val:string)=>{setEmail(val)}} validationFunction={validateEmail}/>
                    <Field password fieldName = 'Change Password' passwordEndpoint={[isCorrectPassword,{'username':username}]} endpoint = {[alterPassword,{'username':username}]} validationFunction={validatePassword}/>
                </Box>
            </div>

        );
    }
    else{
        return(
            <React.Fragment>
                <Box sx={{position: 'absolute' as 'absolute',top:'50%',left:'50%'}}>
                    <Typography sx={{fontSize:24}}>Loading</Typography>
                </Box>      
            </React.Fragment>
        );
    }
}
