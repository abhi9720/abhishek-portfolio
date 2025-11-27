
import React from 'react';
import { IconSparkles } from './icons/IconSparkles';

interface QuickSuggestionsProps {
    onSelect: (text: string) => void;
}

const SUGGESTIONS = [
    { text: "Summarize your experience", icon: "🚀" },
    { text: "What are your top projects?", icon: "💻" },
    { text: "Explain your backend skills", icon: "⚙️" },
    { text: "How do you handle high-load?", icon: "📈" },
    { text: "Tell me about the Gamification Engine", icon: "🎮" },
    { text: "Do you know System Design?", icon: "🏗️" },
];

const QuickSuggestions: React.FC<QuickSuggestionsProps> = ({ onSelect }) => {
    return (
        <div className="flex gap-2 overflow-x-auto pb-2 pt-2 px-1 no-scrollbar mask-gradient">
            {SUGGESTIONS.map((s, i) => (
                <button
                    key={i}
                    onClick={() => onSelect(s.text)}
                    className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 rounded-full border border-slate-200 dark:border-slate-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-700/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 whitespace-nowrap"
                >
                    <span>{s.icon}</span>
                    <span>{s.text}</span>
                </button>
            ))}
        </div>
    );
};

export default QuickSuggestions;
