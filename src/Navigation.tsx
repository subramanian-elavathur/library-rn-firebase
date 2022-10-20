import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useAuth} from './components/authProvider/AuthProvider';
import App from './features/app/Navigation';
import Login from './features/login/Login';

const Stack = createNativeStackNavigator();

const Navigation: React.FC = () => {
  const {user} = useAuth();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {user ? (
        <Stack.Screen name="Home" component={App} />
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
};

export default Navigation;
