import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './features/Login/LoginScreen';
import SettingsScreen from './features/Login/Settings/SettingsScreen';
import BluetoothScreen from './features/Login/Bluetooth/BluetoothScreen';
import {RootStackParamList} from './features/navigation/RootStackPrams';
import {GluestackUIProvider, Text} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';

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
    <GluestackUIProvider config={config}>
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
    </GluestackUIProvider>
  );
}
