import {Autocomplete, Box, Button, FormControlLabel, IconButton, Paper, Slide, Switch, TextField, Typography, useTheme} from '@mui/material'
import React, {ReactNode, useContext, useEffect, useState} from 'react'
import SearchIcon from '@mui/icons-material/Search'
import sp100 from '../../assets/sp100'
import {ColorModeContext, tokens} from '../../theme'
import {JsonObjectExpression} from 'typescript'

interface responseItem {
    key: string
    value: string
}
// https://stackoverflow.com/questions/22885995/how-do-i-initialize-a-typescript-object-with-a-json-object

const AssetScreener = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const [financialInfoJson, setFinancialInfoJson] = useState<null | [string, unknown][]>(null)
    const [currentTicker, setCurrentTicker] = useState<string | null>('')

    useEffect(() => {}, [currentTicker])
    useEffect(() => {
        console.log(financialInfoJson)
    }, [financialInfoJson])

    const handleNewSearch = async (ticker: string | null | undefined) => {
        if (!ticker) {
            console.log('null ticker')
            return
        }
        try {
            console.log('currentTicker: ', currentTicker)
            const response = await fetch(`http://127.0.0.1:8080/basicFinancials?ticker=${ticker}`)
                .then((response) => response.json())
                .then((jsonResponse) => {
                    setFinancialInfoJson(Object.entries(jsonResponse))
                })
        } catch (err) {
            console.log(err)
        }
    }

    /*
Todo:
autocomplete
slide: expand and collapse when search button clicked
Tabs for categories of data
chart (separate branch)
*backend* handle stocks that dont return because of exchange API error (e.g. lyft, BRK.A)
*/

    return (
        <>
            <Box sx={{border: 0, p: 1, flexGrow: 1}}>
                <Box sx={{}}>
                    <Box sx={{display: 'flex', flexGrow: 1}}></Box>
                    <Box sx={{display: 'flex', flexShrink: 1}}>
                        <Paper
                            sx={{
                                m: 1,
                                p: '2px 4px',
                                display: 'flex',
                                alignItems: 'center',
                                bgcolor: colors.primary[400],
                            }}
                        >
                            <IconButton type="button" sx={{p: '10px'}} aria-label="search">
                                <SearchIcon />
                            </IconButton>

                            <TextField
                                id="standard-search"
                                label="search ticker"
                                type="search"
                                variant="standard"
                                sx={{flexGrow: 1, m: 0.5}}
                                inputProps={{style: {fontSize: theme.typography.h5.fontSize}}}
                                InputLabelProps={{
                                    style: {fontSize: theme.typography.h6.fontSize},
                                }}
                                onChange={(e) => setCurrentTicker(e.target.value)}
                            />
                            <Button sx={{backgroundColor: colors.green[300], margin: 1, ml: 3}} onClick={() => handleNewSearch(currentTicker)}>
                                Search
                            </Button>
                        </Paper>
                    </Box>
                </Box>
                <Typography sx={{fontSize: theme.typography.h5}}>{financialInfoJson ? (financialInfoJson[0] as ReactNode) : <></>}</Typography>
                <Box sx={{m: 2}}>
                    {financialInfoJson ? (
                        // financialInfoJson[0][0]

                        financialInfoJson.map((item: [string, unknown]) => {
                            return (
                                <Box sx={{display: 'flex'}}>
                                    <Box sx={{flexGrow: 1}}>
                                        <Typography sx={{fontSize: theme.typography.h5, mr: 3}}>{item[0]}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{fontSize: theme.typography.h5}}>{item[1] as number}</Typography>
                                    </Box>
                                </Box>
                            )
                        })
                    ) : (
                        <></>
                    )}
                </Box>
            </Box>
        </>
    )
}
export default AssetScreener
