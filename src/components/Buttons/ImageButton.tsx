import {useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  Pressable,
  View,
} from 'react-native';

interface Props {
  style?: ImageStyle;
  tint?: string;
  onPress: () => void;
  image: ImageSourcePropType;
}

const ImageButton: React.FC<Props> = ({style, onPress, image}) => {
  const [isPressed, setPressed] = useState(false);
  return (
    <View
      style={[
        style,
        {width: undefined, height: undefined},
        isPressed
          ? {
              backgroundColor: style?.tintColor,
              borderColor: style?.backgroundColor,
              borderWidth: 1,
            }
          : {
              backgroundColor: style?.backgroundColor,
              borderColor: style?.borderColor,
              borderWidth: style?.borderWidth,
            },
      ]}>
      <Pressable
        onPress={onPress}
        onPressOut={() => {
          setPressed(false);
        }}
        onPressIn={() => {
          setPressed(true);
        }}>
        <Image
          style={[
            {
              height: style?.height || 32,
              width: style?.width || 32,
            },
            isPressed
              ? {tintColor: style?.backgroundColor}
              : {tintColor: style?.tintColor},
          ]}
          source={image}></Image>
      </Pressable>
    </View>
  );
};

export default ImageButton;
