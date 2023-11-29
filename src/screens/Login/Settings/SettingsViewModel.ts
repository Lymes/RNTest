import {RadioButtonProps} from 'react-native-radio-buttons-group';
import Zeroconf from 'react-native-zeroconf';
import {styles} from './SettingsScreen.style';
import {ViewStyle} from 'react-native';
import RNUserDefaults from 'rn-user-defaults';

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
  LOGIN_MAUAL = 'manual';
  LOGIN_CLOUD = 'cloud';
  DISCOVERY_LOCAL = 'discovery';

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
      id: this.LOGIN_CLOUD,
      label: 'Use Cloud',
      value: this.LOGIN_CLOUD,
      labelStyle: styles.radioLabels,
    },
    {
      id: this.LOGIN_MAUAL,
      label: 'Manual',
      value: this.LOGIN_MAUAL,
      labelStyle: styles.radioLabels,
    },
    {
      id: this.DISCOVERY_LOCAL,
      label: 'Discovery',
      value: this.DISCOVERY_LOCAL,
      labelStyle: styles.radioLabels,
    },
  ];

  inputStyle(loginMethod: string | undefined): ViewStyle {
    return {
      borderColor: loginMethod === this.LOGIN_MAUAL ? '#000000' : '#a2a2a2',
      elevation: loginMethod === this.LOGIN_MAUAL ? 4 : 0,
    };
  }

  isScanning(loginMethod: string | undefined): boolean {
    return loginMethod === this.DISCOVERY_LOCAL && this.isBonjourScanning;
  }

  addressLabel(loginMethod: string | undefined): string | undefined {
    switch (loginMethod) {
      case this.DISCOVERY_LOCAL:
        return this.isBonjourScanning ? 'Scanning...' : 'Found IP address';
      case this.LOGIN_MAUAL:
        return 'Enter IP address manually';
      case this.LOGIN_CLOUD:
        return 'Use ICC cloud';
    }
  }

  async address(loginMethod: string | undefined): Promise<string | undefined> {
    switch (loginMethod) {
      case this.DISCOVERY_LOCAL:
        return '';
      case this.LOGIN_MAUAL:
        const ipAddress = await RNUserDefaults.get('ipAddress');
        return ipAddress;
      case this.LOGIN_CLOUD:
        return 'cloud.youus.it';
    }
  }
}
