import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme/ThemeProvider"
import Home from "@/pages/Home"
import { useState,useEffect } from "react";
import Layout from "@/pages/Layout";
import {Toaster} from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";

const router = createBrowserRouter([
    {
      path : '/',
      element : <LandingPage/>,
    },
    {
      path : '/signup',
      element : <Signup/>
    },
    {
      path : '/login',
      element : <Login/>
    },
    {
      path : '/dashboard',
      element : <Layout/>,
      children : [
         {index: true, element: <Home/>}
      ]
    }
])

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.classList.add(savedTheme);
    setLoading(false);
  }, []);

  return (
    <>
     <ThemeProvider>
       <div className="min-h-screen">
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration : 3000,
              style : {
                background : 'bg-neutral-950',
                color : 'bg-white',
                borderRadius : '1%'
              }
            }}
          />
          <RouterProvider router={router}/>
       </div>
     </ThemeProvider>
    </>
  )
}

export default App
