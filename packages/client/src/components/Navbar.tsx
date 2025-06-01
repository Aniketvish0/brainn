import { Brain, Command, Menu, Settings, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/ui/search-input';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname.includes('/dashboard');

  return (
    <header className="glass-card backdrop-blur-lg bg-white/80 border-b border-brain-light/30 flex justify-between items-center top-0 sticky z-[40] text-foreground py-4 px-6 md:px-10 shadow-sm">
      <div className="flex items-center gap-3">
        <Brain className="text-brain-default w-7 h-7" />
        <span className="font-bold text-2xl bg-gradient-to-r from-brain-default to-brain-dark bg-clip-text text-transparent">
          Brainn
        </span>
        {isDashboard && (
          <div className="hidden md:block ml-4">
            <span className="text-sm text-gray-500 font-medium">Dashboard</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {!isDashboard ? (
          // Landing page navigation
          <>
            <nav className="hidden md:flex items-center gap-8 mr-2">
              <a href="#features" className="text-gray-600 hover:text-brain-default transition-colors font-medium">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-brain-default transition-colors font-medium">Pricing</a>
            </nav>

            <div className="flex items-center gap-3">
              <SearchInput
                placeholder="Search"
                className="bg-white/70 border-brain-light/50 focus-within:border-brain-default transition-colors"
                trailingIcon={<Command size={15} />}
                trailingText="&nbsp;+ k"
              />

              <ThemeToggle />

              <div className="flex gap-2.5">
                <Button
                  variant="outline"
                  className="border-brain-light/50 text-gray-600 hover:text-brain-default hover:border-brain-default/50 rounded-full px-6"
                  onClick={() => navigate('/login')}
                >
                  Log in
                </Button>
                <Button
                  variant="default"
                  className="bg-brain-default hover:bg-brain-dark text-white rounded-full px-6 shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
                  onClick={() => navigate('/signup')}
                >
                  Sign up
                </Button>
              </div>
            </div>
          </>
        ) : (
          // Dashboard navigation
          <div className="flex items-center gap-4">
            <SearchInput
              placeholder="Search your brain..."
              className="bg-white/70 border-brain-light/50 focus-within:border-brain-default transition-colors min-w-[300px]"
              trailingIcon={<Command size={15} />}
              trailingText="&nbsp;+ k"
            />

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="border-brain-light/50 text-gray-600 hover:text-brain-default hover:border-brain-default/50 rounded-full hover:scale-105 transition-all"
              >
                <Bell size={18} />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="border-brain-light/50 text-gray-600 hover:text-brain-default hover:border-brain-default/50 rounded-full hover:scale-105 transition-all"
              >
                <Settings size={18} />
              </Button>

              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-brain-default to-brain-dark flex items-center justify-center shadow-md cursor-pointer hover:scale-105 transition-transform">
                <span className="text-sm font-bold text-white">US</span>
              </div>
            </div>
          </div>
        )}
        
        <button className="md:hidden text-gray-600 hover:text-brain-default transition-colors">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
