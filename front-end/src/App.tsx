import { Route, Routes  } from "react-router-dom";
import "./App.css";
import ResponsiveAppBar from "./components/AppBar";
import AnalystCalls from "./scenes/dashboard/AnalystCalls";
import Watchlist from "./scenes/watchlist/Watchlist";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { useState } from "react";
import Stock from "./components/stock/Stock"




function App() {
    
    const {theme, colorMode} = useMode()

    

    return (
        <>
        {/* <ColorModeContext.Provider value = {{toggleColorMode}}> */}
        <ColorModeContext.Provider value = {colorMode}>
        <ThemeProvider theme={theme}>    
                <CssBaseline />
            <div className="App">  
                    <div className="content">
                        <ResponsiveAppBar />
                        
                        <Routes>
                            {/* <Route path="/" element={<Home />}/> */}
                            <Route path="/Watchlist" element={<Watchlist />}/>
                            <Route path="/analyst-calls" element={<AnalystCalls />}/>
                            {/* <Route path="*" element={<NotFound />} /> */}
                        </Routes>
                    </div>
            </div>
            </ThemeProvider>
        </ColorModeContext.Provider>

        
        </>
    );
}

export default App;
