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
import {TreeDataTypes, TreeSelect} from '~components/TreeSelection';
import {View} from 'react-native-animatable';

type LeftMenuDrawerProps = DrawerScreenProps<ParamListBase, 'LeftMenuDrawer'>;
const Stack = createNativeStackNavigator<RootStackParamList>();

function LeftMenuDrawer(props: LeftMenuDrawerProps) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
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
  const treeData: TreeDataTypes[] = [
    {
      id: '1',
      title: 'Fruits',
      data: [
        {
          title: 'Apples',
          data: [
            {
              title: 'Red Delicious',
            },
            {
              title: 'Granny Smith',
            },
            {
              title: 'Gala',
            },
          ],
        },
        {
          title: 'Bananas',
          data: [
            {
              title: 'Cavendish',
            },
            {
              title: 'Lady Finger',
            },
          ],
        },
      ],
    },
  ];

  return (
    <View style={{width: '100%'}}>
      <TreeSelect
        data={treeData}
        childKey="data"
        titleKey="title"
        // onParentPress={onParentPress}
        // onChildPress={onChildPress}
        // onCheckBoxPress={onCheckBoxPress}
      />
    </View>
    // <DrawerContentScrollView {...props}>
    //   <DrawerItemList {...props} />
    //   <DrawerItem
    //     style={{backgroundColor: 'white'}}
    //     label="Help"
    //     onPress={() => Linking.openURL('https://www.youus.us/')}
    //   />
    // </DrawerContentScrollView>
  );
}

export {LeftMenuDrawer, LeftMenuDrawerContent};
