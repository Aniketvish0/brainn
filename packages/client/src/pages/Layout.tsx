import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import AddContentButton from "@/components/modals/AddContentButton";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="flex h-[calc(100vh-73px)] bg-background">
        <Sidebar />
        <div className="flex-1 overflow-auto p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-0">
          <Outlet />
          <AddContentButton />
        </div>
      </main>
    </div>
  );
};

export default Layout; 