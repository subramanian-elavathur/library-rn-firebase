import React from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  StyleProp,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';

interface AvatarProps {
  source: ImageSourcePropType;
  title: string;
  style?: StyleProp<any>;
  onPress?: (event: GestureResponderEvent) => void;
}

const Avatar: React.FC<AvatarProps> = ({source, title, style, onPress}) => {
  const tailwind = useTailwind();
  return (
    <TouchableOpacity
      style={{
        ...tailwind('flex flex-col items-center justify-center'),
        ...style,
      }}
      onPress={onPress}>
      <Image source={source} style={tailwind('h-16 w-16')} />
      <Text style={tailwind('mt-2 text-black')}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Avatar;
