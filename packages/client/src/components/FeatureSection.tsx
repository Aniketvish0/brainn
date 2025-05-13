
import { BrainCircuit, FileText, Link, Youtube, Twitter, MessageSquare } from 'lucide-react';

const features = [
  {
    icon: <FileText className="w-6 h-6 text-brain-DEFAULT" />,
    title: "Markdown Notes",
    description: "Import your markdown notes and documents to build up your knowledge base with structured content."
  },
  {
    icon: <Youtube className="w-6 h-6 text-brain-DEFAULT" />,
    title: "YouTube Videos",
    description: "Connect your watched videos to extract key insights and transcripts for seamless reference."
  },
  {
    icon: <Twitter className="w-6 h-6 text-brain-DEFAULT" />,
    title: "Twitter Threads",
    description: "Save your favorite tweets and threads to capture ideas and conversations from social media."
  },
  {
    icon: <Link className="w-6 h-6 text-brain-DEFAULT" />,
    title: "Web Links",
    description: "Add articles and web pages to your brain, automatically extracting the most relevant content."
  },
  {
    icon: <BrainCircuit className="w-6 h-6 text-brain-DEFAULT" />,
    title: "AI Synthesis",
    description: "Our AI creates connections between your content, building a comprehensive context for smarter answers."
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-brain-DEFAULT" />,
    title: "Natural Queries",
    description: "Ask questions in natural language and get answers drawn from your personal knowledge base."
  }
];

const FeatureSection = () => {
  return (
    <section id="features" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-brain-light/20 to-transparent"></div>
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-brain-light/20 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(56,189,248,0.1),transparent)]"></div>
      
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            All Your <span className="text-gradient">Digital Life</span>, 
            <br className="hidden sm:block" /> One Searchable Brain
          </h2>
          <p className="text-lg text-gray-600">
            Connect everything you consume and create into a personalized AI-powered knowledge base that grows with you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass-card rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] group"
            >
              <div className="rounded-lg bg-brain-light/50 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-brain-light transition-all">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-brain-DEFAULT transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
