import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTailwind} from 'tailwind-rn';

interface BookCardProps {
  name: string;
  image: ImageSourcePropType;
  onPress?: () => void;
}

const BookCard: React.FC<BookCardProps> = ({name, image, onPress}) => {
  const tailwind = useTailwind();
  return (
    <View
      style={{
        ...styles.shadow,
        ...tailwind('bg-white mx-8 my-2 h-24 p-2 rounded'),
      }}>
      <TouchableOpacity
        style={tailwind('flex flex-row items-center')}
        onPress={() => onPress?.()}>
        <Image source={image} style={styles.image} />
        <View style={tailwind('flex flex-row flex-wrap items-center')}>
          <Text
            style={tailwind('w-64 h-full px-4 text-xl font-bold text-black')}>
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0.5},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 50,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 3,
    marginHorizontal: 2,
  },
});

export default BookCard;
