import {ChangeEvent, FunctionComponent} from 'react';

interface Props {
  onBlur?: PropTypes.func;
  onChangeText?: PropTypes.func.isRequired;
  onFocus?: PropTypes.func;
  onSubmitEditing?: PropTypes.func;
  alertType?: PropTypes.string;
  blurOnSubmit?: PropTypes.bool;
  eyeColor?: PropTypes.string;
  containerStyles?: PropTypes.object;
  hint?: PropTypes.string;
  hintColor?: PropTypes.string;
  hintStyles?: PropTypes.object;
  iconFamily?: PropTypes.string;
  iconSuccess?: PropTypes.string;
  iconSuccessColor?: PropTypes.string;
  iconWarning?: PropTypes.string;
  iconWarningColor?: PropTypes.string;
  iconAlert?: PropTypes.string;
  iconAlertColor?: PropTypes.string;
  inputStyle?: PropTypes.object;
  placeholder?: PropTypes.string;
  placeholderTextColor?: PropTypes.string;
  returnKeyType?: PropTypes.string;
  rtl?: PropTypes.bool;
  secureTextEntry?: PropTypes.bool;
  value?: string;
  defaultValue?: string;
}

const TextBox: FunctionComponent<Props>;

export default TextBox;
