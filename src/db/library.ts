import firestore from '@react-native-firebase/firestore';
import {Book} from '../model/model';

export const BOOKS_COLLECTION = 'books';

export const getBook = async (isbn: string): Promise<Book | undefined> => {
  return (
    await firestore().collection<Book>(BOOKS_COLLECTION).doc(isbn).get()
  ).data();
};

export const getBooks = async (): Promise<Book[] | undefined> => {
  return (await firestore().collection<Book>(BOOKS_COLLECTION).get()).docs.map(
    each => each.data(),
  );
};

export const upsertBook = async (book: Book): Promise<void> => {
  return firestore().collection(BOOKS_COLLECTION).doc(book.isbn).set(book);
};
