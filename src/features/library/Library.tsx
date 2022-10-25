import React, {useState} from 'react';
import {ScrollView, Text} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import BookCard from '../../components/book/BookCard';
import {Presets, PRESETS} from '../../components/image/presets';
import ImageSelector from '../../components/imageSelector/ImageSelector';
import BottomTabAwateSafeAreaView from '../../components/safeArea/BottomTabAwareSafeAreaView';

const presets = [
  PRESETS[Presets.HP1],
  PRESETS[Presets.HP2],
  PRESETS[Presets.HP3],
  PRESETS[Presets.HP4],
  PRESETS[Presets.HP5],
  PRESETS[Presets.HP6],
  PRESETS[Presets.HP7],
];

const Firebase: React.FC = () => {
  const tailwind = useTailwind();
  const [showImageSelector, setShowImageSelector] = useState<boolean>(false);
  return (
    <BottomTabAwateSafeAreaView>
      <ScrollView style={tailwind('h-full bg-white')}>
        <Text style={tailwind('text-xl font-bold m-4 text-black')}>
          Library
        </Text>
        <BookCard
          image={PRESETS[Presets.HP1].source}
          name={"Harry Potter and the Philosopher's Stone"}
          onPress={() => setShowImageSelector(true)}
        />
        <BookCard
          image={PRESETS[Presets.HP2].source}
          name={'Harry Potter and the Chamber of Secrets'}
        />
        <BookCard
          image={PRESETS[Presets.HP3].source}
          name={'Harry Potter and the Prisoner of Azkaban'}
        />
        <BookCard
          image={PRESETS[Presets.HP4].source}
          name={'Harry Potter and the Goblet of Fire'}
        />
        <BookCard
          image={PRESETS[Presets.HP5].source}
          name={'Harry Potter and the Order of Phoenix'}
        />
        <BookCard
          image={PRESETS[Presets.HP6].source}
          name={'Harry Potter and the Half-Blood Prince'}
        />
        <BookCard
          image={PRESETS[Presets.HP7].source}
          name={'Harry Potter and the Deathly Hallows'}
        />
      </ScrollView>
      <ImageSelector
        show={showImageSelector}
        presets={presets}
        onDismiss={() => setShowImageSelector(false)}
        onImageSelection={() => {}}
      />
    </BottomTabAwateSafeAreaView>
  );
};

export default Firebase;
