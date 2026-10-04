import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="w-full min-h-screen">
      <Sidebar />
      <main className="w-full min-h-full md:pl-64">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
