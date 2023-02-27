import { Box, Card, CardContent, Pagination, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import Stock from "../../components/stock/Stock";
import Carousel from "react-material-ui-carousel";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import StockGrouping from "./StockGrouping";

const Watchlist = () => {
    const stocks = [
        { name: "Apple", ticker: "AAPL", last: 32416.92, perChg: -1.02 },
        { name: "Microsoft", ticker: "MSFT", last: 11394.94, perChg: 1.29 },
        { name: "Amazon", ticker: "AMZN", last: 16753.4, perChg: 0.23 },
        { name: "Facebook", ticker: "FB", last: 2400.16, perChg: -1.53 },
        { name: "Google", ticker: "GOOG", last: 42064.97, perChg: 0.0 },
        { name: "Apple", ticker: "AAPL", last: 32416.92, perChg: -1.02 },
        { name: "TSLA", ticker: "TSLA", last: 11394.94, perChg: 1.29 },
        { name: "TSLA", ticker: "TSLA", last: 16753.4, perChg: 0.23 },
        { name: "TSLA", ticker: "TSLA", last: 2400.16, perChg: -1.53 },
        { name: "GME", ticker: "yolo", last: 42064.97, perChg: 0.0 },
        { name: "AMC", ticker: "obv", last: 32416.92, perChg: -1.02 },
        { name: "Wework", ticker: "very hard", last: 11394.94, perChg: 1.29 },
        { name: "Meta", ticker: "might go up", last: 16753.4, perChg: 0.23 },
    ];

    const [watchlistPosition, setWatchlistPosition] = useState(0);
    interface displayGroup {
        name: string;
        ticker: string;
        last: number;
        perChg: number;
    }
    const stockSubset = (start: number): displayGroup[] => {
        if (start < stocks.length - 5) {
            return stocks.slice(start, start + 5);
        } else {
            const remainder = stocks.length - start;
            console.log(start, " at  remainder to end"); // need to fix something here
            return stocks.slice(remainder, stocks.length); // just make list shorter when they're at end, instead of wrapping around
        }
    };
    function watchListPositionHandler(change: number) {
        if (change == 5) {
            if (watchlistPosition < stocks.length - 5) {
                setWatchlistPosition(watchlistPosition + 5);
            } else if (watchlistPosition > stocks.length - 5 && watchlistPosition < stocks.length) {
                setWatchlistPosition(stocks.length);
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
    // const [watchlistSubset, setWatchlistSubset] = useState(stocks.slice(0, 5));

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
                    console.log(watchlistPosition);
                    watchListPositionHandler(5);
                }}
                prev={(prev, active) => {
                    console.log(watchlistPosition);
                    watchListPositionHandler(-5);
                }}
                autoPlay={false}
                NextIcon={<ArrowForwardIosOutlinedIcon />}
                PrevIcon={<ArrowBackIosNewOutlinedIcon />}
                animation="slide"
                navButtonsAlwaysVisible={true}
                sx={{ justifyContent: "space-between" }}
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
