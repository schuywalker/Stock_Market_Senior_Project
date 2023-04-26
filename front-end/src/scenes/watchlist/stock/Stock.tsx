import {useTheme} from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import {useContext} from 'react'
import DisplayGroup from '../DisplayGroup'
import FinancialsModalButton from '../FinancialsModalButton'
import {ColorModeContext, tokens} from '../../../theme'

const Stock = (props: DisplayGroup) => {
    const {name, ticker, price, perChange, earnings, marketCap, forwardPE, dividendYield} = props
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext)

    const dailyChangeStatusColor: string = perChange > 0 ? colors.green[600] : perChange === 0 ? colors.primary[200] : colors.red[600]

    return (
        <>
            <Card
                sx={{
                    m: '.5em',

                    color: colors.primary[200], // if dark mode...
                }}
            >
                <CardContent
                    sx={{
                        p: 1,
                        '&:last-child': {pb: 1},
                    }}
                >
                    <Box
                        // Title and price
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: theme.typography.h4,
                            }}
                        >
                            {ticker}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: theme.typography.h4,
                            }}
                        >
                            ${(price as number).toFixed(2)}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography
                            noWrap
                            sx={{
                                fontSize: theme.typography.h6,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '70%',
                            }}
                        >
                            {name}
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: theme.typography.h5,
                                color: dailyChangeStatusColor,
                            }}
                        >
                            {perChange === null ? 'Bad Data' : (perChange * 100.0).toFixed(2) + ' %'}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            pt: 1,
                            '& .MuiTypography-root': {
                                fontSize: theme.typography.h6,
                            },
                            display: 'grid',
                            gridAutoColumns: '1fr',
                        }}
                    >
                        {/* quick stats */}
                        <Box
                            sx={{
                                display: 'grid',
                                gridAutoFlow: 'row',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gridTemplateRows: 'repeat(2, 50px)',
                                gap: 1,
                            }}
                        >
                            <Box sx={{gridColumn: '1/3'}}>
                                <Typography>market cap: </Typography>
                                <Typography>forward P/E: </Typography>
                                <Typography>div. yield: </Typography>
                            </Box>
                            <Box
                                sx={{
                                    gridColumn: '4/5',
                                    textAlign: 'right',
                                }}
                            >
                                <Typography>
                                    $
                                    {!marketCap
                                        ? 'N/A'
                                        : (marketCap / 1000000.0).toLocaleString(undefined, {
                                              maximumFractionDigits: 1,
                                          }) + ' (M)'}
                                </Typography>
                                <Typography>{!forwardPE ? 'N/A' : (forwardPE as number).toFixed(2)}</Typography>
                                <Typography>{!dividendYield ? 'None' : ((dividendYield * 100) as number).toFixed(2) + ' %'}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{mt: 1, display: 'grid', gridAutoColumns: '1fr'}}>
                        {/* action buttons */}
                        <FinancialsModalButton ticker={ticker} />
                    </Box>
                </CardContent>
            </Card>
        </>
    )
}

export default Stock
