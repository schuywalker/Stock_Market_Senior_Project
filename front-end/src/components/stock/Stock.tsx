import { Button, Modal, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";

const Stock = (props: any) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const modalStyle = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

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

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // financialInfo === null
    //             ? getDetailedFinancialInfo()
    //             : console.log("already have financial info");

    useEffect(() => {
        console.log("useEffect");
        getDetailedFinancialInfo();
    }, [open]);

    const [financialInfo, setFinancialInfo] = useState(null);
    const getDetailedFinancialInfo = async () => {
        if (financialInfo !== null) {
            console.log("already have financial info");
            return;
        }
        try {
            const response = await fetch(
                `http://127.0.0.1:8080/basicFinancials?ticker=${props.ticker}`
            );
            // .then((response) => response.json())
            // .then((financials) => setFinancialInfo(financials.data));

            setFinancialInfo(await response.json());
        } catch (err) {
            console.log(err);
        }
    };

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
                    <Button sx={{ bgcolor: colors.green[400] }}>Refresh Price</Button>
                    <Button onClick={handleOpen} sx={{ ml: "3em", bgcolor: colors.blue[400] }}>
                        More Info
                    </Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="child-modal-title"
                        aria-describedby="child-modal-description"
                    >
                        <Box sx={{ ...modalStyle, width: 200 }}>
                            {financialInfo}
                            <Button onClick={handleClose}>Close Child Modal</Button>
                        </Box>
                    </Modal>
                </CardContent>
            </Card>
        </>
    );
};

export default Stock;
