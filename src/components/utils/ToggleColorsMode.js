import React, { useState, useMemo, createContext } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'


export const ColorModeContext = createContext()
const ToggleColorsMode = ({ children }) => {
  const [mode, setMode] = useState('light')

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    }
  }), [mode])

  return (
    <ColorModeContext.Provider value={{ mode, setMode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default ToggleColorsMode