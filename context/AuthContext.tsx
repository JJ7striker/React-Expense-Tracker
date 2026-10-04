import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, type User } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

interface UserInfo {
  userInfo: User | null,
  googleAuth: () => void
}

const AuthContext = createContext<UserInfo | null>(null);

const AuthContextProvider = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
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
