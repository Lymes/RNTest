import React, { memo } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { TopologyModule } from '../../TopologyModule'
import styles from './styles'
import useItemHooks from './useItemHooks'

const Item = ({
  item,
  onItemPress,
  onItemLongPress
}: {
  item: TopologyModule
  onItemPress?: (itemInfo: TopologyModule) => void
  onItemLongPress?: () => void
}) => {
  const { onPress } = useItemHooks({ item, onItemPress })

  return (
    <TouchableOpacity style={styles.itemWrapper} onPress={onPress} onLongPress={onItemLongPress}>
      <View style={styles.item}>
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default memo(Item)
