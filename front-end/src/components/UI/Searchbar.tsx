import {
    Autocomplete,
    Chip,
    IconButton,
    InputBase,
    Paper,
    Stack,
    TextField,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import sp100 from '../../assets/sp100'

const Searchbar = () => {
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
                    options={sp100.map((option) => option.ticker)}
                    onChange={(e, value) => console.log(value)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            sx={{borderColor: 'transparent'}}
                            label="Enter Tickers to Add"
                        />
                    )}
                />
            </Paper>
        </>
    )
}
export default Searchbar
