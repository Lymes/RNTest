import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '~screens/Login/LoginScreen';
import {RootStackParamList} from '~navigation/RootStackPrams';
import SettingsScreen from '~screens/Login/Settings/SettingsScreen';
import BluetoothScreen from '~screens/Login/Bluetooth/BluetoothScreen';
import useTheme from '~hooks/useTheme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AuthStack = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={LoginScreen}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          contentStyle: {backgroundColor: theme.colors.background},
        }}>
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="BLE" component={BluetoothScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
