export function parseVttToCleanText(vttContent: string): string {
    const lines = vttContent.split('\n');
    const textLines: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      //  skips the lines like:
      // - WebVTT header
      // - Empty lines
      // - Lines with timestamps 
      // - Numeric counters
      // - Notes or metadata
      if (
        line === 'WEBVTT' || 
        line === '' || 
        line.includes('-->') || 
        line.match(/^\d+$/) || 
        line.includes('NOTE') || 
        line.includes('Kind:')
      ) {
        continue;
      }
      textLines.push(line);
    }
    const text = textLines.join(' ')
    let cleanedText;
    // Clean any special character or multiple space
    cleanedText = text.replace(/\s+/g, ' ').trim(); 
    // Remove all XML/HTML tags like <c> and </c>
    cleanedText = cleanedText.replace(/<\/?[^>]+(>|$)/g, '');
    // Remove all timestamp tags like <00:00:00.240>
    cleanedText = cleanedText.replace(/<\d+:\d+:\d+\.\d+>/g, '');
    return cleanedText;
  }


  