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
                RNUserDefaults.set('useBiometric', 'true');
              },
            },
          ],
        );
      } else {
        console.log('No sensors available.');
      }
    } else {
      console.log('Already choosen to use Biometrics.');
    }
    console.log('LOGIN', this.username, this.password);
  }

  async initLogin(): Promise<boolean> {
    let value = await RNUserDefaults.get('useBiometric');
    if (value !== 'true') {
      console.log('Not supposed to use Biometric.');
      return false;
    }
    const {available} = await this.rnBiometrics.isSensorAvailable();
    if (!available) {
      console.log('Biometric sensors not available.');
      return false;
    }
    const {success} = await this.rnBiometrics.simplePrompt({
      promptMessage: 'Confirm your identity',
    });
    if (!success) {
      console.log('Refused to use Biometric.');
      return false;
    }
    const credentials = await Keychain.getGenericPassword();
    if (!credentials) {
      console.log('Cannot retrieve credentials.');
      return false;
    }
    console.log('Got credentials:', credentials.username, credentials.password);
    this.username = credentials.username;
    this.password = credentials.password;
    this.doLogin();
    return true;
  }
}
