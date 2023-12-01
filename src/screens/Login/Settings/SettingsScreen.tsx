import React, {useEffect} from 'react';
import {Platform, KeyboardAvoidingView, View} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import RNUserDefaults from 'rn-user-defaults';
import {SheetManager} from 'react-native-actions-sheet';
import PrimaryButton from '~components/Buttons/PrimaryButton';
import {SettingsViewModel} from './SettingsViewModel';
import {styles} from './SettingsScreen.style';
import {LoginSelector} from '~components/LoginSelector/LoginSelector';
import {setDiscoveredAddress} from '~redux/LoginMethodSlice';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '~redux/hooks';

const viewModel = new SettingsViewModel();

export default function SettingsScreen() {
  const loginMethod = useAppSelector(state => state.loginMethod);
  const dispatch = useDispatch();

  viewModel.onAddressResolved = (address: string) => {
    dispatch(setDiscoveredAddress(address));
  };

  useEffect(() => {
    console.log('Settings opened');
    (async () => {
      const loginMethod = await RNUserDefaults.get('loginMethod');
      viewModel.setLoginMethod(loginMethod, dispatch);
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
        <LoginSelector />
        <RadioGroup
          containerStyle={styles.radioGroup}
          radioButtons={viewModel.radioButtons}
          onPress={async loginMethod => {
            viewModel.setLoginMethod(loginMethod, dispatch);
          }}
          selectedId={loginMethod.value}
        />
        <PrimaryButton
          style={styles.applyButton}
          onPress={async () => {
            viewModel.saveLoginInfo(loginMethod.value, loginMethod.ipAddress);
            SheetManager.hide('settingsSheet');
          }}
          title="Apply"
        />
      </KeyboardAvoidingView>
    </View>
  );
}
