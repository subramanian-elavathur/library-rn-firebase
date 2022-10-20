import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TailwindProvider} from 'tailwind-rn';
import utilities from '../tailwind.json';
import AuthProvider from './components/authProvider/AuthProvider';
import Navigation from './Navigation';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthProvider>
          <TailwindProvider utilities={utilities}>
            <Navigation />
          </TailwindProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
