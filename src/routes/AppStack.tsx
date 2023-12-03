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
          drawerStatusBarAnimation: 'none',
          drawerHideStatusBarOnOpen: false,
          drawerType: 'front',
          headerShown: false,
          drawerPosition: 'right',
          drawerStyle: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'black',
            width: 200,
          },
        }}
      />
    </Drawer.Navigator>
  );
};
