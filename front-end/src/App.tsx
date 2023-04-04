import {Route, Routes} from 'react-router-dom'
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

const cookies = new Cookies();

function App() {
    const {theme, colorMode} = useMode()
    const [loggedIn,setLoggedIn] = useState(false);

    return (
        <>
            {/* <ColorModeContext.Provider value = {{toggleColorMode}}> */}
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className="App">
                        <div className="content">
                            <ResponsiveAppBar loginFunction={(value:boolean)=>setLoggedIn(value)} loggedIn = {loggedIn}/>
                            <Box sx={{display: 'flex', position: 'relative'}}>
                                <ProSidebarProvider>
                                    <ResponsiveSideBar loggedIn = {loggedIn} />
                                </ProSidebarProvider>

                                <Routes>
                                    {/* <Route path="/" element={<Home />}/> */}
                                    <Route
                                        path="/watchlist"
                                        element={<Watchlist />}
                                    />
                                    <Route
                                        path="/analyst-calls"
                                        element={<AnalystCalls />}
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
