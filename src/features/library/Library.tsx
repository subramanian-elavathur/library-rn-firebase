import React, {useEffect, useState} from 'react';
import {ScrollView, Text} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import BookCard from '../../components/book/BookCard';
import {Presets, PRESETS} from '../../components/image/presets';
import BottomTabAwareSafeAreaView from '../../components/safeArea/BottomTabAwareSafeAreaView';
import {getBooks} from '../../db/library';
import {Book} from '../../model/model';
import {BOOK_ROUTE} from './Book';

// const presets = [
//   PRESETS[Presets.HP1],
//   PRESETS[Presets.HP2],
//   PRESETS[Presets.HP3],
//   PRESETS[Presets.HP4],
//   PRESETS[Presets.HP5],
//   PRESETS[Presets.HP6],
//   PRESETS[Presets.HP7],
// ];

export const LIBRARY_ROUTE = 'library';

const Firebase: React.FC<any> = ({navigation}) => {
  const tailwind = useTailwind();
  const [books, setBooks] = useState<Book[] | undefined>();

  useEffect(() => {
    const unsubscribe = getBooks(snapshot => {
      const data = snapshot.docs.map(each => each.data());
      setBooks(data);
    }, console.log);
    return () => unsubscribe();
  });

  return (
    <BottomTabAwareSafeAreaView>
      <ScrollView style={tailwind('h-full bg-white')}>
        <Text style={tailwind('text-xl font-bold m-4 text-black')}>
          Library
        </Text>
        {books?.map(each => (
          <BookCard
            image={PRESETS[Presets.HP1].source}
            key={each.isbn}
            name={each.name}
            onPress={() => navigation.navigate(BOOK_ROUTE, {bookId: each.isbn})}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={tailwind(
          'absolute bottom-2 right-4 py-1 px-4 rounded bg-blue-500',
        )}
        onPress={() => navigation.navigate(BOOK_ROUTE)}>
        <Text style={tailwind('text-xl text-white')}>Add</Text>
      </TouchableOpacity>
    </BottomTabAwareSafeAreaView>
  );
};

export default Firebase;
