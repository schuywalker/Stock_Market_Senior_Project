import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { Box, Typography, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import { useContext, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import DisplayGroup from "./DisplayGroup";
import Stock from "../../components/stock/Stock";
import { ColorModeContext, tokens } from "../../theme";
import { watch } from "fs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Watchlist = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [stocks, setStocks] = useState<DisplayGroup[]>([]);

  useEffect(() => {
    fetchWatchlistAssets();
  }, []);

  async function fetchWatchlistAssets() {
    try {
      // const response = await fetch(`http://127.0.0.1:8080/populateWatchlist?WL=${props.name}?userID=${userID}`, {}).then(
      const response = await fetch(
        `http://localhost:8080/populateWatchlist`,
        {}
      ).then((response) => {
        response.json().then((json) => {
          setStocks(json);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  const [gridView, setGridView] = useState<boolean>(true);

  return (
    <>
      <Typography
        sx={{
          m: 2,
          fontSize: theme.typography.h2,
          color: colors.green[500],
        }}
      >
        Watchlist Name Here
      </Typography>
      <Box display="flex" flexWrap="wrap" sx={{ mx: "10%" }}>
        {stocks.map((_stock: any, i: number) => (
          <Stock
            key={i}
            name={_stock.name}
            ticker={_stock.ticker}
            price={_stock.price}
            perChange={_stock.perChange}
            earnings={_stock.earnings}
            threeArticles={_stock.threeArticles} // not on the object
            marketCap={_stock.marketCap}
            peRatio={_stock.peRatio}
            peRatioTTM={_stock.peRatioTTM}
            dividendYield={_stock.dividendYield}
          />
        ))}
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Ticker</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Daily Change</TableCell>
              <TableCell align="right">Market Cap</TableCell>
              <TableCell align="right">peRatio</TableCell>
              <TableCell align="right">peRatioTTM</TableCell>
              <TableCell align="right">Dividend Yield</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks.map((_stock) => (
              <TableRow
                key={_stock["ticker"]}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {_stock["name"]}
                </TableCell>
                <TableCell align="right">{_stock["ticker"]}</TableCell>
                <TableCell align="right">{_stock["price"]}</TableCell>
                <TableCell align="right">{_stock["perChange"]}</TableCell>
                <TableCell align="right">{_stock["marketCap"]}</TableCell>
                <TableCell align="right">{_stock["peRatio"]}</TableCell>
                <TableCell align="right">{_stock["peRatioTTM"]}</TableCell>
                <TableCell align="right">{_stock["dividendYield"]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Watchlist;
