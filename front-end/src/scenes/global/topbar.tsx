import SearchIcon from '@mui/icons-material/Search'
import {Box, useTheme} from '@mui/material'
import InputBase from '@mui/material/InputBase'
import {useContext} from 'react'
import {ColorModeContext, tokens} from '../../theme'

const Topbar = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext)
    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            <Box display="flex" color={colors.green[100]} borderRadius="3px">
                <InputBase sx={{ml: 2, flex: 1}} placeholder="Search" />
                <SearchIcon />
            </Box>
        </Box>
    )
}

export default Topbar
