import { Box, Button, Modal, Typography, useTheme } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { tokens } from "../../theme";

const FinancialsModalButton = (props: { ticker: string }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const modalStyle = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: colors.primary[400],
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
        display: "flex",
    };

    // const [financialInfo, setFinancialInfo] = useState([]);
    const [financialInfo, setFinancialInfo] = useState("");

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        getDetailedFinancialInfo();
    };
    const handleClose = () => setOpen(false);

    useEffect(() => {
        console.log("useEffect");
        // getDetailedFinancialInfo();
    }, []);

    const getDetailedFinancialInfo = async () => {
        // if (financialInfo !== null) {
        //     console.log("already have financial info");
        //     return;
        // }
        try {
            const response = await fetch(
                `http://127.0.0.1:8080/basicFinancials?ticker=${props.ticker}`
            ).then((response) => response.json());
            // .then((financials) => setFinancialInfo(financials.data));
            console.log(response);
            setFinancialInfo(JSON.stringify(response, null, 2) as unknown as string);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Button onClick={handleOpen} sx={{ ml: "3em", bgcolor: colors.blue[400] }}>
                More Info
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...modalStyle }}>
                    <Typography id="modal-modal-title">Financials:</Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {financialInfo ? (
                            financialInfo
                        ) : (
                            //     financialInfo.map((item: any, index: any) => (
                            //         <div key={index}>
                            //             {Object.entries(item).map(([key, value]) => (
                            //                 <p key={key}>
                            //                     {key}:{value as ReactNode}
                            //                     {/* {typeof value === "string" || typeof value === "number"
                            //                         ? value
                            //                         : JSON.stringify(value)} */}
                            //                 </p>
                            //             ))}
                            //         </div>
                            //     ))
                            <p>loading...</p>
                        )}
                    </Typography>
                    <Button onClick={handleClose}>Close Child Modal</Button>
                </Box>
            </Modal>
        </>
    );
};
export default FinancialsModalButton;
// {/* <Typography>{financialInfo.map((item:string,i:string) =>{
//                         return <p key={i}>{i}:{item}</p>
//                     })}</Typography> */}
