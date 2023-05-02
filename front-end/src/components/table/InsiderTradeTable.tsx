import axios from "axios"
import { testMethod } from "../../config/WebcallAPI"
import { Box, Button, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import LoadingBox from "../general/LoadingBox"
import Paper from '@mui/material/Paper'

const cacheRefresh = 1//in seconds

function paginate(numPages:number, currentPage:number, setCurrentPage:Function){
    let out:any = []
    let x:number = 0;
    if(currentPage !== 1){
        out[x] = <Button sx={{color:'white', fontSize:15, width:2}} onClick={()=>setCurrentPage(1)}>1</Button>
        x++;
    }
    if(currentPage > 1 && currentPage !==2){
        out[x] = <Typography sx={{fontSize:25,paddingBottom:2}}>...</Typography>
        x++;
    }
    for(let i = currentPage;i < currentPage+5 && i < numPages;i++){
        out[x] = <Button sx={{color:'white',fontSize:15,width:2}} onClick={()=>setCurrentPage(i)}>{i}</Button>
        x++;
    }
    if(currentPage +5 < numPages && currentPage +5 != 49){
        out[x] = <Typography sx={{fontSize:25,paddingBottom:2}}>...</Typography>
        x++;
    }
    if(currentPage + 5 < numPages){
        out[x] = <Button sx={{color:'white', fontSize:15, width:2}} onClick={()=>setCurrentPage(numPages)}>{numPages}</Button>
        x++;
    }
    return out

}   

export default function InsiderTradeTable (){
    const[dataReady, setDataReady] = useState(false)
    const[data,setData] = useState([])
    const[dataToggle,setDataToggle] = useState(false)
    const[numPages, setNumPages] = useState(1)
    const[currentPage,setCurrentPage]=useState(1)

    useEffect(()=>{
        axios.get(testMethod(currentPage)).then((response)=>{
            setData(response.data[0]['data'])
            console.log(response)
            if(response.data[0]['num_pages'] !== numPages)setNumPages(response.data[0]['num_pages'])
            setDataReady(true)
        }).catch((error)=>{
            setDataReady(false)
            setDataToggle(!dataToggle)
        })
        
    },[dataToggle,currentPage])

    

    if(dataReady){
        return(
            <Box sx={{display:'flex',flexDirection:'column'}}>
                <Typography sx={{fontSize:15, justifyContent:'center'}}>Page {currentPage}</Typography>
                <TableContainer component={Paper}>
                <Table sx={{width:'90vw'}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Filing Date</TableCell>
                            <TableCell align="center">Trade Date</TableCell>
                            <TableCell align="center">Ticker</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map((row)=>(
                        <TableRow>
                            <TableCell>{row['filingDate']}</TableCell>
                            <TableCell align="center">{row['transactionDate']}</TableCell>
                            <TableCell align="center">{row['symbol']}</TableCell>
                            <TableCell align="center">${row['transactionPrice']}</TableCell>
                            <TableCell align="center">{row['change']}</TableCell>
                            <TableCell align="center">{row['name']}</TableCell>
                        </TableRow>
                            
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>
                <Box sx={{display:'flex', justifyContent:'right', paddingRight:5,}}>
                    {paginate(numPages,currentPage,setCurrentPage)}
                </Box>
            </Box>
        )
        
    }
    else{
        return(
            <LoadingBox height= {400} width = {'90vw'}/>
        )
    }
    
}