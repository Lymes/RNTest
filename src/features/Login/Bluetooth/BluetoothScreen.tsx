import React, {useState, useEffect} from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  NativeModules,
  NativeEventEmitter,
  Text,
  ActivityIndicator,
} from 'react-native';
import {styles} from './styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootStackPrams';
import {BluetoothViewModel} from './BluetoothViewModel';
import BleManager from 'react-native-ble-manager';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';

type BluetoothProps = NativeStackScreenProps<RootStackParamList, 'BLE'>;
const viewModel = new BluetoothViewModel();

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default function BluetoothScreen({navigation}: BluetoothProps) {
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    let stopDiscoverListener = BleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      peripheral => {
        console.log('Discovered:', peripheral);
        viewModel.peripheral = peripheral;
      },
    );
    let stopConnectListener = BleManagerEmitter.addListener(
      'BleManagerConnectPeripheral',
      peripheral => {
        console.log('Connected:', peripheral);
        viewModel
          .sendWiFiInfo('Ciaoneeeeee!!')
          .then(res => {
            viewModel.disconnectFromPeripheral();
          })
          .catch(err => {
            viewModel.disconnectFromPeripheral();
          });
      },
    );
    let stopScanListener = BleManagerEmitter.addListener(
      'BleManagerStopScan',
      () => {
        console.log('Scan stopped');
        setIsScanning(false);
        viewModel.connectToPeripheral();
      },
    );
    viewModel.handleAndroidPermissions();
    //startScan();
    return () => {
      stopDiscoverListener.remove();
      stopConnectListener.remove();
      stopScanListener.remove();
    };
  }, []);

  const startScan = () => {
    if (!isScanning) {
      BleManager.scan([viewModel.serviceUUID], 3, false)
        .then(() => {
          console.log('Scanning...');
          setIsScanning(true);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const scanLabel = (): string => {
    if (isScanning) {
      return 'Scanning...';
    } else {
      if (viewModel.peripheral == undefined) {
        return 'Press scan to find periferic device';
      } else {
        return 'Found';
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.settingsPage}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled>
      <PrimaryButton
        title="Scan"
        disabled={isScanning}
        onPress={startScan}></PrimaryButton>

      <Text>{scanLabel()}</Text>
      {isScanning ? <ActivityIndicator /> : null}
    </KeyboardAvoidingView>
  );
}
