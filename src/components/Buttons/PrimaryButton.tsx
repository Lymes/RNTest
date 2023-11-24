import {useState} from 'react';
import {Pressable, View, Text, ButtonProps, TextStyle} from 'react-native';

interface Props extends ButtonProps {
  style?: TextStyle;
}

const PrimaryButton: React.FC<Props> = (props: Props) => {
  const [isPressed, setPressed] = useState(false);
  return (
    <Pressable
      onPress={props.onPress}
      onPressOut={() => {
        setPressed(false);
      }}
      onPressIn={() => {
        setPressed(true);
      }}>
      <View
        style={[
          props.style,
          {justifyContent: 'center'},
          isPressed
            ? {
                backgroundColor: props.style?.color,
                borderColor: props.style?.backgroundColor,
                borderWidth: 1,
              }
            : {
                backgroundColor: props.style?.backgroundColor,
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
            },
            isPressed
              ? {
                  color: props.style?.backgroundColor,
                }
              : {
                  color: props.style?.color,
                },
          ]}>
          {props.title}
        </Text>
      </View>
    </Pressable>
  );
};

export default PrimaryButton;
