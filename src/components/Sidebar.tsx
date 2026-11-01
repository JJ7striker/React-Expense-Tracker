import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ProfileImg from "../../public/profile.jpg"
import { Auth } from "../../context/AuthContext";
import SignOutBtn from "./SignOutBtn";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const { userInfo } = Auth();

    const handleClose = () => {
        setIsOpen(false);
    }

      return (
    <header className="w-full h-13 shadow-gray-500 shadow-sm flex md:items-center items-center justify-between md:justify-start md:flex-col px-3 md:gap-15 md:py-5 md:w-64 md:h-screen md:fixed">
        <h2 className="text-lg font-bold bg-clip-text  text-transparent bg-linear-to-r from-blue-600  to-indigo-700">TaskFlow</h2>
        <Menu className="md:hidden size-5" onClick={() => setIsOpen(true)} />
        <nav className={`w-full fixed h-screen top-0 font-medium left-0 bg-white large_sidebar-style z-50 flex gap-6 flex-col items-center px-10 py-15 transition-all duration-200 ease-in-out ${isOpen ? "translate-y-0 visible opacity-100" : "-translate-y-full opacity-0 invisible"}`}>
            <X onClick={() => setIsOpen(false)} className="absolute md:hidden top-3 left-4" />
                <Link to={"/dashboard"} className={location.pathname === "/dashboard" ? "text-blue-600" : ""} onClick={handleClose}>Dashboard</Link>
                <Link to={"/transactions"} className={location.pathname === "/transactions" ? "text-blue-600" : ""} onClick={handleClose}>Transactions</Link>
                <Link to={"/budgets"} className={location.pathname === "/budgets" ? "text-blue-600" : ""} onClick={handleClose}>Budgets</Link>
                <Link to={"/reports"} className={location.pathname === "/reports" ? "text-blue-600" : ""} onClick={handleClose}>Reports</Link>
                <Link to={"/settings"} className={location.pathname === "/settings" ? "text-blue-600" : ""} onClick={handleClose}>Settings</Link>
        </nav>
        <div className="flex items-center gap-4 md:absolute md:bottom-3 md:left-10">
            <img src={ProfileImg} className="rounded-sm" width={20} height={20}  />
            <div className="flex flex-col">
                <span className="text-xs">{userInfo?.displayName}</span>
            </div>
            <SignOutBtn />
        </div>
    </header>
  )
}

export default Sidebar