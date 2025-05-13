// utils/youtubeTranscript.ts
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';
import { parseVttToJson } from './subtitleFormat/vttToJson';
import { isValidVideoId, getYoutubeId } from '../../utils/contentUtils/Getytid';
import { cleanupFiles } from './other/cleanupFiles';
import { parseVttToPlainText } from './subtitleFormat/vttToText';
import { parseVttToCleanText } from './subtitleFormat/vttToCleanText';
const execPromise = promisify(exec);

interface TranscriptOptions {
  videoUrl: string;
  language?: string;
  format?: 'json' | 'text' | 'cleantext';
}

export async function getYoutubeTranscript(options: TranscriptOptions): Promise<string | Array<{start: number, end: number, text: string}>> {
  const { videoUrl, language = 'en', format = 'cleantext' } = options;

  const videoId = getYoutubeId(videoUrl);
  if (!videoId) {
    throw new Error('Video ID is required');
  }
  if (!isValidVideoId(videoId)) {
    throw new Error('Invalid video ID format');
  }
  const tempDir = path.join(__dirname, '../temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
  const ytDlpCommand = `ytd.exe --write-auto-sub --sub-lang ${language} --skip-download --output "${tempDir}/%(id)s" https://www.youtube.com/watch?v=${videoId}`;
  
  try {
    await execPromise(ytDlpCommand);
    const possibleFiles = [
      `${tempDir}/${videoId}.${language}.vtt`,
      `${tempDir}/${videoId}.${language}.srv1.vtt`,
      `${tempDir}/${videoId}.${language}.srv2.vtt`,
      `${tempDir}/${videoId}.${language}.srv3.vtt`
    ];
    
    let subtitleFile = null;
    for (const file of possibleFiles) {
      if (fs.existsSync(file)) {
        subtitleFile = file;
        break;
      }
    }
    if (!subtitleFile) {
      throw new Error('No subtitles found for this video');
    }
    const subtitleContent = fs.readFileSync(subtitleFile, 'utf8');
    cleanupFiles(possibleFiles);
    if (format === 'json') {
      return parseVttToJson(subtitleContent);
    } 
    else if(format === 'cleantext'){
      return parseVttToCleanText(subtitleContent);
    }
    else {
      return parseVttToPlainText(subtitleContent);
    }
  } catch (error) {
    throw new Error(`Failed to fetch transcript: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// // controllers/contentController.ts
// import { Request, Response } from 'express';
// import { getYoutubeTranscript } from '../utils/youtubeTranscript';
// // Assuming you have a Content model
// // import { Content } from '../models/Content';
// interface SaveContentRequest {
//   videoId: string;
//   title?: string;
//   language?: string;
//   format?: 'json' | 'text';
//   // Add any other fields you need
// }
// export const saveContent = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { videoId, title, language = 'en', format = 'text' } = req.body as SaveContentRequest;
    
//     if (!videoId) {
//       res.status(400).json({ error: 'Video ID is required' });
//       return;
//     }
    
//     // Get the transcript using our utility function
//     const transcript = await getYoutubeTranscript({
//       videoId,
//       language,
//       format
//     });
    
//     // Example of saving to database (uncomment and adapt as needed)
//     // const savedContent = await Content.create({
//     //   title: title || `YouTube Transcript: ${videoId}`,
//     //   content: typeof transcript === 'string' ? transcript : JSON.stringify(transcript),
//     //   videoId,
//     //   language,
//     //   type: 'youtube_transcript',
//     //   createdAt: new Date()
//     // });
    
//     // For now, just return the transcript
//     res.status(200).json({
//       success: true,
//       // id: savedContent.id,
//       transcript
//     });
    
//   } catch (error) {
//     console.error('Error saving content:', error);
//     res.status(500).json({ 
//       error: 'Failed to save content',
//       details: error instanceof Error ? error.message : String(error)
//     });
//   }
// };