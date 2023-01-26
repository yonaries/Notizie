import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebaseConfig";
import { SignInWith } from "../features/Auth/functions/signIn-with";

const initialState = {
  currentUser: null,
  currentUserName: "",
  signInWithProvider: () => {},
  signInWithEmail: () => {},
};

const AuthContext = React.createContext(initialState);

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  async function signInWithProvider(provider) {
    await SignInWith.Provider(provider);
  }

  async function signInWithEmail(email, password) {
    await SignInWith.Email(email, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsLoading(false);

      if (!user) {
        navigate("/signin");
        return;
      }
      navigate(`/`);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signInWithEmail,
    signInWithProvider,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading ? children : <h3>Loading</h3>}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
