import {createContext, useState, useMemo} from 'react'
import {createTheme, ThemeOptions} from '@mui/material/styles'
import {PaletteMode, Theme} from '@mui/material'

// TODO:
// fix font sizes. h1-h3 are way too big
// light mode
// related to light mode but font color.. white font is a little too bright
// pick font weights. we can use bold bolder etc or numbers. 900 honestly looks pretty good on all of them...

// color design tokens aka theme shades
export const tokens = (mode: string) => ({
    ...(mode === 'dark'
        ? {
              grey: {
                  100: '#e0e0e0',
                  200: '#c2c2c2',
                  300: '#a3a3a3',
                  400: '#858585',
                  500: '#666666',
                  600: '#525252',
                  700: '#3d3d3d',
                  800: '#292929',
                  900: '#141414',
              },
              primary: {
                  100: '#d0d1d5',
                  200: '#a1a4aa',
                  300: '#727680',
                  400: '#434955',
                  500: '#141b2b',
                  600: '#101622',
                  700: '#0c101a',
                  800: '#080b11',
                  900: '#040509',
              },
              green: {
                  100: '#dbf5ee',
                  200: '#b7ebde',
                  300: '#94e2cd',
                  400: '#70d8bd',
                  500: '#4cceac',
                  600: '#3da58a',
                  700: '#2e7c67',
                  800: '#1e5245',
                  900: '#0f2922',
              },
              red: {
                  100: '#f8dcdb',
                  200: '#f1b9b7',
                  300: '#e99592',
                  400: '#e2726e',
                  500: '#db4f4a',
                  600: '#af3f3b',
                  700: '#832f2c',
                  800: '#58201e',
                  900: '#2c100f',
              },
              blue: {
                  100: '#e1e2fe',
                  200: '#c3c6fd',
                  300: '#a4a9fc',
                  400: '#868dfb',
                  500: '#6870fa',
                  600: '#535ac8',
                  700: '#3e4396',
                  800: '#2a2d64',
                  900: '#151632',
              },
          }
        : // light mode
          {
              grey: {
                  100: '#141414',
                  200: '#292929',
                  300: '#3d3d3d',
                  400: '#525252',
                  500: '#666666',
                  600: '#858585',
                  700: '#a3a3a3',
                  800: '#c2c2c2',
                  900: '#e0e0e0',
              },
              primary: {
                  100: '#040509',
                  200: '#080b11',
                  300: '#0c101a',
                  400: '#101622',
                  500: '#141b2b',
                  600: '#434955',
                  700: '#727680',
                  800: '#a1a4aa',
                  900: '#d0d1d5',
              },
              green: {
                  100: '#0f2922',
                  200: '#1e5245',
                  300: '#2e7c67',
                  400: '#3da58a',
                  500: '#4cceac',
                  600: '#70d8bd',
                  700: '#94e2cd',
                  800: '#b7ebde',
                  900: '#dbf5ee',
              },
              red: {
                  100: '#2c100f',
                  200: '#58201e',
                  300: '#832f2c',
                  400: '#af3f3b',
                  500: '#db4f4a',
                  600: '#e2726e',
                  700: '#e99592',
                  800: '#f1b9b7',
                  900: '#f8dcdb',
              },
              blue: {
                  100: '#151632',
                  200: '#2a2d64',
                  300: '#3e4396',
                  400: '#535ac8',
                  500: '#6870fa',
                  600: '#868dfb',
                  700: '#a4a9fc',
                  800: '#c3c6fd',
                  900: '#e1e2fe',
              },
          }),
})

// export function themeSettings(mode: PaletteMode) : ThemeOptions {
export function themeSettings(mode: PaletteMode): ThemeOptions {
    const colors = tokens(mode)
    return {
        palette: {
            mode: mode,
            ...(mode === 'dark'
                ? {
                      primary: {
                          main: colors.primary[500],
                      },
                      secondary: {
                          main: colors.green[500],
                      },
                      neutral: {
                          dark: colors.grey[700],
                          main: colors.grey[500],
                          light: colors.grey[100],
                      },
                      background: {
                          default: colors.primary[500],
                      },
                  }
                : {
                      primary: {
                          main: colors.primary[100],
                      },
                      secondary: {
                          main: colors.green[500],
                      },
                      neutral: {
                          dark: colors.grey[700],
                          main: colors.grey[500],
                          light: colors.grey[100],
                      },
                      background: {
                          default: '#fcfcfc', // white is too bright
                      },
                  }),
        },
        typography: {
            fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
            fontSize: 10,
            h1: {
                fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
                fontsize: 32,
                fontWeight: 900,
            },
            h2: {
                fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
                fontsize: 28,
                fontWeight: 900,
            },
            h3: {
                fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
                fontsize: 22,
                fontWeight: 900,
            },
            h4: {
                fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
                fontsize: 18,
                fontWeight: 900,
            },
            h5: {
                fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
                fontsize: 14,
                fontWeight: 900,
            },
            h6: {
                fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
                fontsize: 13,
                fontWeight: 600,
            },
        },
        components: {
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        fontSize: 14,
                    },
                },
            },
        },
    }
}

export const ColorModeContext = createContext({
    toggleColorMode: () => {},
})

export const useMode = () => {
    const [mode, setMode] = useState<PaletteMode>('dark')

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark')),
        }),
        []
    )

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

    return {theme, colorMode}
}
