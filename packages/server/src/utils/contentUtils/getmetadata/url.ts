import * as cheerio from 'cheerio'
import axios from 'axios';

export async function fetchUrlMetadata(url: string) {
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      
      return {
        title: $('meta[property="og:title"]').attr('content') || $('title').text(),
        author: $('meta[name="author"]').attr('content') || 'Unknown',
        publishedDate: $('meta[property="article:published_time"]').attr('content') || new Date(),
        thumbnail: $('meta[property="og:image"]').attr('content') || '',
        platform: new URL(url).hostname
      };
    } catch (error) {
      console.error('Error fetching URL metadata:', error);
      return null;
    }
  }