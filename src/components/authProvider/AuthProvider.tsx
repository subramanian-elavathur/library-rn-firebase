import {ReactNativeFirebase} from '@react-native-firebase/app';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import React, {PropsWithChildren, useContext, useState} from 'react';

export interface AuthContext {
  auth: ReactNativeFirebase.FirebaseModuleWithStaticsAndApp<
    FirebaseAuthTypes.Module,
    FirebaseAuthTypes.Statics
  >;
  user: FirebaseAuthTypes.User | null | undefined;
}

const AuthProviderContext = React.createContext<AuthContext>({
  auth: auth,
  user: undefined,
});

const AuthProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  React.useEffect(() => {
    return auth().onAuthStateChanged(
      (storedUserInformation: FirebaseAuthTypes.User | null): void =>
        setUser(storedUserInformation),
    );
  }, []);

  return (
    <AuthProviderContext.Provider value={{auth: auth, user: user}}>
      {children}
    </AuthProviderContext.Provider>
  );
};

export const useAuth: () => AuthContext = () => useContext(AuthProviderContext);

export default AuthProvider;
