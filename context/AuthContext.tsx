import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const AuthContextProvider = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const googleAuth = async () => {
    try {
        await signInWithPopup(auth, provider);
        navigate("/dashboard");
        
    } catch(err) {
        console.log("Error signing in with google, ", err)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user);
      } else {
        setUserInfo(null);
      }
    });

    return unsubscribe;
  }, []);
  return <AuthContext.Provider value={{ userInfo, googleAuth }}></AuthContext.Provider>;
};

export default AuthContextProvider;

export const Auth = () =>  useContext(AuthContext);
