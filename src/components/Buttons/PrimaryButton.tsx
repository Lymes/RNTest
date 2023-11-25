import {
  View,
  Text,
  ButtonProps,
  TextStyle,
  TouchableOpacity,
} from 'react-native';

interface Props extends ButtonProps {
  style?: TextStyle;
}

const PrimaryButton: React.FC<Props> = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
      <View
        style={[
          props.style,
          {
            justifyContent: 'center',
            backgroundColor: props.disabled
              ? 'grey'
              : props.style?.backgroundColor,
            borderColor: props.style?.borderColor,
            borderWidth: props.style?.borderWidth,
          },
        ]}>
        <Text
          style={[
            props.style,
            {
              marginTop: undefined,
              backgroundColor: undefined,
              height: undefined,
              textAlign: 'center',
              color: props.style?.color,
            },
          ]}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
