import React from 'react';
import {Router} from '~routes/Router';
import {AuthProvider} from '~contexts/Auth';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
