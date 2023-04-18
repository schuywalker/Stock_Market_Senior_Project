import {Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import './App.css'
import ResponsiveAppBar from './scenes/global/AppBar'
import ResponsiveSideBar from './scenes/global/sidebar'
import AnalystCalls from './scenes/dashboard/AnalystCalls'
import Watchlist from './scenes/watchlist/Watchlist'
import {ColorModeContext, useMode} from './theme'
import {Box, CssBaseline, ThemeProvider} from '@mui/material'
import {useEffect, useState} from 'react'
import {ProSidebarProvider} from 'react-pro-sidebar'
import Cookies from 'universal-cookie';
import AccountManagement from './components/AccountManagement'
import LandingPage from './scenes/LandingPage'

const cookies = new Cookies();

function App() {
    const {theme, colorMode} = useMode()
    const[initialLogin, setInitialLogin] = useState(false);
    const [loggedIn,setLoggedIn] = useState((cookies.get("user")?true:false));//Need to check if cookie is valid and user/password is correct
    const [username,setUsername] = useState("")

    const navigate = useNavigate();
    const handleLogin = (value: boolean)=>{
        if(!value){
            navigate("/")
            setUsername("")
        }
        else{
            navigate("/analyst-calls")
            setUsername(cookies.get('user'))
        }
        setLoggedIn(value)
    }
    useEffect(()=>{
        if(!initialLogin && loggedIn){
            navigate("/analyst-calls")
            setUsername(cookies.get('user'))
        }
        setInitialLogin(true)
    },[])

    useEffect(()=>{
        let url = window.location.href
        let parts = url.split('/')
        let route = parts.filter(elm=>elm)
        if(!loggedIn && route.length > 2)navigate("/")
    },[window.location.href])

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
                                    <ResponsiveSideBar loggedIn = {loggedIn} loginFunction = {(value:boolean)=>{handleLogin(value)}} username={username}/>
                                </ProSidebarProvider>

                                <Routes>
                                    {/* <Route path="/" element={<Home />}/> */}
                                    <Route
                                        path="/"
                                        element={<LandingPage />}
                                    />
                                    <Route
                                        path="/watchlist"
                                        element={(loggedIn?<Watchlist />:<></>)}
                                    />
                                    <Route
                                        path="/analyst-calls"
                                        element={(loggedIn?<AnalystCalls />:<></>)}
                                    />
                                    <Route
                                        path="/account"
                                        element={(loggedIn?<AccountManagement updateUsername = {(val:string)=>setUsername(val)}/>:<></>)}
                                    />
                                    <Route
                                        path="*"
                                        element={<Navigate to="/"/>}
                                    />
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
