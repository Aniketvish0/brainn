import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import DemoSection from "@/components/DemoSection";
import HowItWorks from "@/components/HowItWorks";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Layout from "@/pages/Layout";
import Home from "@/pages/Brain";
import Signup from "@/pages/auth/Signup";
import Login from "@/pages/auth/Login";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FeatureSection />
      <DemoSection />
      <HowItWorks />
      <CTASection />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> }
    ]
  }
]);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.add(savedTheme);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="theme">
      <div className="min-h-screen">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'hsl(var(--background))',
              color: 'hsl(var(--foreground))',
              borderRadius: '0.5rem',
              border: '1px solid hsl(var(--border))'
            }
          }}
        />
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
