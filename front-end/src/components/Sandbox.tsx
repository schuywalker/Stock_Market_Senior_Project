import React from 'react'

import {useTheme} from '@mui/material/styles'
import {Box, Typography} from '@mui/material'
import {TestGraph} from '../scenes/graphicalInfo/TestGraph'
const Sandbox = () => {
    return (
        <>
            <Box>
                <Typography>Use this area to test, prototype, or show examples of your components</Typography>
            </Box>
            <TestGraph />
        </>
    )
}
export default Sandbox
