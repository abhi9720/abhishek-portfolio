
import React from 'react';
import { EXPERIENCES, EDUCATION } from '../constants';
import { IconMapPin } from './icons/IconMapPin';

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <div className="sticky top-0 z-10 py-4 mb-8 bg-slate-50/75 dark:bg-slate-900/75 backdrop-blur lg:hidden">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-slate-200">{title}</h2>
    </div>
);

const TimelineNode: React.FC<{ isLast?: boolean }> = ({ isLast }) => (
    <div className="flex flex-col items-center mr-4 md:mr-8">
        <div className="w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-500 border-4 border-white dark:border-slate-900 shadow-[0_0_0_4px_rgba(59,130,246,0.2)] z-10 relative group-hover:scale-125 transition-transform duration-300"></div>
        {!isLast && <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-700/50 my-2"></div>}
    </div>
);

const JobCard: React.FC<{ exp: typeof EXPERIENCES[0] }> = ({ exp }) => (
    <div className="group relative flex flex-col md:flex-row gap-x-2 pb-12 last:pb-0">
        {/* Timeline Node & Line */}
        <div className="absolute left-0 top-1.5 bottom-0 flex flex-col items-center md:hidden">
            <div className="w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-500 border-2 border-white dark:border-slate-900 z-10"></div>
            <div className="w-px h-full bg-slate-200 dark:bg-slate-700/50 my-1"></div>
        </div>

        {/* Date Column (Desktop) */}
        <div className="hidden md:flex flex-col items-end w-32 shrink-0 pt-1 text-right mr-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {exp.period.split('–')[0]}
            </span>
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500 my-1">to</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                {exp.period.split('–')[1] || 'Present'}
            </span>
        </div>

        {/* Timeline Node (Desktop) */}
        <div className="hidden md:flex flex-col items-center mr-6 shrink-0 relative">
             {/* Glow effect behind node */}
            <div className="absolute top-1 w-4 h-4 bg-blue-500/50 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 border-[3px] border-white dark:border-slate-900 group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-300 z-10"></div>
            <div className="w-px h-full bg-slate-200 dark:bg-slate-800 my-2 group-hover:bg-gradient-to-b group-hover:from-blue-200 group-hover:to-slate-200 dark:group-hover:from-blue-900 dark:group-hover:to-slate-800 transition-colors"></div>
        </div>

        {/* Content Card */}
        <div className="flex-1 ml-6 md:ml-0 relative group-hover:-translate-y-1 transition-transform duration-300">
             {/* Mobile Date */}
             <div className="md:hidden mb-2 ml-1">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded">
                    {exp.period}
                </span>
            </div>

            <div className="p-6 bg-white dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm hover:shadow-premium dark:shadow-none hover:border-blue-200 dark:hover:border-slate-600 transition-all duration-300 relative overflow-hidden">
                {/* Decorative top accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                        {/* Company Logo */}
                        <div className="h-12 w-12 rounded-xl bg-white p-1.5 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm shrink-0 overflow-hidden">
                            <img 
                                src={exp.logo} 
                                alt={`${exp.company} logo`} 
                                className="w-full h-full object-contain"
                                loading="lazy"
                            />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {exp.company}
                            </h3>
                            <div className="text-base font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                                {exp.role}
                            </div>
                        </div>
                    </div>
                     <div className="hidden sm:flex items-center text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 px-3 py-1 rounded-full shrink-0">
                        <IconMapPin className="w-3 h-3 mr-1.5" />
                        {exp.location}
                    </div>
                </div>

                <div className="mb-4">
                     <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic border-l-2 border-blue-200 dark:border-blue-900 pl-3 py-1 my-3 bg-slate-50 dark:bg-slate-800/50 rounded-r-lg">
                        "{exp.summary}"
                    </p>
                </div>

                <ul className="space-y-2.5">
                    {exp.description.map((desc, i) => (
                        <li key={i} className="flex items-start text-sm text-slate-600 dark:text-slate-400 leading-relaxed group/item">
                            <span className="mr-3 mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover/item:bg-blue-500 transition-colors shrink-0"></span>
                            <span>{desc}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
);

const EducationCard: React.FC = () => (
    <div className="mt-16 group relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl opacity-10 group-hover:opacity-20 blur transition duration-500"></div>
        <div className="relative p-8 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-bold text-xl text-slate-900 dark:text-slate-100">{EDUCATION.institution}</h4>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">{EDUCATION.degree}</p>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{EDUCATION.period}</span>
                    <span className="mt-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold rounded-full">
                        {EDUCATION.cgpa}
                    </span>
                </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-700/50">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">Core Curriculum</p>
                <div className="flex flex-wrap gap-2">
                    {EDUCATION.coursework.map(course => (
                        <span key={course} className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600/50 hover:border-blue-300 dark:hover:border-blue-700 transition-colors cursor-default">
                            {course}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const Experience: React.FC = () => {
    return (
        <section id="experience" className="scroll-mt-20">
             <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                    <h2 className="sticky top-0 hidden lg:block py-4 text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">Experience</h2>
                </div>
                <div className="lg:col-span-3">
                    <SectionHeader title="Experience" />
                    
                    <div className="relative">
                        {EXPERIENCES.map((exp, index) => (
                            <JobCard key={index} exp={exp} />
                        ))}
                    </div>

                    <div className="mt-8 flex items-center gap-4">
                        <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Academic Background</span>
                        <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                    </div>

                    <EducationCard />
                </div>
            </div>
        </section>
    );
};

export default Experience;
