import { BrainCircuit, Twitter, Youtube, FolderOpen, PanelLeftClose, FileText, Link, MessageSquare, Plus, Home } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";

const sidebarVariants = {
  open: { width: "16rem", transition: { duration: 0.3, ease: "easeInOut" } },
  closed: { width: "3.5rem", transition: { duration: 0.3, ease: "easeInOut" } }
};

const itemVariants = {
  open: { opacity: 1, x: 0, transition: { duration: 0.1, delay: 0.1 } },
  closed: { opacity: 0, x: -10, transition: { duration: 0.1 } }
};

const sidebarnavs = [
  { id: "home", path: "/dashboard", icon: Home, label: "Dashboard", color: "text-brain-default", bg: "bg-brain-light/20", hover: "hover:bg-brain-light/30" },
  { id: "brain", path: "/dashboard/brain", icon: BrainCircuit, label: "Full Brain", color: "text-brain-default", bg: "bg-brain-light/20", hover: "hover:bg-brain-light/30" },
  { id: "notes", path: "/dashboard/notes", icon: FileText, label: "Notes", color: "text-blue-600", bg: "bg-blue-50", hover: "hover:bg-blue-100" },
  { id: "videos", path: "/dashboard/videos", icon: Youtube, label: "Videos", color: "text-red-500", bg: "bg-red-50", hover: "hover:bg-red-100" },
  { id: "tweets", path: "/dashboard/tweets", icon: Twitter, label: "Tweets", color: "text-sky-500", bg: "bg-sky-50", hover: "hover:bg-sky-100" },
  { id: "links", path: "/dashboard/links", icon: Link, label: "Web Links", color: "text-green-500", bg: "bg-green-50", hover: "hover:bg-green-100" },
  { id: "queries", path: "/dashboard/queries", icon: MessageSquare, label: "AI Queries", color: "text-indigo-500", bg: "bg-indigo-50", hover: "hover:bg-indigo-100" }
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveItem = () => {
    const currentPath = location.pathname;
    const activeNav = sidebarnavs.find(nav => nav.path === currentPath);
    return activeNav ? activeNav.id : "home";
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <motion.div 
      animate={isSidebarOpen ? "open" : "closed"}
      variants={sidebarVariants}
      className="relative flex flex-col h-full glass-card border-r border-brain-light/30 shadow-lg overflow-hidden bg-white/80 backdrop-blur-lg"
    >
      {/* Header */}
      <div className="px-4 py-6 flex items-center justify-between border-b border-brain-light/20">
        {isSidebarOpen && (
          <motion.div variants={itemVariants} className="flex items-center gap-2">
            <BrainCircuit className="text-brain-default w-6 h-6" />
            <h2 className="font-bold text-xl bg-gradient-to-r from-brain-default to-brain-dark bg-clip-text text-transparent">
              Brainn
            </h2>
          </motion.div>
        )}
        <PanelLeftClose 
          className="text-gray-500 cursor-pointer hover:text-brain-default transition-colors hover:scale-110 transform" 
          size={20} 
          aria-label="toggle sidebar" 
          onClick={() => setIsSidebarOpen((prev) => !prev)}
        />
      </div>
      
      {/* Quick Add Button */}
      {isSidebarOpen && (
        <motion.div variants={itemVariants} className="px-4 py-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-brain-default hover:bg-brain-dark text-white rounded-xl font-medium transition-all transform hover:scale-105 shadow-md">
            <Plus size={18} />
            <span>Add Content</span>
          </button>
        </motion.div>
      )}
      
      <div className="flex flex-col h-full overflow-y-auto">
        {/* Navigation */}
        <nav className="px-3 py-2 text-sm flex-shrink-0">
          <ul className="space-y-2">
            {sidebarnavs.map(({ id, path, icon: Icon, label, color, bg, hover }) => {
              const isActive = getActiveItem() === id;
              return (
                <li key={id}>
                  <button
                    onClick={() => handleNavigation(path)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 cursor-pointer py-3 rounded-xl font-medium transition-all duration-200",
                      isActive 
                        ? `${bg} ${color} shadow-md border border-white/50` 
                        : `text-gray-600 hover:text-gray-800 ${hover}`,
                      "hover:transform hover:scale-105"
                    )}
                  >
                    <div className={cn(
                      "p-1.5 rounded-lg transition-all",
                      isActive ? "bg-white/50" : "bg-transparent"
                    )}>
                      <Icon size={16} className={isActive ? color : "text-gray-500"} />
                    </div>
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
              );
            })}
          </ul>
        </nav>
        
        {/* Workspace Section */}
        <div className="px-3 flex-shrink-0 mt-6">
          {isSidebarOpen && (
            <motion.div variants={itemVariants}>
              <Separator className="mb-4 bg-brain-light/30" />
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                Workspace
              </div>
            </motion.div>
          )}
          <div className="px-1">
            <div className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all cursor-pointer">
              <FolderOpen size={16} className="text-gray-500" />
              <motion.span variants={itemVariants} className={isSidebarOpen ? "block" : "hidden"}>
                My Knowledge Base
              </motion.span>
            </div>
          </div>
        </div>
        
        {/* User Profile */}
        <div className="mt-auto flex-shrink-0 border-t border-brain-light/20 p-4">
          <div className="flex items-center gap-3 px-2 py-3 hover:bg-brain-light/20 rounded-xl transition-all cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brain-default to-brain-dark flex items-center justify-center shadow-md">
              <span className="text-sm font-bold text-white">US</span>
            </div>
            <motion.div variants={itemVariants} className={isSidebarOpen ? "block" : "hidden"}>
              <p className="text-sm font-semibold text-gray-800">User Name</p>
              <p className="text-xs text-gray-500">Free Plan • Upgrade</p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar; 