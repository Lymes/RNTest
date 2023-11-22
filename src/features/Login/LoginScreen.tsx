import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';
import {RootStackParamList} from '../navigation/RootStackPrams';
import * as Keychain from 'react-native-keychain';
import {LoginViewModel} from './LoginViewModel';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  Button,
  ButtonIcon,
  ButtonText,
  Center,
  FormControl,
  Heading,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {EyeIcon, EyeOffIcon, Bluetooth} from 'lucide-react-native';
import SettingsScreen from './Settings/SettingsScreen';

const viewModel = new LoginViewModel();
type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({navigation}: LoginProps) {
  const [hasCredentials, setGotCredentials] = useState<boolean>(false);
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClose = () => setShowActionsheet(!showActionsheet);

  const handleState = () => {
    setShowPassword(showState => {
      return !showState;
    });
  };

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
    <KeyboardAvoidingView
      style={styles.loginPage}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled>
      <SafeAreaView>
        <Button
          style={styles.topRightButton}
          borderRadius="$full"
          size="xs"
          onPress={() => {
            navigation.navigate('BLE');
          }}>
          <ButtonIcon as={Bluetooth} />
        </Button>

        <FormControl
          p="$4"
          borderWidth="$1"
          borderRadius="$lg"
          borderColor="transparent"
          sx={{
            _dark: {
              borderWidth: '$1',
              borderRadius: '$lg',
              borderColor: 'transparent',
            },
          }}>
          <VStack space="2xl">
            <Center>
              <Heading color="$black" size="4xl">
                IRIS
              </Heading>
            </Center>
            <VStack space="xs">
              <Text color="$black" lineHeight="$xs">
                Username
              </Text>
              <Input borderRadius={8}>
                <InputField
                  type="text"
                  defaultValue={viewModel.username}
                  onChangeText={(text: string) => {
                    viewModel.username = text;
                  }}
                />
              </Input>
            </VStack>
            <VStack space="xs">
              <Text color="$black" lineHeight="$xs">
                Password
              </Text>
              <Input borderRadius={8}>
                <InputField
                  type={showPassword ? 'text' : 'password'}
                  onChangeText={(text: string) => {
                    viewModel.password = text;
                  }}
                />
                <InputSlot pr="$3" onPress={handleState}>
                  <InputIcon
                    as={showPassword ? EyeIcon : EyeOffIcon}
                    color="$black"
                  />
                </InputSlot>
              </Input>
            </VStack>
            <VStack space="lg">
              <Button
                width={'100%'}
                borderRadius={8}
                onPress={async () => {
                  await Keychain.setGenericPassword(
                    viewModel.username,
                    viewModel.password,
                  );
                  Keyboard.dismiss();
                  viewModel.doLogin();
                }}>
                <ButtonText color="$white">Login</ButtonText>
              </Button>
              <Button
                width={'100%'}
                borderRadius={8}
                action="secondary"
                onPress={handleClose}>
                <ButtonText color="$white">Settings</ButtonText>
              </Button>
            </VStack>
          </VStack>
        </FormControl>
        <Actionsheet
          style={styles.settingsContainer}
          isOpen={showActionsheet}
          onClose={handleClose}
          useRNModal={true}>
          <ActionsheetBackdrop />
          <ActionsheetContent maxHeight="75%" minHeight="75%">
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
            <SettingsScreen />
          </ActionsheetContent>
        </Actionsheet>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
