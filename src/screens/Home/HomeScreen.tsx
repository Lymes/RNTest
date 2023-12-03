import React, {memo, useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Dimensions, ScaledSize, ScrollView, Text, View} from 'react-native';
import {RootStackParamList} from '~navigation/RootStackPrams';
import {styles} from './HomeScreen.style';
import {DraggableGrid} from '~components/Grid';
import Orientation from 'react-native-orientation-locker';

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
  const [dragging, setDragging] = useState(false);
  const [size, setSize] = useState<ScaledSize>(Dimensions.get('window'));

  useEffect(() => {
    const stopSizeListener = Dimensions.addEventListener(
      'change',
      ({window, screen}: {window: ScaledSize; screen: ScaledSize}) => {
        setSize(window);
      },
    );
    Orientation.unlockAllOrientations();
    return () => {
      stopSizeListener.remove();
    };
  }, []);

  const renderItem = (item: {name: string; key: string}) => (
    <View style={[styles.item, {width: size.width / 3 - 10}]} key={item.key}>
      <Text style={styles.item_text}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <ScrollView scrollEnabled={!dragging}>
        <DraggableGrid
          style={styles.bg}
          numColumns={3}
          itemHeight={110}
          data={data}
          renderItem={renderItem}
          onDragStart={() => setDragging(true)}
          onDragRelease={(data: IItem[]) => {
            setDragging(false);
            setData(data);
          }}
        />
      </ScrollView>
    </View>
  );
}
