import { Button, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import FinancialsModalButton from "../../scenes/watchlist/FinancialsModalButton";
import { ColorModeContext, tokens } from "../../theme";
import DisplayGroup from "../../scenes/watchlist/DisplayGroup";

const Stock = (props: DisplayGroup) => {
    const {
        name,
        ticker,
        price,
        perChange,
        earnings,
        threeArticles,
        marketCap,
        peRatio,
        peRatioTTM,
        dividendYield,
    } = props;
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const dailyChangeStatus: string =
        perChange > 0 ? colors.green[500] : perChange === 0 ? colors.grey[100] : colors.red[500];

    return (
        <>
            <Card
                sx={{
                    width: "100%",
                    m: "1em",
                    bgcolor: colors.grey[500],
                }}
            >
                <CardContent>
                    <div>
                        {name} - {ticker}
                    </div>
                    <Box display="flex" alignItems={"center"}>
                        <div>{perChange}%</div>
                        <div>price: {price}</div>
                    </Box>
                    {/* <div>earnings: {earnings}</div> */}
                    <div>market capitalization: {marketCap}</div>
                    <div>peRatio: {peRatio}</div>
                    <div>peRatioTTM: {peRatioTTM}</div>
                    <div>dividendYield: {dividendYield}</div>

                    <FinancialsModalButton ticker={ticker} />
                </CardContent>
            </Card>
        </>
    );
};

export default Stock;
