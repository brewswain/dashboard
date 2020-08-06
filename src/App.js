import React, { useState, useEffect, useContext } from "react";

import "./App.css";

import { HomePage, AuthenticationPage } from "./pages";
import { AuthContext } from "./contexts";
import { auth } from "./firebase/firebase.utils";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  auth.unsubscribeFromAuth = null;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);

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
