import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {Book} from '../model/model';

export const BOOKS_COLLECTION = 'books';

export const getBook = (
  isbn: string,
  onResult: (snap: FirebaseFirestoreTypes.DocumentSnapshot<Book>) => void,
  onError: (error: Error) => void,
): any => {
  return firestore()
    .collection<Book>(BOOKS_COLLECTION)
    .doc(isbn)
    .onSnapshot(onResult, onError);
};

export const getBooks = (
  onResult: (snap: FirebaseFirestoreTypes.QuerySnapshot<Book>) => void,
  onError: (error: Error) => void,
): any => {
  return firestore()
    .collection<Book>(BOOKS_COLLECTION)
    .onSnapshot(onResult, onError);
};

export const upsertBook = async (book: Book): Promise<void> => {
  return firestore().collection(BOOKS_COLLECTION).doc(book.isbn).set(book);
};
