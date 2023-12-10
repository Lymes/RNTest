import React, {memo} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import styles from './styles';
import folder from 'assets/images/folder.png';
import {TopologyModule} from '~services/authService';
import useThemedStyles from '~hooks/useThemedStyles';
import useItemHooks from '~screens/Home/components/Item/useItemHooks';
import {Image} from 'react-native-animatable';

const Area = ({
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
        <Image source={folder} style={style.icon} />
        <Text style={style.itemText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(Area);
