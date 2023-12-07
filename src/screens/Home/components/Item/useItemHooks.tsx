import { useCallback } from 'react'
import { IItem } from '../../TopologyModule'

export default ({
  item,
  onItemPress
}: {
  item: IItem
  onItemPress?: (memberInfo: IItem) => void
}) => {
  const onPress = useCallback(() => onItemPress && onItemPress(item), [item, onItemPress])

  return {
    onPress
  }
}
