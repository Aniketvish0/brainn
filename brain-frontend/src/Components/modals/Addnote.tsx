import { addContent } from '@/api/content/post';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface Tag {
  name: string;
}
interface AddNoteRFCProp{
    onClose : () => void
}
interface AddNoteNodeProps {
   title: string;
   content: string; 
   tags: string[];
}

const AddNote: React.FC<AddNoteRFCProp> = ({ onClose } : AddNoteRFCProp) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [tagInput, setTagInput] = useState<string>('');
  const [tags, setTags] = useState<Tag[]>([]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };
  const handleAddNoteNode = async({title,content,tags} : AddNoteNodeProps) => {
        try {
            const response = await addContent({title,content,tags,type : "note"});
            console.log(response);
            if(response.data.success){
                toast.success("Note added successfully");
                onClose();
            }
        } catch (error) {
            toast.error("Errow while adding note")
            console.error(error);
            throw error;
        }
  }
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
    setTags(tags.filter((_,index) => index !== parseInt(tagId)));
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
//  {202124} //google keep bg
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div 
        className="relative z-[999] w-full max-w-[600px] mx-auto bg-[#1b1c21] rounded-lg shadow-lg p-4 max-h-[90vh] overflow-auto"
      >
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="w-full px-3 py-2 bg-transparent border-none text-white text-lg focus:outline-none"
            placeholder="Title"
            required
          />
          
          <textarea
            id="content"
            value={content}
            rows={10}
            onChange={handleContentChange}
            className="w-full px-3 py-2 bg-transparent border-none text-white resize-none focus:outline-none no-scrollbar max-h-[60vh] overflow-y-auto"
            placeholder="Take a note..."
            required
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-200"
              >
                {tag.name}
                <button
                  type="button"
                  onClick={() => removeTag(index.toString())}
                  className="ml-1.5 text-gray-400 hover:text-gray-200 focus:outline-none"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center">
            <input
              type="text"
              id="tags"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyDown={handleTagKeyDown}
              className="flex-grow px-3 py-2 bg-transparent border-none text-white text-sm focus:outline-none"
              placeholder="Add tag..."
            />
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-sm text-gray-300 hover:text-white focus:outline-none"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-sm text-gray-300 hover:text-white focus:outline-none"
            >
              Done
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;