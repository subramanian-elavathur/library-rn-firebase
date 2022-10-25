import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import * as ImagePicker from 'react-native-image-picker';
import {
  Asset,
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {useTailwind} from 'tailwind-rn/dist';
import Back from '../../../assets/images/back.png';
import Camera from '../../../assets/images/camera.png';
import Gallery from '../../../assets/images/gallery.png';
import Star from '../../../assets/images/star.png';
import Avatar from '../image/Avatar';
import {Preset, Presets} from '../image/presets';
import ContainerTitle, {ContainerTitleSize} from './ContainerTitle';

const IMAGE_OPTIONS: CameraOptions | ImageLibraryOptions = {
  mediaType: 'photo',
  quality: 1,
};

export interface ImageSelectionResponse {
  selectedPreset?: Presets;
  selectedImage?: Asset;
  error?: {
    errorCode?: string;
    errorMessage?: string;
  };
}

interface ImageSelectorProps {
  show: boolean;
  onDismiss: () => void;
  onImageSelection: (response: ImageSelectionResponse) => void;
  presets?: Preset[];
}

const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 0.53,
  shadowRadius: 13.97,
  elevation: 21,
};

const ImageSelector: React.FC<ImageSelectorProps> = ({
  show,
  onDismiss,
  onImageSelection,
  presets,
}) => {
  const tailwind = useTailwind();
  const [showPresets, setShowPresets] = useState<boolean>(false);

  const onPresetSelection = (preset: Preset) => {
    onImageSelection({selectedPreset: preset.id});
    setShowPresets(false);
  };

  const onImagePick = (response: ImagePickerResponse) => {
    const selectedImage =
      response && response.assets && response.assets.length > 0
        ? response.assets[0]
        : {};
    const errorCode = response.didCancel
      ? 'cancelled_selection'
      : response.errorCode;
    const error = errorCode
      ? {errorCode: errorCode, errorMessage: response.errorMessage}
      : undefined;
    onImageSelection({selectedImage: selectedImage, error: error});
  };

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['30%'], []);

  useEffect(() => {
    if (bottomSheetModalRef?.current && show) {
      bottomSheetModalRef.current?.present();
    }
  }, [bottomSheetModalRef, show]);

  useEffect(() => {
    setShowPresets(false);
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <BottomSheetModal
      index={0}
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      style={{...shadow}}
      onDismiss={onDismiss}>
      {showPresets && (
        <>
          <ContainerTitle
            title="Choose a Preset"
            size={ContainerTitleSize.lg}
          />
          <View style={tailwind('flex flex-row items-center mt-6')}>
            <ScrollView horizontal style={tailwind('w-full')}>
              <Avatar
                title="Go Back"
                source={Back}
                onPress={() => setShowPresets(false)}
                style={tailwind('ml-3 mr-3')}
              />
              {presets &&
                presets.length > 0 &&
                presets.map((each, index) => (
                  <Avatar
                    title={`Preset ${index + 1}`}
                    source={each.source}
                    key={`${each.id}-${index}`}
                    onPress={() => onPresetSelection(each)}
                    style={tailwind('ml-3 mr-3')}
                  />
                ))}
            </ScrollView>
          </View>
        </>
      )}
      {!showPresets && (
        <>
          <ContainerTitle
            title="Choose a Source"
            size={ContainerTitleSize.lg}
          />
          <View
            style={tailwind('flex flex-row justify-evenly items-center mt-6')}>
            {presets && presets.length > 0 && (
              <Avatar
                source={Star}
                title="Presets"
                onPress={() => setShowPresets(true)}
              />
            )}
            <Avatar
              source={Gallery}
              title="Gallery"
              onPress={() =>
                ImagePicker.launchImageLibrary(IMAGE_OPTIONS, onImagePick)
              }
            />
            <Avatar
              source={Camera}
              title="Camera"
              onPress={() =>
                ImagePicker.launchCamera(IMAGE_OPTIONS, onImagePick)
              }
            />
          </View>
        </>
      )}
    </BottomSheetModal>
  );
};

export default ImageSelector;
