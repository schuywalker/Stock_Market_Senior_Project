import { Route, Routes } from "react-router-dom";
import "./App.css";
import ResponsiveAppBar from "./scenes/global/AppBar";
import ResponsiveSideBar from "./scenes/global/sidebar";
import AnalystCalls from "./scenes/dashboard/AnalystCalls";
import Watchlist from "./scenes/watchlist/Watchlist";
import { ColorModeContext, useMode } from "./theme";
import { Box, CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { useState } from "react";
import Stock from "./components/stock/Stock";
import { ProSidebarProvider } from "react-pro-sidebar";

function App() {
  const { theme, colorMode } = useMode();

  return (
    <>
      {/* <ColorModeContext.Provider value = {{toggleColorMode}}> */}
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="App">
            <div className="content">
              <ResponsiveAppBar />
              <Box sx={{ display: "flex", position: "relative" }}>
                <ProSidebarProvider>
                  <ResponsiveSideBar />
                </ProSidebarProvider>

                <Routes>
                  {/* <Route path="/" element={<Home />}/> */}
                  <Route path="/watchlist" element={<Watchlist />} />
                  <Route path="/analyst-calls" element={<AnalystCalls />} />
                  {/* <Route path="*" element={<NotFound />} /> */}
                </Routes>
              </Box>
            </div>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
