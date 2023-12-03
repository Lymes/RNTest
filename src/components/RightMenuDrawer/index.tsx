import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  DrawerScreenProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {ParamListBase} from '@react-navigation/native';
import {Button} from 'react-native';
import {View} from 'react-native-animatable';
import PrimaryButton from '~components/Buttons/PrimaryButton';
import {
  LeftMenuDrawer,
  LeftMenuDrawerContent,
} from '~components/LeftMenuDrawer';
import {useAuth} from '~hooks/useAuth';

type RightMenuDrawerProps = DrawerScreenProps<ParamListBase, 'RightMenuDrawer'>;

const LeftDrawer = createDrawerNavigator();

function RightMenuDrawer(props: RightMenuDrawerProps) {
  return (
    <LeftDrawer.Navigator drawerContent={LeftMenuDrawerContent}>
      <LeftDrawer.Screen
        name="LeftMenuDrawer"
        component={LeftMenuDrawer}
        options={{
          headerShown: false,
          title: 'Topology',
          drawerLabelStyle: {fontSize: 20, color: 'white'},
          drawerStyle: {
            backgroundColor: 'black',
            width: 240,
          },
        }}
      />
    </LeftDrawer.Navigator>
  );
}

function RightMenuDrawerContent(props: DrawerContentComponentProps) {
  const auth = useAuth();
  const signOut = () => {
    auth.signOut();
  };
  return (
    // <View style={{flex: 1, backgroundColor: 'black'}}>
    <DrawerContentScrollView {...props} style={{backgroundColor: 'black'}}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={signOut}
        style={{backgroundColor: 'white'}}
      />
    </DrawerContentScrollView>
    // </View>

    // <DrawerContentScrollView {...props} style={{backgroundColor: 'black'}}>
    //   <View style={{backgroundColor: 'black'}}></View>
    //   <DrawerItemList {...props} />
    //   <DrawerItem label="Logout" onPress={signOut} />
    // </DrawerContentScrollView>
  );
}

export {RightMenuDrawer, RightMenuDrawerContent};
