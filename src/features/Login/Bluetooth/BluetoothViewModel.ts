import BleManager, {Peripheral} from 'react-native-ble-manager';
import {stringToBytes} from 'convert-string';
import {PermissionsAndroid, Platform} from 'react-native';

export class BluetoothViewModel {
  serviceUUID = 'BD0F6577-4A38-4D71-AF1B-4E8F57708080';
  characteristicUUID = 'F6D43CF2-89C5-4CF1-A0E5-38B6DDC8E741';

  peripheral?: Peripheral;

  constructor() {
    // BleManager.enableBluetooth().then(() => {
    //   console.log('Bluetooth is turned on');
    // });
    BleManager.start({showAlert: false})
      .then(() => {
        console.log('BleManager initialized');
      })
      .catch(() => {});
  }

  // pair with device first before connecting to it
  async connectToPeripheral(): Promise<boolean> {
    if (this.peripheral == undefined) return false;
    // BleManager.createBond(this.peripheral.id)
    //   .then(() => {
    //     console.log('BLE device paired successfully');
    if (this.peripheral == undefined) return false;
    BleManager.connect(this.peripheral.id)
      .then(() => {
        console.log('Connected success.');
        return true;
      })
      .catch(() => {
        console.log('failed to connect');
      });
    // })
    // .catch(() => {
    //   console.log('failed to connect');
    // });
    return false;
  }

  disconnectFromPeripheral() {
    if (this.peripheral == undefined) return;
    BleManager.disconnect(this.peripheral.id, true)
      .then(() => {
        if (this.peripheral == undefined) return;
        console.log(`Disconnected from ${this.peripheral.name}`);
        // BleManager.removeBond(this.peripheral.id)
        //   .then(() => {
        //     if (this.peripheral == undefined) return;
        //     console.log(`Unbound from ${this.peripheral.name}`);
        //   })
        //   .catch(() => {
        //     console.log('fail to remove the bond');
        //   });
      })
      .catch(() => {
        console.log('fail to disconnect');
      });
  }

  async sendWiFiInfo(wifiInfo: string): Promise<boolean> {
    if (this.peripheral == undefined) return false;
    const data = stringToBytes(wifiInfo);
    BleManager.write(
      this.peripheral.id,
      this.serviceUUID,
      this.characteristicUUID,
      data,
      64,
    )
      .then(() => {
        console.log(`Successfully wrote to ${this.characteristicUUID}`);
        return true;
      })
      .catch(() => {
        console.log('Failed to write WiFi info!');
      });
    return false;
  }

  async handleAndroidPermissions(): Promise<boolean> {
    if (Platform.OS === 'android' && Platform.Version >= 31) {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ]).then(result => {
        if (result) {
          console.debug(
            '[handleAndroidPermissions] User accepts runtime permissions android 12+',
          );
          return true;
        } else {
          console.error(
            '[handleAndroidPermissions] User refuses runtime permissions android 12+',
          );
        }
      });
    } else if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(checkResult => {
        if (checkResult) {
          console.debug(
            '[handleAndroidPermissions] runtime permission Android <12 already OK',
          );
          return true;
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ).then(requestResult => {
            if (requestResult) {
              console.debug(
                '[handleAndroidPermissions] User accepts runtime permission android <12',
              );
              return true;
            } else {
              console.error(
                '[handleAndroidPermissions] User refuses runtime permission android <12',
              );
            }
          });
        }
      });
    }
    return false;
  }
}
