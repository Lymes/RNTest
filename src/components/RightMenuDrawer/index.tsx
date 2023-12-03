import {
  DrawerContentComponentProps,
  DrawerScreenProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {ParamListBase} from '@react-navigation/native';
import {Button} from 'react-native';
import {View} from 'react-native-animatable';
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
          drawerStatusBarAnimation: 'none',
          drawerHideStatusBarOnOpen: false,
          drawerType: 'front',
          headerShown: false,
          title: 'Topology',
          drawerLabelStyle: {fontSize: 20, color: 'white'},
          drawerStyle: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'black',
            width: 200,
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
    <View style={{width: '100%'}}>
      <Button title="Logout" onPress={signOut} color="white"></Button>
    </View>
  );
}

export {RightMenuDrawer, RightMenuDrawerContent};