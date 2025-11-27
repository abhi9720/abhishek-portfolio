import React, { ReactNode } from 'react';

const MarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
  
  // Helper to parse inline styles: **bold** and [link](url)
  const renderInline = (inputText: string): ReactNode[] => {
    // Regex matches:
    // 1. **bold** -> (\*\*(.*?)\*\*)
    // 2. [link](url) -> (\[([^\]]+)\]\(([^)]+)\))
    const regex = /(\*\*(.*?)\*\*)|(\[([^\]]+)\]\(([^)]+)\))/g;
    
    const parts: ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(inputText)) !== null) {
      // Push text before match
      if (match.index > lastIndex) {
        parts.push(inputText.substring(lastIndex, match.index));
      }

      if (match[1]) {
        // Bold match: match[2] is content
        parts.push(<strong key={match.index} className="font-bold text-slate-900 dark:text-slate-100">{match[2]}</strong>);
      } else if (match[3]) {
        // Link match: match[4] text, match[5] url
        parts.push(
          <a
            key={match.index}
            href={match[5]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
          >
            {match[4]}
          </a>
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < inputText.length) {
      parts.push(inputText.substring(lastIndex));
    }
    return parts;
  };

  // Split lines to handle block elements like lists
  const lines = text.split('\n');

  return (
    <div className="text-sm space-y-1.5 break-words">
      {lines.map((line, i) => {
        // Handle List Items
        const trimmed = line.trim();
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const content = trimmed.substring(2);
            return (
                <div key={i} className="flex items-start gap-2 ml-2">
                    <span className="text-slate-400 mt-1.5 text-[10px]">•</span>
                    <span className="leading-relaxed">{renderInline(content)}</span>
                </div>
            );
        }
        
        // Handle empty lines as spacers
        if (!trimmed) {
             return <div key={i} className="h-1"></div>;
        }

        // Standard paragraph line
        return (
            <div key={i} className="leading-relaxed">
                {renderInline(line)}
            </div>
        );
      })}
    </div>
  );
};

export default MarkdownRenderer;