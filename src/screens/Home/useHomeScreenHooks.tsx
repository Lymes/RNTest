import {useCallback, useState} from 'react';
import update from 'immutability-helper';
import {TopologyModule} from '~services/authService';
import {useAuth} from '~hooks/useAuth';
import {useAppSelector} from '~redux/hooks';

export default () => {
  const {authData} = useAuth();
  const selectedModuleId = useAppSelector(state => state.selectedModule);
  console.log('Selected Module', selectedModuleId);

  const roots =
    authData?.topology.filter(m => {
      return m.areaId === null;
    }) || [];

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [data, setData] = useState<Array<TopologyModule>>(roots);

  const startEdit = useCallback(() => setIsEditing(true), []);

  const stopEdit = useCallback(() => setIsEditing(false), []);

  const onItemPress = useCallback((item: TopologyModule) => {
    console.log(item.name);
    let selectedMod = item.id === '-1' ? item.parent : item;
    let children = [...(selectedMod?.children || [])];
    if (selectedMod !== undefined) {
      children = [
        {
          id: '-1',
          name: '..',
          parent: selectedMod?.parent,
        },
        ...children,
      ];
    } else {
      children = [...roots];
    }
    setData(children);
  }, []);

  const onDelPress = useCallback(
    (index: number) => {
      const newData = update(data, {$splice: [[index, 1]]});
      setData(newData);
    },
    [data],
  );

  const onOrderChanged = useCallback(
    (orderedData: Array<TopologyModule>) => setData(orderedData),
    [],
  );

  return {
    isEditing,
    data,
    startEdit,
    stopEdit,
    onItemPress,
    onDelPress,
    onOrderChanged,
  };
};
