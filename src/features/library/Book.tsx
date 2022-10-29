import {Text, View} from 'react-native';
import BottomTabAwareSafeAreaView from '../../components/safeArea/BottomTabAwareSafeAreaView';

export const BOOK_ROUTE = 'book';

const Book: React.FC<any> = ({route}) => {
  const {bookId} = route.params;
  return (
    <BottomTabAwareSafeAreaView>
      <View>
        <Text>Lulio {bookId}</Text>
      </View>
    </BottomTabAwareSafeAreaView>
  );
};

export default Book;
