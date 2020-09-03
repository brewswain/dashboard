import React, { useState, useEffect } from "react";

import "./App.css";

import { HomePage, AuthenticationPage } from "./pages";
import { AuthContext } from "./contexts";
import { auth, createUserInFireStore } from "./firebase/firebase.utils";
import { Redirect, Route } from "react-router-dom";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const isLoggedIn = localStorage.getItem("user");

  // maybe do something with useMemo or store currentUser inside of localStorage
  useEffect(() => {
    let unsubscribeFromAuth = null;
    unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserInFireStore(userAuth);

        userRef.onSnapshot(async (snapShot) => {
          localStorage.setItem("user", JSON.stringify(snapShot.data()));
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  return (
    <>
      <Route exact path="/" component={HomePage} />

      {isLoggedIn ? (
        <AuthContext.Provider value={currentUser}>
          <Redirect to="/" />
        </AuthContext.Provider>
      ) : (
        <AuthenticationPage />
      )}
    </>
  );
}

export default App;
