import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  Platform,
  KeyboardAvoidingView,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {styles} from './styles';
import RadioGroup from 'react-native-radio-buttons-group';
import RNUserDefaults from 'rn-user-defaults';
import {SettingsViewModel} from './SettingsViewModel';
import {SheetManager} from 'react-native-actions-sheet';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';
import InputText from '../../../components/Inputs/InputText';

const viewModel = new SettingsViewModel();

export default function SettingsScreen() {
  const [address, setAddress] = useState<string | undefined>('192.168.1.1');
  const [addressLabel, setAddressLabel] = useState<string | undefined>(
    'IP address',
  );
  const [loginMethod, setLoginMethod] = useState<string | undefined>(
    viewModel.LOGIN_MAUAL,
  );
  const [isScanning, setScanning] = useState<boolean>(false);

  viewModel.onAddressResolved = (address: string) => {
    setAddressLabel('Address found');
    setAddress(address);
    setScanning(false);
  };

  var scanAddress = function () {
    setScanning(true);
    setAddressLabel('Scanning...');
    viewModel.startScan();
  };

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        try {
          const ipAddress = await RNUserDefaults.get('ipAddress');
          setAddress(ipAddress);
          const loginMethod = await RNUserDefaults.get('loginMethod');
          setLoginMethod(loginMethod);
          setAddressLabel(viewModel.addressLabel(loginMethod));
          if (loginMethod == viewModel.DISCOVERY_LOCAL) {
            scanAddress();
          }
        } catch (err) {
          console.error(err);
          throw err;
        }
      })();
      console.log('Settings opened');
    }, [setAddress, setLoginMethod]),
  );
  console.log('Settings rendered');

  return (
    <View style={styles.settingsPage}>
      <KeyboardAvoidingView
        style={styles.settingsColumn}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled>
        <View style={[styles.textContainer, styles.horizontal]}>
          <Text style={styles.titleText}>{addressLabel}</Text>
          {isScanning ? <ActivityIndicator /> : null}
        </View>
        <InputText
          defaultValue={address}
          style={[styles.ipAddressInput, viewModel.inputStyle(loginMethod)]}
          placeholder="IP address"
          onChangeText={newText => setAddress(newText)}
          editable={loginMethod === viewModel.LOGIN_MAUAL}
        />
        <RadioGroup
          containerStyle={styles.radioGroup}
          radioButtons={viewModel.radioButtons}
          onPress={async loginMethod => {
            setLoginMethod(loginMethod);
            setScanning(viewModel.isScanning(loginMethod));
            setAddressLabel(viewModel.addressLabel(loginMethod));
            const ipAddress = await viewModel.address(loginMethod);
            setAddress(ipAddress);
            if (loginMethod == viewModel.DISCOVERY_LOCAL) {
              scanAddress();
            }
          }}
          selectedId={loginMethod}
        />
        <PrimaryButton
          style={styles.applyButton}
          onPress={async () => {
            await RNUserDefaults.set('ipAddress', address);
            console.log('ipAddress saved:', address);
            await RNUserDefaults.set('loginMethod', loginMethod);
            console.log('selectedMethod saved:', loginMethod);
            SheetManager.hide('settingsSheet');
          }}
          title="Apply"
        />
      </KeyboardAvoidingView>
    </View>
  );
}
