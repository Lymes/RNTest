import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
} from 'react-native';
import {styles} from './styles';
import TextBox from '../../components/TextBox/TextBox';
import {RootStackParamList} from '../navigation/RootStackPrams';
import {Button} from '@react-native-material/core';
import LinearGradient from 'react-native-linear-gradient';
import * as Keychain from 'react-native-keychain';
import {LoginViewModel} from './LoginViewModel';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const viewModel = new LoginViewModel();
type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({navigation}: LoginProps) {
  const [hasCredentials, setGotCredentials] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        await viewModel.initLogin();
        setGotCredentials(true);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [viewModel.initLogin]);

  console.log('RENDER!');
  return (
    <LinearGradient
      colors={['#fff', '#fff', '#7600bc']}
      useAngle={true}
      angle={135}
      angleCenter={{x: 0.5, y: 0.5}}
      locations={[0.0, 0.5, 1.0]}
      style={styles.linearGradient}>
      <KeyboardAvoidingView
        style={styles.loginPage}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled>
        <SafeAreaView>
          <Text style={styles.loginTitle}>IRIS</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text: string) => {
              viewModel.username = text;
            }}
            defaultValue={viewModel.username}
            placeholder="Username"
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
          />
          <TextBox
            containerStyles={styles.inputBox}
            onChangeText={(text: string) => {
              viewModel.password = text;
            }}
            placeholder="Password"
            defaultValue={viewModel.password}
            secureTextEntry={true}
            returnKeyType="go"
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            iconFamily={'MaterialCommunityIcons'}
          />
          <Button
            style={styles.button}
            title="Login"
            onPress={async () => {
              await Keychain.setGenericPassword(
                viewModel.username,
                viewModel.password,
              );
              Keyboard.dismiss();
              viewModel.doLogin();
            }}
          />
          <Button
            style={styles.button}
            title="Settings"
            onPress={() => {
              Keyboard.dismiss();
              navigation.navigate('Settings');
            }}
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
