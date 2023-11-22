import React, {useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  Platform,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import {styles} from './styles';
import {Button} from '@react-native-material/core';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootStackPrams';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import RNUserDefaults from 'rn-user-defaults';
import {SettingsViewModel} from './SettingsViewModel';

type SettingsProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;
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
        <TextInput
          style={[styles.input, viewModel.inputStyle(loginMethod)]}
          placeholder="IP address"
          defaultValue={address}
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
        <Button
          style={styles.button}
          onPress={async () => {
            await RNUserDefaults.set('ipAddress', address);
            console.log('ipAddress saved:', address);
            await RNUserDefaults.set('loginMethod', loginMethod);
            console.log('selectedMethod saved:', loginMethod);
            //navigation.goBack();
          }}
          title="Apply"
        />
      </KeyboardAvoidingView>
    </View>
  );
}
