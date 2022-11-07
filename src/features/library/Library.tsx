import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import BookCard from '../../components/book/BookCard';
import Loading from '../../components/loading/Loading';
import BottomTabAwareSafeAreaView from '../../components/safeArea/BottomTabAwareSafeAreaView';
import {getBooks} from '../../db/library';
import {Book} from '../../model/model';
import {BOOK_ROUTE} from '../book/Book';

export const LIBRARY_ROUTE = 'library';

const Firebase: React.FC<any> = ({navigation}) => {
  const tailwind = useTailwind();
  const [books, setBooks] = useState<Book[] | undefined>();
  const [requestInProgress, setRequestInProgress] = useState<boolean>(false);

  useEffect(() => {
    return getBooks(snapshot => {
      setRequestInProgress(true);
      const data = snapshot.docs.map(each => each.data());
      setBooks(data);
      setRequestInProgress(false);
    }, console.log);
  }, []);

  return (
    <BottomTabAwareSafeAreaView>
      <ScrollView style={tailwind('h-full bg-white')}>
        <Text style={tailwind('text-xl font-bold m-4 text-black')}>
          Library
        </Text>
        {books?.map(each => (
          <BookCard
            isbn={each.isbn}
            key={each.isbn}
            name={each.name}
            profilePictureUUID={each.profilePictureUUID}
            onPress={() => navigation.navigate(BOOK_ROUTE, {bookId: each.isbn})}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={tailwind(
          'absolute bottom-2 right-4 py-2 px-4 rounded bg-blue-500',
        )}
        onPress={() => navigation.navigate(BOOK_ROUTE)}>
        <Text style={tailwind('text-xl text-white')}>Add</Text>
      </TouchableOpacity>
      <Loading loading={requestInProgress} loaderText={'Getting Updates'} />
    </BottomTabAwareSafeAreaView>
  );
};

export default Firebase;
