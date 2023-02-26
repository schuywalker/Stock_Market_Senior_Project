import React, { useContext } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  stock_name: string,
  buy: number,
  hold: number,
  period: string,
  sell: number,
  strong_buy: number,
  strong_sell: number,
) {
  return { stock_name, buy, hold, period, sell,strong_buy,strong_sell };
}

const rows = [
  createData('MSFT', 159, 6.0, "2023-02-01", 4.0,1,2)
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Stock</TableCell>
            <TableCell align="right">Buy</TableCell>
            <TableCell align="right">Hold&nbsp;(g)</TableCell>
            <TableCell align="right">Period&nbsp;(g)</TableCell>
            <TableCell align="right">Sell&nbsp;(g)</TableCell>
            <TableCell align="right">Strong Buy&nbsp;(g)</TableCell>
            <TableCell align="right">Strong Sell&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.stock_name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.stock_name}
              </TableCell>
              <TableCell align="right">{row.buy}</TableCell>
              <TableCell align="right">{row.hold}</TableCell>
              <TableCell align="right">{row.period}</TableCell>
              <TableCell align="right">{row.sell}</TableCell>
              <TableCell align="right">{row.strong_buy}</TableCell>
              <TableCell align="right">{row.strong_sell}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}