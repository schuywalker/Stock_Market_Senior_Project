import { Box } from "@mui/material";
import Stock from "../../components/stock/Stock";

interface displayGroup {
    name: string;
    ticker: string;
    price: number;
    perChg: number;
}

const StockGrouping = (props: { displayGroup: displayGroup[] }) => {
    const stocks = props.displayGroup;

    return (
        <Box display="flex" sx={{ mx: "5%" }}>
            {stocks.map((_stock: any, i: number) => (
                <Stock
                    key={i}
                    name={stocks[i].name}
                    ticker={stocks[i].ticker}
                    price={stocks[i].price}
                    perChg={stocks[i].perChg}
                />
            ))}
        </Box>
    );
};
export default StockGrouping;
