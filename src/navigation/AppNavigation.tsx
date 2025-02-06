import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
//import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ListScreen from '../screens/ListScreen';
import ScanScreen from '../screens/ScanScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DetailScreen from '../screens/DetailScreen';
import Header from '../components/Header';

// Create tab and stack navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Define stack navigator for the List screen with a nested Detail screen
function ListStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={ListScreen} options={{ header: () => <Header /> }} />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={({ navigation }) => ({
          title: 'Plant Details',
          headerStyle: { backgroundColor: '#2E8B57' },
          headerTintColor: '#fff',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
              <Ionicons name="arrow-back-outline" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

// Main bottom tab navigator
export default function AppNavigation() {
  return (
    
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            switch (route.name) {
              case 'List':
                iconName = 'list-outline';
                break;
              case 'Scan':
                iconName = 'camera-outline';
                break;
              case 'Settings':
                iconName = 'settings-outline';
                break;
              case 'Profile':
                iconName = 'person-outline';
                break;
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2E8B57', // Active color
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: '#fff', paddingBottom: 5, height: 60 },
        })}
      >
        <Tab.Screen name="List" component={ListStack} options={{ headerShown: false }} />
        <Tab.Screen name="Scan" component={ScanScreen} options={{ header: () => <Header />, }}/>
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ header: () => <Header />, }}/>
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ header: () => <Header />, }}/>
      </Tab.Navigator>
   
  );
}

