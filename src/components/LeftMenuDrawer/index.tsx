import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import {DrawerActions, ParamListBase} from '@react-navigation/native';
import HomeScreen from '~screens/Home/HomeScreen';
import {RootStackParamList} from '~navigation/RootStackPrams';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Linking} from 'react-native';
import ImageButton from '~components/Buttons/ImageButton';
import fileTree from 'assets/images/filetree.png';
import config from 'assets/images/config.png';

type LeftMenuDrawerProps = DrawerScreenProps<ParamListBase, 'LeftMenuDrawer'>;
const Stack = createNativeStackNavigator<RootStackParamList>();

function LeftMenuDrawer(props: LeftMenuDrawerProps) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          statusBarHidden: false,
          headerTintColor: 'white',
          headerStyle: {backgroundColor: 'black'},
          // headerTitle: props => <LogoTitle {...props} />,
          headerRight: () => (
            <ImageButton
              style={{tintColor: 'white', width: 22, height: 22}}
              image={config}
              onPress={() => {
                props.navigation
                  .getParent()
                  ?.dispatch(DrawerActions.toggleDrawer());
              }}
            />
          ),
          headerLeft: () => (
            <ImageButton
              style={{tintColor: 'white', width: 22, height: 22}}
              image={fileTree}
              onPress={props.navigation.toggleDrawer}
            />
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
