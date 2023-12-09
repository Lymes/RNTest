import {
  DrawerContentComponentProps,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import {DrawerActions, ParamListBase} from '@react-navigation/native';
import HomeScreen from '~screens/Home/HomeScreen';
import {RootStackParamList} from '~navigation/RootStackPrams';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ImageButton from '~components/Buttons/ImageButton';
import fileTree from 'assets/images/filetree.png';
import config from 'assets/images/config.png';
import {View} from 'react-native-animatable';
import {useAuth} from '~hooks/useAuth';
import TreeView from '~components/TreeView';
import {Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import useTheme from '~hooks/useTheme';
import {useDispatch} from 'react-redux';
import {setSelectedModule} from '~redux/SelectedModuleSlice';

type LeftMenuDrawerProps = DrawerScreenProps<ParamListBase, 'LeftMenuDrawer'>;
const Stack = createNativeStackNavigator<RootStackParamList>();

function LeftMenuDrawer(props: LeftMenuDrawerProps) {
  const theme = useTheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTintColor: theme.colors.headerTint,
          headerStyle: {backgroundColor: theme.colors.headerBackground},
          // headerTitle: props => <LogoTitle {...props} />,
          headerRight: () => (
            <ImageButton
              style={{
                tintColor: theme.colors.headerTint,
                width: 22,
                height: 22,
              }}
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
              style={{
                tintColor: theme.colors.headerTint,
                width: 22,
                height: 22,
              }}
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
  const {authData} = useAuth();
  const dispatch = useDispatch();

  const roots =
    authData?.topology.filter(m => {
      return m.areaId === null;
    }) || [];

  return (
    <ScrollView
      style={{
        marginTop: 80,
        width: '100%',
        height: '100%',
      }}>
      <TreeView
        data={roots} // defined above
        initialExpanded={true}
        onNodePress={module => {
          dispatch(setSelectedModule(module.node.id));
        }}
        renderNode={({node, level, isExpanded, hasChildrenNodes}) => {
          return (
            <View>
              <Text
                style={{
                  color: 'white',
                  marginLeft: 15 * level,
                  fontSize: 16,
                  padding: 5,
                }}>
                {'>'} {node.name}
              </Text>
            </View>
          );
        }}
      />
    </ScrollView>
  );
}

export {LeftMenuDrawer, LeftMenuDrawerContent};
