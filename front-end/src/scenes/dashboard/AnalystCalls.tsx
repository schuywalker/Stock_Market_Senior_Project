import { Box, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import AnalystCallTable from "../../components/table/AnalystCallTable";


const AnalystCalls = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    return (
        <>
            <div><AnalystCallTable/></div>
        </>
    );
};

export default AnalystCalls;
//http://127.0.0.1:8080/returnString
