import Navbar from "@/Components/Navbar"
import { cn } from "@/lib/utils";
import { DotPattern } from "@/Components/magicui/dot-pattern";
import { Button } from "@/Components/ui/Button";
import { ArrowRight } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#0f1117] overflow-hidden">
      <Navbar/>
      <div className="z-0">
        <DotPattern
          className={cn(
            "absolute h-full",
            "[mask-image:radial-gradient(800px_at_50%_-10%,white,transparent)]",
            "dark:text-neutral-700/40 text-neutral-300/30"
          )}
        />
      </div>
      
      <main className="relative z-10 flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center px-4">
        <div className="text-center max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Your <span className="aurora-gradient font-extrabold">Second Brain</span> <br className="hidden sm:block" />
            Powered with AI
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Organize your thoughts, boost productivity, and unlock your creative potential with our AI-powered knowledge management system.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button 
              size="lg" 
              className="group dark:hover:bg-blue-800/30 transform transition-all duration-200 active:scale-[0.98]"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"/>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Learn More
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LandingPage