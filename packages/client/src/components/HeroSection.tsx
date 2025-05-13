
import { ArrowRight } from 'lucide-react';
import BrainAnimation from './BrainAnimation';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brain-light/30 filter blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brain-light/30 filter blur-3xl" />
      </div>
      <BrainAnimation />
      
      <div className="relative max-w-6xl w-full mx-auto px-6 py-20 md:py-32 z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-12 md:mb-0 md:pr-8">
            <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="inline-block bg-brain-light/70 backdrop-blur-sm px-4 py-1.5 rounded-full">
                <p className="text-brain-dark text-sm font-medium">Your Second Brain, Powered by AI</p>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Organize Your <span className="text-gradient">Digital Life</span> into a Queryable Knowledge Base
              </h1>
              
              <p className="text-lg text-gray-600 max-w-xl">
                Seamlessly connect your tweets, YouTube videos, notes, and web links into a contextual network that answers your questions with insights from your own content.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a 
                  href="#get-started"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brain-default text-white font-medium hover:bg-brain-dark transition-all transform hover:translate-y-[-2px] shadow-lg hover:shadow-xl"
                >
                  Get Started
                  <ArrowRight size={18} className="ml-2" />
                </a>
                
                <a 
                  href="#demo"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gray-300 hover:border-brain-DEFAULT hover:text-brain-DEFAULT font-medium transition-all"
                >
                  See How It Works
                </a>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="relative float-animation">
              <div className="relative glass-card rounded-2xl shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brain-DEFAULT/5"></div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="text-sm text-gray-500">BrainWave Query Interface</div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="p-3 bg-gray-100 rounded-lg text-sm text-gray-700">
                      <span className="text-brain-dark font-medium">You:</span> What were the key points from the productivity video I watched last week?
                    </div>
                    
                    <div className="p-3 bg-brain-light/50 rounded-lg text-sm text-gray-700">
                      <span className="text-brain-dark font-medium">BrainWave:</span> Based on the YouTube video "Productivity Mastery" you watched on June 15th, the key points were:
                      <ol className="list-decimal list-inside mt-2 space-y-1">
                        <li>Use time blocking for focused work</li>
                        <li>Implement the 2-minute rule for small tasks</li>
                        <li>Set up a second brain system for knowledge management</li>
                        <li>Review priorities weekly to stay aligned with goals</li>
                      </ol>
                      <p className="mt-2 text-xs text-gray-500">Sources: YouTube video, your notes from June 16th</p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ask your second brain..."
                      className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brain-DEFAULT"
                    />
                    <button className="absolute right-1 top-1 bg-brain-DEFAULT text-white p-2 rounded-full hover:bg-brain-dark transition-colors">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-r from-brain-DEFAULT to-brain-dark rounded-full blur-xl opacity-50"></div>
              <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-gradient-to-r from-brain-light to-brain-DEFAULT rounded-full blur-xl opacity-40"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
