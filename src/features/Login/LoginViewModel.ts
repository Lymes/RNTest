import {Alert} from 'react-native';
import * as Keychain from 'react-native-keychain';
import ReactNativeBiometrics from 'react-native-biometrics';
import RNUserDefaults from 'rn-user-defaults';

export class LoginViewModel {
  password = '';
  username = '';

  rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });

  async doLogin() {
    let value = await RNUserDefaults.get('useBiometric');
    if (value !== 'true') {
      const {available} = await this.rnBiometrics.isSensorAvailable();
      if (available) {
        Alert.alert(
          'Biometric Authentication',
          'Would you like to use Biometric Auth for the next login?',
          [
            {
              text: 'No',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: async () => {
                console.log('OK Pressed');
                RNUserDefaults.set('useBiometric', true);
              },
            },
          ],
        );
      }
    }
    console.log('LOGIN', this.username, this.password);
  }

  async initLogin(): Promise<boolean> {
    let value = await RNUserDefaults.get('useBiometric');
    if (value !== 'true') {
      return false;
    }
    const {available} = await this.rnBiometrics.isSensorAvailable();
    if (!available) {
      return false;
    }
    const {success} = await this.rnBiometrics.simplePrompt({
      promptMessage: 'Confirm your identity',
    });
    if (!success) {
      return false;
    }
    const credentials = await Keychain.getGenericPassword();
    if (!credentials) {
      return false;
    }
    console.log('Got credentials:', credentials.username, credentials.password);
    this.username = credentials.username;
    this.password = credentials.password;
    this.doLogin();
    return true;
  }
}
