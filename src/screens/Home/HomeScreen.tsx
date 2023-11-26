import React, {memo, useCallback, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';
import {RootStackParamList} from '~navigation/RootStackPrams';
import {styles} from './HomeScreen.style';
import {DraggableGrid} from 'react-native-draggable-grid';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

interface IItem {
  name: string;
  key: string;
}

export default function LoginScreen({navigation}: HomeProps) {
  const [data, setData] = useState<Array<IItem>>([
    {name: '1', key: 'one'},
    {name: '2', key: 'two'},
    {name: '3', key: 'three'},
    {name: '4', key: 'four'},
    {name: '5', key: 'five'},
    {name: '6', key: 'six'},
    {name: '7', key: 'seven'},
    {name: '8', key: 'eight'},
    {name: '9', key: 'night'},
    {name: '0', key: 'zero'},
  ]);

  const renderItem = (item: {name: string; key: string}) => (
    <View style={styles.item} key={item.key}>
      <Text style={styles.item_text}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <DraggableGrid
        style={styles.bg}
        numColumns={3}
        itemHeight={120}
        data={data}
        renderItem={renderItem}
        onDragRelease={(data: IItem[]) => {
          setData(data);
        }}
      />
    </View>
  );
}
