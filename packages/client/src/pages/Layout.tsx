import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import AddContentButton from "@/components/modals/AddContentButton";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brain-light/10 via-white to-brain-light/20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-brain-light/20 filter blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[25%] h-[25%] rounded-full bg-brain-default/10 filter blur-3xl" />
      </div>
      
      <Navbar />
      <main className="flex h-[calc(100vh-73px)] relative z-10">
        <Sidebar />
        <div className="flex-1 overflow-auto p-6 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
          <AddContentButton />
        </div>
      </main>
    </div>
  );
};

export default Layout; 