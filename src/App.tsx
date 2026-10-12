import { Routes, Route } from "react-router-dom"
import LandingLayout from "./pages/layouts/LandingLayout"
import Home from "./pages/landing/Home"
import Features from "./pages/landing/Features"
import Pricing from "./pages/landing/Pricing"
import About from "./pages/landing/About"
import Contact from "./pages/landing/Contact"
import AppLayout from "./pages/layouts/AppLayout"
import Dashboard from "./pages/app/Dashboard"
import Transactions from "./pages/app/Transactions"
import Budgets from "./pages/app/Budgets"
import Categories from "./pages/app/Categories"
import Settings from "./pages/app/Settings"
import AuthLayouts from "./pages/layouts/AuthLayouts"
import SignIn from "./pages/auth/SignIn"
import LogIn from "./pages/auth/LogIn"
import MainLayout from "./pages/layouts/MainLayout"
const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
      <Route element={<LandingLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/features" element={<Features />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      </Route>

      <Route element={<AppLayout />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/budgets" element={<Budgets />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/settings" element={<Settings />} />
      </Route>

      <Route element={<AuthLayouts />}>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/login" element={<LogIn />} />
      </Route>
      </Route>
    </Routes>
  )
}
export default App