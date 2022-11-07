import storage from '@react-native-firebase/storage';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageURISource,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTailwind} from 'tailwind-rn/dist';
import {v4 as uuidv4} from 'uuid';
import BookPlaceholderImage from '../../../assets/book.png';
import ImageSelector, {
  ImageSelectionResponse,
} from '../../components/imageSelector/ImageSelector';
import BottomTabAwareSafeAreaView from '../../components/safeArea/BottomTabAwareSafeAreaView';
import {getBook, getBookV2, upsertBook} from '../../db/library';
import {Book} from '../../model/model';
import Loading from '../../components/loading/Loading';

export const BOOK_ROUTE = 'book';

export const bookImageStorageRefGenerator = (isbn: string) => `book/${isbn}`;

const Book2: React.FC<any> = ({route, navigation}) => {
  const tailwind = useTailwind();
  const bookId = route?.params?.bookId;
  const [name, setName] = useState<string | undefined>();
  const [isbn, setISBN] = useState<string | undefined>();
  const [bookImageUUID, setBookImageUUID] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [showImageSelector, setShowImageSelector] = useState<boolean>(false);
  const [requestInProgress, setRequestInProgress] = useState<boolean>(false);
  const bookImageReference = storage().ref(
    bookImageStorageRefGenerator(isbn ?? ''),
  );
  const [newBookImageUri, setNewBookImageUri] = useState<
    ImageURISource | undefined
  >();
  const [bookImageUri, setBookImageUri] = useState<
    ImageURISource | undefined
  >();

  useEffect(() => {
    return getBookV2(
      bookId,
      bookSnapshot => {
        setRequestInProgress(true);
        const bk = bookSnapshot.data();
        if (bk) {
          setName(bk.name);
          setISBN(bk.isbn);
          setDescription(bk.description);
          setBookImageUUID(bk.profilePictureUUID);
        }
        setRequestInProgress(false);
      },
      console.log,
    );
  }, [bookId]);

  useEffect(() => {
    const setBookImage = async () => {
      try {
        const downloadUrl = await bookImageReference.getDownloadURL();
        setBookImageUri({uri: downloadUrl});
      } catch (error) {
        console.log(`Image not found for ISBN: ${bookId}`);
      }
    };
    setBookImage();
  }, [bookImageUUID]);

  const updateBook = async () => {
    setRequestInProgress(true);

    if (newBookImageUri) {
      await bookImageReference.putFile(newBookImageUri.uri!);
    }

    if (name && isbn && description) {
      const book: Book = {
        name: name,
        isbn: isbn,
        description: description,
        profilePictureUUID: newBookImageUri ? uuidv4() : bookImageUUID!,
      };
      await upsertBook(book);
    }

    const downloadUrl = await bookImageReference.getDownloadURL();
    setBookImageUri({uri: downloadUrl});
    setNewBookImageUri(undefined);
    setRequestInProgress(false);
  };

  const updateBookImageUri = async (response: ImageSelectionResponse) => {
    setRequestInProgress(true);
    setShowImageSelector(false);
    if (response.selectedImage?.uri) {
      setNewBookImageUri({uri: response.selectedImage?.uri});
    }
    setRequestInProgress(false);
  };

  return (
    <BottomTabAwareSafeAreaView>
      <View
        style={tailwind('flex flex-col justify-center items-center h-full')}>
        <TouchableOpacity onPress={() => setShowImageSelector(true)}>
          <Image
            source={newBookImageUri ?? bookImageUri ?? BookPlaceholderImage}
            onLoadStart={() => setRequestInProgress(true)}
            onLoadEnd={() => setRequestInProgress(false)}
            style={tailwind('h-32 w-32 mx-6 rounded-xl')}
          />
          <View
            style={tailwind(
              'absolute bottom-0 right-4 bg-white opacity-90 rounded-full',
            )}>
            <Icon
              name="camera-outline"
              size={25}
              style={tailwind('text-black')}
            />
          </View>
        </TouchableOpacity>
        <View style={tailwind('flex mt-6 mb-2')}>
          <Text style={tailwind('text-black my-1')}>Book Name</Text>
          <TextInput
            style={tailwind(
              'text-black border-b border-black text-lg rounded pl-1 w-72 my-1',
            )}
            placeholderTextColor={'#cbd5e1'}
            placeholder={'Enter book name'}
            keyboardType={'default'}
            value={name}
            onChangeText={value => setName(value)}
            editable={!requestInProgress}
          />
        </View>
        <View style={tailwind('flex mt-4 mb-2')}>
          <Text style={tailwind('text-black my-1')}>ISBN</Text>
          <TextInput
            style={tailwind(
              'text-black border-b border-black text-lg rounded pl-1 w-72 my-1',
            )}
            placeholderTextColor={'#cbd5e1'}
            placeholder={'Enter ISBN'}
            keyboardType={'default'}
            value={isbn}
            onChangeText={value => setISBN(value)}
            editable={!requestInProgress}
          />
        </View>
        <View style={tailwind('flex mt-4 mb-2')}>
          <Text style={tailwind('text-black my-1')}>Description</Text>
          <TextInput
            style={tailwind(
              'text-black border-b border-black text-lg rounded pl-1 w-72 h-32 my-1',
            )}
            multiline
            numberOfLines={5}
            placeholderTextColor={'#cbd5e1'}
            placeholder={'Enter Description'}
            keyboardType={'default'}
            value={description}
            onChangeText={value => setDescription(value)}
            editable={!requestInProgress}
          />
        </View>
        <View style={tailwind('flex flex-row mt-6')}>
          <TouchableOpacity
            style={tailwind('py-2 px-4 rounded bg-slate-400')}
            disabled={requestInProgress}
            onPress={() => navigation.goBack()}>
            <Text style={tailwind('text-xl text-white')}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tailwind('py-2 px-8 rounded bg-blue-400 ml-4')}
            disabled={requestInProgress}
            onPress={() => updateBook()}>
            <Text style={tailwind('text-xl text-white')}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ImageSelector
        show={showImageSelector}
        onDismiss={() => setShowImageSelector(false)}
        onImageSelection={response => updateBookImageUri(response)}
      />
      <Loading loading={requestInProgress} loaderText={'Updating'} />
    </BottomTabAwareSafeAreaView>
  );
};

export default Book2;
