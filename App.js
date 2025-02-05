import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PlantProvider } from './src/context/PlantContext';
import AppNavigation from './src/navigation/AppNavigation';

export default function App() {
  return (
    <PlantProvider>
      {/* <NavigationContainer> */}
        <AppNavigation />
      {/* </NavigationContainer> */}
    </PlantProvider>
  );
}
