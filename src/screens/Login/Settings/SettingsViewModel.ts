import {RadioButtonProps} from 'react-native-radio-buttons-group';
import Zeroconf from 'react-native-zeroconf';
import {styles} from './SettingsScreen.style';
import RNUserDefaults from 'rn-user-defaults';
import {Dispatch} from 'react';
import {AnyAction} from '@reduxjs/toolkit';
import {
  LoginMethod,
  setCloud,
  setDiscovery,
  setManual,
} from '~redux/LoginMethodSlice';

export interface BonjourResponse {
  port: number;
  name: string;
  addresses: [string];
  txt: {
    host: string;
  };
}

declare type ICCAddressCallback = (address: string) => void;

export class SettingsViewModel {
  zeroconf = new Zeroconf();
  onAddressResolved?: ICCAddressCallback;
  isBonjourScanning: boolean = false;

  constructor() {
    console.log('Zeroconf listeners');
    this.zeroconf.on('error', (error: any) => {
      console.log('Zeroconf error:', error);
    });
    this.zeroconf.on('resolved', (service: any) => {
      this.stopScan();
      let srvString: string = JSON.stringify(service, null, 2);
      console.log(srvString);
      let obj: BonjourResponse = JSON.parse(srvString);
      this.callback(obj.addresses[0]);
    });
  }

  callback(address: string) {
    if (this.onAddressResolved) {
      this.onAddressResolved(address);
    }
  }

  startScan() {
    console.log('Start scanning');
    this.isBonjourScanning = true;
    this.zeroconf.scan('icc', 'tcp', 'local.');
  }

  stopScan() {
    if (this.isBonjourScanning) {
      this.isBonjourScanning = false;
      console.log('Stop scanning');
      this.zeroconf.stop();
    }
  }

  async saveLoginInfo(loginMethod?: string, ipAddress?: string) {
    console.log('Save login info:', loginMethod, ipAddress);
    await RNUserDefaults.set('loginMethod', loginMethod);
    await RNUserDefaults.set('ipAddress', ipAddress);
  }

  radioButtons: RadioButtonProps[] = [
    {
      id: LoginMethod.CLOUD,
      label: 'Use Cloud',
      value: LoginMethod.CLOUD,
      labelStyle: styles.radioLabels,
    },
    {
      id: LoginMethod.MANUAL,
      label: 'Manual',
      value: LoginMethod.MANUAL,
      labelStyle: styles.radioLabels,
    },
    {
      id: LoginMethod.DISCOVERY,
      label: 'Discovery',
      value: LoginMethod.DISCOVERY,
      labelStyle: styles.radioLabels,
    },
  ];

  async setLoginMethod(loginMethod: string, dispatch: Dispatch<AnyAction>) {
    switch (loginMethod) {
      case 'manual':
        const ipAddress = await RNUserDefaults.get('ipAddress');
        dispatch(setManual(ipAddress));
        this.stopScan();
        break;
      case 'discovery':
        dispatch(setDiscovery());
        this.startScan();
        break;
      case 'cloud':
        dispatch(setCloud());
        this.stopScan();
        break;
    }
  }
}
