import * as React from 'react';
import axios from "axios";
import Cookies from 'universal-cookie';
import { Box, Button, Link, Modal, TextField, Typography, styled } from '@mui/material';


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
        

        ModalFieldProps:
            open: Same as the MUI open prop, governs if the modal is displayed

            onClose: State function that hides the modal

            displayValue: The value displayed on the AccountManagement field and in the Modal

            displayedValueFunction: The state function to change the displayedValue

            validationFunction: The stateless function to validate if the new input is correct 

            endpoint: The endpoint starting with  /<endpoint_name> 
*/
type FieldProps={
    endpoint:string
    displayValue: string
    displayedValueFunction: (value:string)=>void
    validationFunction: (value:string)=>boolean
}
type ModalFieldProps={
    open: boolean
    onClose: VoidFunction
    displayValue: string
    displayedValueFunction: (value:string)=>void
    validationFunction: (value:string)=>boolean
    endpoint:string
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
    open,onClose,displayValue,displayedValueFunction,endpoint,validationFunction
})=>{
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left:'50%',
        pt: 3,
        px: 6,
        pb: 4,
      };
    var newValue:string = displayValue;
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
                        <TextField defaultValue={displayValue} onChange={(event)=>{
                            newValue = event.target.value;
                        }}/>
                        <Button sx={{backgroundColor:'white', margin:1}}
                        onClick={()=>{
                            //Validate input. If value is the same, exit, otherwise reference SignUpForm for what to validate against
                            //If valid, call backend, update value, call stateFunction, close modal
                            //Else display the error
                            if(validationFunction(newValue)){
                                displayedValueFunction(newValue)
                                onClose()
                            }
                            else{

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
const Field: React.FunctionComponent<FieldProps> = ({
    endpoint,displayValue,displayedValueFunction,validationFunction
})=>{
    const [showModal,setShowModal] = React.useState(false)
    return(
        <Box sx={{display: "flex", flexDirection:"row", border:'1px solid grey', justifyContent:'space-between'}}>
            <Typography sx={{marginRight: 2, fontSize:20}}>{displayValue}</Typography>
            
            <Link onClick={()=>{
                setShowModal(true)
            }} 
            sx={{color:"white"}}><Typography sx={{fontSize:20}}>EDIT</Typography></Link>
            <ModalField open = {showModal} onClose={()=>setShowModal(false)}displayValue={displayValue} displayedValueFunction={displayedValueFunction} 
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
   const[username,setUserName] = React.useState("USERNAME");

   //Validation Functions
   const validateUsername= (name:string)=>{
        if(name.length >0 && name !== username)return true
        return false
   }

   const validateFirstName=(name:string)=>{
        return true
   }

    return(
        <div>
            <Box sx={{border: '1px solid white',display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',gap:'10px',gridAutoRows:"minmax(100px,auto)"}}>
                <Field endpoint="" displayValue={username} displayedValueFunction={(val:string)=>{setUserName(val)}} validationFunction={validateUsername}/>
                <Field endpoint="" displayValue='FIRSTNAME' displayedValueFunction={(val:string)=>{console.log("Setting New Value "+val)}} validationFunction={validateFirstName}/>
            </Box>
        </div>

    );
}