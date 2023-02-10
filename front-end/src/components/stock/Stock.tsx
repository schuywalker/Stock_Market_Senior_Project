import { useState } from "react";
import React from "react";
import "../../App.css";
import Card from "../card/Card";
import "./Stock.css";

export interface StockProps {
    name: string;
    ticker: string;
}

function Stock(props: StockProps) {
    const a = "Hi";
    const className = "stock";

    const [thing, setThing] = useState(2);
    const thingHandler = () => {
        setThing(thing * 2);
        console.log("hey");
    };

    const [helloWorld, setHelloWord] = useState("");
    const [analystCalls, setAnalystCalls] = useState();

    const hwHandler = async () => {
        try {
            const res = await fetch("http://127.0.0.1:8080/returnString").then((response) => {
                return response.json();
            });
            console.log(typeof res);
            setHelloWord(res);
        } catch (err) {
            console.log(err);
        }
    };

    const analystCallsHandler = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8080/analystRec", {});
            const json = await response.json();

            setAnalystCalls(json);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Card className={className}>
            <>
                <div>
                    {a}
                    <h1>Name: {props.name}</h1>
                </div>
                <div className="Ticker">
                    <span>Ticker: {props.ticker}</span>
                    <button onClick={thingHandler}>doubleNum {thing}</button>
                </div>
                <div>
                    <button onClick={hwHandler}>Get secret message: {helloWorld}</button>
                </div>
                <div>
                    <button onClick={analystCallsHandler}>Refresh analyst recommendations:</button>
                    {JSON.stringify(analystCalls)}
                </div>
            </>
        </Card>
    );
}

export default Stock;
