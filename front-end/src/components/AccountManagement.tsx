import * as React from 'react';
import axios from "axios";
import Cookies from 'universal-cookie';
import { Box, Button, Link, Modal, TextField, Typography, styled } from '@mui/material';

type FieldProps={
    endpoint:string
    displayValue: string
    stateFunction: VoidFunction
}

const Field: React.FunctionComponent<FieldProps> = ({
    endpoint,displayValue,stateFunction
})=>{
    return(
        <Box sx={{display: "flex", flexDirection:"row", border:'1px solid grey', justifyContent:'space-between'}}>
            <Typography sx={{marginRight: 2}}>{displayValue}</Typography>
            
            <Link onClick={()=>{
                //display modal and pass endpoint that modal will call
                //Upon successful call, the stateFunction will be used to display
                //the new value
                stateFunction()
            }} 
            sx={{color:"white"}}>EDIT</Link>
        </Box>
    )
}

export default function AccountManagement(props:any){

    return(
        <div>
            <Box sx={{display: 'flex'}}>
                <Field endpoint="" displayValue='USERNAME' stateFunction={()=>{console.log("activated state function")}}/>
            </Box>
        </div>

    );
}