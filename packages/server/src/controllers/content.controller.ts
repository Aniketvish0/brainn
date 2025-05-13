import { Response } from 'express';
import { AuthRequest } from '../utils/types/Auth';
import asyncHandler  from '../utils/handler';
import { ApiError } from '../utils/ApiError';
import Content from '../models/content.model'; 
import { Workspace } from '../models/workspace.model';
import { Tag } from '../models/tag.model';
import User from '../models/user.model';
// import { getReadingTime } from '../utils/contentUtils/Readingtime';
// import { fetchUrlMetadata } from '../utils/contentUtils/getmetadata/url';
// import { getTweetMetadata } from '../utils/contentUtils/getmetadata/tweet';
// import { getVideoMetadata } from '../utils/contentUtils/getmetadata/yt';
import { Types } from 'mongoose';
import { ApiResponse } from '../utils/ApiResponse';
import { getYoutubeTranscript } from '../scripts/yt-dlp/youtubeTranscript';
import { scrapePage } from '../scripts/web/scrapePage';

type ContentType = 'web' | 'video' | 'tweet' | 'note' | 'document';

// const metadataHandlers: Record<ContentType, (urlOrContent: string, userId: string) => Promise<IMetadata>> = {
//   link: async (urlOrContent: string, userId: string) => {
//     const urlMetadata = await fetchUrlMetadata(urlOrContent);
//     return {
//       author: urlMetadata?.author || 'Unknown',
//       publishedDate: urlMetadata?.publishedDate ? new Date(urlMetadata.publishedDate) : new Date(),
//       lastUpdated: new Date(),
//       platform: urlMetadata?.platform || 'web',
//       readingTime: getReadingTime(urlOrContent),
//       thumbnail: urlMetadata?.thumbnail || ''
//     };
//   },

//   video: async (url: string) => {
//     const videoMetadata = await getVideoMetadata(url);
//     return {
//       author: videoMetadata?.author || 'Unknown',
//       publishedDate: videoMetadata?.publishedDate || new Date(),
//       lastUpdated: new Date(),
//       platform: videoMetadata?.platform || 'video',
//       readingTime: 0, 
//       thumbnail: videoMetadata?.thumbnail || ''
//     };
//   },

//   tweet: async (url: string) => {
//     const tweetMetadata = await getTweetMetadata(url);
//     return {
//       author: tweetMetadata?.author || 'Unknown',
//       publishedDate: tweetMetadata?.publishedDate || new Date(),
//       lastUpdated: new Date(),
//       platform: 'twitter',
//       readingTime: 1, 
//       thumbnail: tweetMetadata?.thumbnail || ''
//     };
//   },

//   note: async (content: string, userId: string) => {
//     const user = await User.findById(userId);
//     return {
//       author: user?.name || 'Unknown',
//       publishedDate: new Date(),
//       lastUpdated: new Date(),
//       platform: 'local',
//       readingTime: getReadingTime(content),
//       thumbnail: ''
//     };
//   },

//   document: async (content: string, userId: string) => {
//     const user = await User.findById(userId);
//     return {
//       author: user?.name || 'Unknown',
//       publishedDate: new Date(),
//       lastUpdated: new Date(),
//       platform: 'local',
//       readingTime: getReadingTime(content),
//       thumbnail: ''
//     };
//   }
// };

const handleCreateContent = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { type, content, title, workspace, url, tags = [] } = req.body as { 
    type: ContentType;
    content?: string;
    title: string;
    workspace?: string;
    url?: string;
    tags: string[];
  };
  const userId = req.user?._id;
  
  const user = await User.findById(userId);
  if (!user) throw new ApiError(401, "No user found");
  
  try {
    const urlOrContent = url || content;
    if (!urlOrContent) throw new ApiError(400, "Content or URL is required");
    
    // const metadata = await metadataHandlers[type](urlOrContent, userId as string);
    const defaultWorkspaceObjectID = await Workspace.findOne({name:"default"});
    const brainContent = await Content.create({
      type,
      content : content || "",
      title,
      workspace : workspace || defaultWorkspaceObjectID?._id,
      userId,
      tags,
      url: url || "",
      //   metadata,
      stats: {
        views: 0,
        importance: 0,
        lastAccessed: new Date()
      }
    });

    if (req.body.relationships) {
      const validRelationships = await Promise.all(
        req.body.relationships.map(async (rel: { type: string; contentId: string }) => {
          const relatedContent = await Content.findById(rel.contentId);
          return relatedContent ? rel : null;
        })
      );

      if (validRelationships.some(rel => rel !== null)) {
        brainContent.relationships = validRelationships.filter(rel => rel !== null);
        await brainContent.save();
      }
    }
    await Promise.all(tags.map((tag: string) => 
        Tag.incrementUsage(tag, new Types.ObjectId(userId as string))
    ));

    res.status(201).json(new ApiResponse(201,{brainContent : brainContent},"Content created sucessfully"));
    let transcript ;
    if(type === "video"){
      transcript = await getYoutubeTranscript({videoUrl : url as string});
      brainContent.content = transcript as string;
      await brainContent.save();
    }
    if(type == "web"){
      const webcontent = await scrapePage(url as string);
      console.log(webcontent);
      brainContent.content = webcontent;
      await brainContent.save();
    }
    
  } catch (error: any) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Error while creating brain node"
    );
  }
});


// const handleUpdateContent = asyncHandler(async (req:AuthRequest, res : Response) => {

//     try{

//     }catch(error){

//     }
// })

const handleGetAllcontent = asyncHandler(async (req:AuthRequest, res:Response)=> {
      try {
        const userId = req?.user?._id;
        const userExists = await User.findById(userId);
        if(!userExists){
          throw new ApiError(404,"No user found");
        }
        const allusercontent = await Content.find({
          userId : userId
        })
        res.status(200).json(new ApiResponse(200,allusercontent,"All user content fetched successfully"));
      } catch (error : any) {
        throw new ApiError(
          error.statusCode || 500,
          error.message || "Error while fetching all content of user"
        )
      }
})

export { 
    handleCreateContent,
    handleGetAllcontent
};