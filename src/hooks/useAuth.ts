import {useContext} from 'react';
import {AuthContext, AuthContextData} from '~contexts/Auth';

// A simple hook to facilitate the access to the AuthContext
// and permit components to subscribe to AuthContext updates
function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export {useAuth};
