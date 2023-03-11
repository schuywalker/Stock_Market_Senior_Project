import { Button, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import FinancialsModalButton from "../../scenes/watchlist/FinancialsModalButton";
import { ColorModeContext, tokens } from "../../theme";
import DisplayGroup from "../../scenes/watchlist/DisplayGroup";

const Stock = (props: DisplayGroup) => {
    const {
        stockName,
        stockTicker,
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

    //   const stockName: string = props.name;
    //   const stockTicker: string = props.ticker;
    //   const stockprice: number = props.price;
    //   const stockPerChg: number = props.perChg;

    const stockPerChgStatus: string =
        perChange > 0 ? colors.green[500] : perChange === 0 ? colors.grey[100] : colors.red[500];

    async function fetchSmallCard() {
        try {
            // const response = await fetch(`http://127.0.0.1:8080/smallCard?ticker=${props.stockTicker}`, {});
            const response = await fetch(`http://127.0.0.1:8080/smallCard?ticker=AAPL`, {});
            const json = await response.json();
            setSmallCardInfo("7");
            console.log(json.stringify());
            console.log(smallCardInfo);
        } catch (err) {
            console.log("jajaja");
        }
    }

    const [smallCardInfo, setSmallCardInfo] = useState("5");

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
                    <Box display="flex" alignItems={"center"}>
                        <Typography
                            sx={{ flexGrow: 3, fontSize: 14 }}
                            color={stockPerChgStatus}
                            gutterBottom
                        >
                            {perChange}%
                        </Typography>
                        <Typography sx={{ fontSize: theme.typography.h6 }}>
                            price: {price}
                        </Typography>
                        <Button onClick={fetchSmallCard}>stockInfo</Button>
                    </Box>
                    <Typography sx={{ fontSize: theme.typography.h5 }} component="div">
                        {stockName} - {stockTicker}
                    </Typography>

                    <Button sx={{ bgcolor: colors.green[500] }}>Refresh Price</Button>
                    <FinancialsModalButton ticker={stockTicker} />
                </CardContent>
            </Card>
        </>
    );
};

export default Stock;
