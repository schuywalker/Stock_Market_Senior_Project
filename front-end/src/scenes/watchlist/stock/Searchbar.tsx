import {Autocomplete, Chip, IconButton, InputBase, Paper, Stack, TextField, useTheme} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import sp100 from '../../../assets/sp100'
import {useEffect, useState} from 'react'

const Searchbar = (props: any) => {
    const theme = useTheme()
    const changeTickersFunction = props.changeTickersInWL

    const [watchlistAdditions, setWatchlistAdditions] = useState<string[]>([])
    useEffect(() => {
        changeTickersFunction(watchlistAdditions)
    }, [watchlistAdditions])

    return (
        <>
            <Paper
                component="form"
                sx={{
                    m: 1,
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: 'max',
                    flexGrow: 1,
                }}
            >
                <IconButton type="button" sx={{p: '10px'}} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <Autocomplete
                    multiple
                    id="tickerAutofill"
                    sx={{flex: 1, border: 0}}
                    freeSolo
                    options={/*tracked? tracked.map((option) => option.ticker) :*/ sp100.map((option) => option.ticker)}
                    onChange={(e, value) => {
                        setWatchlistAdditions(value)
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            sx={{
                                fontSize: theme.typography.h3,
                                borderColor: 'transparent',
                            }}
                            label="Enter Tickers to Add"
                            onChange={(event) => {}}
                        />
                    )}
                />
            </Paper>
        </>
    )
}
export default Searchbar
