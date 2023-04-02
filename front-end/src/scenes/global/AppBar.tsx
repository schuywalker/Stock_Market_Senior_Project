import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import {Link} from 'react-router-dom'
import SignUpForm from '../../components/SignUpForm'
import { tokens } from '../../theme'
import { useTheme } from '@mui/material'
import Cookies from 'universal-cookie'

const cookies = new Cookies();

function ResponsiveAppBar( props: any) {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    )
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    )

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const [showAccountCreation, setShowAccountCreation] = React.useState(false);

    const setLoggedIn = props.loginFunction;
    

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return (
        <AppBar position="static" >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{marginRight: -30 ,justifyContent: "right"}}>
                <Box sx={{display: 'flex', columnGap: 2}}>
                                <Button sx={{background : colors.green[300]}}
                                 onClick = {()=>setShowAccountCreation(true)}>Create Account</Button>
                                    <SignUpForm
                                        open={showAccountCreation}
                                        close={() =>
                                            setShowAccountCreation(false)
                                        }
                                        login = {()=>{
                                            setLoggedIn(true);
                                        }}
                                    />
                                <Button sx={{background : colors.green[300]}}
                                onClick = {()=>{
                                    if(props.loggedIn){
                                        cookies.remove('user')
                                    }
                                    setLoggedIn(!props.loggedIn)
                                    }}
                                    >{props.loggedIn?"Logout":"Login"}</Button>
                        </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default ResponsiveAppBar
