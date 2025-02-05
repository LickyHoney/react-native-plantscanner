import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const ProfileScreen = () => {
   const { theme } = useContext(ThemeContext); 
   if (!theme) {
    return null; 
  }
  return (
    <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, { backgroundColor: theme.background }]}>
      <Text style={{color: theme.placeholderText}}>Profile Page</Text>
    </View>
  );
};

export default ProfileScreen;

