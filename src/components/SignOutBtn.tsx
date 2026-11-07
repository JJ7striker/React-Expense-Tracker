import { Loader, LogOut } from 'lucide-react'
import { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'

const SignOutBtn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
    const signOutUser = async () => {
      setLoading(true);
      try {
         await signOut(auth);
        navigate("/")
      } catch(err) {
        console.log("Error signing out, ", err)
      } finally {
        setLoading(false);
      }
    }
  return (
    <Button className={"bg-black text-white text-xs"} variant={"ghost"} onClick={signOutUser}>{loading ? <Loader className='animate-bounce' /> : <LogOut />}</Button>
  )
}

export default SignOutBtn