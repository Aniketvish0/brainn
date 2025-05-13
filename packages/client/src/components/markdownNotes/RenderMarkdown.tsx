import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownNoteRendererProps {
  title: string;
  content: string;
  tags?: string[];
}

const RenderMarkdown: React.FC<MarkdownNoteRendererProps> = ({ title, content, tags = [] }) => {
  return (
    <div className="w-full max-w-80 bg-card text-card-foreground rounded-lg overflow-hidden shadow-lg">
      <div className="p-4">
        <h1 className="text-xl font-medium text-foreground mb-2">
          {title}
        </h1>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                const inline = !match;
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...(props as any)}
                    style={vscDarkPlus as any}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-md"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              h1: ({ node, ...props }) => <h1 className="text-xl font-medium mt-4 mb-2 text-foreground" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-lg font-medium mt-3 mb-2 text-foreground" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-base font-medium mt-2 mb-1 text-foreground" {...props} />,
              p: ({ node, ...props }) => <p className="text-muted-foreground my-2" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-2 text-muted-foreground" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal pl-5 my-2 text-muted-foreground" {...props} />,
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-border pl-4 my-3 text-muted-foreground" {...props} />
              ),
              img: ({ node, ...props }) => (
                <img className="max-w-full h-auto rounded-md my-3" {...props} alt={props.alt || ''} />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default RenderMarkdown; 