import React, { useState, useEffect, useContext, createContext } from 'react';
// import firebase from 'firebase/app';
// import 'firebase/auth';

import { auth } from '../firebase';

// firebase.initializeApp({
//   apiKey: 'AIzaSyCVZVE9OQ9hrmKny_CFHsxQxuxvviB-PFE',
//   authDomain: 'snapstock-6c43f.firebaseapp.com',
//   databaseURL: 'https://snapstock-6c43f-default-rtdb.firebaseio.com',
//   projectId: 'snapstock-6c43f',
//   storageBucket: 'snapstock-6c43f.appspot.com',
//   messagingSenderId: '966589708931',
//   appId: '1:966589708931:web:9e19ef8666e793e203b9b6',
// });

const AuthContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signInWithEmailAndPassword = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password).then((response) => {
      setUser(response.user);
      return response.user;
    });
  };

  const signup = (email, password) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signout = () => {
    return auth.signOut().then(() => {
      setUser(false);
    });
  };

  const sendPasswordResetEmail = (email) => {
    return auth.sendPasswordResetEmail(email).then(() => {
      return true;
    });
  };

  const confirmPasswordReset = (code, password) => {
    return auth.confirmPasswordReset(code, password).then(() => {
      return true;
    });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    signInWithEmailAndPassword,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}
