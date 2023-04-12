import {useTheme} from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import * as React from 'react'
import Cookies from 'universal-cookie'
import LoginForm from '../../components/LoginForm'
import SignUpForm from '../../components/SignUpForm'
import {tokens} from '../../theme'

const cookies = new Cookies()

function ResponsiveAppBar(props: any) {
    const [showAccountCreation, setShowAccountCreation] = React.useState(false)
    const [showAccountLogin, setShowAccountLogin] = React.useState(false)
    const setLoggedIn = props.loginFunction

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const buttonStyle = {
        background: colors.green[300],
        '&:hover': {
            background: 'grey',
            color: colors.green[400],
        },
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{justifyContent: 'right'}}>
                    <Box sx={{display: 'flex', columnGap: 2}}>
                        <div style={{display: props.loggedIn ? 'none' : ''}}>
                            <Button
                                sx={buttonStyle}
                                onClick={() => setShowAccountCreation(true)}
                            >
                                Create Account
                            </Button>
                            <SignUpForm
                                open={showAccountCreation}
                                close={() => setShowAccountCreation(false)}
                                login={() => {
                                    setLoggedIn(true)
                                }}
                            />
                        </div>
                        <Button
                            sx={buttonStyle}
                            onClick={() => {
                                if (props.loggedIn) {
                                    cookies.remove('user')
                                    cookies.remove('password')
                                    cookies.remove("user_id");
                                    setLoggedIn(false)
                                } else {
                                    setShowAccountLogin(true)
                                }
                            }}
                        >
                            {props.loggedIn ? 'Logout' : 'Login'}
                        </Button>
                        <LoginForm
                            open={showAccountLogin}
                            close={() => setShowAccountLogin(false)}
                            login={() => {
                                setLoggedIn(true)
                            }}
                        />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default ResponsiveAppBar
