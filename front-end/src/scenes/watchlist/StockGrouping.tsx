import { Box } from "@mui/material";
import Stock from "../../components/stock/Stock";
import DisplayGroup from "./DisplayGroup";

const StockGrouping = (props: { displayGroup: DisplayGroup[] }) => {
  const stocks = props.displayGroup;

  return (
    <Box display="flex" sx={{ mx: "5%" }}>
      {stocks.map((_stock: any, i: number) => (
        <Stock
          key={i}
          stockName={stocks[i].stockName}
          stockTicker={stocks[i].stockTicker}
          price={stocks[i].price}
          perChange={stocks[i].perChange}
          earnings={stocks[i].earnings}
          threeArticles={stocks[i].threeArticles}
          marketCap={stocks[i].marketCap}
          peRatio={stocks[i].peRatio}
          peRatioTTM={stocks[i].peRatioTTM}
          dividendYield={stocks[i].dividendYield}
        />
      ))}
    </Box>
  );
};
export default StockGrouping;
