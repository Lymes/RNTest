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
import useThemedStyles from '~hooks/useThemedStyles';

type BluetoothProps = NativeStackScreenProps<RootStackParamList, 'BLE'>;
const viewModel = new BluetoothViewModel();

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default function BluetoothScreen({navigation}: BluetoothProps) {
  const style = useThemedStyles(styles);
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
      style={style.settingsPage}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled>
      <Text style={style.ssidLabel}>
        WiFi SSID: {wifiSSID || 'SSID not found'}
      </Text>
      <InputText
        style={style.credentialsInput}
        placeholder="Password"
        placeholderTextColor="grey"
        secureTextEntry={true}
        onChangeText={(text: string) => {
          viewModel.wifiPassword = text;
        }}
      />
      <PrimaryButton
        style={style.sendButton}
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
      <View style={style.scanContainer}>
        <Text style={style.scanLabel}>Logs</Text>
        {isScanning ? (
          <ActivityIndicator
            size="large"
            color="#3275df"
            style={style.scanIndicator}
          />
        ) : null}
      </View>
      <View style={style.logContainer}>
        <FlatList
          data={logs}
          renderItem={({item}) => <Text style={style.logText}>{item}</Text>}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
