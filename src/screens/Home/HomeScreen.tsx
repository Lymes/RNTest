import React, {memo, useCallback, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View} from 'react-native';
import {RootStackParamList} from '~navigation/RootStackPrams';
import {styles} from './HomeScreen.style';
import DraggableGridView from 'react-native-drag-sort-gridview';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

interface IItem {
  id: number;
  color: string;
}

const Item = memo(({item}: {item: IItem}) => (
  <View style={[styles.item, {backgroundColor: item.color}]} />
));

export default function LoginScreen({navigation}: HomeProps) {
  const [data, setData] = useState<Array<IItem>>([
    {id: 0, color: '#FF0000'},
    {id: 1, color: '#00FF00'},
    {id: 2, color: '#0000FF'},
    {id: 3, color: '#FFFF00'},
    {id: 4, color: '#00FFFF'},
    {id: 5, color: '#FF00FF'},
    {id: 6, color: '#FFFFFF'},
    {id: 7, color: '#888888'},
    {id: 8, color: '#555555'},
  ]);

  const onOrderChanged = useCallback(
    (orderedData: Array<IItem>) => setData(orderedData),
    [],
  );

  const renderItem = ({item}: {item: IItem}) => <Item item={item} />;
  const keyExtractor = ({id}: IItem) => `gridview-${id}`;

  return (
    <DraggableGridView
      style={styles.bg}
      contentContainerStyle={styles.contentContainer}
      itemContainerStyle={styles.itemContainer}
      isEditing={true}
      numColumns={3}
      itemHeight={100}
      data={data}
      shouldAnimOnRelease={true}
      keyExtractor={keyExtractor}
      onOrderChanged={onOrderChanged}
      renderItem={renderItem}
    />
  );
}
