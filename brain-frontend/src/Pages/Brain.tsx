import { ClientTweetCard } from "@/components/ui/ClientTweetCard"
import { getallcontent } from "@/api/content/get";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";


interface ResponseData {
   content? : string,
   createdAt? : string,
   tags? : string[],
   title : string,
   type : string,
   url? : string,
   workspace? : string

}
const Brain = () => {
  const [allcontent, setallContent] = useState<ResponseData[]>([]);
  const getcontent = async() => {
    try {
      const response = await getallcontent();
      if(response.data.success){
        console.log(response);
        setallContent(response.data.data);
        toast.success("Content fetched successfully");
      }
    } catch (error:any) {
      toast.error("Error while fetching content");
      console.log(error)
    }
  }
  useEffect(()=>{
      getcontent();
  },[])
  const extractTweetId = (url : any) => {
    const regex = /(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };
  return (
    <div className="flex gap-4 flex-wrap">
        {
          allcontent.map((content)=>(
            content.type == "tweet" ? (
            <ClientTweetCard 
            id={extractTweetId(content.url)} 
            className="max-w-80 h-50 outline-none border-0 dark:shadow-2xl shadow-lg overflow-auto no-scrollbar" 
          />): content.type == "video" ? (
             <></>
          ):null
      ))
    } 
    </div>
  )
}

export default Brain

