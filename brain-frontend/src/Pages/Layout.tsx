import {Outlet} from "react-router-dom"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import Addcontent from "@/components/modals/Addcontentbutton"

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#23262f]" >
      <Navbar />
      <main className="flex h-[calc(100vh-73px)] bg-gray-50 dark:bg-[#23262f]">
        <Sidebar />
        <div className="flex-1 overflow-auto p-4 bg-gray-50 dark:bg-[#1b1c21] z-0">
          <Outlet />
          <Addcontent />
        </div>
      </main>
    </div>
  )
}
export default Layout