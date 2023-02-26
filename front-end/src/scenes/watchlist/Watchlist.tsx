import { Card, CardContent, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import Stock from "../../components/stock/Stock";

const Watchlist = () => {
  const stocks = [
    { name: "Apple", ticker: "AAPL", last: 32416.92, perChg: -1.02 },
    { name: "Microsoft", ticker: "MSFT", last: 11394.94, perChg: 1.29 },
    { name: "Amazon", ticker: "AMZN", last: 16753.4, perChg: 0.23 },
    { name: "Facebook", ticker: "FB", last: 2400.16, perChg: -1.53 },
    { name: "Google", ticker: "GOOG", last: 42064.97, perChg: 0.0 },
  ];

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
      <Stock
        name={stocks[0].name}
        ticker={stocks[0].ticker}
        last={stocks[0].last}
        perChg={stocks[0].perChg}
      />
      <Stock
        name={stocks[1].name}
        ticker={stocks[1].ticker}
        last={stocks[1].last}
        perChg={stocks[1].perChg}
      />
      <Stock
        name={stocks[2].name}
        ticker={stocks[2].ticker}
        last={stocks[2].last}
        perChg={stocks[2].perChg}
      />
      <Stock
        name={stocks[3].name}
        ticker={stocks[3].ticker}
        last={stocks[3].last}
        perChg={stocks[3].perChg}
      />
      <Stock
        name={stocks[4].name}
        ticker={stocks[4].ticker}
        last={stocks[4].last}
        perChg={stocks[4].perChg}
      />

      <Button onClick={quoteHandler}>Get quote</Button>
      <Typography>{quote}</Typography>
      <Button onClick={analystCallsHandler}>Get analyst calls</Button>
      <Typography>{analystCalls}</Typography>
    </>
  );
};

export default Watchlist;
