import { Brain, Command, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/ui/search-input';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border flex justify-between items-center top-0 sticky z-[40] isolate text-foreground py-4 md:px-10">
      <div className="flex items-center gap-2.5">
        <Brain className="text-primary" size={24} />
        <span className="font-semibold text-xl tracking-tight">Brainn</span>
      </div>

      <div className="flex items-center gap-5">
        <nav className="hidden md:flex items-center gap-8 mr-2">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
        </nav>

        <div className="flex items-center gap-3">
          <SearchInput
            placeholder="Search"
            className="bg-muted/50 border-border focus-within:border-primary transition-colors"
            trailingIcon={<Command size={15} />}
            trailingText="&nbsp;+ k"
          />

          <ThemeToggle />

          <div className="flex gap-2.5">
            <Button
              variant="outline"
              className="border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
              onClick={() => navigate('/login')}
            >
              Log in
            </Button>
            <Button
              variant="default"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => navigate('/signup')}
            >
              Sign up
            </Button>
          </div>
        </div>
        <button className="md:hidden text-muted-foreground hover:text-foreground">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
