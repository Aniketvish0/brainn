import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addContent } from "@/lib/api/content";
import toast from "react-hot-toast";

interface AddContentProps {
  type: "video" | "tweet" | "web";
  onClose: () => void;
}

const AddTweetOrVideo: React.FC<AddContentProps> = ({ onClose, type }) => {
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");

  const handleAddContent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await addContent({ title, url, tags, type });
      if (response.data.success) {
        onClose();
        toast.success(`${type} node added successfully`);
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Error occurred while adding node");
    }
  };

  return (
    <div className="inset-0 fixed z-50 backdrop-blur-sm flex items-center justify-center">
      <div className="max-w-sm relative bg-background border border-border px-3 pt-4 pb-8 text-center rounded-lg shadow-lg">
        <button
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <h3 className="text-center font-bold text-2xl mb-8 pt-4 text-foreground">
          {`Add ${type} Node`}
        </h3>
        <form className="space-y-4 px-6 relative">
          <Input
            className="bg-muted/50 border-border focus:border-primary"
            placeholder={`${type} title`}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            className="bg-muted/50 border-border focus:border-primary"
            placeholder={`${type} url`}
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Input
            className="bg-muted/50 border-border focus:border-primary"
            placeholder="#tags"
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (tag.trim()) {
                  setTags(prev => [...prev, tag.trim()]);
                  setTag("");
                }
              }
            }}
          />
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-primary/10 text-primary px-3 py-1 text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
          <Button
            variant="default"
            type="submit"
            className="absolute right-0 -bottom-9"
            onClick={handleAddContent}
          >
            Add
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddTweetOrVideo; 