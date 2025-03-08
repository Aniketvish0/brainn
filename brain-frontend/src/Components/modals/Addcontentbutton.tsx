import { NotebookPen, PlusIcon, Twitter, Youtube } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Addcontent from "./Addcontent";


const Addcontentbutton = () => {
  const [isHover, setIsHover] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [showaddtweet, setShowaddTweet] = useState<boolean>(false);
  const [showaddytvideo, setShowaddytvideo] = useState<boolean>(false);
  
  useEffect(() => {
    const handleClickOutside = (event : MouseEvent ) => {
      if (menuRef.current && !menuRef?.current?.contains(event.target as Node)) {
        setIsHover(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleaddnote = () => {
    
  }

  const handleaddtweet = () => {
    setShowaddTweet(true)
  }

  const handleaddytvideo = () => {
    setShowaddytvideo(true)
  }
  const contentButtons = [
    { id: "note", icon: NotebookPen, label: "Add Notes", color: "text-white", bg: "bg-primary/20" , onclick: handleaddnote },
    { id: "twitter", icon: Twitter, label: "Add Tweets", color: "text-blue-500", bg: "bg-blue-500/5" , onclick : handleaddtweet},
    { id: "youtube", icon: Youtube, label: "Add Videos", color: "text-red-500", bg: "bg-red-500/5" , onclick : handleaddytvideo}
  ];
  return (
    <>
    <div className="fixed bottom-10 right-10" ref={menuRef}>
      <AnimatePresence>
        {isHover && (
          <motion.ul
            className="absolute bottom-16 right-0 space-y-4 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {contentButtons.map(({ id, icon: Icon, label, color, bg, onclick }) => (
              <motion.li 
                key={id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="relative group"
              >
                <button 
                  className={`z-10 shadow-lg rounded-full p-3 ${bg} ${color} hover:scale-110 transition-transform`}
                  aria-label={label}
                  onClick={onclick}
                >
                  <Icon size={24} absoluteStrokeWidth={true} />
                </button>
                <span className="absolute right-14 top-2 bg-background shadow-md rounded-md px-2 py-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {label}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      <motion.button 
        className="rounded-full z-100 shadow-xl0 bg-muted text-foreground p-3 hover:brightness-110 transition-all"
        onMouseEnter={() => setIsHover(true)}
        onClick={()=>setIsHover(prev => !prev)}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isHover ? 45 : 0 }}
        transition={{duration:0.02}}
        aria-label="Add content"
        aria-expanded={isHover}
      >
        <PlusIcon size={28} />
      </motion.button>
    </div>
    {showaddtweet && <Addcontent onclose={()=>setShowaddTweet(false)} type="tweet"/>} 
    {showaddytvideo && <Addcontent onclose={()=>setShowaddytvideo(false)} type="video"/>} 
    </>
  );
};

export default Addcontentbutton;