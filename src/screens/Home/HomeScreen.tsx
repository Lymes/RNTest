import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Text, TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from '~navigation/RootStackPrams';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useHomeScreenHooks from './useHomeScreenHooks';
import {TopologyModule} from '~services/authService';
import Item from './components/Item/Item';
import ItemOverlay from './components/ItemOverlay/ItemOverlay';
import DraggableGridView from '~components/DraggableGridView';
import styles from './styles';
import Orientation from 'react-native-orientation-locker';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function LoginScreen({navigation}: HomeProps) {
  const insets = useSafeAreaInsets();
  const {
    isEditing,
    data,
    startEdit,
    stopEdit,
    onItemPress,
    onDelPress,
    onOrderChanged,
  } = useHomeScreenHooks();

  useEffect(() => {
    Orientation.unlockAllOrientations();
  }, []);

  const renderItem = ({item}: {item: TopologyModule}) => (
    <Item item={item} onItemPress={onItemPress} onItemLongPress={startEdit} />
  );

  const renderOnEditOverlay = ({index}: {index: number}) => (
    <ItemOverlay onDelPress={onDelPress} index={index} />
  );

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}>
      <DraggableGridView
        style={styles.bg}
        contentContainerStyle={styles.contentContainer}
        itemContainerStyle={styles.itemContainer}
        isEditing={isEditing}
        numColumns={3}
        itemHeight={100}
        data={data}
        shouldAnimOnRelease={true}
        keyExtractor={({id}) => `${id}`}
        onOrderChanged={onOrderChanged}
        renderItem={renderItem}
        renderOnEditOverlay={renderOnEditOverlay}
      />
      {/* {selectedItem && <Item item={selectedItem} />} */}
      {isEditing && (
        <TouchableOpacity style={styles.btn} onPress={stopEdit}>
          <Text style={styles.text}>done</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
