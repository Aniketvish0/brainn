import {Brain, Command} from 'lucide-react'
import { Button } from './ui/Button'
import { SearchInput } from './ui/SearchInput'
import ThemeToggle from './Theme/ThemeToggle'

const Navbar = () => {
  return (
    <header className="bg-transparent backdrop-filter backdrop-blur-md flex justify-around items-center top-0 sticky z-10 dark:text-white text-neutral-950 min-h-20">
        <div className='flex gap-2'>
            <Brain className='text-primary'/>
            <span>Brainn</span>
        </div>
        <div className='flex gap-2 justify-center items-center'>
            <SearchInput 
              placeholder="Search" 
              trailingIcon={<Command size={15}/>}
              trailingText='&nbsp;+ k'
             />
            <ThemeToggle/>
            <ul className='flex gap-4 justify-center items-center'>
                <li>Features</li>
                <Button variant="default" className='dark:bg-blue-800 dark:hover:bg-blue-700 bg-gray-200 hover:bg-gray-400 dark:text-white text-black'> Sign up</Button>
            </ul>
        </div>
    </header>
  )
}

export default Navbar