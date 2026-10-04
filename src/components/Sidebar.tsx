import { Menu, X } from "lucide-react";
import { useState } from "react"
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const handleClose = () => {
        setIsOpen(false);
    }

  return (
    <header className="w-full h-13 shadow-sm md:py-5 shadow-gray-400 px-3 flex items-center justify-between app_larger_screen">
        <h2 className="text-lg font-bold text-blue-600">SpendFlow</h2>

        <Menu onClick={() => setIsOpen(true)} className="md:hidden" />

        <nav className={`absolute w-full h-screen flex flex-col items-center px-15 py-10 md:py-0 md:px-0 text-lg bg-white dark:text-white space-y-8 top-0 left-0 transition-all duration-200 ease-in-out md:relative md:translate-y-0 md:opacity-100 md:visible ${isOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-full invisible opacity-0"}`}>
                <X onClick={handleClose} className="absolute left-3 top-3 md:hidden dark:text-black"  />
                    <Link to="/dashboard" className={`${location.pathname === "/dashboard" ? "text-blue-600" : "text-black "}`} onClick={handleClose}>Dashboard</Link>
                    <Link to="/transactions" className={`${location.pathname === "/transactions" ? "text-blue-600" : "text-black "} `} onClick={handleClose}>Transactions</Link>
                    <Link to="/budgets" className={`${location.pathname === "/budgets" ? "text-blue-600" : "text-black  "} `} onClick={handleClose}>Budgets</Link>
                    <Link to="/reports" className={`${location.pathname === "/reports" ? "text-blue-600" : "text-black "}`} onClick={handleClose}>Reports</Link>
                    <Link to="/settings" className={`${location.pathname === "/settings" ? "text-blue-600" : "text-black "}`} onClick={handleClose}>Settings</Link>
            </nav>
    </header>
  )
}

export default Sidebar