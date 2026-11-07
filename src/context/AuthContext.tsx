import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, type User } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import type { Budget } from "../components/types";
import { signInAnonymously } from "firebase/auth";

interface TransactionObj {
     type: string,
    description: string,
    amount: string,
    category: string,
    date: string,
    notes: string,
}

interface AuthContextType {
  googleAuth: () => Promise<void>;
  userInfo: User | null ;
  loading: boolean;
  trasactionObj: TransactionObj;
  setTransactionObj: React.Dispatch<React.SetStateAction<TransactionObj>>;
  isOpen: number | null;
  setIsOpen: React.Dispatch<React.SetStateAction<number | null>>;
  editBudgetData: Budget | null;
  setEditBudgetData: React.Dispatch<React.SetStateAction<Budget | null>>;
  anonymousSignIn: () => Promise<void>;
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const currentDate = new Date().toISOString().split("T")[0];
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [editBudgetData, setEditBudgetData] = useState<Budget | null>(null);
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const [trasactionObj, setTransactionObj] = useState({
    type: "expense",
    description: "",
    amount: "",
    category: "",
    date: currentDate,
    notes: "",
  });
  const navigate = useNavigate();

  const googleAuth = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.log("Error google in, ", err);
    } finally {
      setLoading(false);
    }
  };

  const anonymousSignIn = async () => {
    setIsLoading(true)
    try {
      await signInAnonymously(auth);
    } catch (err) {
      console.log("Error signing in anonymously, ", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard");
        setUserInfo(user);
      } else {
        navigate("/");
        setUserInfo(null);
      }
    });
    return unsubscribe
}, [])
  return (
    <AuthContext.Provider
      value={{
        googleAuth,
        userInfo,
        loading,
        trasactionObj,
        setTransactionObj,
        isOpen,
        setIsOpen,
        editBudgetData,
        setEditBudgetData,
        anonymousSignIn,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const Auth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("Auth must be used within an AuthContextProvider");
  }
  return context; 
};
