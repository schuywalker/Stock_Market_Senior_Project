import {Box, Typography, useTheme} from '@mui/material'
import {tokens} from '../../../theme'
import responseFormat from '../AssetScreenerInterfaces/responseFormat'

const PriceMetrics = (priceMetrics?: responseFormat) => {
    const theme = useTheme()

    return (
        <>
            <Box sx={{m: 2}}>
                {priceMetrics &&
                    priceMetrics.contents.map((item: [string, unknown]) => {
                        return (
                            <Box sx={{display: 'flex'}}>
                                <Box sx={{flexGrow: 1}}>
                                    <Typography sx={{fontSize: theme.typography.h5, mr: 3}}>{item[0]}</Typography>
                                </Box>
                                <Box>
                                    <Typography sx={{fontSize: theme.typography.h5}}>{item[1] ? (item[1] as number) : 'N/A'}</Typography>
                                </Box>
                            </Box>
                        )
                    })}
            </Box>
        </>
    )
}

export default PriceMetrics
