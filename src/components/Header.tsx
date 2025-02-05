import React, { useContext } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../context/ThemeContext';
import { darkTheme } from '../styles/theme';

const Header = () => {
    const themeContext = useContext(ThemeContext);
    const { theme, toggleTheme } = themeContext || {}; 

    if (!theme) {
        return <Text>Loading theme...</Text>;
      }
  return (
   
    <View style={[styles.headerContainer, { backgroundColor: theme.primary }]}>
      <Ionicons name="leaf-outline" size={28} color="#fff" style={styles.icon} />
      <Text style={[styles.headerTitle, { color: theme.text }]}>Plant Photo Saver</Text>
      
      <Switch
        value={theme === darkTheme}
        onValueChange={toggleTheme}
        trackColor={{ false: theme.buttonBackground, true: theme.buttonText }}
        thumbColor={theme.buttonText}
      />
    </View>
  );
};


export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E8B57',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  icon: {
    marginTop: 2,
  },
});


