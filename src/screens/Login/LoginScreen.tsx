import React, {useEffect, useState} from 'react';
import {SafeAreaView, KeyboardAvoidingView, Platform, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {RootStackParamList} from '~navigation/RootStackPrams';
import PrimaryButton from '~components/Buttons/PrimaryButton';
import ImageButton from '~components/Buttons/ImageButton';
import InputText from '~components/Inputs/InputText';
import bleIcon from 'assets/images/ble.png';
import SettingsScreen from './Settings/SettingsScreen';
import {LoginViewModel} from './LoginViewModel';
import {styles} from './LoginScreen.style';
import {useAuth} from '~hooks/useAuth';
import Orientation from 'react-native-orientation-locker';
import Spinner from '~components/Spinner';

const viewModel = new LoginViewModel();
type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({navigation}: LoginProps) {
  const [hasCredentials, setGotCredentials] = useState<boolean>(false);
  const auth = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const initRes = await viewModel.initLogin();
        if (initRes) {
          await auth.signIn(viewModel.username, viewModel.password);
        }
        setGotCredentials(true);
      } catch (err) {
        console.error(err);
        throw err;
      }
    })();
    Orientation.lockToPortrait();
  }, [viewModel.initLogin]);

  console.log('LoginScreen rendered');
  return (
    <KeyboardAvoidingView
      style={styles.loginPage}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled>
      <SafeAreaView>
        <ImageButton
          style={styles.topRightButton}
          image={bleIcon}
          onPress={() => {
            navigation.navigate('BLE');
          }}
        />
        <Text style={styles.title}>IRIS</Text>
        <InputText
          autoComplete="username"
          autoCapitalize="none"
          autoCorrect={false}
          defaultValue={viewModel.username}
          style={styles.credentialsInput}
          placeholder="Username"
          onChangeText={(text: string) => {
            viewModel.username = text;
          }}
        />
        <InputText
          autoComplete="password"
          autoCapitalize="none"
          autoCorrect={false}
          defaultValue={viewModel.password}
          style={styles.credentialsInput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text: string) => {
            viewModel.password = text;
          }}
        />
        <PrimaryButton
          style={styles.loginButton}
          title="Login"
          onPress={async () => {
            viewModel.loginPressed();
            await auth.signIn(viewModel.username, viewModel.password);
          }}
        />
        <PrimaryButton
          style={styles.settingsButton}
          title="Settings"
          onPress={() => {
            SheetManager.show('settingsSheet');
          }}
        />
        <ActionSheet
          id="settingsSheet"
          snapPoints={[70]}
          initialSnapIndex={0}
          containerStyle={styles.settingsContainer}
          statusBarTranslucent
          drawUnderStatusBar={true}
          gestureEnabled={true}
          closable={true}
          defaultOverlayOpacity={0.3}>
          <SettingsScreen />
        </ActionSheet>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
