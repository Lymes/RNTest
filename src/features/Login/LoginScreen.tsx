import React, {Component} from 'react';
import {
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
} from 'react-native';
import {styles} from './styles';
import TextBox from 'react-native-password-eye';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/RootStackPrams';
import {Button} from '@react-native-material/core';
import * as Keychain from 'react-native-keychain';
import {LoginViewModel} from './LoginViewModel';

interface LoginProps {
  navigation: any;
}

class LoginScreen extends Component<LoginProps> {
  viewModel = new LoginViewModel();

  constructor(props: LoginProps | Readonly<LoginProps>) {
    super(props);
  }

  componentDidMount() {
    this.viewModel
      .initLogin()
      .then(logged => {
        if (logged) {
          console.log('Update');
          this.forceUpdate();
        }
      })
      .catch(() => {});
  }

  componentWillUnmount() {}

  render() {
    console.log('Rendered!');
    const {navigation} = this.props;
    return (
      <KeyboardAvoidingView
        style={styles.loginPage}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled>
        <SafeAreaView>
          <Text style={styles.loginTitle}>IRIS</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text: string) => {
              this.viewModel.username = text;
            }}
            defaultValue={this.viewModel.username}
            placeholder="Username"
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
          />
          <TextBox
            containerStyles={styles.inputBox}
            onChangeText={(text: string) => {
              this.viewModel.password = text;
            }}
            placeholder="Password"
            value={(): string => {
              console.log('cazzzz:', this.viewModel.password);
              return this.viewModel.password;
            }}
            defaultValue={this.viewModel.password}
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
                this.viewModel.username,
                this.viewModel.password,
              );
              Keyboard.dismiss();
              this.viewModel.doLogin();
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
    );
  }
}

export default function () {
  const navigation = useNavigation<RootStackParamList>();
  return <LoginScreen navigation={navigation} />;
}
