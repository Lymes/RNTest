import React, {memo} from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import styles from './styles';
import {TopologyModule} from '~services/authService';
import useThemedStyles from '~hooks/useThemedStyles';
import useItemHooks from '~screens/Home/components/Item/useItemHooks';
import bulbOff from 'assets/images/bulb-off.png';
import bulbOn from 'assets/images/bulb-on.png';

const Relay = ({
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
        <Image source={bulbOff} style={style.icon} />
        <Text style={style.itemText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(Relay);
