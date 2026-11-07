import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { auth } from "../../firebase/firebase"
import { Auth } from "../../context/AuthContext"
import { Loader } from "lucide-react"
import { Link } from "react-router-dom"

const LogIn = () => {
  const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { googleAuth, loading } = Auth();
    
      const signInUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch(err) {
          console.log("Error signing in, ", err)
        } finally {
          setIsLoading(false);
        }
      }
  return (
        <div className='w-full min-h-screen flex items-center flex-col gap-5 justify-center'>
      <div className='max-w-lg w-11/12 shadow-sm shadow-gray-400 rounded-sm py-3 px-3'>
      <h1 className="text-xl font-bold bg-clip-text text-transparent text-center bg-linear-to-r from-blue-600 to-indigo-700">TaskFlow</h1>
      <h2 className='text-center font-medium text-lg mt-5'>Log In</h2>
      <Button className={"text-lg shadow-sm bg-white text-blue-600 w-3/5 block mx-auto mt-5 hover:bg-blue-600 hover:text-white shadow-gray-300"} onClick={googleAuth}>{loading ? <Loader className="animate-bounce" /> : "Google"}</Button>

      <form className='w-full h-auto px-6 mt-8 flex items-center flex-col gap-4' onSubmit={signInUser}>
        <div className='w-full flex items-start flex-col gap-2'>
          <label htmlFor="email">Email</label>
          <Input type='email' id='email' className='w-full h-9 shadow-sm shadow-gray-300' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter Email' />
        </div>

        <div className='w-full flex items-start flex-col gap-2'>
          <label htmlFor="password">Password</label>
          <Input type='password' id='password' className='w-full h-9 shadow-sm shadow-gray-300' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>
        <Button className={"text-white bg-blue-700 hover:text-blue-600 w-3/5 block mx-auto"} variant={"ghost"} type="submit">{isLoading ? <Loader className="animate-bounce" /> : "Log In"}</Button>
      </form>
      </div>
      <Link to="/signin" className="text-blue-400 hover:text-blue-600">Don't have an account? Sign In</Link>
    </div>
  )
}

export default LogIn