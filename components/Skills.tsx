import React from 'react';
import { SKILL_CATEGORIES } from '../constants';
import TechRadar from './TechRadar';

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <div className="sticky top-0 z-10 py-4 mb-4 bg-slate-50/75 dark:bg-slate-900/75 backdrop-blur lg:static lg:mb-0 lg:py-0 lg:bg-transparent">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100 lg:sr-only">{title}</h2>
    </div>
);

const Skills: React.FC = () => {
    return (
        <section id="skills" className="scroll-mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                <div className="lg:col-span-1">
                    <h2 className="sticky top-0 hidden lg:block py-4 text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">Skills</h2>
                </div>
                <div className="lg:col-span-3">
                    <SectionHeader title="Skills" />
                    
                    {/* Tech Radar Chart */}
                    <div className="mb-16 bg-white dark:bg-slate-800/20 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-premium backdrop-blur-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                             <svg className="w-32 h-32 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/></svg>
                        </div>
                        <div className="relative z-10">
                            <div className="flex flex-col items-center mb-8">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">Technical Proficiency</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-center max-w-lg">
                                    A visual representation of my core technical strengths across backend engineering, system design, and cloud infrastructure.
                                </p>
                            </div>
                            <TechRadar />
                        </div>
                    </div>

                    <div className="columns-1 md:columns-2 gap-8 space-y-8">
                        {SKILL_CATEGORIES.map((category) => (
                            <div 
                                key={category.name} 
                                className="break-inside-avoid bg-white dark:bg-slate-800/40 rounded-3xl border border-slate-200 dark:border-slate-700/60 p-8 hover:shadow-xl hover:shadow-blue-500/5 dark:hover:shadow-blue-900/10 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 group hover:-translate-y-1"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                        {category.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {category.name}
                                    </h3>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {category.skills.map((skill) => (
                                        <div 
                                            key={skill} 
                                            className="px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 text-slate-600 dark:text-slate-400 font-medium text-sm transition-all duration-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-600 dark:hover:text-white dark:hover:border-blue-600 cursor-default shadow-sm"
                                        >
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;