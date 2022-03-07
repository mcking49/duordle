// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { FirebaseOptions, initializeApp } from "firebase/app";
import {
  DocumentData,
  DocumentSnapshot,
  FirestoreDataConverter,
  FirestoreError,
  getFirestore,
  QueryDocumentSnapshot,
  QuerySnapshot,
  WithFieldValue,
} from "firebase/firestore";

export interface QuerySnapshotObserver<T extends DocumentData> {
  next?: ((snapshot: QuerySnapshot<T>) => void) | undefined;
  error?: ((error: FirestoreError) => void) | undefined;
  complete?: (() => void) | undefined;
}

export interface SnapshotObserver<T extends DocumentData> {
  next?: ((snapshot: DocumentSnapshot<T>) => void) | undefined;
  error?: ((error: FirestoreError) => void) | undefined;
  complete?: (() => void) | undefined;
}

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);

/**
 * Convert type from Firestore types to local types.
 *
 * @returns {FirestoreDataConverter<T>} a Firestore converter instance that converts types.
 */
export const firestoreConverter = <T>(): FirestoreDataConverter<T> => {
  return {
    toFirestore(data: WithFieldValue<T>): DocumentData {
      return data as DocumentData;
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): T {
      return snapshot.data() as T;
    },
  };
};
