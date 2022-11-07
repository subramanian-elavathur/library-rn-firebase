import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useEffect, useMemo, useRef} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import {shadow} from '../imageSelector/ImageSelector';

interface LoadingProps {
  loading: boolean;
  loaderText?: string;
}

const Loading: React.FC<LoadingProps> = ({loading, loaderText}) => {
  const tailwind = useTailwind();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['20%'], []);

  useEffect(() => {
    if (bottomSheetModalRef?.current && loading) {
      bottomSheetModalRef.current?.present();
    }
  }, [bottomSheetModalRef, loading]);

  if (!loading) {
    return null;
  }

  return (
    <BottomSheetModal
      index={0}
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      handleComponent={null}
      enablePanDownToClose={false}
      style={{...shadow, ...tailwind('bg-white')}}>
      <View style={tailwind('flex justify-center items-center py-6')}>
        <Text style={tailwind('text-black text-xl mb-4')}>
          {loaderText ?? 'Loading'}
        </Text>
        <ActivityIndicator size={'large'} />
      </View>
    </BottomSheetModal>
  );
};

export default Loading;
