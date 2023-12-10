import {useCallback, useEffect, useState} from 'react';
import update from 'immutability-helper';
import {TopologyModule} from '~services/authService';
import {useAuth} from '~hooks/useAuth';
import {useAppSelector} from '~redux/hooks';
import {useDispatch} from 'react-redux';
import {setSelectedModule} from '~redux/SelectedModuleSlice';

export default () => {
  const {authData} = useAuth();
  const selectedModuleState = useAppSelector(state => state.selectedModule);
  const dispatch = useDispatch();
  const [data, setData] = useState<TopologyModule[]>([]);

  useEffect(() => {
    let selectedModule = authData?.topology.find(
      m => m.id === selectedModuleState.id,
    );
    if (selectedModule == undefined) {
      setData([...roots]);
    }
    if (selectedModule?.type != 'area') {
      return;
    }
    let children = [...(selectedModule?.children || [])];
    if (selectedModule !== undefined) {
      children = [
        {
          id: '-1',
          name: '..',
          type: 'area',
          parent: selectedModule?.parent,
        },
        ...children,
      ];
    } else {
      children = [...roots];
    }
    setData(children);
  }, [selectedModuleState]);

  const roots =
    authData?.topology.filter(m => {
      return m.areaId === null;
    }) || [];

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const startEdit = useCallback(() => setIsEditing(true), []);
  const stopEdit = useCallback(() => setIsEditing(false), []);

  const onItemPress = useCallback((item: TopologyModule) => {
    console.log(item.name);
    let selectedMod = item.id === '-1' ? item.parent : item;
    dispatch(
      setSelectedModule({
        id: selectedMod?.id,
        name: selectedMod?.name,
      }),
    );
  }, []);

  const onDelPress = useCallback((index: number) => {
    const newData = update(data, {$splice: [[index, 1]]});
    setData(newData);
  }, []);

  const onOrderChanged = useCallback((orderedData: Array<TopologyModule>) => {
    setData(orderedData);
  }, []);

  return {
    selectedModuleState,
    isEditing,
    data,
    startEdit,
    stopEdit,
    onItemPress,
    onDelPress,
    onOrderChanged,
  };
};
