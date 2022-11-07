import 'react-native-get-random-values';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TailwindProvider} from 'tailwind-rn';
import utilities from '../tailwind.json';
import AuthProvider from './components/authProvider/AuthProvider';
import Navigation from './Navigation';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <TailwindProvider utilities={utilities}>
        <GestureHandlerRootView style={{flex: 1}}>
          <BottomSheetModalProvider>
            <NavigationContainer>
              <AuthProvider>
                <Navigation />
              </AuthProvider>
            </NavigationContainer>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </TailwindProvider>
    </SafeAreaProvider>
  );
};

export default App;
