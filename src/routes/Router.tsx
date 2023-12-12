import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './AuthStack';
import {useAuth} from '~hooks/useAuth';
import Spinner from '~components/Spinner';
import SplashScreen from 'react-native-splash-screen';

export const Router = () => {
  const {authData, loading} = useAuth();
  useEffect(() => {
    SplashScreen.hide();
  }, []);

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
