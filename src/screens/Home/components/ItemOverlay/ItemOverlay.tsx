import React, {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import useItemOverlayHooks from './useItemOverlayHooks';
import useThemedStyles from '~hooks/useThemedStyles';

const Item = ({
  index,
  onDelPress,
}: {
  index: number;
  onDelPress: (index: number) => void;
}) => {
  const {onPress} = useItemOverlayHooks({index, onDelPress});
  const style = useThemedStyles(styles);

  return (
    <TouchableOpacity style={style.delBtn} onPress={onPress}>
      <Text style={style.text}>X</Text>
    </TouchableOpacity>
  );
};

export default memo(Item);
