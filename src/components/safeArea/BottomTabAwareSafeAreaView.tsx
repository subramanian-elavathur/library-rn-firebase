import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import React, {PropsWithChildren} from 'react';
import {View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface BottomTabAwateSafeAreaView extends PropsWithChildren {
  style?: ViewStyle;
}

const BottomTabAwateSafeAreaView: React.FC<BottomTabAwateSafeAreaView> = ({
  children,
  style,
}) => {
  const insets = useSafeAreaInsets();
  const bottomTabBarHeight = useBottomTabBarHeight();
  return (
    <View
      style={{
        ...style,
        paddingTop: insets.top,
        paddingRight: insets.right,
        paddingLeft: insets.left,
        paddingBottom: insets.bottom - (bottomTabBarHeight ?? 0),
      }}>
      {children}
    </View>
  );
};

export default BottomTabAwateSafeAreaView;
