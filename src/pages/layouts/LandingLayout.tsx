import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"

const LandingLayout = () => {
  return (
    <div className="w-full min-h-screen">
        <Navbar />
        <main className="w-full min-h-full pt-13">
        <Outlet />
        </main>
    
    </div>
  )
}

export default LandingLayout