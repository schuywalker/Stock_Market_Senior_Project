import { Box, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";

const AnalystCalls = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    return (
        <>
            <div></div>
            <Box display="flex" color={colors.green[100]} borderRadius="3px">
                <Button variant="outlined" sx={{ m: 5, color: colors.primary[400] } }href="http://127.0.0.1:8080/returnString">
                    BUY TESLA!!!
                </Button>
            </Box>
        </>
    );
};

export default AnalystCalls;
