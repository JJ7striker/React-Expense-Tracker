import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleClosed = () => {
        setIsOpen(false);
    }
  return (
    <header className="w-full h-13 shadow-sm shadow-gray-500 z-50 bg-white flex items-center justify-between fixed top-0 left-0 px-2">
    <h2 className="text-lg font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-700">TaskFlow</h2>
    <Menu onClick={() => setIsOpen(true)} className="md:hidden" />
        <nav className={`w-full h-screen fixed top-0 left-0 bg-gray-100 text-gray-800 z-50 text-lg font-medium px-10 py-15 flex items-center flex-col gap-8 transition-all duration-200 ease-in-out larger_nav ${isOpen ? "translate-y-0 visible opacity-100" : "-translate-y-full invisible opacity-0"}`}>
            <X onClick={() => setIsOpen(false)} className="absolute md:hidden left-4 top-4" />
                <Link to={"/"} className={location.pathname === "/" ? "text-blue-600" : ""} onClick={handleClosed}>Home</Link>
                <Link to={"/features"} className={location.pathname === "/features" ? "text-blue-600" : ""} onClick={handleClosed}>Features</Link>
                <Link to={"/pricing"} className={location.pathname === "/pricing" ? "text-blue-600" : ""} onClick={handleClosed}>Pricing</Link>
                <Link to={"/about"} className={location.pathname === "/about" ? "text-blue-600" : ""} onClick={handleClosed}>About</Link>
                <Link to={"/contact"} className={location.pathname === "/contact" ? "text-blue-600" : ""} onClick={handleClosed}>Contact</Link>
        </nav>


        <div className="w-auto flex items-center gap-3">
            <Button className={"text-white bg-blue-600"} variant={"ghost"} onClick={() => navigate("/login")}>Login</Button>
            <Button className={"text-white bg-blue-600"} variant={"ghost"} onClick={() => navigate("/signin")}>Get Started</Button>
        </div>
        
    </header>
  )
}

export default Navbar