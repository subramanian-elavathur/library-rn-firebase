import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTailwind} from 'tailwind-rn/dist';
import LibraryNavigation from '../library/Navigation';
import Profile from '../profile/Profile';

const Tab = createBottomTabNavigator();

const Navigation: React.FC = () => {
  const tailwind = useTailwind();
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      sceneContainerStyle={tailwind('bg-white')}>
      <Tab.Screen
        name="Library"
        component={LibraryNavigation}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="library-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="My Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="logo-octocat" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
