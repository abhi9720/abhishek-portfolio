
import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO, KEY_HIGHLIGHTS, PROJECTS, SKILL_CATEGORIES } from '../constants';
import TechRadar from './TechRadar';
import { IconTrophy } from './icons/IconTrophy';
import { IconCode } from './icons/IconCode';
import { IconGlobe } from './icons/IconGlobe';

type Tab = 'profile' | 'projects' | 'skills';

interface ChatInfoPanelProps {
    activeContext: string; // 'projects', 'skills', or default
}

const ChatInfoPanel: React.FC<ChatInfoPanelProps> = ({ activeContext }) => {
    const [activeTab, setActiveTab] = useState<Tab>('profile');

    // Auto-switch tabs based on conversation context
    useEffect(() => {
        if (activeContext.includes('project') || activeContext.includes('work')) {
            setActiveTab('projects');
        } else if (activeContext.includes('skill') || activeContext.includes('stack') || activeContext.includes('tech')) {
            setActiveTab('skills');
        } else {
            // Keep current or default to profile
        }
    }, [activeContext]);

    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900/50">
            {/* Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
                {[
                    { id: 'profile', label: 'Overview' },
                    { id: 'projects', label: 'Projects' },
                    { id: 'skills', label: 'Skills' }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as Tab)}
                        className={`flex-1 py-3 text-sm font-semibold transition-colors relative ${
                            activeTab === tab.id 
                            ? 'text-blue-600 dark:text-blue-400' 
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                        }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"></div>
                        )}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar thin-scrollbar">
                
                {/* PROFILE TAB */}
                {activeTab === 'profile' && (
                    <div className="space-y-6 animate-fade-in-up">
                        <div className="text-center">
                            <div className="relative inline-block">
                                <img 
                                    src={PERSONAL_INFO.photoUrl} 
                                    alt={PERSONAL_INFO.name} 
                                    className="w-20 h-20 rounded-full border-2 border-white dark:border-slate-700 shadow-md mx-auto"
                                />
                                <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
                            </div>
                            <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-slate-100">{PERSONAL_INFO.name}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{PERSONAL_INFO.title}</p>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-300 mb-3">Power Stats</h4>
                            <div className="space-y-3">
                                {KEY_HIGHLIGHTS.map((h, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="mt-0.5 text-blue-500 shrink-0">
                                            <IconTrophy className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{h.metric}</p>
                                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">{h.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                             <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">Quick Bio</h4>
                             <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                                {PERSONAL_INFO.summary}
                             </p>
                        </div>
                    </div>
                )}

                {/* PROJECTS TAB */}
                {activeTab === 'projects' && (
                    <div className="space-y-4 animate-fade-in-up">
                        <p className="text-xs text-slate-500 dark:text-slate-400 italic mb-2">
                            Top projects based on backend complexity and impact.
                        </p>
                        {PROJECTS.slice(0, 4).map((project, i) => (
                            <div key={i} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-3 hover:shadow-md transition-shadow group">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm group-hover:text-blue-500 transition-colors">
                                        {project.title}
                                    </h4>
                                    <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
                                        {project.category}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">
                                    {project.description}
                                </p>
                                <div className="flex items-center gap-2">
                                     <a 
                                        href={project.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                                     >
                                        <IconCode className="h-3 w-3" /> Code
                                     </a>
                                     {project.liveDemoUrl && (
                                         <a 
                                            href={project.liveDemoUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                                         >
                                            <IconGlobe className="h-3 w-3" /> Demo
                                         </a>
                                     )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* SKILLS TAB */}
                {activeTab === 'skills' && (
                    <div className="space-y-6 animate-fade-in-up">
                         <div className="h-auto w-full -ml-4 flex justify-center">
                            {/* Reusing existing TechRadar but constrained height */}
                            <TechRadar compact={true} /> 
                         </div>
                         
                         <div className="space-y-4">
                            {SKILL_CATEGORIES.slice(0, 3).map((cat, i) => (
                                <div key={i}>
                                    <h5 className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-2">
                                        {/* Using a generic circle if icon prop is complex ReactNode */}
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                        {cat.name}
                                    </h5>
                                    <div className="flex flex-wrap gap-1.5">
                                        {cat.skills.slice(0, 5).map(skill => (
                                            <span key={skill} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-medium rounded border border-slate-200 dark:border-slate-700">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                         </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatInfoPanel;
