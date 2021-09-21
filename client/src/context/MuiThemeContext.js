import React, { useContext } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UIThemeContext } from "./UIThemeContext";

function MUIThemeProvider({ children }){

  const { colorTheme } = useContext(UIThemeContext) 

  const MuiTheme = createTheme({
    palette:{
      mode: colorTheme === 'light' ? 'dark' : 'light'
    },
    typography: {
      fontFamily: [
        'Poppins',
        'sans-serif'
      ].join(','),
    }
  });

  return (
    <ThemeProvider theme = {MuiTheme}>
        {children}
    </ThemeProvider>
  )
}

export default MUIThemeProvider