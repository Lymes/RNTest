import {
  DrawerContentComponentProps,
  DrawerScreenProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {Button} from 'react-native';
import {Text, View} from 'react-native-animatable';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  LeftMenuDrawer,
  LeftMenuDrawerContent,
} from '~components/LeftMenuDrawer';
import {useAuth} from '~hooks/useAuth';
import useTheme from '~hooks/useTheme';

type RightMenuDrawerProps = DrawerScreenProps<ParamListBase, 'RightMenuDrawer'>;

const LeftDrawer = createDrawerNavigator();

function RightMenuDrawer(props: RightMenuDrawerProps) {
  const theme = useTheme();
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
          drawerLabelStyle: {
            fontSize: theme.typography.size.medium,
            color: theme.colors.cardBackground,
          },
          drawerStyle: {
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            backgroundColor: theme.colors.drawerBackground,
            width: 200,
          },
        }}
      />
    </LeftDrawer.Navigator>
  );
}

function RightMenuDrawerContent(props: DrawerContentComponentProps) {
  const theme = useTheme();
  const auth = useAuth();
  const navigation = useNavigation();
  const signOut = () => {
    auth.signOut();
    navigation.goBack();
  };
  return (
    <View style={{marginTop: 80, width: '80%', height: '100%'}}>
      <TouchableOpacity onPress={signOut}>
        <Text
          style={{
            color: theme.colors.primaryForeground,
            fontSize: theme.typography.size.medium,
            fontFamily: theme.typography.family.regular,
          }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export {RightMenuDrawer, RightMenuDrawerContent};
