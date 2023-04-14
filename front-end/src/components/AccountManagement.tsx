import * as React from 'react';
import axios from "axios";
import Cookies from 'universal-cookie';
import { Box, Button, Link, Modal, TextField, Typography, styled, useTheme } from '@mui/material';
import {getUserData,alterUsername,alterUserFirstName,alterUserLastName,alterUserEmail} from '../config/WebcallAPI'
import {tokens} from '../theme'

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
      backgroundColor: 'rgba(10,10,10,0.5)'//Grey backdrop with 20% opacity
      
    }
  });

  
/*
    Props for the custom components(DONE Unless more props become necessary)

        FieldProps:
            endpoint: The endpoint starting with  /<endpoint_name> 

            displayValue: The value displayed on the AccountManagement field and in the Modal

            displayedValueFunction: The state function to change the displayedValue

            validationFunction: The stateless function to validate if the new input is correct

            errorMessage: Optional string to display as an error message if the field is wrong. Defaults
                          to invalid if nothing is provided
        

        ModalFieldProps:
            open: Same as the MUI open prop, governs if the modal is displayed

            onClose: State function that hides the modal

            displayValue: The value displayed on the AccountManagement field and in the Modal

            displayedValueFunction: The state function to change the displayedValue

            validationFunction: The stateless function to validate if the new input is correct 

            endpoint: The endpoint starting with  /<endpoint_name> 

            errorMessage: String to display as an error message if the field is wrong. 
*/
type FieldProps={
    fieldName: string
    endpoint:string
    displayValue: string
    displayedValueFunction: (value:string)=>void
    validationFunction: (value:string)=>boolean
    errorMessage?: string 
}
type ModalFieldProps={
    open: boolean
    onClose: VoidFunction
    displayValue: string
    displayedValueFunction: (value:string)=>void
    validationFunction: (value:string)=>boolean
    endpoint:string
    errorMessage: string
}

/*
    Component to display a modal dialog for a user to change a given field
    TO-DO:

        - Styling
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
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
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
                                await axios.post(endpoint+newValue).then((response)=>{
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
    fieldName,endpoint,displayValue,displayedValueFunction,validationFunction,errorMessage
})=>{
    const [showModal,setShowModal] = React.useState(false)
    if(!errorMessage)errorMessage = "Invalid"
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
   
   if(rendered){
        return(
            <div>
                <Box sx={AccountManagementStyle}>
                    <Field errorMessage='Invalid Username' fieldName='Username' endpoint={alterUsername(username)} displayValue={username} displayedValueFunction={(val:string)=>{setUserName(val)}} validationFunction={validateUsername}/>
                    <Field fieldName='First Name' endpoint={alterUserFirstName(username)} displayValue={firstName} displayedValueFunction={(val:string)=>{setFirstName(val)}} validationFunction={validateFirstName}/>
                    <Field fieldName = 'Last Name' endpoint={alterUserLastName(username)} displayValue={lastName} displayedValueFunction={(val:string)=>{setLastName(val)}} validationFunction={validateLastName}/>
                    <Field errorMessage='Invalid Email' fieldName = 'Email' endpoint={alterUserEmail(username)} displayValue={email} displayedValueFunction={(val:string)=>{setEmail(val)}} validationFunction={validateEmail}/>
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
