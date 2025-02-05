// src/context/ThemeContext.tsx

import React, { createContext, useState, ReactNode } from 'react';
import { lightTheme, darkTheme } from '../styles/theme';

// Define the context type
interface ThemeContextType {
  theme: typeof lightTheme | typeof darkTheme;
  toggleTheme: () => void;
}

// Create the context with initial value
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define props for ThemeProvider
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // Default light mode

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
