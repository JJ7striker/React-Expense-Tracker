import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithPopup } from "firebase/auth"
import { auth, provider } from "../firebase/firebase"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
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
    }, [navigate])
  return (
    <AuthContext.Provider value={{googleAuth, userInfo, loading}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider

export const Auth = () => {
    return useContext(AuthContext)
}