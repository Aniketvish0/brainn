interface YouTubeCardProps {
  url?: string;
  title: string;
  className?: string;
}

const YouTubeVideoCard = ({ url, title, className = "" }: YouTubeCardProps) => {
  const extractYoutubeId = (url: string | undefined) => {
    if (!url) return null;
    const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[1].length === 11) ? match[1] : null;
  };

  const videoId = extractYoutubeId(url);

  const handleClick = () => {
    if (videoId) {
      window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank', 'noopener noreferrer');
    }
  };

  if (!videoId) {
    return (
      <div className={`bg-destructive/10 text-destructive p-4 rounded-lg ${className}`}>
        Invalid YouTube URL
      </div>
    );
  }

  return (
    <div 
      className={`rounded-lg shadow-lg cursor-pointer w-full pb-2 bg-card text-card-foreground ${className}`}
      onClick={handleClick}
    >
      <div className="flex text-center justify-center">
        <iframe 
          width="370" 
          height="170" 
          src={`https://www.youtube.com/embed/${videoId}?si=${videoId}`} 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen 
          className="rounded-lg px-1 w-full"
        />
      </div>
      {title && (
        <div className="px-4">
          <h3 className="font-medium text-foreground">{title}</h3>
        </div>
      )}
    </div>
  );
};

export default YouTubeVideoCard; 