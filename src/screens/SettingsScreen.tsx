import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const SettingsScreen = () => {
  // Access the theme from ThemeContext
  const { theme } = useContext(ThemeContext); 

  // If theme is not available, return null to prevent rendering issues
  if (!theme) {
    return null; 
  }
  return (
    <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, { backgroundColor: theme.background }]}>
      <Text style={{color: theme.placeholderText}}>Settings Page</Text>
    </View>
  );
};

export default SettingsScreen;
