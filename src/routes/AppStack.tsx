import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  RightMenuDrawerContent,
  RightMenuDrawer,
} from '~components/RightMenuDrawer';
import useTheme from '~hooks/useTheme';

const Drawer = createDrawerNavigator();

export const AppStack = () => {
  const theme = useTheme();
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
            backgroundColor: theme.colors.drawerBackground,
            width: 200,
          },
        }}
      />
    </Drawer.Navigator>
  );
};
