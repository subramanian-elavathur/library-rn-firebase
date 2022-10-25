import React from 'react';
import {Text, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';

export enum ContainerTitleSize {
  sm = 'text-xs',
  md = 'text-sm',
  lg = 'text-lg',
  xl = 'text-lg',
}

interface ContainerTitleProps {
  title: string;
  size: ContainerTitleSize;
}

// There is a nested View inside the outer View because
// text component does not support border in iOS
const ContainerTitle: React.FC<ContainerTitleProps> = ({title, size}) => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('flex flex-row justify-center')}>
      <View style={tailwind('px-2 py-1 mt-2 border-2 border-black rounded-xl')}>
        <Text style={tailwind(`text-black ${size}`)}>{title}</Text>
      </View>
    </View>
  );
};

export default ContainerTitle;
