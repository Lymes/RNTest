import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {useAuth} from '~hooks/useAuth';
import Spinner from '~components/Spinner';

export const Router = () => {
  const {authData, loading} = useAuth();

  return (
    <NavigationContainer>
      {loading ? (
        <Spinner visible={loading} textContent={'Loading...'} />
      ) : null}
      {/* {authData ? <AppStack /> : <AuthStack />} */}
      <AuthStack />
    </NavigationContainer>
  );
};
