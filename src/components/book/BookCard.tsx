import storage from '@react-native-firebase/storage';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageURISource,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import BookPlaceholderImage from '../../../assets/book.png';
import {bookImageStorageRefGenerator} from '../../features/book/Book';

interface BookCardProps {
  name: string;
  isbn: string;
  profilePictureUUID: string;
  onPress?: () => void;
}

const BookCard: React.FC<BookCardProps> = ({
  name,
  isbn,
  profilePictureUUID,
  onPress,
}) => {
  const tailwind = useTailwind();
  const [bookImageUri, setBookImageUri] = useState<
    ImageURISource | undefined
  >();

  useEffect(() => {
    const generateAndSetImageUri = async () => {
      try {
        const reference = storage().ref(bookImageStorageRefGenerator(isbn));
        const downloadUri = await reference.getDownloadURL();
        setBookImageUri({uri: downloadUri});
      } catch (error) {
        console.log(`Image not found for ISBN: ${isbn}`);
      }
    };
    generateAndSetImageUri();
  }, [isbn, profilePictureUUID]);

  return (
    <View
      style={{
        ...styles.shadow,
        ...tailwind('bg-white mx-8 my-2 h-24 p-2 rounded'),
      }}>
      <TouchableOpacity
        style={tailwind('flex flex-row items-center')}
        onPress={() => onPress?.()}>
        <Image
          source={bookImageUri ?? BookPlaceholderImage}
          style={styles.image}
        />
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
