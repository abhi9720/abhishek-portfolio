import React from 'react';
import { KEY_HIGHLIGHTS } from '../constants';

const KeyHighlights: React.FC = () => {
    if (!KEY_HIGHLIGHTS || KEY_HIGHLIGHTS.length === 0) return null;

    return (
        <div className="mt-16">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-8 uppercase tracking-widest">Key Career Highlights</h3>
            <ul className="grid grid-cols-1 gap-4">
                {KEY_HIGHLIGHTS.map((highlight, index) => (
                    <li 
                        key={index} 
                        className="group flex items-start gap-4 p-5 rounded-r-xl bg-white dark:bg-slate-800/40 border-l-4 border-blue-500 dark:border-blue-500 shadow-sm hover:shadow-lg hover:shadow-blue-500/5 dark:hover:shadow-blue-900/10 transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="flex-shrink-0 mt-1 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                           {React.isValidElement(highlight.icon)
                                ? React.cloneElement(highlight.icon as React.ReactElement<{ className?: string }>, { className: 'h-6 w-6' })
                                : highlight.icon
                            }
                        </div>
                        <div>
                            <p className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {highlight.metric}
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mt-1">
                                {highlight.description}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default KeyHighlights;