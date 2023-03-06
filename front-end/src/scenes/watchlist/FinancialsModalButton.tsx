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
    bgcolor: colors.primary[400],
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
  };

  const [financialInfo, setFinancialInfo] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    getDetailedFinancialInfo();
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    console.log("useEffect");
  }, []);

  const getDetailedFinancialInfo = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8080/basicFinancials?ticker=${props.ticker}`
      ).then((response) => response.json());
      // console.log(response);
      setFinancialInfo(JSON.stringify(response, null, 4) as unknown as string);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{ ml: "3em", bgcolor: colors.blue[400] }}
      >
        More Info
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...modalStyle }}>
          <Button onClick={handleClose}>Close</Button>
          <Typography id="modal-modal-title">Financials:</Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              fontSize: theme.typography.h6,
              color: colors.green[300],
            }}
          >
            {financialInfo ? financialInfo : <p>loading...</p>}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
export default FinancialsModalButton;
