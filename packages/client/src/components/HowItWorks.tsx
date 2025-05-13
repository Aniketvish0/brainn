
import { FileUp, Brain, SearchCode, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: <FileUp className="w-8 h-8" />,
    title: "Connect Your Content",
    description: "Easily import your tweets, YouTube videos, markdown notes, and web links with our simple integrations.",
    color: "from-blue-400 to-sky-300"
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "AI Processes Your Data",
    description: "Our advanced AI analyzes your content, creating connections and generating a deep contextual understanding.",
    color: "from-purple-400 to-pink-300"
  },
  {
    icon: <SearchCode className="w-8 h-8" />,
    title: "Query Your Knowledge",
    description: "Ask questions naturally and get intelligent answers drawn from your personal content network.",
    color: "from-amber-400 to-orange-300"
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Discover New Insights",
    description: "Reveal connections and patterns in your knowledge that you never knew existed.",
    color: "from-emerald-400 to-green-300"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            How <span className="text-gradient">BrainWave</span> Works
          </h2>
          <p className="text-lg text-gray-600">
            A seamless four-step process that transforms your scattered digital content 
            into an organized, queryable second brain.
          </p>
        </div>
        
        <div className="relative">
          {/* Connection line for desktop */}
          <div className="absolute hidden lg:block top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brain-DEFAULT to-transparent transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center"
              >
                <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                  {step.icon}
                  <div className="absolute -inset-1 bg-white rounded-full -z-10"></div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
