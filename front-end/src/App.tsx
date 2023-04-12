import {Route, Routes, useNavigate} from 'react-router-dom'
import './App.css'
import ResponsiveAppBar from './scenes/global/AppBar'
import ResponsiveSideBar from './scenes/global/sidebar'
import AnalystCalls from './scenes/dashboard/AnalystCalls'
import Watchlist from './scenes/watchlist/Watchlist'
import {ColorModeContext, useMode} from './theme'
import {Box, Button, CssBaseline, PaletteMode, ThemeProvider} from '@mui/material'
import {useState} from 'react'
import Stock from './components/stock/Stock'
import {ProSidebarProvider} from 'react-pro-sidebar'
import Cookies from 'universal-cookie';
import AccountManagement from './components/AccountManagement'
import LandingPage from './scenes/LandingPage'

const cookies = new Cookies();

function App() {
    const {theme, colorMode} = useMode()
    const [loggedIn,setLoggedIn] = useState((cookies.get("user")?true:false));//Need to check if cookie is valid and user/password is correct

    const navigate = useNavigate();
    const handleLogin = (value: boolean)=>{
        if(!value){
            navigate("/")
        }
        else{
            navigate("/analyst-calls")
        }
        setLoggedIn(value)
    }

    return (
        <>
            {/* <ColorModeContext.Provider value = {{toggleColorMode}}> */}
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className="App">
                        <div className="content">
                            <ResponsiveAppBar loginFunction={(value:boolean)=>handleLogin(value)} loggedIn = {loggedIn}/>
                            <Box sx={{display: 'flex', position: 'relative'}}>
                                <ProSidebarProvider>
                                    <ResponsiveSideBar loggedIn = {loggedIn} />
                                </ProSidebarProvider>

                                <Routes>
                                    {/* <Route path="/" element={<Home />}/> */}
                                    <Route
                                        path="/"
                                        element={<LandingPage />}
                                    />
                                    <Route
                                        path="/watchlist"
                                        element={<Watchlist />}
                                    />
                                    <Route
                                        path="/analyst-calls"
                                        element={<AnalystCalls />}
                                    />
                                    <Route
                                        path="/account"
                                        element={<AccountManagement />}
                                    />
                                    {/* <Route path="*" element={<NotFound />} /> */}
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
