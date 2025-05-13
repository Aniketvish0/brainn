
import { useState } from 'react';
import { Play, Pause } from 'lucide-react';

const DemoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <section id="demo" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(56,189,248,0.1),transparent)]"></div>
      
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            See <span className="bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">BrainWave</span> in Action
          </h2>
          <p className="text-lg text-gray-600">
            Watch how easily you can connect your content, create your personal knowledge network, and query for insights.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Video player with thumbnail fallback */}
          <div className="relative aspect-video overflow-hidden rounded-xl glass-card shadow-2xl">
            {/* Video thumbnail/placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
              {/* Placeholder if image fails to load */}
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <div className="text-white text-lg">Demo Video</div>
              </div>
              
              {/* Play/pause button */}
              <button 
                className="absolute inset-0 flex items-center justify-center group"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all group-hover:bg-white/20 group-hover:scale-110">
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white pl-1" />
                  )}
                </div>
              </button>
              
              {/* Video title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-semibold text-white">Building Your Second Brain with BrainWave</h3>
                <p className="text-gray-300 mt-2">Learn how to connect all your digital content and query it effectively</p>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sky-400/20 rounded-full blur-xl"></div>
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-sky-400/20 rounded-full blur-xl"></div>
        </div>
        
        {/* Additional demo stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Supported Content Types", value: "12+" },
            { label: "Query Response Time", value: "<1s" },
            { label: "Content Connection Accuracy", value: "97%" },
            { label: "Happy Users", value: "10,000+" }
          ].map((stat, index) => (
            <div key={index} className="glass-card rounded-xl p-6 text-center">
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">{stat.value}</p>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
