import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import Index from "@/pages/Index";
import Layout from "@/pages/Layout";
import Brain from "@/pages/Brain";
import DashboardHome from "@/components/DashboardHome";
import Signup from "@/pages/auth/Signup";
import Login from "@/pages/auth/Login";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
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
      { index: true, element: <DashboardHome /> },
      { path: 'brain', element: <Brain /> },
      { path: 'notes', element: <Brain /> },
      { path: 'videos', element: <Brain /> },
      { path: 'tweets', element: <Brain /> },
      { path: 'links', element: <Brain /> },
      { path: 'queries', element: <DashboardHome /> }
    ]
  }
]);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Force light theme for now since dark mode isn't working well with landing page
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    localStorage.setItem('theme', 'light');
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brain-light/20 via-white to-brain-light/30">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-3 border-brain-light border-t-brain-default"></div>
          <p className="text-brain-default font-medium">Loading your digital brain...</p>
        </div>
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
              background: 'rgba(255, 255, 255, 0.95)',
              color: 'rgb(55, 65, 81)',
              borderRadius: '0.75rem',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
            },
            success: {
              style: {
                border: '1px solid rgba(34, 197, 94, 0.2)',
              },
            },
            error: {
              style: {
                border: '1px solid rgba(239, 68, 68, 0.2)',
              },
            },
          }}
        />
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
