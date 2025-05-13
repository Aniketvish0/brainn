import { NotebookPen, PlusIcon, Twitter, Youtube, Link2Icon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddTweetOrVideo from "./AddTweetOrVideo";
import AddNote from "./AddNote";

const AddContentButton = () => {
  const [isHover, setIsHover] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [showAddTweet, setShowAddTweet] = useState<boolean>(false);
  const [showAddYtVideo, setShowAddYtVideo] = useState<boolean>(false);
  const [showAddNote, setShowAddNote] = useState<boolean>(false);
  const [showAddWebLink, setShowAddWebLink] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef?.current?.contains(event.target as Node)) {
        setIsHover(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const contentButtons = [
    { 
      id: "note", 
      icon: NotebookPen, 
      label: "Add Notes", 
      color: "text-primary", 
      bg: "bg-primary/10", 
      onClick: () => setShowAddNote(true) 
    },
    { 
      id: "twitter", 
      icon: Twitter, 
      label: "Add Tweets", 
      color: "text-blue-500", 
      bg: "bg-blue-500/10", 
      onClick: () => setShowAddTweet(true) 
    },
    { 
      id: "youtube", 
      icon: Youtube, 
      label: "Add Videos", 
      color: "text-red-500", 
      bg: "bg-red-500/10", 
      onClick: () => setShowAddYtVideo(true) 
    },
    { 
      id: "web", 
      icon: Link2Icon, 
      label: "Add Website link", 
      color: "text-sky-500", 
      bg: "bg-sky-500/10", 
      onClick: () => setShowAddWebLink(true) 
    },
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
              {contentButtons.map(({ id, icon: Icon, label, color, bg, onClick }) => (
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
                    onClick={onClick}
                  >
                    <Icon size={24} absoluteStrokeWidth={true} />
                  </button>
                  <span className="absolute right-14 top-2 bg-background shadow-md rounded-md px-2 py-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-foreground">
                    {label}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
        <motion.button 
          className="rounded-full z-100 shadow-xl bg-primary text-primary-foreground p-3 hover:bg-primary/90 transition-all"
          onMouseEnter={() => setIsHover(true)}
          onClick={() => setIsHover(prev => !prev)}
          whileTap={{ scale: 0.95 }}
          animate={{ rotate: isHover ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          aria-label="Add content"
          aria-expanded={isHover}
        >
          <PlusIcon size={28} />
        </motion.button>
      </div>
      {showAddTweet && <AddTweetOrVideo onClose={() => setShowAddTweet(false)} type="tweet" />}
      {showAddYtVideo && <AddTweetOrVideo onClose={() => setShowAddYtVideo(false)} type="video" />}
      {showAddWebLink && <AddTweetOrVideo onClose={() => setShowAddWebLink(false)} type="web" />}
      {showAddNote && <AddNote onClose={() => setShowAddNote(false)} />}
    </>
  );
};

export default AddContentButton; 