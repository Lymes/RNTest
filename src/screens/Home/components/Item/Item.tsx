import React, {memo} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import styles from './styles';
import useItemHooks from './useItemHooks';
import {TopologyModule, TopologyModuleType} from '~services/authService';
import useThemedStyles from '~hooks/useThemedStyles';
import Area from '~components/Modules/Area';
import Relay from '~components/Modules/Relay';

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

  switch (item.type) {
    case TopologyModuleType.AREA:
      return (
        <Area
          item={item}
          onItemPress={onItemPress}
          onItemLongPress={onItemLongPress}
        />
      );
    case TopologyModuleType.RELAY:
      return (
        <Relay
          item={item}
          onItemPress={onItemPress}
          onItemLongPress={onItemLongPress}
        />
      );
    default:
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
  }
};

export default memo(Item);
