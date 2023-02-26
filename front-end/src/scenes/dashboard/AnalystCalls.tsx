import { Box, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import BasicTable from "../../components/table/BasicTable";


const AnalystCalls = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    return (
        <>
            <div><BasicTable/></div>
        </>
    );
};

export default AnalystCalls;
//http://127.0.0.1:8080/returnString
