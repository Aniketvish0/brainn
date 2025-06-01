import { useState, useEffect } from 'react';
import { ClientTweetCard } from "@/components/ui/ClientTweetCard";
import { getAllContent } from "@/lib/api/content";
import toast from "react-hot-toast";
import YouTubeVideoCard from "@/components/ui/YouTubeVideoCard";
import RenderMarkdown from "@/components/markdownNotes/RenderMarkdown";
import { FileText, Youtube, Twitter, Link, BrainCircuit, MessageSquare, Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResponseData {
  content?: string;
  createdAt?: string;
  tags?: string[];
  title: string;
  type: string;
  url?: string;
  workspace?: string;
}

const featureStats = [
  {
    icon: <FileText className="w-6 h-6 text-brain-default" />,
    title: "Markdown Notes",
    count: 0,
    description: "Structured content and documents",
    bg: "bg-blue-50",
    border: "border-blue-200"
  },
  {
    icon: <Youtube className="w-6 h-6 text-red-500" />,
    title: "YouTube Videos",
    count: 0,
    description: "Video insights and transcripts",
    bg: "bg-red-50",
    border: "border-red-200"
  },
  {
    icon: <Twitter className="w-6 h-6 text-blue-400" />,
    title: "Twitter Threads",
    count: 0,
    description: "Saved tweets and conversations",
    bg: "bg-sky-50",
    border: "border-sky-200"
  },
  {
    icon: <Link className="w-6 h-6 text-green-500" />,
    title: "Web Links",
    count: 0,
    description: "Articles and web content",
    bg: "bg-green-50",
    border: "border-green-200"
  },
  {
    icon: <BrainCircuit className="w-6 h-6 text-brain-default" />,
    title: "AI Connections",
    count: 0,
    description: "Intelligent content synthesis",
    bg: "bg-purple-50",
    border: "border-purple-200"
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-indigo-500" />,
    title: "Queries Made",
    count: 0,
    description: "Natural language searches",
    bg: "bg-indigo-50",
    border: "border-indigo-200"
  }
];

const Brain = () => {
  const [allContent, setAllContent] = useState<ResponseData[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [stats, setStats] = useState(featureStats);

  const getContent = async () => {
    try {
      const response = await getAllContent();
      if (response.data.success) {
        setAllContent(response.data.data);
        updateStats(response.data.data);
        toast.success("Content fetched successfully");
      }
    } catch (error: any) {
      toast.error("Error while fetching content");
      console.error(error);
    }
  };

  const updateStats = (content: ResponseData[]) => {
    const updatedStats = stats.map(stat => {
      switch (stat.title) {
        case "Markdown Notes":
          return { ...stat, count: content.filter(item => item.type === "note").length };
        case "YouTube Videos":
          return { ...stat, count: content.filter(item => item.type === "video").length };
        case "Twitter Threads":
          return { ...stat, count: content.filter(item => item.type === "tweet").length };
        case "Web Links":
          return { ...stat, count: content.filter(item => item.type === "link").length };
        default:
          return stat;
      }
    });
    setStats(updatedStats);
  };

  useEffect(() => {
    getContent();
  }, []);

  const extractTweetId = (url: string) => {
    const regex = /(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const filteredContent = allContent.filter(content => {
    const matchesFilter = activeFilter === 'all' || content.type === activeFilter;
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         content.content?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filterButtons = [
    { key: 'all', label: 'All Content', icon: BrainCircuit },
    { key: 'note', label: 'Notes', icon: FileText },
    { key: 'video', label: 'Videos', icon: Youtube },
    { key: 'tweet', label: 'Tweets', icon: Twitter },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brain-light/20 via-white to-brain-light/30">
      {/* Header Section */}
      <div className="glass-card rounded-2xl p-8 mb-8 border border-brain-light/30">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Your <span className="text-gradient">Digital Brain</span>
            </h1>
            <p className="text-gray-600 text-lg">
              All your knowledge, connected and searchable in one place
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search your brain..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 bg-white/70 border border-brain-light/50 rounded-full focus:outline-none focus:ring-2 focus:ring-brain-default focus:border-transparent transition-all min-w-[300px]"
              />
            </div>
            <Button className="bg-brain-default hover:bg-brain-dark text-white px-6 py-3 rounded-full transition-all transform hover:scale-105">
              <Plus className="w-5 h-5 mr-2" />
              Add Content
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`glass-card rounded-xl p-6 ${stat.bg} ${stat.border} border hover:shadow-lg transition-all duration-300 hover:scale-105 group`}>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-white/50 rounded-lg group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <span className="text-2xl font-bold text-gray-800">{stat.count}</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">{stat.title}</h3>
            <p className="text-sm text-gray-600">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Filter Buttons */}
      <div className="glass-card rounded-xl p-6 mb-8 border border-brain-light/30">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 mr-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600 font-medium">Filter by:</span>
          </div>
          {filterButtons.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                activeFilter === key
                  ? 'bg-brain-default text-white shadow-md'
                  : 'bg-white/70 text-gray-600 hover:bg-brain-light/50 hover:text-brain-dark'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      {filteredContent.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center border border-brain-light/30">
          <BrainCircuit className="w-16 h-16 text-brain-default mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No content found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery ? 'Try adjusting your search terms' : 'Start building your digital brain by adding some content'}
          </p>
          <Button className="bg-brain-default hover:bg-brain-dark text-white px-8 py-3 rounded-full">
            <Plus className="w-5 h-5 mr-2" />
            Add Your First Content
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredContent.map((content, index) => (
            <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              {content.type === "tweet" ? (
                <div className="glass-card rounded-xl overflow-hidden border border-blue-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <ClientTweetCard
                    id={extractTweetId(content.url!)}
                    className="bg-transparent border-none shadow-none"
                  />
                </div>
              ) : content.type === "video" ? (
                <div className="glass-card rounded-xl overflow-hidden border border-red-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <YouTubeVideoCard
                    url={content.url!}
                    title={content.title}
                    className="bg-transparent border-none shadow-none"
                  />
                </div>
              ) : content.type === "note" ? (
                <div className="glass-card rounded-xl overflow-hidden border border-blue-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <RenderMarkdown
                    content={content.content ?? ""}
                    title={content.title}
                    tags={content.tags}
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Brain; 