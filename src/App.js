import React, { useState, useEffect } from "react";

import "./App.css";

import { HomePage, AuthenticationPage } from "./pages";
import { AuthContext } from "./contexts";
import { auth, createUserInFireStore } from "./firebase/firebase.utils";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  auth.unsubscribeFromAuth = null;

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserInFireStore(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
      return () => {
        auth.unsubscribeFromAuth();
      };
    });
  }, []);

  return (
    <>
      {currentUser ? (
        <AuthContext.Provider value={currentUser}>
          <HomePage />
        </AuthContext.Provider>
      ) : (
        <AuthenticationPage />
      )}
    </>
  );
}

export default App;
