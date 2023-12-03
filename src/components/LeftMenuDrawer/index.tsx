import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  DrawerNavigationProp,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import {DrawerActions, ParamListBase} from '@react-navigation/native';
import HomeScreen from '~screens/Home/HomeScreen';
import {RootStackParamList} from '~navigation/RootStackPrams';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button, Linking, SafeAreaView} from 'react-native';

type LeftMenuDrawerProps = DrawerScreenProps<ParamListBase, 'LeftMenuDrawer'>;
const Stack = createNativeStackNavigator<RootStackParamList>();

function LeftMenuDrawer(props: LeftMenuDrawerProps) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          // headerTitle: props => <LogoTitle {...props} />,
          headerRight: () => (
            <Button
              title="Drawer"
              onPress={() => {
                props.navigation
                  .getParent()
                  ?.dispatch(DrawerActions.toggleDrawer());
              }}
            />
          ),
          headerLeft: () => (
            <Button title="Drawer" onPress={props.navigation.toggleDrawer} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function LeftMenuDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        style={{backgroundColor: 'white'}}
        label="Help"
        onPress={() => Linking.openURL('https://www.youus.us/')}
      />
    </DrawerContentScrollView>
  );
}

export {LeftMenuDrawer, LeftMenuDrawerContent};
