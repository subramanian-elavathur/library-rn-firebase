import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export interface ContactDetails {
  email: string | null;
  phone: string;
}

// private write
export interface User extends FirebaseFirestoreTypes.DocumentData {
  id: string; // public read
  name: string | null; // public read
  contact: ContactDetails; // private read
  profilePictureUUID: string;
}

export interface BorrowHistory {
  borrowedBy: string;
  borrowedOn: Date;
  returned: boolean;
}

// poblic read write
export interface Book extends FirebaseFirestoreTypes.DocumentData {
  name: string;
  isbn: string;
  description: string;
  profilePictureUUID: string;
}
