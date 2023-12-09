import React, {memo} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import styles from './styles';
import useItemHooks from './useItemHooks';
import {TopologyModule} from '~services/authService';
import useThemedStyles from '~hooks/useThemedStyles';

const Item = ({
  item,
  onItemPress,
  onItemLongPress,
}: {
  item: TopologyModule;
  onItemPress?: (itemInfo: TopologyModule) => void;
  onItemLongPress?: () => void;
}) => {
  const {onPress} = useItemHooks({item, onItemPress});
  const style = useThemedStyles(styles);

  return (
    <TouchableOpacity
      style={style.itemWrapper}
      onPress={onPress}
      onLongPress={onItemLongPress}>
      <View style={style.item}>
        <Text style={style.itemText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(Item);
