import {Outlet} from "react-router-dom"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import Addcontent from "@/components/modals/Addcontent"
const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f1117]">
      <Navbar />
      <main className="flex h-[calc(100vh-73px)]">
        <Sidebar />
        <div className="flex-1 overflow-auto p-4">
          <Outlet />
          <Addcontent/>
        </div>
      </main>
    </div>
  )
}
export default Layout