import { useState } from 'react';
import { ArrowRight, BrainCircuit, MessageSquare, Sparkles, TrendingUp, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DashboardHome = () => {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const recentQueries = [
    "What are the key insights from my productivity videos?",
    "Show me notes about React performance optimization",
    "Find tweets about AI developments this week"
  ];

  const aiInsights = [
    {
      title: "Content Connections Found",
      description: "Your note about 'Deep Work' connects to 3 YouTube videos and 5 saved articles",
      icon: <BrainCircuit className="w-5 h-5 text-brain-default" />,
      count: "12 new"
    },
    {
      title: "Trending Topics",
      description: "AI and productivity are your most engaged topics this week",
      icon: <TrendingUp className="w-5 h-5 text-green-500" />,
      count: "5 topics"
    },
    {
      title: "Recent Activity",
      description: "You've added 8 new pieces of content in the last 7 days",
      icon: <Clock className="w-5 h-5 text-blue-500" />,
      count: "8 items"
    }
  ];

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setQuery('');
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="glass-card rounded-2xl p-8 border border-brain-light/30 bg-gradient-to-r from-brain-light/10 to-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Welcome back to your <span className="text-gradient">Digital Brain</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl">
              Ask questions, discover connections, and unlock insights from your personal knowledge base.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-2xl font-bold text-brain-default">1,247</div>
              <div className="text-sm text-gray-500">Total Items</div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-brain-default to-brain-dark rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* AI Query Interface */}
      <div className="glass-card rounded-2xl p-8 border border-brain-light/30">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-brain-default" />
            Ask Your Brain
          </h2>
          <p className="text-gray-600">
            Use natural language to query your knowledge base and get intelligent answers.
          </p>
        </div>

        <form onSubmit={handleQuerySubmit} className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What would you like to know? (e.g., 'What did I learn about React hooks?')"
              className="w-full px-6 py-4 bg-white/70 border border-brain-light/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brain-default focus:border-transparent text-lg"
              disabled={isProcessing}
            />
            <Button
              type="submit"
              disabled={!query.trim() || isProcessing}
              className="absolute right-2 top-2 bg-brain-default hover:bg-brain-dark text-white px-6 py-2 rounded-xl disabled:opacity-50 transition-all"
            >
              {isProcessing ? (
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Ask
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Quick Query Suggestions */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Try asking:
          </h3>
          <div className="flex flex-wrap gap-2">
            {recentQueries.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setQuery(suggestion)}
                className="px-4 py-2 bg-white/50 hover:bg-brain-light/20 border border-brain-light/30 rounded-full text-sm text-gray-700 hover:text-brain-dark transition-all"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {aiInsights.map((insight, index) => (
          <div key={index} className="glass-card rounded-xl p-6 border border-brain-light/30 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-white/50 rounded-lg group-hover:scale-110 transition-transform">
                {insight.icon}
              </div>
              <span className="text-xs font-semibold text-brain-default bg-brain-light/30 px-2 py-1 rounded-full">
                {insight.count}
              </span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">{insight.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{insight.description}</p>
            <Button variant="outline" size="sm" className="w-full border-brain-light/50 text-brain-default hover:bg-brain-light/20">
              View Details
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="glass-card rounded-2xl p-8 border border-brain-light/30">
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Add Note", desc: "Create markdown content", color: "bg-blue-50 border-blue-200 text-blue-600" },
            { title: "Save Tweet", desc: "Import from Twitter/X", color: "bg-sky-50 border-sky-200 text-sky-600" },
            { title: "Add Video", desc: "Save YouTube content", color: "bg-red-50 border-red-200 text-red-600" },
            { title: "Web Article", desc: "Clip web content", color: "bg-green-50 border-green-200 text-green-600" }
          ].map((action, index) => (
            <button key={index} className={`p-4 rounded-xl border transition-all hover:scale-105 ${action.color}`}>
              <div className="text-sm font-semibold mb-1">{action.title}</div>
              <div className="text-xs opacity-75">{action.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome; 