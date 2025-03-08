import { X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/Button";

import { addContent } from "@/api/content/post";
import toast from "react-hot-toast";

interface AddContentProps {
    type: string,
    onclose: () => void;
}
const Addcontent: React.FC<AddContentProps> = ({onclose,type}) => {
    const [title, setTitle] = useState<string>("");
    const [url,setUrl] = useState<string>("");
    const [tags,setTags] = useState<string[]>([]);
    const [tag,setTag] = useState<string>("");


    const handleaddcontent = async(e : React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await addContent({title,url,tags,type});
            if(response.data.success){
                onclose();
                toast.success(`${type} node added successfully`);
            }
        }catch(error : any){
            console.error(error);
            toast.error("error occured while adding node");
        }
    }
  return (
    <div className="inset-0 fixed z-200 backdrop-blur-sm flex items-center justify-center">
        <div className="max-w-sm relative bg-muted px-3 pt-4 pb-8 text-center rounded-md">
            <X className="absolute right-4" onClick={onclose}/>
        <h3 className="text-center font-bold text-2xl mb-8 pt-4">{`Add ${type} Node`}</h3>
        <form className="space-y-4 px-6 relative">
        <input className="bg-transparent w-full outline-none border-[1px] border-blue-400/20  focus:border-blue-300 text-white py-2 px-4 mx-1 rounded-md"  placeholder={`${type} title`} type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="bg-transparent w-full outline-none border-[1px] border-blue-400/20  focus:border-blue-300 text-white py-2 px-4 mx-1 rounded-md"  placeholder={`${type} url`} type="url" value={url} onChange={(e)=>setUrl(e.target.value)} />
        <input 
            className="bg-transparent w-full outline-none border-[1px] border-blue-400/20  focus:border-blue-300 text-white py-2 px-4 mx-1 rounded-md"
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
                <button 
                    key={index}
                    className="rounded-2xl bg-secondary px-3 py-1 text-center"
                >
                    #{tag}
                </button>
            ))}
        </div>
        <Button 
        variant="default" 
        type="submit" 
        className="px-3 py-1 rounded-lg bg-red-700 mx-2 -bottom-9 absolute right-0"
        onClick={(e)=>handleaddcontent(e)}
        >
            Add
        </Button>
        </form>
        </div>
    </div>
  )
}

export default Addcontent