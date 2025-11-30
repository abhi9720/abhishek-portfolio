import React, { ReactNode } from 'react';

const MarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
  
  // Helper to parse inline styles: **bold**, [link](url), and `code`
  const renderInline = (inputText: string): ReactNode[] => {
    // Regex matches:
    // 1. **bold** -> (\*\*(.*?)\*\*)
    // 2. [link](url) -> (\[([^\]]+)\]\(([^)]+)\))
    // 3. `code` -> (`([^`]+)`)
    const regex = /(\*\*(.*?)\*\*)|(\[([^\]]+)\]\(([^)]+)\))|(`([^`]+)`)/g;
    
    const parts: ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(inputText)) !== null) {
      // Push text before match
      if (match.index > lastIndex) {
        parts.push(inputText.substring(lastIndex, match.index));
      }

      if (match[2]) {
        // Bold
        parts.push(<strong key={match.index} className="font-bold text-slate-900 dark:text-slate-100">{match[2]}</strong>);
      } else if (match[4]) {
        // Link
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
      } else if (match[7]) {
          // Inline Code
          parts.push(
              <code key={match.index} className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded text-xs font-mono text-slate-800 dark:text-slate-200">
                  {match[7]}
              </code>
          );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < inputText.length) {
      parts.push(inputText.substring(lastIndex));
    }
    return parts;
  };

  // Split by code blocks
  // Regex: ```(language)?\n(content)```
  // We use a simpler split to just find ``` blocks
  const parts = text.split(/(```[\s\S]*?```)/g);

  return (
    <div className="text-sm space-y-3 break-words">
      {parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
            // It's a code block
            const inner = part.slice(3, -3);
            const newLineIndex = inner.indexOf('\n');
            let language = 'text';
            let code = inner;
            
            if (newLineIndex > -1) {
                const firstLine = inner.substring(0, newLineIndex).trim();
                if (firstLine && !firstLine.includes(' ')) {
                    language = firstLine;
                    code = inner.substring(newLineIndex + 1);
                }
            }

            return (
                <div key={index} className="relative group my-3 rounded-lg overflow-hidden bg-slate-900 border border-slate-700">
                    <div className="flex justify-between items-center px-3 py-1 bg-slate-800 border-b border-slate-700">
                        <span className="text-[10px] uppercase font-bold text-slate-400">{language}</span>
                    </div>
                    <div className="p-3 overflow-x-auto custom-scrollbar">
                        <pre className="font-mono text-xs text-slate-200">
                            {code.trim()}
                        </pre>
                    </div>
                </div>
            );
        }

        // Regular text handling (paragraphs and lists)
        const lines = part.split('\n');
        return (
            <div key={index} className="space-y-1.5">
                {lines.map((line, lineIndex) => {
                    const trimmed = line.trim();
                    if (!trimmed) return null;

                    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                         const content = trimmed.substring(2);
                         return (
                             <div key={`${index}-${lineIndex}`} className="flex items-start gap-2 ml-2">
                                 <span className="text-slate-400 mt-1.5 text-[10px]">•</span>
                                 <span className="leading-relaxed">{renderInline(content)}</span>
                             </div>
                         );
                    }

                    return (
                        <p key={`${index}-${lineIndex}`} className="leading-relaxed">
                            {renderInline(line)}
                        </p>
                    );
                })}
            </div>
        );

      })}
    </div>
  );
};

export default MarkdownRenderer;