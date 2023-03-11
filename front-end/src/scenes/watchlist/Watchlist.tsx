import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import StockGrouping from "./StockGrouping";
import DisplayGroup from "./DisplayGroup";

const Watchlist = () => {
    const stocks = [
        {
            stockName: "Apple",
            stockTicker: "AAPL",
            price: 10,
            perChange: 3,
            earnings: 30000,
            threeArticles: "",
            marketCap: 3000000,
            peRatio: 16.4,
            peRatioTTM: 14,
            dividendYield: 4.7,
        },
        {
            stockName: "222",
            stockTicker: "",
            price: 10,
            perChange: 3,
            earnings: 30000,
            threeArticles: "",
            marketCap: 3000000,
            peRatio: 16.4,
            peRatioTTM: 14,
            dividendYield: 4.7,
        },
    ];

    const [watchlistPosition, setWatchlistPosition] = useState(0);

    const stockSubset = (start: number): DisplayGroup[] => {
        if (start < stocks.length - 5) {
            return stocks.slice(start, start + 5);
        } else {
            return start === stocks.length
                ? stocks.slice(0, 5)
                : stocks.slice(start, stocks.length); // just make list shorter when they're at end, instead of wrapping around
        }
    };
    function watchListPositionHandler(change: number) {
        if (change === 5) {
            if (watchlistPosition < stocks.length - 5) {
                setWatchlistPosition(watchlistPosition + 5);
            } else {
                setWatchlistPosition(0); // loop around to beginning
            }
        } else {
            if (watchlistPosition >= 5) {
                setWatchlistPosition(watchlistPosition - 5);
            } else if (watchlistPosition > 0 && watchlistPosition < 5) {
                setWatchlistPosition(0);
            } else {
                setWatchlistPosition(stocks.length - 5);
            }
        }
    }

    const [quote, setQuote] = useState("");

    const [smallCard, setSmallCard] = useState();

    const smallCardHandler = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8080/smallCard", {});
            const json = await response.json();

            setSmallCard(json);
        } catch (err) {
            console.log(err);
        }
    };

    const quoteHandler = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8080/quote", {});
            const json = await response.json();

            setQuote(json);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Carousel
                next={(_next, _active) => {
                    watchListPositionHandler(5);
                }}
                prev={(prev, active) => {
                    watchListPositionHandler(-5);
                }}
                autoPlay={false}
                NextIcon={<ArrowForwardIosOutlinedIcon />}
                PrevIcon={<ArrowBackIosNewOutlinedIcon />}
                animation="slide"
                // interval={14000}
                navButtonsAlwaysVisible={true}
                sx={{ width: "100%", height: "100%" }}
            >
                <StockGrouping displayGroup={stockSubset(watchlistPosition)} />
            </Carousel>
            <Box display="flex">
                <Button onClick={quoteHandler}>Get quote</Button>
                <Typography>{quote}</Typography>
            </Box>
        </>
    );
};

export default Watchlist;
