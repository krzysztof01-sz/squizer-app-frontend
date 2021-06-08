import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBn7SFCwduLNs7JI9sYdCYl2tu6MnZhxAY',
  authDomain: 'squizerproject.firebaseapp.com',
  databaseURL: 'https://squizerproject.firebaseio.com',
  projectId: 'squizerproject',
  storageBucket: 'squizerproject.appspot.com',
  messagingSenderId: '351951804568',
  appId: '1:351951804568:web:f3240282f081b9f689d8ed',
  measurementId: 'G-XLC81KYP32',
};

firebase.initializeApp(firebaseConfig);

const firebaseStorage = firebase.storage();

export { firebaseStorage };
