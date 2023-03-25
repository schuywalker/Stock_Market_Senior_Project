import {Button, useTheme} from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import {useContext} from 'react'
import FinancialsModalButton from '../../scenes/watchlist/FinancialsModalButton'
import {ColorModeContext, tokens} from '../../theme'
import DisplayGroup from '../../scenes/watchlist/DisplayGroup'

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
    } = props
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext)

    const dailyChangeStatus: string =
        perChange > 0
            ? colors.green[400]
            : perChange === 0
            ? colors.grey[100]
            : colors.red[400]

    return (
        <>
            <Card
                flex-basis="200px"
                sx={{
                    // size cards based on breakpoints like below
                    // width: { xs: "100%", sm: "100%", md: "100%", lg: "100%", xl: "100%" },
                    width: '18%', // this is finally getting closer, but with this, we always have 5 per line. Want them to get smaller/ reduce # per line (which happens without width:"x%")
                    m: '.5em',
                    bgcolor: dailyChangeStatus,
                    color: colors.primary[900],
                }}
            >
                <CardContent sx={{p: 1, '&:last-child': {pb: 1}}}>
                    <Box display="flex">
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
                            sx={{
                                flexGrow: 1,
                                fontSize: theme.typography.h5,
                            }}
                        >
                            price: {price}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: theme.typography.h5,
                            }}
                        >
                            {perChange}%
                        </Typography>
                    </Box>
                    <Box>
                        {/* <Typography>earnings: {earnings}</Typography> */}
                        <Typography sx={{fontSize: theme.typography.h5}}>
                            market capitalization: {marketCap}
                        </Typography>
                        <Typography>peRatio: {peRatio}</Typography>
                        <Typography>peRatioTTM: {peRatioTTM}</Typography>
                        <Typography>dividendYield: {dividendYield}</Typography>
                    </Box>
                    <Box sx={{mt: 3}}>
                        <FinancialsModalButton ticker={ticker} />
                    </Box>
                </CardContent>
            </Card>
        </>
    )
}

export default Stock
