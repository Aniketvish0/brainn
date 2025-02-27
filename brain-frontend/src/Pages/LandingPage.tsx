import Navbar from "@/Components/Navbar"
import { cn } from "@/lib/utils";
import { DotPattern } from "@/Components/magicui/dot-pattern";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar/>
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent">
        <div className="absolute inset-0 z-0"> 
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)] dark:text-neutral-700 text-neutral-300"
          )}
          width={25}
          height={25}
        />
        </div>
        <div className="text-center max-w-4xl px-4 relative z-10">
          <h1 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-6xl">
            Your <span className="aurora-gradient font-extrabold">Second Brain</span> <br className="hidden sm:block" />
            Powered with AI
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Organize your thoughts, boost productivity, and unlock your creative potential.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LandingPage