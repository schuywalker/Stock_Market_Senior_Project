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
                flex-basis="240px"
                sx={{
                    width: "240px",
                    maxHeight: "240px",
                    m: "1em",
                    bgcolor: colors.grey[500],
                }}
            >
                <CardContent>
                    <Box
                        display="flex"
                        sx={{
                            fontSize: theme.typography.h5,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: theme.typography.h5,
                            }}
                        >
                            {name} - {ticker}
                        </Typography>
                    </Box>
                    <Box display="flex">
                        <Typography
                            color={dailyChangeStatus}
                            sx={{
                                fontSize: theme.typography.h5,
                            }}
                        >
                            price: {price} {perChange}%
                        </Typography>
                    </Box>
                    <Typography></Typography>
                    <Typography></Typography>
                    {/* <Typography>earnings: {earnings}</Typography> */}
                    <Typography>market capitalization: {marketCap}</Typography>
                    <Typography>peRatio: {peRatio}</Typography>
                    <Typography>peRatioTTM: {peRatioTTM}</Typography>
                    <Typography>dividendYield: {dividendYield}</Typography>

                    <Box sx={{ alignSelf: "bottom", mt: "5px" }}>
                        <FinancialsModalButton ticker={ticker} />
                    </Box>
                </CardContent>
            </Card>
        </>
    );
};

export default Stock;
