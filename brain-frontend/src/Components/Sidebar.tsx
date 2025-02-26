import { BrainCircuit, Twitter, Youtube, FolderOpen, PanelLeftClose } from "lucide-react";
import WorkspaceFileExplorer from "./Workspace/WorkspaceFileExplorer";
import Separator from "@/Components/Workspace/Seperator";
import { useState } from "react";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("brain");
  return (
    <div className="w-64 relative h-screen dark:bg-background border-r dark:border-neutral-800 border-gray-200  flex flex-col shadow-sm">
      <div className="px-4 py-5">
        <h2 className="font-medium text-xl flex items-center gap-2">
          <span className="text-gray-700 dark:text-white">Brainn Nodes</span>
          <PanelLeftClose className="text-gray-500 absolute right-4 cursor-pointer" size={22} aria-label="close sidebar" />
        </h2>
      </div>
      <nav className="px-3 py-2 text-sm">
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => setActiveItem("brain")}
              className={`w-full flex items-center cursor-pointer hover:bg-primary/10 gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                activeItem === "brain"
                  ? "bg-primary/10 text-primary"
                  : "dark:text-white text-gray-700 hover:bg-accent"
              }`}
            >
              <BrainCircuit size={18} className={activeItem === "brain" ? "text-primary" : "text-muted-foreground"} />
              Full Brain
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveItem("twitter")}
              className={`w-full flex items-center gap-3 cursor-pointer hover:bg-blue-500/10 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                activeItem === "twitter"
                  ? "bg-blue-500/10 text-blue-500"
                  : "dark:text-white text-gray-700 hover:bg-accent"
              }`}
            >
              <Twitter size={18} className={activeItem === "twitter" ? "text-blue-500" : "text-muted-foreground"} />
              Tweets
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveItem("youtube")}
              className={`w-full flex items-center cursor-pointer hover:bg-red-500/10 gap-3 px-3 py-2.5 rounded-lg  font-medium transition-colors ${
                activeItem === "youtube"
                  ? "bg-red-500/10 text-red-500"
                  : "dark:text-white text-gray-700 hover:bg-accent"
              }`}
            >
              <Youtube size={18} className={activeItem === "youtube" ? "text-red-500" : "text-muted-foreground"} />
              Videos
            </button>
          </li>
        </ul>
      </nav>
      <div className="mt-4 px-3">
        <Separator 
          text="WORKSPACE" 
          className="mb-3 opacity-80" 
        />    
        <div className="px-1 pt-2">
          <div className="flex items-center gap-2 px-2 mb-3 text-sm font-medium text-muted-foreground">
            <FolderOpen size={15} className="text-muted-foreground" />
            <span>Your spaces</span>
          </div>
          <WorkspaceFileExplorer />
        </div>
      </div>
      <div className="mt-auto border-t border-border p-3">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-xs font-medium text-primary">US</span>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">User Name</p>
            <p className="text-xs text-muted-foreground">Free Plan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;