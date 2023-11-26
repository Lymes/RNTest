import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '~screens/Home/HomeScreen';
import {RootStackParamList} from '~navigation/RootStackPrams';
import {Button} from 'react-native';
import {useAuth} from '~hooks/useAuth';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppStack = () => {
  const auth = useAuth();
  const signOut = () => {
    auth.signOut();
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          // headerTitle: props => <LogoTitle {...props} />,
          headerRight: () => <Button title="Sign Out" onPress={signOut} />,
        }}
      />
    </Stack.Navigator>
  );
};
