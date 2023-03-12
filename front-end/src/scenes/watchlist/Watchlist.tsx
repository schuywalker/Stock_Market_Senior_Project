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
            const response = await fetch(`http://localhost:8080/populateWatchlist`, {}).then(
                (response) => {
                    response.json().then((json) => {
                        setStocks(json);
                    });
                }
            );
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Box display="flex" sx={{ mx: "5%" }}>
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
        </>
    );
};

export default Watchlist;
