import {Brain, Command, Menu} from 'lucide-react'
import { Button } from './ui/Button'
import { SearchInput } from './ui/SearchInput'
import ThemeToggle from './theme/ThemeToggle'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate(); 
  return (
    <header className="bg-transparent backdrop-blur-md border-b border-gray-200 dark:border-white/5 flex justify-between items-center top-0 sticky z-[40] isolate text-gray-800 dark:text-white py-4 md:px-10">
    <div className='flex items-center gap-2.5'>
      <Brain className='text-blue-600 dark:text-blue-500' size={24}/>
      <span className="font-semibold text-xl tracking-tight">Brainn</span>
    </div>
    
    <div className='flex items-center gap-5'>
      <nav className="hidden md:flex items-center gap-8 mr-2">
        <a href="#features" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Features</a>
        <a href="#pricing" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Pricing</a>
      </nav>
      
      <div className="flex items-center gap-3">
        <SearchInput 
          placeholder="Search" 
          className="bg-gray-100 border-gray-200 dark:bg-white/10 dark:border-white/10 focus-within:border-blue-500 transition-colors"
          trailingIcon={<Command size={15}/>}
          trailingText='&nbsp;+ k'
        />
        
        <ThemeToggle />
        
        <div className="flex gap-2.5">
          <Button
             variant="outline" 
             className="border-gray-300 text-gray-700 hover:text-gray-900 hover:border-gray-400 dark:border-white/20 dark:text-gray-200 dark:hover:text-white dark:hover:border-white/40"
             onClick={() => navigate('/login')}
             >
            Log in
          </Button>
          <Button 
            variant="default" 
            className="bg-blue-600 hover:bg-blue-500 text-white dark:bg-blue-600 dark:hover:bg-blue-500"
            onClick={() => navigate('/signup')}
            >
            Sign up
          </Button>
        </div>
      </div>
      
      {/* Mobile menu button */}
      <button className="md:hidden text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
        <Menu size={24} />
      </button>
    </div>
  </header>
  )
}

export default Navbar