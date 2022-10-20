import React from 'react';
import {ScrollView, Text} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import HP1 from '../../../assets/hp1.jpg';
import HP2 from '../../../assets/hp2.jpg';
import HP3 from '../../../assets/hp3.jpg';
import HP4 from '../../../assets/hp4.png';
import HP5 from '../../../assets/hp5.jpg';
import HP6 from '../../../assets/hp6.png';
import HP7 from '../../../assets/hp7.jpg';
import BookCard from '../../components/book/BookCard';
import BottomTabAwateSafeAreaView from '../../components/safeArea/BottomTabAwareSafeAreaView';

const Firebase: React.FC = () => {
  const tailwind = useTailwind();
  return (
    <BottomTabAwateSafeAreaView>
      <ScrollView style={tailwind('h-full bg-white')}>
        <Text style={tailwind('text-xl font-bold m-4 text-black')}>
          Library
        </Text>
        <BookCard
          image={HP1}
          name={"Harry Potter and the Philosopher's Stone"}
        />
        <BookCard
          image={HP2}
          name={'Harry Potter and the Chamber of Secrets'}
        />
        <BookCard
          image={HP3}
          name={'Harry Potter and the Prisoner of Azkaban'}
        />
        <BookCard image={HP4} name={'Harry Potter and the Goblet of Fire'} />
        <BookCard image={HP5} name={'Harry Potter and the Order of Phoenix'} />
        <BookCard image={HP6} name={'Harry Potter and the Half-Blood Prince'} />
        <BookCard image={HP7} name={'Harry Potter and the Deathly Hallows'} />
      </ScrollView>
    </BottomTabAwateSafeAreaView>
  );
};

export default Firebase;
