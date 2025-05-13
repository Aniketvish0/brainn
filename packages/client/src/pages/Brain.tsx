import { ClientTweetCard } from "@/components/ui/ClientTweetCard";
import { getAllContent } from "@/lib/api/content";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import YouTubeVideoCard from "@/components/ui/YouTubeVideoCard";
import RenderMarkdown from "@/components/markdownNotes/RenderMarkdown";

interface ResponseData {
  content?: string;
  createdAt?: string;
  tags?: string[];
  title: string;
  type: string;
  url?: string;
  workspace?: string;
}

const Brain = () => {
  const [allContent, setAllContent] = useState<ResponseData[]>([]);

  const getContent = async () => {
    try {
      const response = await getAllContent();
      if (response.data.success) {
        setAllContent(response.data.data);
        toast.success("Content fetched successfully");
      }
    } catch (error: any) {
      toast.error("Error while fetching content");
      console.error(error);
    }
  };

  useEffect(() => {
    getContent();
  }, []);

  const extractTweetId = (url: string) => {
    const regex = /(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {allContent.map((content, index) => (
        content.type === "tweet" ? (
          <ClientTweetCard
            key={index}
            id={extractTweetId(content.url!)}
            className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden"
          />
        ) : content.type === "video" ? (
          <YouTubeVideoCard
            key={index}
            url={content.url!}
            title={content.title}
            className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden"
          />
        ) : content.type === "note" ? (
          <RenderMarkdown
            key={index}
            content={content.content ?? ""}
            title={content.title}
            tags={content.tags}
          />
        ) : null
      ))}
    </div>
  );
};

export default Brain; 