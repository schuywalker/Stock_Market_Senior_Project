import * as React from 'react';
import axios from "axios";
import Cookies from 'universal-cookie';
import { Box, Button, Link, Modal, TextField, Typography, styled } from '@mui/material';
import {getUserData,alterUsername,alterUserFirstName,alterUserLastName,alterUserEmail} from '../config/WebcallAPI'

const cookies = new Cookies();
/*
    Styled Modal so the backdrop covers the whole screen and is slightly transparent
    TO-DO:
        - Integrate Schuyler's theme/color file instead of the hardcoded value I have.
          It is currently hardcoded because it was the first solution I found where I could set
          the opacity and color
*/
const CustomModal = styled(Modal)({
    '.MuiBackdrop-root': {
      display: 'fixed',
      top: '0%',
      height: "100vh",
      width: "100vw",
      backgroundColor: 'rgba(125,125,125,0.2)'//Grey backdrop with 20% opacity
    }
  });
/*
    Props for the custom components(DONE Unless more props become necessary)

        FieldProps:
            endpoint: The endpoint starting with  /<endpoint_name> 

            displayValue: The value displayed on the AccountManagement field and in the Modal

            displayedValueFunction: The state function to change the displayedValue

            validationFunction: The stateless function to validate if the new input is correct

            errorMessage: Optional string to display as an error message if the field is wrong Defaults
                          to invalid if nothing is provided
        

        ModalFieldProps:
            open: Same as the MUI open prop, governs if the modal is displayed

            onClose: State function that hides the modal

            displayValue: The value displayed on the AccountManagement field and in the Modal

            displayedValueFunction: The state function to change the displayedValue

            validationFunction: The stateless function to validate if the new input is correct 

            endpoint: The endpoint starting with  /<endpoint_name> 

            errorMessage: Optional string to display as an error message if the field is wrong. 
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
        - Have the field change display for input that is invalid and display a message stating this fact
            *Reference LoginForm/SignUpForm for what will be needed here. We may need to pass another prop
             which is the error message if we don't just want a generic one.

        - Call the backend if the input is valid and perform the necessary updates. Right now it
          just updates the field's displayed value and closes the modal

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
                    <Box sx={{display:'flex', flexdirection:'row',border:'1px solid white', background:'black', width:'fit-content',padding:1}}>
                        <TextField error = {showError} helperText={errorText} InputProps={{
                                  style: {fontSize:16}
                            }} defaultValue={displayValue} onChange={(event)=>{
                            newValue = event.target.value;
                        }}/>
                        <Button sx={{backgroundColor:'white', margin:1}}
                        onClick={async ()=>{
                            //Validate input. If value is the same, exit, otherwise reference SignUpForm for what to validate against
                            //If valid, call backend, update value, call stateFunction, close modal
                            //Else display the error
                            if(validationFunction(newValue)){
                                setShowError(false)
                                setErrorText("")
                                await axios.post(endpoint+newValue)
                                displayedValueFunction(newValue)
                                onClose()
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
    TO-DO:
        - Styling
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
    TO-DO:
        - Styling
        - Create all of the fields for different parts of the user's information
        - Hook to backend, we need to read in the values initially so the component knows what to display
        - Create all of the state variables/methods for the fields
        - Create the validation functions for the fields
*/

const AccountManagementStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(1,1fr)',
    gap:'10px',
    gridAutoRows:"minmax(100px,auto)",
    margin:5
}

export default function AccountManagement(props:any){
    /*
        Need to get user info to display from backend
        When a field is updated, the corresponding field in the database needs updated as well
        Some fields need additional functionality such as:
            -USERNAME: Updates the cookie with the new user name for the site and we may
                        need to find a way to change state of the sidebar
            -PASSWORD: 
    */

   //State variables/functions
   const[rendered, setRendered] = React.useState(false)
   const[username,setUserName] = React.useState("")
   const[firstName,setFirstName] = React.useState("");
   const[lastName,setLastName] = React.useState("");
   const[email,setEmail] = React.useState("");
   const updateUsernameFunction = props.updateUsername;
   
   React.useEffect(() => {
    console.log("Initial use Effect")
            axios.get(getUserData(cookies.get('user'))).then((response)=>{
            let data = response.data[0]
            
            let first_name = data[0]
            let last_name = data[1]
            let username = data[2]
            let email = data[3]

            setUserName(username)
            setFirstName(first_name)
            setLastName(last_name)
            setEmail(email)
            setRendered(true)
        }
    )
   },[]);//Only called on component mount since the dependencies are empty

   React.useEffect(()=>{
        if(username !== ""){
            cookies.set('user',username)
            updateUsernameFunction(username)
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

   const validateEmail=(name:string)=>{
    if(name.length >0 && name !== email){
        return true
    }
    return false
   }
   
   if(rendered){
        return(
            <div>
                <Box sx={AccountManagementStyle}>
                    <Field errorMessage='test' fieldName='Username' endpoint={alterUsername(username)} displayValue={username} displayedValueFunction={(val:string)=>{setUserName(val)}} validationFunction={validateUsername}/>
                    <Field fieldName='First Name' endpoint={alterUserFirstName(username)} displayValue={firstName} displayedValueFunction={(val:string)=>{setFirstName(val)}} validationFunction={validateFirstName}/>
                    <Field fieldName = 'Last Name' endpoint={alterUserLastName(username)} displayValue={lastName} displayedValueFunction={(val:string)=>{setLastName(val)}} validationFunction={validateLastName}/>
                    <Field fieldName = 'Email' endpoint={alterUserEmail(username)} displayValue={email} displayedValueFunction={(val:string)=>{setEmail(val)}} validationFunction={validateEmail}/>
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
