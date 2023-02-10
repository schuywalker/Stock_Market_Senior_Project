import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Card from "./components/card/Card";
import Stock from "./components/stock/Stock";

function App() {
    const stocks = [
        { name: "Apple", ticker: "AAPL" },
        { name: "Microsoft", ticker: "MSFT" },
        { name: "Amazon", ticker: "AMZN" },
        { name: "Facebook", ticker: "FB" },
        { name: "Google", ticker: "GOOG" },
    ];

    return (
        <div className="App">
            <Card className="card">
                <Stock name={stocks[0].name} ticker={stocks[0].ticker} />
                <Stock name={stocks[1].name} ticker={stocks[1].ticker} />
                <Stock name={stocks[2].name} ticker={stocks[2].ticker} />
                <Stock name={stocks[3].name} ticker={stocks[3].ticker} />
                <Stock name={stocks[4].name} ticker={stocks[4].ticker} />
            </Card>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
