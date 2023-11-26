import BleManager, {Peripheral, PeripheralInfo} from 'react-native-ble-manager';
import {stringToBytes} from 'convert-string';
import {PermissionsAndroid, Platform} from 'react-native';
import WifiManager from 'react-native-wifi-reborn';

declare type FeedCallback = (msg: string) => void;

export class BluetoothViewModel {
  serviceUUID = 'BD0F6577-4A38-4D71-AF1B-4E8F57708080';
  characteristicUUID = 'F6D43CF2-89C5-4CF1-A0E5-38B6DDC8E741';

  wifiPassword = '';
  peripheral?: Peripheral;
  feedLog?: FeedCallback;

  constructor() {
    BleManager.start({showAlert: false})
      .then(() => {
        console.log('BleManager initialized');
      })
      .catch(() => {});
  }

  async wifiSSID(): Promise<string | undefined> {
    var result = undefined;
    await WifiManager.getCurrentWifiSSID()
      .then((ssid: string) => {
        if (this.feedLog) this.feedLog(`WiFi SSID is ${ssid}`);
        result = ssid;
      })
      .catch(error => {
        if (this.feedLog) this.feedLog(`WiFi SSID error: ${error}`);
      });
    return result;
  }

  async startScan(): Promise<boolean> {
    var result = false;
    await BleManager.scan([this.serviceUUID], 300, false)
      .then(() => {
        if (this.feedLog) this.feedLog('Scanning...');
        result = true;
      })
      .catch(error => {
        if (this.feedLog) this.feedLog(error);
      });
    if (this.feedLog) this.feedLog('Scanning finished');
    return result;
  }

  isFound(): boolean {
    return this.peripheral != undefined;
  }

  async pair(): Promise<boolean> {
    if (this.peripheral == undefined) return false;
    var result = false;
    await BleManager.createBond(this.peripheral.id)
      .then(() => {
        if (this.feedLog) this.feedLog('BLE: device paired successfully');
        result = true;
      })
      .catch(() => {
        if (this.feedLog) this.feedLog('BLE: failed to pair');
      });
    return result;
  }

  async connect(): Promise<boolean> {
    if (this.peripheral == undefined) return false;
    var result = false;
    await BleManager.connect(this.peripheral.id)
      .then(() => {
        if (this.feedLog) this.feedLog('BLE: connected success');
        result = true;
      })
      .catch(() => {
        if (this.feedLog) this.feedLog('BLE: failed to connect');
      });
    return result;
  }

  async findService(): Promise<boolean> {
    if (this.peripheral == undefined) return false;
    var result = false;
    await BleManager.retrieveServices(this.peripheral.id, [this.serviceUUID])
      .then(() => {
        if (this.feedLog) this.feedLog('BLE: found service');
        result = true;
      })
      .catch(() => {
        if (this.feedLog) this.feedLog('BLE: service not found');
      });
    return result;
  }

  async disconnect(): Promise<boolean> {
    if (this.peripheral == undefined) return false;
    var result = false;
    await BleManager.disconnect(this.peripheral.id, true)
      .then(() => {
        if (this.feedLog) this.feedLog('BLE: disconnected from peripheral');
        result = true;
      })
      .catch(() => {
        if (this.feedLog) this.feedLog('BLE: fail to disconnect');
      });
    return result;
  }

  async sendWiFiInfo(wifiInfo: string): Promise<boolean> {
    if (this.peripheral == undefined) return false;
    var result = false;
    const data = stringToBytes(wifiInfo);
    if (this.feedLog) this.feedLog(`BLE: writing ${wifiInfo}`);
    await BleManager.write(
      this.peripheral.id,
      this.serviceUUID,
      this.characteristicUUID,
      data,
      data.length,
    )
      .then(() => {
        if (this.feedLog)
          this.feedLog(`BLE: wuccessfully wrote to ${this.characteristicUUID}`);
        result = true;
      })
      .catch(() => {
        if (this.feedLog) this.feedLog('BLE: failed to write WiFi info!');
      });
    return result;
  }

  async readWiFiInfo(): Promise<string | undefined> {
    if (this.peripheral == undefined) return undefined;
    var result = undefined;
    await BleManager.read(
      this.peripheral.id,
      this.serviceUUID,
      this.characteristicUUID,
    )
      .then(readData => {
        if (this.feedLog) this.feedLog('BLE: successfully read from device');
        result = readData;
      })
      .catch(() => {
        if (this.feedLog) this.feedLog('BLE: failed to read WiFi info!');
      });
    return result;
  }

  async handleAndroidPermissions(): Promise<boolean> {
    var opResult = false;
    if (Platform.OS === 'android' && Platform.Version >= 31) {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ]).then(result => {
        if (result) {
          if (this.feedLog)
            this.feedLog(
              '[handleAndroidPermissions] User accepts runtime permissions android 12+',
            );
          opResult = true;
        } else {
          if (this.feedLog)
            this.feedLog(
              '[handleAndroidPermissions] User refuses runtime permissions android 12+',
            );
        }
      });
    } else if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(checkResult => {
        if (checkResult) {
          if (this.feedLog)
            this.feedLog(
              '[handleAndroidPermissions] runtime permission Android <12 already OK',
            );
          opResult = true;
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ).then(requestResult => {
            if (requestResult) {
              if (this.feedLog)
                this.feedLog(
                  '[handleAndroidPermissions] User accepts runtime permission android <12',
                );
              opResult = true;
            } else {
              if (this.feedLog)
                this.feedLog(
                  '[handleAndroidPermissions] User refuses runtime permission android <12',
                );
            }
          });
        }
      });
    }
    return opResult;
  }
}
