import {Box, Typography, useTheme} from '@mui/material'
import {tokens} from '../../../theme'
import responseFormat from '../AssetScreenerInterfaces/responseFormat'

interface financialsTabProps {
    balanceSheet: [string, any][] | null | undefined
    incomeStatement?: [string, any][] | null | undefined
    cashFlow?: [string, any][] | null | undefined
}

// const Financials = (balanceSheet?: responseFormat, cashFlow?: responseFormat, incomeStatement?: responseFormat) => {
const Financials = (props: financialsTabProps) => {
    const theme = useTheme()

    return (
        <>
            <Box sx={{my: 0.5}}>
                <Typography
                    sx={{
                        fontSize: theme.typography.h4,
                    }}
                >
                    Balance Sheet
                </Typography>
                <Box sx={{m: 2}}>
                    {props.balanceSheet &&
                        props.balanceSheet.map((item: [string, unknown], i) => {
                            return (
                                <Box sx={{display: 'flex'}} key={i}>
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
            </Box>
            <Box sx={{my: 0.5}}>
                <Typography
                    sx={{
                        fontSize: theme.typography.h4,
                    }}
                >
                    Income Statement
                </Typography>
                <Box sx={{m: 2}}>
                    {props.incomeStatement &&
                        props.incomeStatement.map((item: [string, unknown], i) => {
                            return (
                                <Box sx={{display: 'flex'}} key={i}>
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
            </Box>
            <Box sx={{my: 0.5}}>
                <Typography
                    sx={{
                        fontSize: theme.typography.h4,
                    }}
                >
                    Cash Flow
                </Typography>
                <Box sx={{m: 2}}>
                    {props.cashFlow &&
                        props.cashFlow.map((item: [string, unknown], i) => {
                            return (
                                <Box sx={{display: 'flex'}} key={i}>
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
            </Box>
        </>
    )
}

export default Financials
