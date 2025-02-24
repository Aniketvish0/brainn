import {Brain} from 'lucide-react'
import { Button } from './ui/Button'

const Navbar = () => {
  return (
    <header className="bg-gray-50 dark:bg-slate-950 flex justify-around items-center text-white min-h-14">
        <div className='flex gap-2'>
            <Brain/>
            <span>Brainn</span>
        </div>
        <div className='flex'>
            <input type="text" />
            <ul className='flex gap-2 justify-center items-center'>
                <li>Features</li>
                <Button>Sign up</Button>
            </ul>
        </div>
    </header>
  )
}

export default Navbar