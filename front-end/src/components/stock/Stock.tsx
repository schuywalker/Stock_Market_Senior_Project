import { Button, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";

const Stock = (props: any) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const stockName: string = props.name;
    const stockTicker: string = props.ticker;
    const stockprice: number = props.price;
    const stockPerChg: number = props.perChg;
    const stockPerChgStatus: string =
        stockPerChg > 0
            ? colors.green[500]
            : stockPerChg === 0
            ? colors.grey[100]
            : colors.red[500];

    const [changeStockColor, setChangeStockColor] = useState("");

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
                            {stockPerChg}%
                        </Typography>
                        <Typography>Price$$</Typography>
                    </Box>
                    <Typography sx={{ fontSize: theme.typography.h5 }} component="div">
                        {stockName} - {stockTicker}
                    </Typography>
                    <Typography sx={{ fontSize: theme.typography.h6 }}>
                        price: {stockprice}
                    </Typography>
                    <Button sx={{ bgcolor: colors.green[500] }}>Refresh Price</Button>
                </CardContent>
            </Card>
        </>
    );
};

export default Stock;
