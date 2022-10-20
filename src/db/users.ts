import firestore from '@react-native-firebase/firestore';
import {User} from '../model/model';

export const USERS_COLLECTION = 'users';

export const getUserProfile = async (id: string): Promise<User | undefined> => {
  return (
    await firestore().collection<User>(USERS_COLLECTION).doc(id).get()
  ).data();
};

export const updateUserProfile = async (user: User): Promise<void> => {
  return firestore().collection(USERS_COLLECTION).doc(user.id).set(user);
};
