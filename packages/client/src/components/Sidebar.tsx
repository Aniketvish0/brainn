import { BrainCircuit, Twitter, Youtube, FolderOpen, PanelLeftClose } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const sidebarVariants = {
  open: { width: "16rem", transition: { duration: 0.3, ease: "easeInOut" } },
  closed: { width: "3.5rem", transition: { duration: 0.3, ease: "easeInOut" } }
};

const itemVariants = {
  open: { opacity: 1, x: 0, transition: { duration: 0.1, delay: 0.1 } },
  closed: { opacity: 0, x: -10, transition: { duration: 0.1 } }
};

const sidebarnavs = [
  { id: "brain", icon: BrainCircuit, label: "Full Brain", color: "text-primary", bg: "bg-primary/10" },
  { id: "twitter", icon: Twitter, label: "Tweets", color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: "youtube", icon: Youtube, label: "Videos", color: "text-red-500", bg: "bg-red-500/10" }
];

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("brain");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <motion.div 
      animate={isSidebarOpen ? "open" : "closed"}
      variants={sidebarVariants}
      className="relative flex flex-col h-full border-r whitespace-nowrap border-border shadow-sm overflow-hidden bg-background"
    >
      <div className="px-4 py-5 flex items-center sticky justify-between">
        {isSidebarOpen && (
          <motion.h2 variants={itemVariants} className="font-medium text-xl text-foreground">
            Brainn Nodes
          </motion.h2>
        )}
        <PanelLeftClose 
          className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors" 
          size={22} 
          aria-label="toggle sidebar" 
          onClick={() => setIsSidebarOpen((prev) => !prev)}
        />
      </div>
      
      <div className="flex flex-col h-full overflow-y-auto">
        <nav className="px-3 py-2 text-sm flex-shrink-0">
          <ul className="space-y-1">
            {sidebarnavs.map(({ id, icon: Icon, label, color, bg }) => (
              <li key={id}>
                <button
                  onClick={() => setActiveItem(id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-1.5 cursor-pointer py-2.5 rounded-lg font-medium transition-colors",
                    activeItem === id ? `${bg} ${color}` : "text-muted-foreground hover:text-foreground",
                    {
                      "hover:bg-primary/10": bg === "bg-primary/10",
                      "hover:bg-blue-500/10": bg === "bg-blue-500/10",
                      "hover:bg-red-500/10": bg === "bg-red-500/10",
                    }
                  )}
                >
                  <Icon size={18} className={activeItem === id ? color : "text-muted-foreground"} />
                  <motion.span 
                    variants={itemVariants} 
                    initial="closed" 
                    animate={isSidebarOpen ? "open" : "closed"} 
                    className={isSidebarOpen ? "block" : "hidden"}
                  >
                    {label}
                  </motion.span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="px-3 flex-shrink-0">
          {isSidebarOpen && <motion.div variants={itemVariants}><Separator className="mb-3 opacity-80">WORKSPACE</Separator></motion.div>}
          <div className="px-1 pt-2">
            <div className="flex items-center gap-2 px-2 mb-3 text-sm font-medium text-muted-foreground">
              <FolderOpen size={15} className="text-muted-foreground" />
              <motion.span variants={itemVariants} className={isSidebarOpen ? "block" : "hidden"}>Your spaces</motion.span>
            </div>
          </div>
        </div>
        
        <div className="mt-auto flex-shrink-0 border-t p-3">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-medium text-primary">US</span>
            </div>
            <motion.div variants={itemVariants} className={isSidebarOpen ? "block" : "hidden"}>
              <p className="text-sm font-medium text-foreground">User Name</p>
              <p className="text-xs text-muted-foreground">Free Plan</p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar; 