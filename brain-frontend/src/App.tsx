import { ThemeProvider } from "./Components/Theme/ThemeProvider"
import Home from "./Pages/Home"
import { useState,useEffect } from "react";



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
       <Home/>
     </ThemeProvider>
    </>
  )
}

export default App
