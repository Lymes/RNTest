import React, {createContext, useState, useContext, useEffect} from 'react';
import {AuthData, authService} from '~services/authService';

export type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  signIn(username: string, password: string): Promise<void>;
  signOut(): void;
};

// Create the Auth Context with the data type specified
// and a empty object
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

type Props = {
  children?: React.ReactNode;
};

const AuthProvider: React.FC<Props> = ({children}) => {
  const [authData, setAuthData] = useState<AuthData>();

  // the AuthContext start with loading equals true
  // and stay like this, until the data be load from Async Storage
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Every time the App is opened, this provider is rendered
    // and call de loadStorage function.
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      // Try get the data from Async Storage
      // const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      // if (authDataSerialized) {
      // If there are data, it's converted to an Object and the state is updated.
      // const _authData: AuthData = JSON.parse(authDataSerialized);
      // setAuthData(_authData);
      // }
    } catch (error) {
    } finally {
      // loading finished
      setLoading(false);
    }
  }

  const signIn = async (username: string, password: string) => {
    // call the service passing credential (username and password).
    const _authData = await authService.signIn(username, password);

    // Set the data in the context, so the App can be notified
    // and send the user to the AuthStack
    setAuthData(_authData);

    // Persist the data in the Async Storage
    // to be recovered in the next user session.
    // AsyncStorage.setItem('@AuthData', JSON.stringify(_authData));
  };

  const signOut = async () => {
    //Remove data from context, so the App can be notified
    //and send the user to the AuthStack
    setAuthData(undefined);

    // Remove the data from Async Storage
    // to NOT be recoverede in next session.
    // await AsyncStorage.removeItem('@AuthData');
  };

  return (
    // This component will be used to encapsulate the whole App,
    // so all components will have access to the Context
    <AuthContext.Provider value={{authData, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};