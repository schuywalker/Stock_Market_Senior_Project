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
        <>
            <div className="App">
                <Card className="card">
                    <Stock name={stocks[0].name} ticker={stocks[0].ticker} />
                    <Stock name={stocks[1].name} ticker={stocks[1].ticker} />
                    <Stock name={stocks[2].name} ticker={stocks[2].ticker} />
                    <Stock name={stocks[3].name} ticker={stocks[3].ticker} />
                    <Stock name={stocks[4].name} ticker={stocks[4].ticker} />
                </Card>
            </div>
        </>
    );
}

export default App;
