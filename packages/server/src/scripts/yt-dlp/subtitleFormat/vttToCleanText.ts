export function cleanYouTubeTranscript(text: string): string {
  let cleaned = text.replace(/^Language:\s*[a-z]{2,3}\s*/i, '');
  const phrases = [];
  let currentPosition = 0;

  while (currentPosition < cleaned.length) {
    // Try to find a phrase that repeats exactly 3 times
    const foundPattern = findTripleRepetitionPattern(cleaned, currentPosition);
    
    if (foundPattern) {
      // Add just one instance of the pattern and skip the repetitions
      phrases.push(foundPattern.phrase);
      currentPosition = foundPattern.endPosition;
    } else {
      // If no triple pattern found, extract the next word
      const nextSpacePos = cleaned.indexOf(' ', currentPosition + 1);
      if (nextSpacePos === -1) {
        // Last word
        phrases.push(cleaned.substring(currentPosition));
        break;
      } else {
        phrases.push(cleaned.substring(currentPosition, nextSpacePos));
        currentPosition = nextSpacePos;
      }
    }
  }
  return phrases.join(' ').replace(/\s+/g, ' ').trim();
}

function findTripleRepetitionPattern(text: string, startPos: number): { phrase: string, endPosition: number } | null {
  // Try patterns of various lengths (from 3 words to 10 words)
  for (let wordCount = 3; wordCount <= 10; wordCount++) {
    // Extract a potential pattern
    const endOfPatternPos = findPositionAfterNWords(text, startPos, wordCount);
    if (endOfPatternPos === -1) continue;
    
    const pattern = text.substring(startPos, endOfPatternPos).trim();
    if (pattern.length < 10) continue; // Skip very short patterns
    // Check if this pattern repeats 3 times
    if (
      text.substring(endOfPatternPos, endOfPatternPos + pattern.length + 1).trim() === pattern &&
      text.substring(endOfPatternPos + pattern.length + 1, endOfPatternPos + 2 * pattern.length + 2).trim() === pattern
    ) {
      // Pattern repeats 3 times, calculate where it ends
      const endPosition = endOfPatternPos + 2 * pattern.length + 2;
      return { phrase: pattern, endPosition };
    }
  }
  
  return null;
}

function findPositionAfterNWords(text: string, startPos: number, wordCount: number): number {
  let count = 0;
  let pos = startPos;
  while (count < wordCount && pos < text.length) {
    // Skip current word
    while (pos < text.length && text[pos] !== ' ') {
      pos++;
    }
    // Skip spaces
    while (pos < text.length && text[pos] === ' ') {
      pos++;
    }
    count++;
  }
  return count === wordCount ? pos : -1;
}

export function parseVttToCleanText(vttContent: string): string {
  const lines = vttContent.split('\n');
  const textLines: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    // Skip non-text lines
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
  let text = textLines.join(' ');
  text = text.replace(/<\/?[^>]+(>|$)/g, '');
  text = text.replace(/<\d+:\d+:\d+\.\d+>/g, '');
  text = text.replace(/\s+/g, ' ').trim();
  text = cleanYouTubeTranscript(text);
  return removeExactTripleRepeats(text);
}
export function removeExactTripleRepeats(text: string): string {
  let cleaned = text.replace(/^Language:\s*[a-z]{2,3}\s*/i, '');
  const tripleRepeatRegex = /\b((?:\w+\s+){2,10}?\w+)(\s+\1){2}\b/g;
  let lastResult = '';
  while (lastResult !== cleaned) {
    lastResult = cleaned;
    cleaned = cleaned.replace(tripleRepeatRegex, '$1');
  }
  return cleaned;
}