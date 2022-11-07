import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {User} from '../model/model';

export const USERS_COLLECTION = 'users';

export const getUserProfile = (
  id: string,
  onResult: (snap: FirebaseFirestoreTypes.DocumentSnapshot<User>) => void,
  onError: (error: Error) => void,
): any => {
  return firestore()
    .collection<User>(USERS_COLLECTION)
    .doc(id)
    .onSnapshot(onResult, onError);
};

export const updateUserProfile = async (user: User): Promise<void> => {
  return firestore().collection(USERS_COLLECTION).doc(user.id).set(user);
};
