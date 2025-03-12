 import { timeToSeconds } from "../other/timeToSeconds";
 
 export function parseVttToJson(vttContent: string): Array<{start: number, end: number, text: string}> {
    const lines = vttContent.split('\n');
    const result = [];
    let currentItem: {start: number, end: number, text: string} | null = null;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line === 'WEBVTT' || line === '' || line.includes('NOTE') || line.includes('Kind:')) {
        continue;
      }
      if (line.includes('-->')) {
        const [startTime, endTime] = line.split('-->').map(time => {
          const cleaned = time.trim().replace(',', '.');
          return timeToSeconds(cleaned);
        });
        currentItem = {
          start: startTime,
          end: endTime,
          text: ''
        };
        
      } else if (currentItem && !line.match(/^\d+$/)) {
        currentItem.text += (currentItem.text ? ' ' : '') + line;
        if (!lines[i + 1] || lines[i + 1].trim() === '' || lines[i + 1].includes('-->')) {
          result.push(currentItem);
          currentItem = null;
        }
      }
    }
    
    return result;
  }