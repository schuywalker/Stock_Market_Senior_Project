import { Box } from "@mui/material";
import Stock from "../../components/stock/Stock";

interface displayGroup {
    name: string;
    ticker: string;
    last: number;
    perChg: number;
}

const StockGrouping = (props: { displayGroup: displayGroup[] }) => {
    const stocks = props.displayGroup;

    return (
        <Box display="flex" alignContent={"center"} sx={{ mx: "auto", justifyContent: "center" }}>
            {stocks.map((_stock: any, i: number) => (
                <Stock
                    key={i}
                    name={stocks[i].name}
                    ticker={stocks[i].ticker}
                    last={stocks[i].last}
                    perChg={stocks[i].perChg}
                />
            ))}
        </Box>
    );
};
export default StockGrouping;
