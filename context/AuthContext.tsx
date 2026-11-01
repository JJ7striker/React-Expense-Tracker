import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithPopup } from "firebase/auth"
import { auth, provider } from "../firebase/firebase"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
    const currentDate = new Date().toISOString().split("T")[0];
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
      const [editBudgetData, setEditBudgetData] = useState(null);
      const [isOpen, setIsOpen] = useState<number | null>(null);
    const [trasactionObj, setTransactionObj] = useState({
    type: "expense",
    description: "",
    amount: "",
    category: "",
    date: currentDate,
    notes: ""
    
  })
    const navigate = useNavigate();




    const googleAuth = async () => {
        setLoading(true);
        try {
            await signInWithPopup(auth, provider);
        } catch(err) {
            console.log("Error google in, ", err);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/dashboard");
                setUserInfo(user);
            } else {
                navigate("/")
                setUserInfo(null);
            }
        })
        return unsubscribe
    }, [])
  return (
    <AuthContext.Provider value={{googleAuth, userInfo, loading, trasactionObj, setTransactionObj, isOpen, setIsOpen, editBudgetData, setEditBudgetData}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider

export const Auth = () => {
    return useContext(AuthContext)
}