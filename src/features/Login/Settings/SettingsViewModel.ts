import {RadioButtonProps} from 'react-native-radio-buttons-group';
import Zeroconf from 'react-native-zeroconf';
import {styles} from './styles';
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

  constructor() {
    this.zeroconf.on('resolved', (service: any) => {
      this.zeroconf.stop();
      let srvString: string = JSON.stringify(service, null, 2);
      console.log(srvString);
      let obj: BonjourResponse = JSON.parse(srvString);
      if (this.onAddressResolved) {
        //this.onAddressResolved(obj.txt.host);
        this.onAddressResolved(obj.addresses[0]);
      }
    });
  }

  startScan() {
    this.zeroconf.scan('rdlink', 'tcp', 'local.');
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
      borderColor: loginMethod === this.LOGIN_MAUAL ? '#000000' : '#ffffff',
      elevation: loginMethod === this.LOGIN_MAUAL ? 4 : 0,
    };
  }

  isScanning(loginMethod: string | undefined): boolean {
    return loginMethod === this.DISCOVERY_LOCAL;
  }

  addressLabel(loginMethod: string | undefined): string | undefined {
    switch (loginMethod) {
      case this.DISCOVERY_LOCAL:
        return 'Scanning...';
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
