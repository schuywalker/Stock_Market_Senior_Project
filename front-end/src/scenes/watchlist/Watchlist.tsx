import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import StockGrouping from "./StockGrouping";

const Watchlist = () => {
    const stocks = [
        { name: "1Apple", ticker: "AAPL", price: 32416.92, perChg: -1.02 },
        { name: "2Microsoft", ticker: "MSFT", price: 11394.94, perChg: 1.29 },
        { name: "3Amazon", ticker: "AMZN", price: 16753.4, perChg: 0.23 },
        { name: "4Facebook", ticker: "FB", price: 2400.16, perChg: -1.53 },
        { name: "5Google", ticker: "GOOG", price: 42064.97, perChg: 0.0 },
        { name: "6Apple", ticker: "AAPL", price: 32416.92, perChg: -1.02 },
        { name: "7TSLA", ticker: "TSLA", price: 11394.94, perChg: 1.29 },
        { name: "8TSLA", ticker: "TSLA", price: 16753.4, perChg: 0.23 },
        { name: "9TSLA", ticker: "TSLA", price: 2400.16, perChg: -1.53 },
        { name: "10GME", ticker: "yolo", price: 42064.97, perChg: 0.0 },
        { name: "11AMC", ticker: "obv", price: 32416.92, perChg: -1.02 },
        { name: "12Wework", ticker: "very hard", price: 11394.94, perChg: 1.29 },
        { name: "13Meta", ticker: "might go up", price: 16753.4, perChg: 0.23 },
    ];

    const [watchlistPosition, setWatchlistPosition] = useState(0);
    interface displayGroup {
        name: string;
        ticker: string;
        price: number;
        perChg: number;
    }
    const stockSubset = (start: number): displayGroup[] => {
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
    const [analystCalls, setAnalystCalls] = useState();

    const analystCallsHandler = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8080/analystRec", {});
            const json = await response.json();

            setAnalystCalls(json);
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
                <Button onClick={analystCallsHandler}>Get analyst calls</Button>
                <Typography>{analystCalls}</Typography>
            </Box>
        </>
    );
};

export default Watchlist;
