import {useCallback} from 'react';
import {TopologyModule} from '~services/authService';

export default ({
  item,
  onItemPress,
}: {
  item: TopologyModule;
  onItemPress?: (memberInfo: TopologyModule) => void;
}) => {
  const onPress = useCallback(
    () => onItemPress && onItemPress(item),
    [item, onItemPress],
  );

  return {
    onPress,
  };
};
