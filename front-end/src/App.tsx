import {Box, CssBaseline, ThemeProvider} from '@mui/material'
import {useEffect, useState} from 'react'
import {ProSidebarProvider} from 'react-pro-sidebar'
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import Cookies from 'universal-cookie'
import './App.css'
import AccountManagement from './components/AccountManagement'
import Sandbox from './components/Sandbox'
import LandingPage from './scenes/LandingPage'
import AnalystCalls from './scenes/dashboard/AnalystCalls'
import Dashboard from './scenes/dashboard/Dashboard'
import ResponsiveAppBar from './scenes/global/AppBar'
import ResponsiveSideBar from './scenes/global/sidebar'
import {ColorModeContext, useMode} from './theme'
import AssetScreener from './scenes/asset_screener/AssetScreener'

const cookies = new Cookies()

function App() {
    const {theme, colorMode} = useMode()
    const [initialLogin, setInitialLogin] = useState(false)
    const [loggedIn, setLoggedIn] = useState(cookies.get('user') ? true : false) //Need to check if cookie is valid and user/password is correct
    const [username, setUsername] = useState('')

    const navigate = useNavigate()
    const handleLogin = (value: boolean) => {
        if (!value) {
            navigate('/')
            setUsername('')
        } else {
            navigate('/dashboard')
            setUsername(cookies.get('user'))
        }
        setLoggedIn(value)
    }
    useEffect(() => {
        if (!initialLogin && loggedIn) {
            navigate('/dashboard')
            setUsername(cookies.get('user'))
        }
        setInitialLogin(true)
    }, [])

    return (
        <>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className="App">
                        <div className="content">
                            <ResponsiveAppBar loginFunction={(value: boolean) => handleLogin(value)} loggedIn={loggedIn} />
                            <Box sx={{display: 'flex', position: 'relative'}}>
                                <ProSidebarProvider>
                                    <ResponsiveSideBar
                                        loggedIn={loggedIn}
                                        loginFunction={(value: boolean) => {
                                            handleLogin(value)
                                        }}
                                        username={username}
                                    />
                                </ProSidebarProvider>

                                <Routes>
                                    <Route path="/" element={<LandingPage />} />
                                    <Route path="/dashboard" element={loggedIn ? <Dashboard /> : <Navigate to="/" />} />
                                    <Route path="/analyst-calls" element={loggedIn ? <AnalystCalls /> : <Navigate to="/" />} />
                                    <Route
                                        path="/account"
                                        element={
                                            loggedIn ? (
                                                <AccountManagement
                                                    updateUsername={(val: string) => setUsername(val)}
                                                    loggedInFunction={(val: boolean) => setLoggedIn(val)}
                                                />
                                            ) : (
                                                <Navigate to="/" />
                                            )
                                        }
                                    />
                                    <Route path="/sandbox" element={loggedIn ? <Sandbox /> : <Navigate to="/" />} />
                                    <Route path="/asset-screener" element={<AssetScreener />} />
                                    <Route path="*" element={<Navigate to="/" />} />
                                </Routes>
                            </Box>
                        </div>
                    </div>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </>
    )
}

export default App
