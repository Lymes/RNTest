import React, {useState, useEffect} from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  NativeModules,
  NativeEventEmitter,
  Text,
  ActivityIndicator,
  View,
  FlatList,
  Keyboard,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '~navigation/RootStackPrams';
import PrimaryButton from '~components/Buttons/PrimaryButton';
import {BluetoothViewModel} from './BluetoothViewModel';
import {styles} from './BluetoothScreen.style';
import InputText from '~components/Inputs/InputText';

type BluetoothProps = NativeStackScreenProps<RootStackParamList, 'BLE'>;
const viewModel = new BluetoothViewModel();

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default function BluetoothScreen({navigation}: BluetoothProps) {
  const [wifiSSID, setSSID] = useState<string | undefined>(undefined);
  const [isScanning, setIsScanning] = useState(false);
  const [logs, setLogs] = useState(Array<string>());

  viewModel.feedLog = (msg: string) => {
    setLogs(logs.concat(msg));
  };

  useEffect(() => {
    let stopDiscoverListener = BleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      peripheral => {
        setLogs(logs.concat('Discovered: IRIS'));
        viewModel.peripheral = peripheral;
        setIsScanning(false);
      },
    );
    let stopScanListener = BleManagerEmitter.addListener(
      'BleManagerStopScan',
      () => {
        setIsScanning(false);
      },
    );
    (async () => {
      setIsScanning(true);
      viewModel.handleAndroidPermissions();
      await viewModel.startScan();
      const ssid = await viewModel.wifiSSID();
      setSSID(ssid);
    })();
    return () => {
      stopDiscoverListener.remove();
      stopScanListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.settingsPage}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled>
      <Text style={styles.ssidLabel}>
        WiFi SSID: {wifiSSID || 'SSID not found'}
      </Text>
      <InputText
        style={styles.credentialsInput}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text: string) => {
          viewModel.wifiPassword = text;
        }}
      />
      <PrimaryButton
        style={styles.sendButton}
        title="Send to IRIS"
        disabled={isScanning || viewModel.peripheral == undefined}
        onPress={async () => {
          Keyboard.dismiss();
          setIsScanning(true);
          await viewModel.pair();
          (await viewModel.connect()) &&
            (await viewModel.findService()) &&
            (await viewModel.sendWiFiInfo(
              `{\"ssid\": \"${wifiSSID}\", \"password\": \"${viewModel.wifiPassword}\"}`,
            )) &&
            (await viewModel.disconnect());
          setIsScanning(false);
        }}
      />
      <View style={styles.scanContainer}>
        <Text style={styles.scanLabel}>Logs</Text>
        {isScanning ? (
          <ActivityIndicator
            size="large"
            color="#3275df"
            style={styles.scanIndicator}
          />
        ) : null}
      </View>
      <View style={styles.logContainer}>
        <FlatList data={logs} renderItem={({item}) => <Text>{item}</Text>} />
      </View>
    </KeyboardAvoidingView>
  );
}
