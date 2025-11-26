
import React, { useState, useMemo } from 'react';
import { PROJECTS } from '../constants';
import type { Project } from '../types';
import { IconSearch } from './icons/IconSearch';
import { IconCode } from './icons/IconCode';
import { IconGlobe } from './icons/IconGlobe';

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <div className="sticky top-0 z-10 py-4 mb-4 bg-slate-50/75 dark:bg-slate-900/75 backdrop-blur lg:static lg:mb-0 lg:py-0 lg:bg-transparent">
        <h2 className="text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-slate-900 to-blue-600 dark:from-slate-200 dark:to-blue-500 text-transparent bg-clip-text lg:sr-only">{title}</h2>
    </div>
);

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    return (
        <div className="group flex flex-col h-full bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 p-4 sm:p-5">
            {/* Image Container */}
            <div className="h-64 sm:h-72 w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900 relative">
                <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                />
            </div>
            
            {/* Content Container */}
            <div className="flex flex-col flex-1 pt-6 px-2">
                {/* Icon Box & Category */}
                <div className="flex justify-between items-start mb-6">
                    <div className="h-12 w-12 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <IconCode className="h-6 w-6" />
                    </div>
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                        {project.category}
                    </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-lg line-clamp-3">
                    {project.description}
                </p>

                 {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                    {project.tech.slice(0, 4).map((tech) => (
                         <span key={tech} className="px-2.5 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 rounded-md border border-slate-200 dark:border-slate-600">
                            {tech}
                         </span>
                    ))}
                    {project.tech.length > 4 && (
                        <span className="px-2.5 py-1 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-600">
                           +{project.tech.length - 4}
                        </span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="pt-4 mt-auto flex items-center gap-6 border-t border-slate-100 dark:border-slate-700/50">
                     <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 group/btn"
                    >
                        <span className="flex items-center justify-center w-10 h-10 rounded bg-slate-900 dark:bg-blue-600 text-white transition-all duration-300 group-hover/btn:scale-110 shadow-lg shadow-blue-900/20">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white group-hover/btn:text-blue-600 dark:group-hover/btn:text-blue-400 transition-colors">
                            View Code
                        </span>
                    </a>

                    {project.liveDemoUrl && (
                        <a
                            href={project.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            <IconGlobe className="h-5 w-5" />
                            <span>Live Demo</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

const Projects: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = ['All', 'Backend', 'Frontend', 'AI', 'Full-Stack'];

    const filteredProjects = useMemo(() => {
        return PROJECTS.filter(project => {
            const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
            const matchesSearch = searchTerm === '' ||
                project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
            
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchTerm]);


    return (
        <section id="projects" className="scroll-mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                     <h2 className="sticky top-0 hidden lg:block py-4 text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-slate-900 to-blue-500 dark:from-slate-200 dark:to-blue-500 text-transparent bg-clip-text">Projects</h2>
                </div>
                <div className="lg:col-span-3">
                    <SectionHeader title="Projects" />
                    
                    <div className="mb-10 space-y-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by title, tag, or technology..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors placeholder-slate-400 dark:placeholder-slate-500"
                                aria-label="Search for a project"
                            />
                            <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500">
                                <IconSearch className="h-5 w-5" />
                            </div>
                        </div>

                        <div className="flex-shrink-0 bg-slate-100/50 dark:bg-slate-800/50 p-1.5 rounded-xl flex items-center flex-wrap gap-1">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`flex-grow sm:flex-grow-0 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${activeCategory === cat ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/5' : 'text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50 hover:scale-105'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredProjects.map((project, index) => (
                            <ProjectCard 
                                key={index} 
                                project={project}
                            />
                        ))}
                    </div>
                    {filteredProjects.length === 0 && (
                         <div className="text-center py-20 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
                            <p className="font-semibold text-xl text-slate-700 dark:text-slate-300">No projects found</p>
                            <p className="mt-2 text-slate-500">Try adjusting your search or filter criteria.</p>
                            <button onClick={() => {setSearchTerm(''); setActiveCategory('All');}} className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 font-medium transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg">
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Projects;
