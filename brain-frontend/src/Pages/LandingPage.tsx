import React from "react";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Brain, Globe, LayoutGrid, MessageSquareText, FileText, Tags, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { TracingBeam } from "@/components/magicui/tracing-beam";
import { SparklesCore } from "@/components/magicui/sparkles";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useNavigate } from "react-router-dom";
// Define animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

// Feature card data
const features = [
  {
    title: "Save Anything",
    description: "Quickly save links from YouTube, Twitter, and any website to your brain with a single click.",
    icon: <Globe className="h-6 w-6 text-blue-500" />
  },
  {
    title: "Organize with Workspaces",
    description: "Create multiple workspaces to categorize and structure your knowledge in a way that makes sense to you.",
    icon: <LayoutGrid className="h-6 w-6 text-purple-500" />
  },
  {
    title: "Rich Markdown Notes",
    description: "Write and format detailed notes with our powerful Markdown editor to capture your thoughts.",
    icon: <FileText className="h-6 w-6 text-green-500" />
  },
  {
    title: "Smart Tagging",
    description: "Add tags to nodes for easy retrieval and automatic organization of related information.",
    icon: <Tags className="h-6 w-6 text-yellow-500" />
  },
  {
    title: "AI-Powered Search",
    description: "Ask questions in natural language and get relevant answers from your knowledge base.",
    icon: <MessageSquareText className="h-6 w-6 text-red-500" />
  },
  {
    title: "Lightning Fast",
    description: "Instantly retrieve your information with our optimized vector embedding technology.",
    icon: <Zap className="h-6 w-6 text-amber-500" />
  }
];

// Testimonial data
const testimonials = [
  {
    quote: "Brainn has completely transformed how I organize my research. The AI search is mind-blowing!",
    author: "Sarah Chen",
    role: "PhD Researcher"
  },
  {
    quote: "I used to lose track of important articles and videos. Now everything is at my fingertips.",
    author: "Mark Johnson",
    role: "Content Creator"
  },
  {
    quote: "The ability to query my own knowledge base in natural language is a game-changer for my work.",
    author: "Priya Patel",
    role: "Software Engineer"
  }
];

// Demo steps data
const demoSteps = [
  {
    title: "Save content from anywhere",
    description: "Use our browser extension, mobile app, or simply paste links to save content to your brain.",
    image: "/api/placeholder/600/400"
  },
  {
    title: "Organize with workspaces and tags",
    description: "Create custom workspaces and use tags to maintain a clean, structured knowledge base.",
    image: "/api/placeholder/600/400"
  },
  {
    title: "Query your brain with AI",
    description: "Ask questions and get accurate answers based on your saved content, powered by advanced RAG.",
    image: "/api/placeholder/600/400"
  }
];
// dark:bg-[#0f1117]
const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen bg-[#fefefe] dark:bg-[#17181c]">
      <Navbar />
      <div className="absolute inset-0 z-0 overflow-hidden">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={10}
          className="w-full h-full"
          particleColor="#4f46e5"
          speed={0.5}
        />
      </div>
      <main className="relative z-10 py-16 md:py-24 lg:py-32 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col items-center justify-center text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div 
              variants={itemVariants}
              className="w-full max-w-4xl mx-auto"
            >
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Your <span className="aurora-gradient font-extrabold">Second Brain</span> <br className="hidden sm:block" />
                Powered with AI
              </h1>
            </motion.div>
            
            <motion.p 
              className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Organize your thoughts, boost productivity, and unlock your creative potential with our AI-powered knowledge management system.
            </motion.p>
            
            <motion.div 
              className="mt-8 flex flex-wrap justify-center gap-4"
              variants={itemVariants}
            >
              <Button 
                size="lg" 
                className="group dark:hover:bg-blue-800/30 transform transition-all duration-200 active:scale-[0.98]"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"/>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Watch Demo
              </Button>
            </motion.div>
            
            <motion.div 
              className="mt-16 w-full"
              variants={itemVariants}
            >
              <div className="relative mx-auto w-full max-w-5xl">
                <div className="aspect-[16/9] relative rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 shadow-xl backdrop-blur-sm overflow-hidden">
                  <div className="absolute inset-0">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 opacity-30"
                      animate={{ 
                        backgroundPosition: ['0% 0%', '100% 100%'],
                      }}
                      transition={{ 
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  </div>
                  
                  <div className="relative h-full p-1">
                    <div className="h-full rounded-lg overflow-hidden">
                      <img 
                        src="/image.png" 
                        alt="Brainn App Interface" 
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <BorderBeam duration={8} size={150} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <motion.section 
        className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Powerful Features for Your <span className="aurora-gradient">Digital Brain</span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Everything you need to capture, organize, and retrieve your knowledge effectively.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={{
                  hidden: { y: 50, opacity: 0 },
                  visible: { 
                    y: 0, 
                    opacity: 1,
                    transition: { 
                      delay: index * 0.1,
                      duration: 0.5
                    }
                  }
                }}
                className="relative p-6 rounded-xl bg-white dark:bg-gray-800/70 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:translate-y-[-4px]"
              >
                <div className="absolute -top-3 -left-3 p-3 rounded-lg bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700">
                  {feature.icon}
                </div>
                <div className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      <TracingBeam className="py-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              How <span className="aurora-gradient">Brainn</span> Works
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              A simple yet powerful workflow to manage your digital knowledge.
            </p>
          </div>
          
          <div className="space-y-24">
            {demoSteps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className={cn(
                  "flex flex-col md:flex-row gap-8 items-center",
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                )}
              >
                <div className="w-full md:w-1/2 space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-sm">
                      {index + 1}
                    </div>
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                  </div>
                  <p className="text-lg text-muted-foreground">{step.description}</p>
                </div>
                <div className="w-full md:w-1/2 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg">
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </TracingBeam>
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-white/30 dark:to-black/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              What Users Are Saying
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Join thousands of knowledge workers who have transformed their digital workflow.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-2 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="italic mb-4 text-gray-700 dark:text-gray-300">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing - Brief Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-12">
            Start for free. Upgrade when you need more power.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700 relative overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600" />
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <p className="text-4xl font-bold mb-6">$0<span className="text-base font-normal text-muted-foreground">/month</span></p>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Up to 100 brain nodes</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Basic AI queries</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>1 workspace</span>
                </li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700 relative overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-purple-600" />
              <span className="absolute -right-2 -top-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md">POPULAR</span>
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <p className="text-4xl font-bold mb-6">$9<span className="text-base font-normal text-muted-foreground">/month</span></p>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Unlimited brain nodes</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Advanced AI capabilities</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Unlimited workspaces</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Priority support</span>
                </li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                Upgrade to Pro
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 p-12 text-center text-white">
            <div className="absolute inset-0 opacity-20">
              {/* Pattern background can go here if needed */}
            </div>
            <div className="relative">
              <h2 className="text-3xl font-bold mb-4">Ready to supercharge your knowledge?</h2>
              <p className="text-lg max-w-2xl mx-auto mb-8 text-blue-100">
                Join thousands of users who have transformed how they save, organize, and retrieve information.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                >
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-800 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Browser Extension</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Mobile App</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Guides</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">API</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <Brain className="text-blue-500 mr-2" size={24}/>
              <span className="font-semibold text-xl">Brainn</span>
            </div>
            <p className="text-sm text-muted-foreground mt-4 md:mt-0">
              © {new Date().getFullYear()} Brainn. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;