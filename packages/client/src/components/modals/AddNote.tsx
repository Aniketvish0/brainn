import { addContent } from '@/lib/api/content';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';

interface Tag {
  name: string;
}

interface AddNoteProps {
  onClose: () => void;
}

interface AddNoteNodeProps {
  title: string;
  content: string;
  tags: string[];
}

const AddNote: React.FC<AddNoteProps> = ({ onClose }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [tagInput, setTagInput] = useState<string>('');
  const [tags, setTags] = useState<Tag[]>([]);

  const handleAddNoteNode = async ({ title, content, tags }: AddNoteNodeProps) => {
    try {
      const response = await addContent({ title, content, tags, type: "note" });
      if (response.data.success) {
        toast.success("Note added successfully");
        onClose();
      }
    } catch (error) {
      toast.error("Error while adding note");
      console.error(error);
      throw error;
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      const newTag: Tag = {
        name: tagInput.trim()
      };
      setTags([...tags, newTag]);
      setTagInput('');
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const removeTag = (tagId: string) => {
    setTags(tags.filter((_, index) => index !== parseInt(tagId)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      handleAddNoteNode({
        title,
        content,
        tags: tags.map(tag => tag.name)
      });
      setTitle('');
      setContent('');
      setTags([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-50 w-full max-w-[600px] mx-auto bg-background border border-border rounded-lg shadow-lg p-4 max-h-[90vh] overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent border-none text-foreground text-lg focus:outline-none focus:ring-0 p-0"
            placeholder="Title"
            required
          />

          <Textarea
            id="content"
            value={content}
            rows={10}
            onChange={(e) => setContent(e.target.value)}
            className="bg-transparent border-none text-foreground resize-none focus:outline-none focus:ring-0 p-0 min-h-[200px]"
            placeholder="Take a note..."
            required
          />

          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
              >
                {tag.name}
                <button
                  type="button"
                  onClick={() => removeTag(index.toString())}
                  className="ml-1.5 text-primary/60 hover:text-primary focus:outline-none"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center">
            <Input
              type="text"
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              className="bg-transparent border-none text-foreground text-sm focus:outline-none focus:ring-0 p-0"
              placeholder="Add tag..."
            />
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              Close
            </Button>
            <Button
              type="submit"
              variant="default"
            >
              Done
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote; 