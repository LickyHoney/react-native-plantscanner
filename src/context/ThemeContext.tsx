import React, { createContext, useState, ReactNode } from 'react';
import { lightTheme, darkTheme } from '../styles/theme';

// Define the structure of the ThemeContext
interface ThemeContextType {
  theme: typeof lightTheme | typeof darkTheme;
  toggleTheme: () => void;
}

// Create a ThemeContext with an initial undefined value
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define the props type for the ThemeProvider component
interface ThemeProviderProps {
  children: ReactNode;
}

// ThemeProvider component manages the theme state and provides it to the app
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // Default light mode

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Determine the active theme based on the isDarkMode state
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
