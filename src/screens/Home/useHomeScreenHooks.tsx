import {useCallback, useState} from 'react';
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

  const roots =
    authData?.topology.filter(m => {
      return m.areaId === null;
    }) || [];

  const [isEditing, setIsEditing] = useState<boolean>(false);

  let selectedModule = authData?.topology.find(
    m => m.id === selectedModuleState.id,
  );
  console.log('find:', selectedModule?.name);
  let children = [...(selectedModule?.children || [])];
  if (selectedModule !== undefined) {
    children = [
      {
        id: '-1',
        name: '..',
        parent: selectedModule?.parent,
      },
      ...children,
    ];
  } else {
    children = [...roots];
  }
  let varData = children;

  const startEdit = useCallback(() => setIsEditing(true), []);
  const stopEdit = useCallback(() => setIsEditing(false), []);

  const onItemPress = useCallback((item: TopologyModule) => {
    console.log(item.name);
    let selectedMod = item.id === '-1' ? item.parent : item;
    dispatch(setSelectedModule(selectedMod?.id || '-1'));
  }, []);

  const onDelPress = useCallback((index: number) => {
    const newData = update(varData, {$splice: [[index, 1]]});
    varData = newData;
  }, []);

  const onOrderChanged = useCallback((orderedData: Array<TopologyModule>) => {
    varData = orderedData;
  }, []);

  const data = varData;

  return {
    selectedModule,
    isEditing,
    data,
    startEdit,
    stopEdit,
    onItemPress,
    onDelPress,
    onOrderChanged,
  };
};
