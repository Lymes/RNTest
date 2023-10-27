import React, {useMemo, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  Platform,
  KeyboardAvoidingView,
  Text,
  TextInput,
  ViewStyle,
  View,
  ActivityIndicator,
} from 'react-native';
import {styles} from './styles';
import {Button} from '@react-native-material/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/RootStackPrams';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import Zeroconf from 'react-native-zeroconf';
import RNUserDefaults from 'rn-user-defaults';

type settingsScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'Settings'
>;

function SettingsScreen() {
  const manual = 'manual';
  const cloud = 'cloud';
  const discovery = 'discovery';

  const navigation = useNavigation<settingsScreenProp>();
  const [ipAddress, setIpAddress] = useState<string | undefined>('192.168.1.1');
  const [addressLabel, setAddressLabel] = useState<string | undefined>(
    'IP address',
  );
  const [selectedId, setSelectedId] = useState<string | undefined>(manual);
  const [isScanning, setScanning] = useState<boolean>(false);

  interface BJService {
    port: number;
    txt: {
      host: string;
    };
  }

  const zeroconf = new Zeroconf();
  zeroconf.on('resolved', (service: any) => {
    zeroconf.stop();
    let srvString: string = JSON.stringify(service, null, 2);
    let obj: BJService = JSON.parse(srvString);
    setAddressLabel('IP address detected');
    setIpAddress(obj.txt.host);
    setScanning(false);
  });

  useFocusEffect(
    React.useCallback(() => {
      console.log('CAZZZZ');
    }, []),
  );

  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: cloud,
        label: 'Use Cloud',
        value: cloud,
        labelStyle: styles.radioLabels,
      },
      {
        id: manual,
        label: 'Manual',
        value: manual,
        labelStyle: styles.radioLabels,
      },
      {
        id: discovery,
        label: 'Discovery',
        value: discovery,
        labelStyle: styles.radioLabels,
      },
    ],
    [],
  );

  var inputStyle = function (): ViewStyle {
    return {
      borderColor: selectedId === manual ? '#9c9c9c' : '#ffffff',
      elevation: selectedId === manual ? 5 : 0,
    };
  };

  var scanAddress = function () {
    setScanning(true);
    setAddressLabel('Scanning...');
    zeroconf.scan('icc', 'tcp', 'local.');
  };

  return (
    <KeyboardAvoidingView
      style={styles.settingsPage}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled>
      {/* <Animatable.View
        animation={selectedId !== manual ? 'fadeIn' : 'fadeOut'}
        duration={200}>
        <Text style={styles.text}>{ipAddress}</Text>
      </Animatable.View> */}

      <View style={[styles.textContainer, styles.horizontal]}>
        <Text style={styles.titleText}>{addressLabel}</Text>
        {isScanning ? <ActivityIndicator /> : null}
      </View>

      <TextInput
        style={[styles.input, inputStyle()]}
        placeholder="IP address"
        value={ipAddress}
        onChangeText={newText => setIpAddress(newText)}
        editable={selectedId === manual}
      />

      <RadioGroup
        containerStyle={styles.radioGroup}
        radioButtons={radioButtons}
        onPress={id => {
          setSelectedId(id);
          switch (id) {
            case discovery:
              scanAddress();
              break;
            case manual:
              setScanning(false);
              setAddressLabel('Enter IP address');
              RNUserDefaults.get('ipAddress').then(function (value: string) {
                if (value !== undefined) {
                  setIpAddress(value);
                }
                console.log('Manual using:', value);
              });
              break;
            case cloud:
              setScanning(false);
              setAddressLabel('Will use cloud');
              setIpAddress('icc.youus.it');
              break;
          }
        }}
        selectedId={selectedId}
      />

      <Button
        style={styles.button}
        onPress={() => {
          RNUserDefaults.set('ipAddress', ipAddress).then(function () {
            console.log('ipAddress saved', ipAddress);
          });
          RNUserDefaults.set(
            'useCloud',
            selectedId === cloud ? 'true' : 'false',
          ).then(function () {
            console.log('ipAddress saved', ipAddress);
          });
          navigation.goBack();
        }}
        title="Apply"
      />
    </KeyboardAvoidingView>
  );
}

export default SettingsScreen;
