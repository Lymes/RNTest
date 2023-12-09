import {ActivityIndicator, Text, View, ViewStyle} from 'react-native';
import InputText from '~components/Inputs/InputText';
import {styles} from './LoginSelector.style';
import {useAppSelector} from '~redux/hooks';
import {LoginMethod, setManual} from '~redux/LoginMethodSlice';
import {useDispatch} from 'react-redux';
import useThemedStyles from '~hooks/useThemedStyles';

export const LoginSelector = () => {
  const loginMethod = useAppSelector(state => state.loginMethod);
  const dispatch = useDispatch();
  const style = useThemedStyles(styles);

  var addressLabel: string | undefined = undefined;
  switch (loginMethod.value) {
    case LoginMethod.DISCOVERY:
      addressLabel = loginMethod.isScanning
        ? 'Scanning...'
        : 'Found IP address';
      break;
    case LoginMethod.MANUAL:
      addressLabel = 'Enter IP address manually';
      break;
    case LoginMethod.CLOUD:
      addressLabel = 'Use ICC cloud';
      break;
  }

  const inputStyle: ViewStyle = {
    borderColor:
      loginMethod.value === LoginMethod.MANUAL ? '#000000' : '#a2a2a2',
    elevation: loginMethod.value === LoginMethod.MANUAL ? 4 : 0,
  };

  return (
    <>
      <View style={[style.textContainer, style.horizontal]}>
        <Text style={style.titleText}>{addressLabel}</Text>
        {loginMethod.isScanning ? <ActivityIndicator /> : null}
      </View>
      <InputText
        defaultValue={loginMethod.ipAddress}
        style={[style.ipAddressInput, inputStyle]}
        placeholder="IP address"
        onChangeText={newText => dispatch(setManual(newText))}
        editable={loginMethod.value === LoginMethod.MANUAL}
      />
    </>
  );
};
