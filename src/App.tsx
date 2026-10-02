import { Routes, Route } from "react-router-dom";
import LandingLayout from "./layouts/LandingLayout";
import Home from "./pages/landing/Home";
import Features from "./pages/landing/Features";
import About from "./pages/landing/About";
import Contact from "./pages/landing/Contact";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import SignIn from "./pages/auth/SignIn";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/app/Dashboard";
import Transactions from "./pages/app/Transactions";
import Budgets from "./pages/app/Budgets";
import Reports from "./pages/app/Reports";
import Categories from "./pages/app/Categories";
import Settings from "./pages/app/Settings";

const App = () => {
  return (
    <Routes>
      <Route element={<LandingLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/budgets" element={<Budgets />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="categories" element={<Categories />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route element={<AuthLayout />}>
      <Route path="/sign-in" element={<SignIn />}  />
      <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default App;
