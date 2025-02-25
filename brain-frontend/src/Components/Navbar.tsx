import {Brain} from 'lucide-react'
import { Button } from './ui/Button'
import ThemeToggle from './Theme/ThemeToggle'

const Navbar = () => {
  return (
    <header className="bg-gray-50 dark:bg-slate-950 flex justify-around items-center dark:text-white text-neutral-950 min-h-14">
        <div className='flex gap-2'>
            <Brain/>
            <span>Brainn</span>
        </div>
        <div className='flex'>
            <input type="text" />
            <ThemeToggle/>
            <ul className='flex gap-2 justify-center items-center'>
                <li>Features</li>
                <Button variant="outline">Sign up</Button>
            </ul>
        </div>
    </header>
  )
}

export default Navbar