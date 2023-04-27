import React from 'react'

import {useTheme} from '@mui/material/styles'
import {Box, Button, Typography} from '@mui/material'
import axios from 'axios'
import { testMethod } from '../config/WebcallAPI'
import InsiderTradeTable from './table/InsiderTradeTable'

const Sandbox = () => {
    return (
        <>
            <Box sx={{display:"flex"}}>
                <InsiderTradeTable/>
            </Box>
        </>
    )
}
export default Sandbox
