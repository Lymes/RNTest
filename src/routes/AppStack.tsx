import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  RightMenuDrawerContent,
  RightMenuDrawer,
} from '~components/RightMenuDrawer';

const Drawer = createDrawerNavigator();

export const AppStack = () => {
  return (
    <Drawer.Navigator drawerContent={RightMenuDrawerContent}>
      <Drawer.Screen
        name="RightMenuDrawer"
        component={RightMenuDrawer}
        options={{
          headerShown: false,
          drawerPosition: 'right',
          title: 'Menu',
          drawerActiveTintColor: 'white',
          drawerLabelStyle: {fontSize: 20},
          drawerStyle: {
            backgroundColor: '#c6cbef',
            width: 240,
          },
        }}
      />
    </Drawer.Navigator>
  );
};
