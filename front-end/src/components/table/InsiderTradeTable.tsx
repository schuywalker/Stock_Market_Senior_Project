import axios from "axios"
import { testMethod } from "../../config/WebcallAPI"
import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import LoadingBox from "../general/LoadingBox"

const testFunction = (trade:any)=>{
    let x = []
    x[0] = <Typography>{trade['change']}</Typography>
    return(
        x
    )
}

export default function InsiderTradeTable (){
    const[dataReady, setDataReady] = useState(false)
    const[data,setData] = useState([[]])

    useEffect(()=>{
        axios.get(testMethod()).then((response)=>{
            setData(response.data[0]['data'])
            console.log(response)
            setDataReady(true)
        }).catch((error)=>{
            setDataReady(true)
        })
    },[])

    

    if(dataReady){
        return(
            <Box sx={{border:"1px solid white"}}>
                {testFunction(data[0])}
                <Typography>Loaded</Typography>
            </Box>
        )
        
    }
    else{
        return(
            <LoadingBox height= {400} width = {400}/>
        )
    }
    
}