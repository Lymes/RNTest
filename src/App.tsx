import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Router} from '~routes/Router';
import {AuthProvider} from '~contexts/Auth';
import ThemeProvider from '~themes/ThemeProvider';
import {Provider} from 'react-redux';
import {store} from './redux/store';

const App = () => {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <Provider store={store}>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </Provider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
