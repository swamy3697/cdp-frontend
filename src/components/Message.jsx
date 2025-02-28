import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function Message({ message }) {
  const { type, text, platform } = message;
  
  return (
    <div className={`message ${type}-message`}>
      <div className="message-avatar">
        {type === 'user' ? '👤' : type === 'system' ? '🔧' : '🤖'}
      </div>
      <div className="message-content">
        {platform && <div className="platform-badge">{platform}</div>}
        <ReactMarkdown
          children={text}
          remarkPlugins={[remarkGfm]}
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, '')}
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
          }}
        />
      </div>
    </div>
  );
}

export default Message;