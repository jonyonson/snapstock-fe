import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyCVZVE9OQ9hrmKny_CFHsxQxuxvviB-PFE',
  authDomain: 'snapstock-6c43f.firebaseapp.com',
  databaseURL: 'https://snapstock-6c43f-default-rtdb.firebaseio.com',
  projectId: 'snapstock-6c43f',
  storageBucket: 'snapstock-6c43f.appspot.com',
  messagingSenderId: '966589708931',
  appId: '1:966589708931:web:9e19ef8666e793e203b9b6',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const database = firebase.database();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
googleAuthProvider.setCustomParameters({ prompt: 'select_account' });
export { googleAuthProvider };
