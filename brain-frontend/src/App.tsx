import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./Components/Theme/ThemeProvider"
import Home from "@/Pages/Home"
import { useState,useEffect } from "react";
import Layout from "@/Pages/Layout";
import {Toaster} from "react-hot-toast";
import LandingPage from "./Pages/LandingPage";

const router = createBrowserRouter([
    {
      path : '/',
      element : <LandingPage/>
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
