import { Tweet } from 'react-tweet';
import { cn } from '@/lib/utils';

export const MagicTweet = ({ tweet, components, ...props }: any) => {
  return (
    <div className={cn('w-full', props.className)}>
      <Tweet tweet={tweet} components={components} {...props} />
    </div>
  );
};

export const TweetNotFound = ({ error }: { error: any }) => {
  return (
    <div className="flex items-center justify-center p-4 bg-card text-card-foreground rounded-lg">
      <p className="text-muted-foreground">Tweet not found</p>
    </div>
  );
};

export const TweetSkeleton = () => {
  return (
    <div className="flex items-center justify-center p-4 bg-card text-card-foreground rounded-lg animate-pulse">
      <div className="w-full space-y-3">
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
        <div className="h-4 bg-muted rounded w-2/3"></div>
      </div>
    </div>
  );
}; 