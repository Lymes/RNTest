import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {useAuth} from '~hooks/useAuth';
import {Loader} from '~components/Loader/Loader';

export const Router = () => {
  const {authData, loading} = useAuth();

  if (loading) {
    return <Loader />;
  }
  return (
    <NavigationContainer>
      {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
