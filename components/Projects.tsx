
import React, { useState, useMemo } from 'react';
import { PROJECTS } from '../constants';
import type { Project } from '../types';
import { IconSearch } from './icons/IconSearch';
import { IconCode } from './icons/IconCode';
import { IconGlobe } from './icons/IconGlobe';

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <div className="sticky top-0 z-10 py-4 mb-4 bg-slate-50/75 dark:bg-slate-900/75 backdrop-blur lg:static lg:mb-0 lg:py-0 lg:bg-transparent">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100 lg:sr-only">{title}</h2>
    </div>
);

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    return (
        <div className="group flex flex-col h-full bg-white dark:bg-slate-800/40 rounded-3xl border border-slate-200 dark:border-slate-700/60 shadow-subtle hover:shadow-premium hover:-translate-y-2 transition-all duration-300 p-5">
            {/* Image Container */}
            <div className="h-56 w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900 relative border border-slate-100 dark:border-slate-700/50 mb-6">
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-300 z-10"></div>
                <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />
            </div>
            
            {/* Content Container */}
            <div className="flex flex-col flex-1">
                {/* Icon Box & Category */}
                <div className="flex justify-between items-start mb-4">
                     <div className="h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm group-hover:scale-110 transition-transform">
                        <IconCode className="h-6 w-6" />
                    </div>
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-100 dark:border-blue-900/30">
                        {project.category}
                    </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-base line-clamp-3">
                    {project.description}
                </p>

                 {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                    {project.tech.slice(0, 4).map((tech) => (
                         <span key={tech} className="px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
                            {tech}
                         </span>
                    ))}
                    {project.tech.length > 4 && (
                        <span className="px-3 py-1 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
                           +{project.tech.length - 4}
                        </span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="pt-5 mt-auto flex items-center gap-5 border-t border-slate-100 dark:border-slate-700/50">
                     <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 group/btn"
                    >
                        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 dark:bg-blue-600 text-white transition-all duration-300 group-hover/btn:scale-110 shadow-lg shadow-slate-900/20 dark:shadow-blue-600/30">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                        </span>
                        <span className="font-bold text-sm text-slate-900 dark:text-white group-hover/btn:text-blue-600 dark:group-hover/btn:text-blue-400 transition-colors">
                            View Code
                        </span>
                    </a>

                    {project.liveDemoUrl && (
                        <a
                            href={project.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group/demo"
                        >
                            <IconGlobe className="h-5 w-5 group-hover/demo:rotate-12 transition-transform" />
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
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                <div className="lg:col-span-1">
                     <h2 className="sticky top-0 hidden lg:block py-4 text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">Projects</h2>
                </div>
                <div className="lg:col-span-3">
                    <SectionHeader title="Projects" />
                    
                    <div className="mb-12 space-y-8">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search by title, tag, or technology..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500 shadow-sm group-hover:shadow-md"
                                aria-label="Search for a project"
                            />
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-500 transition-colors">
                                <IconSearch className="h-6 w-6" />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeCategory === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-105'}`}
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
                         <div className="text-center py-24 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
                            <p className="font-semibold text-xl text-slate-700 dark:text-slate-300">No projects found</p>
                            <p className="mt-2 text-slate-500">Try adjusting your search or filter criteria.</p>
                            <button onClick={() => {setSearchTerm(''); setActiveCategory('All');}} className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-500 font-bold transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg">
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
