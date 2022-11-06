import React, {useEffect} from 'react';
import {FirebaseStorageTypes} from '@react-native-firebase/storage';
import {useState} from 'react';
import {
  Alert,
  Image,
  ImageSourcePropType,
  Text,
  TextInput,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTailwind} from 'tailwind-rn/dist';
import {PRESETS} from '../../components/image/presets';
import ImageSelector from '../../components/imageSelector/ImageSelector';
import BottomTabAwareSafeAreaView from '../../components/safeArea/BottomTabAwareSafeAreaView';
import {Book} from '../../model/model';
import {getBook, upsertBook} from '../../db/library';

export const BOOK_ROUTE = 'book';

const Book2: React.FC<any> = ({route, navigation}) => {
  const bookId = route?.params?.bookId;
  const [name, setName] = useState<string | undefined>();
  const [isbn, setISBN] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [showImageSelector, setShowImageSelector] = useState<boolean>(false);
  const [requestInProgress, setRequestInProgress] = useState<boolean>(false);
  const [profilePictureReference, setProfilePictureReference] = useState<
    FirebaseStorageTypes.Reference | undefined
  >(undefined);
  const [profilePictureUrl, setProfilePictureUrl] = useState<
    ImageSourcePropType | undefined
  >();
  const tailwind = useTailwind();

  useEffect(() => {
    const setBook = async () => {
      const bk = await getBook(bookId);
      if (bk) {
        setName(bk.name);
        setISBN(bk.isbn);
        setDescription(bk.description);
      }
    };
    setBook();
  }, [bookId]);

  const upsertBook2 = async () => {
    if (name && isbn && description) {
      setRequestInProgress(true);
      const book: Book = {
        name: name,
        isbn: isbn,
        description: description,
      };
      await upsertBook(book);
      setRequestInProgress(false);
      Alert.alert('Book data saved successfully');
    }
  };

  return (
    <BottomTabAwareSafeAreaView>
      <View
        style={tailwind('flex flex-col justify-center items-center h-full')}>
        <TouchableOpacity onPress={() => setShowImageSelector(true)}>
          <Image
            source={PRESETS['hp-1'].source}
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
            onPress={() => navigation.goBack()}>
            <Text style={tailwind('text-xl text-white')}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tailwind('py-2 px-8 rounded bg-blue-400 ml-4')}
            onPress={() => upsertBook2()}>
            <Text style={tailwind('text-xl text-white')}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ImageSelector
        show={showImageSelector}
        onDismiss={() => setShowImageSelector(false)}
        onImageSelection={() => setShowImageSelector(false)}
      />
    </BottomTabAwareSafeAreaView>
  );
};

export default Book2;
