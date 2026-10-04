import { Link } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { auth } from "../../../firebase/firebase"
import { useNavigate } from "react-router-dom" 
import { Loader } from "lucide-react"
import { Auth } from "../../../context/AuthContext"

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const { googleAuth } = Auth()

  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);
     try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
     } catch(err) {
      console.log("Error signing in ", err);
     } finally {
      setLoading(false);
     }
  } 


  return (
    <div className="flex items-center justify-center mt-7 flex-col gap-4">
        <div className="w-11/12 max-w-lg px-3 pt-2 pb-5 shadow-sm shadow-gray-400 rounded-sm">
          <h2 className="text-center text-lg font-medium">Sign In</h2>

          <button className="w-4/5 h-auto py-1.5 px-3 bg-gray-200 shadow-sm shadow-gray-400 hover:scale-101 transition-all duration-200 ease-in-out mt-5 block mx-auto">Google</button>

          <form className="w-full px-7 flex flex-col items-center gap-4 mt-9" onSubmit={signIn}>
            <div className="w-full flex flex-col items-start gap-2">
              <label htmlFor="email">Email:</label>
              <input type="email" className="w-full outline-0 border-0 px-2 py-1.5 shadow-sm shadow-gray-300 rounded-sm bg-gray-300" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>

            <div className="w-full flex flex-col items-start gap-2">
              <label htmlFor="password">Password:</label>
              <input type="password" className="w-full outline-0 border-0 px-2 py-1.5 shadow-sm shadow-gray-300 rounded-sm bg-gray-300" placeholder="Enter Email" onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>

            <button className="w-4/5 h-auto py-1.5 px-3 text-white font-medium rounded-sm hover:scale-101 transition-all duration-200 ease-in-out shadow-sm shadow-gray-400 mt-5 block mx-auto bg-blue-600" type="submit">{loading ? <Loader className="animate-ping text-center size-4" /> : "Sign In"}</button>
          </form>
        </div>
        <Link to={"/login"} className="text-center text-lg text-blue-600">Dont have an account? Log In</Link>
    </div>
  )
}

export default SignIn