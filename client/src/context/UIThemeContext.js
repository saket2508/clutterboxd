import React from "react";
import useTheme from "../hooks/useTheme";
export const UIThemeContext = React.createContext()

function UIThemeProvider({ children }){
  const {colorTheme, setTheme} = useTheme()

  return (
    <UIThemeContext.Provider value={{ colorTheme, setTheme }}>
      {children}
    </UIThemeContext.Provider>
  )
}

export default UIThemeProvider