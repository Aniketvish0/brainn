import {Outlet} from "react-router-dom"
import Navbar from "@/Components/Navbar"
import Footer from "@/Components/Footer"
import Sidebar from "@/Components/Sidebar"
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f1117]">
      <Navbar />
      <main className="flex-grow">
        <Sidebar/>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
export default Layout