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
    const {name, ticker, price, perChange, earnings, threeArticles, marketCap, forwardPE, dividendYield} = props
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext)

    const dailyChangeStatus: string = perChange > 0 ? colors.green[400] : perChange === 0 ? colors.grey[100] : colors.red[300]

    return (
        <>
            <Card
                sx={{
                    m: '.5em',
                    bgcolor: dailyChangeStatus,
                    color: colors.primary[900],
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
                            }}
                        >
                            {perChange === null ? 'Bad Data' : (perChange as number).toFixed(2) + ' %'}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            pt: 1,
                            '& .MuiTypography-root': {
                                fontSize: theme.typography.h5,
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
                                <Typography>market cap (M): </Typography>
                                <Typography>forward P/E: </Typography>
                                {/* <Typography>peRatioTTM: </Typography> */}
                                <Typography>dividendYield: </Typography>
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
                                        : (marketCap as number).toLocaleString(undefined, {
                                              maximumFractionDigits: 0,
                                          })}
                                </Typography>
                                <Typography>{!forwardPE ? 'N/A' : (forwardPE as number).toFixed(2)}</Typography>
                                {/* <Typography>{!peRatioTTM ? 'N/A' : (peRatioTTM as number).toFixed(2)}</Typography> */}
                                <Typography>{!dividendYield ? 'None' : (dividendYield as number).toFixed(2) + ' %'}</Typography>
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
