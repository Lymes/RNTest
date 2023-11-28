import React, {useEffect, useState} from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import RNUserDefaults from 'rn-user-defaults';
import {SheetManager} from 'react-native-actions-sheet';
import PrimaryButton from '~components/Buttons/PrimaryButton';
import InputText from '~components/Inputs/InputText';
import {SettingsViewModel} from './SettingsViewModel';
import {styles} from './SettingsScreen.style';

const viewModel = new SettingsViewModel();

export default function SettingsScreen() {
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [loginMethod, setLoginMethod] = useState<string | undefined>(
    viewModel.LOGIN_MAUAL,
  );

  viewModel.onAddressResolved = (address: string) => {
    setAddress(address);
  };

  const changeLoginMethod = (method: string) => {
    setLoginMethod(method);
    method == viewModel.DISCOVERY_LOCAL
      ? viewModel.startScan()
      : viewModel.stopScan();
  };

  useEffect(() => {
    console.log('Settings opened');
    (async () => {
      try {
        const ipAddress = await RNUserDefaults.get('ipAddress');
        setAddress(ipAddress);
        const loginMethod = await RNUserDefaults.get('loginMethod');
        changeLoginMethod(loginMethod);
      } catch (err) {
        console.error(err);
        throw err;
      }
    })();
    return () => {
      viewModel.stopScan();
      console.log('Settings closed');
    };
  }, []);
  return (
    <View style={styles.settingsPage}>
      <KeyboardAvoidingView
        style={styles.settingsColumn}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled>
        <View style={[styles.textContainer, styles.horizontal]}>
          <Text style={styles.titleText}>
            {viewModel.addressLabel(loginMethod)}
          </Text>
          {viewModel.isScanning(loginMethod) ? <ActivityIndicator /> : null}
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
            changeLoginMethod(loginMethod);
            const ipAddress = await viewModel.address(loginMethod);
            setAddress(ipAddress);
          }}
          selectedId={loginMethod}
        />
        <PrimaryButton
          style={styles.applyButton}
          onPress={async () => {
            viewModel.saveLoginInfo(loginMethod, address);
            SheetManager.hide('settingsSheet');
          }}
          title="Apply"
        />
      </KeyboardAvoidingView>
    </View>
  );
}
