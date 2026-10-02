import { Menu, X } from "lucide-react";
import { useState } from "react"
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleClose = () => {
        setIsOpen(false);
    }
  return (
    <header className="w-full h-13 shadow-sm z-50 shadow-gray-400 flex justify-between items-center px-2">
        <h2 className="text-lg font-bold text-blue-600">SpendFlow</h2>
        <Menu onClick={() => setIsOpen(true)} className="md:hidden" />

            <nav className={`absolute w-full h-screen flex flex-col items-center px-15 py-10 text-lg bg-white dark:text-white space-y-8 top-0 left-0 transition-all duration-200 ease-in-out larger_screen ${isOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-full invisible opacity-0"}`}>
                <X onClick={handleClose} className="absolute left-3 top-3 md:hidden dark:text-black"  />
                    <Link to="/" className={`${location.pathname === "/" ? "text-blue-600" : "text-black "}`} onClick={handleClose}>Home</Link>
                    <Link to="/features" className={`${location.pathname === "/features" ? "text-blue-600" : "text-black "} `} onClick={handleClose}>Features</Link>
                    <Link to="/about" className={`${location.pathname === "/about" ? "text-blue-600" : "text-black  "} `} onClick={handleClose}>About</Link>
                    <Link to="/contact" className={`${location.pathname === "/contact" ? "text-blue-600" : "text-black "}`} onClick={handleClose}>Contact</Link>
            </nav>

            <div className="w-auto flex items-center gap-3">
                <button className="btn-soft btn-info rounded-sm px-2 py-1 bg-blue-600 text-white font-medium shadow-sm shadow-gray-200 hover:bg-white hover:text-blue-600 transition-all duration-200 ease-in-out" onClick={() => navigate("/login")}>Log In</button>
                <button className="btn-soft btn-info rounded-sm px-2 py-1 bg-blue-600 text-white font-medium shadow-sm shadow-gray-200 hover:bg-white hover:text-blue-600 transition-all duration-200 ease-in-out" onClick={() => navigate("/sign-in")}>Get Started</button>
            </div>
    </header>
  )
}

export default Navbar