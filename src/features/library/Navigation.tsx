import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useTailwind} from 'tailwind-rn/dist';
import Book, {BOOK_ROUTE} from '../book/Book';
import Library, {LIBRARY_ROUTE} from './Library';

const Stack = createNativeStackNavigator();

const Navigation: React.FC = () => {
  const tailwind = useTailwind();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: tailwind('bg-white'),
      }}>
      <Stack.Screen name={LIBRARY_ROUTE} component={Library} />
      <Stack.Screen name={BOOK_ROUTE} component={Book} />
    </Stack.Navigator>
  );
};

export default Navigation;
