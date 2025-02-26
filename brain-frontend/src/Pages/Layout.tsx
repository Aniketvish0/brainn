import {Outlet} from "react-router-dom"
import Navbar from "@/Components/Navbar"
import Footer from "@/Components/Footer"
import Sidebar from "@/Components/Sidebar"
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f1117]">
      <Navbar />
      <main className="grid grid-cols-2">
        <div className="grid-cols-1">
        <Sidebar/>
        </div>
        <div className="gird-col-1">
        <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
export default Layout