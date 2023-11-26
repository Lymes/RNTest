import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button, View} from 'react-native';
import {useAuth} from '~hooks/useAuth';
import {RootStackParamList} from '~navigation/RootStackPrams';
import {styles} from './HomeScreen.style';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function LoginScreen({navigation}: HomeProps) {
  const auth = useAuth();
  const signOut = () => {
    auth.signOut();
  };

  return <View style={styles.container}></View>;
}
