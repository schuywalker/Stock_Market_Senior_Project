import { useTheme } from "@mui/material";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { spacing } from '@mui/system';


const Stock = (props:any) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const stockStatus:string = colors.grey[500];
    const stockName:string = props.name;
    const stockTicker:string = props.ticker;

    return(
        <Card sx = {{minWidth: 275, m: '2em', bgcolor: stockStatus}}>
            <CardContent>
                <Typography sx = {{fontSize: 14}} color={colors.green[100]} gutterBottom>
                    
                </Typography>
                <Typography variant="h5" component="div">
                    {stockName} - {stockTicker} 
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Stock;

// export default function OutlinedStock(){
//     return(
//         <Box sx={{minWidth:275}}>
//             <Stock variant = "outlined">{Stock}</Stock>
//         </Box>
//     );
// }