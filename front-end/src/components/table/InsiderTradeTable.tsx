import axios from "axios"
import { getControllerSignal, getInsiderTrades } from "../../config/WebcallAPI"
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from "@mui/material"
import { useEffect, useState } from "react"
import LoadingBox from "../general/LoadingBox"
import Paper from '@mui/material/Paper'

/*
    Generates the buttons for a paginated table. Always displays the first page number and last page
    number of a table. Based on which page a user is on, it will also display the two previous and next two
    pages if possible.
*/

function paginate(numPages:number, currentPage:number, setCurrentPage:Function){
    const ButtonStyle={
        color:'white',
        fontSize:15,
        width:2,
        margin:1
    }
    let out:any = []
    let x:number = 0;
    if(currentPage >3){
        out[x] = <Button disableRipple sx={ButtonStyle} onClick={()=>setCurrentPage(1)}>1</Button>
        x++;
    }
    if(currentPage > 1 && currentPage -2 >1){
        out[x] = <Typography sx={{fontSize:25,paddingBottom:2}}>...</Typography>
        x++;
    }
    let start = currentPage-2
    let end = currentPage +2
    if(currentPage -2 < 1){
        start = 1
        end = 5
    }
    else if(numPages - currentPage <=1){
        start = numPages-4
        end = numPages
    }
    for(let i = start;i <= end && i <= numPages;i++){
        if(i === currentPage){
            out[x] = <Button disableRipple sx={[ButtonStyle,{border:'1px solid white'}]} onClick={()=>setCurrentPage(i)}>{i}</Button>
        }
        else out[x] = <Button disableRipple sx={ButtonStyle} onClick={()=>setCurrentPage(i)}>{i}</Button>
        x++;
        
    }
    if(currentPage +2 < numPages && currentPage +2 < numPages-1){
        out[x] = <Typography sx={{fontSize:25,paddingBottom:2}}>...</Typography>
        x++;
    }
    if(currentPage + 2 < numPages){
        out[x] = <Button disableRipple sx={ButtonStyle} onClick={()=>setCurrentPage(numPages)}>{numPages}</Button>
        x++;
    }
    return out

} 
/*
    Styling for the table cell used when the table is loading
*/
const StyledTableCell =  styled(TableCell)({
    paddingLeft:20,
    paddingRight:20,
    paddingTop:0,
    paddingBottom:0,
    borderBottom:"none"
})

/*
    Fetches and displays the list of insider trades for a given ticker. Will display
    a loading state while the fetch is in progress.
*/

export default function InsiderTradeTable (props: {ticker:string}){
    const[dataReady, setDataReady] = useState(false)
    const[data,setData] = useState([])
    const[dataToggle,setDataToggle] = useState(false)
    const[numPages, setNumPages] = useState(1)
    const[currentPage,setCurrentPage]=useState(1)
    let key = 1;

    const generateUniqueKey = ()=>{
        let val = key
        key += 1
        return val
    }

    useEffect(()=>{
        axios.get(getInsiderTrades(currentPage,props.ticker),{signal:getControllerSignal()}).then((response)=>{
            setData(response.data[0]['data'])
            if(response.data[0]['num_pages'] !== numPages)setNumPages(response.data[0]['num_pages'])
            setDataReady(true)
        }).catch((error)=>{
            if(error.message !== 'canceled'){
                setDataReady(false)
                setDataToggle(!dataToggle)
            }
            else console.log(error)
            
        })
        
    },[dataToggle,currentPage,props.ticker])

    

    if(dataReady){
        return(
            <Box sx={{display:'flex',flexDirection:'column'}}>
                <Typography sx={{fontSize:25, alignItems:'center', marginLeft:2, padding:2, paddingBottom:3}}>{props.ticker.toUpperCase()} Insider Trades</Typography>
                <TableContainer component={Paper}>
                <Table sx={{width:'85vw'}} aria-label="simple table">
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
                        <TableRow key={generateUniqueKey()}>
                            <TableCell>{row['filingDate']}</TableCell>
                            <TableCell align="center">{row['transactionDate']}</TableCell>
                            <TableCell align="center">{row['symbol']}</TableCell>
                            <TableCell align="center">${(row['transactionPrice']as number).toLocaleString(undefined,{maximumFractionDigits:2, minimumFractionDigits:2})}</TableCell>
                            <TableCell align="center">{new Intl.NumberFormat().format((row['change']as number))}</TableCell>
                            <TableCell align="center">{row['name']}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>
                <Box sx={{display:'flex', justifyContent:'right', paddingRight:5}}>
                    {paginate(numPages,currentPage,setCurrentPage)}
                </Box>
            </Box>
        )
        
    }
    else{
        return(
            <TableContainer component={Paper}>
                <Table sx={{width:'85'}} aria-label="simple table">
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
                        <TableRow>
                            <StyledTableCell sx={{height:"50vh"}} rowSpan={10} colSpan={6}><LoadingBox height ={"80%"} width={"100%"}/> </StyledTableCell>
                        </TableRow>   
                    </TableBody>
                </Table>
                </TableContainer>
        )
    }
    
}