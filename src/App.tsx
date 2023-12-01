import React from 'react';
import {Router} from '~routes/Router';
import {AuthProvider} from '~contexts/Auth';
import {Provider} from 'react-redux';
import {store} from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </Provider>
  );
};

export default App;
