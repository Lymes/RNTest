import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './features/Login/LoginScreen';
import SettingsScreen from './features/Login/Settings/SettingsScreen';

const RootStack = createNativeStackNavigator();

function App() {
  return (
    // <NavigationContainer>
    //   <RootStack.Navigator>
    //     <RootStack.Group screenOptions={{presentation: 'modal'}}>
    //       <RootStack.Screen name="Settings" component={SettingsScreen} />
    //     </RootStack.Group>
    //   </RootStack.Navigator>
    // </NavigationContainer>

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
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
