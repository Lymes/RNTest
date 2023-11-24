import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './features/Login/LoginScreen';
import SettingsScreen from './features/Login/Settings/SettingsScreen';
import BluetoothScreen from './features/Login/Bluetooth/BluetoothScreen';
import {RootStackParamList} from './navigation/RootStackPrams';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    /*
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Group screenOptions={{presentation: 'modal'}}>
          <RootStack.Screen name="BLE" component={BluetoothScreen} />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
    */
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Group>
          <RootStack.Screen
            options={{headerShown: false}}
            name="Login"
            component={LoginScreen}
          />
        </RootStack.Group>
        <RootStack.Group screenOptions={{presentation: 'modal'}}>
          <RootStack.Screen name="Settings" component={SettingsScreen} />
          <RootStack.Screen name="BLE" component={BluetoothScreen} />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
