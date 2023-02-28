import React, { useContext,useState,useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  symbol: string,
  buy: number,
  hold: number,
  period: string,
  sell: number,
  strongBuy: number,
  strongSell: number,
) {
  return { symbol, buy, hold, period, sell, strongBuy,strongSell};
}

export default function BasicTable() {

  const [ret, setRet] = useState([]);
   useEffect(() => {
      fetch('http://127.0.0.1:8080/analystCalls')
        .then((response) => response.json())
         .then((data) => {
            console.log(data);
            setRet(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Stock</TableCell>
            <TableCell align="right">Buy</TableCell>
            <TableCell align="right">Hold</TableCell>
            <TableCell align="right">Period</TableCell>
            <TableCell align="right">Sell</TableCell>
            <TableCell align="right">Strong Buy</TableCell>
            <TableCell align="right">Strong Sell</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ret.map((row)=>(
             <TableRow
             key={row['symbol']}
             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
           >
            <TableCell component="th" scope="row">
                {row['symbol']}
              </TableCell>
              <TableCell align="right">{row['buy']}</TableCell>
              <TableCell align="right">{row['hold']}</TableCell>
              <TableCell align="right">{row['period']}</TableCell>
              <TableCell align="right">{row['sell']}</TableCell>
              <TableCell align="right">{row['strongBuy']}</TableCell>
              <TableCell align="right">{row['strongSell']}</TableCell>
            </TableRow>
            
            ))}
          
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}