
import React, { useState, useMemo } from 'react';
import { PROJECTS } from '../constants';
import type { Project } from '../types';
import { IconSearch } from './icons/IconSearch';
import { IconGitHub } from './icons/IconGitHub';
import { IconExternalLink } from './icons/IconExternalLink';

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <div className="sticky top-0 z-10 py-4 mb-4 bg-slate-50/75 dark:bg-slate-900/75 backdrop-blur lg:static lg:mb-0 lg:py-0 lg:bg-transparent">
        <h2 className="text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-slate-900 to-blue-600 dark:from-slate-200 dark:to-blue-500 text-transparent bg-clip-text lg:sr-only">{title}</h2>
    </div>
);

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    return (
        <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 h-full">
            {/* Image Section */}
            <div className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                 {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 z-10"></div>
                
                <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />

                {/* Floating Category Badge */}
                <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white bg-slate-900/60 backdrop-blur-md rounded-full border border-white/20 shadow-sm">
                        {project.category}
                    </span>
                </div>
            </div>
            
            {/* Content Section */}
            <div className="flex flex-col flex-1 p-6">
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
                        {project.description}
                    </p>
                </div>

                {/* Key Insights / Tags */}
                <div className="mb-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Key Features</p>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span key={tag} className="px-2 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50 rounded-md border border-slate-200 dark:border-slate-700/50">
                                {tag.replace('#', '')}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-auto space-y-5">
                    {/* Tech Stack */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                        {project.tech.slice(0, 4).map((tech) => (
                            <span key={tech} className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                                #{tech}
                            </span>
                        ))}
                        {project.tech.length > 4 && (
                            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                                +{project.tech.length - 4} more
                            </span>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-slate-900 dark:bg-slate-700 hover:bg-blue-600 dark:hover:bg-blue-600 rounded-xl transition-all duration-300 shadow-lg shadow-slate-900/10 hover:shadow-blue-600/20 transform hover:-translate-y-0.5"
                        >
                            <IconGitHub className="h-4 w-4" />
                            Source
                        </a>
                        {project.liveDemoUrl && (
                            <a
                                href={project.liveDemoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                            >
                                <IconExternalLink className="h-4 w-4" />
                                Demo
                            </a>
                        )}
                    </div>
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
                    
                    <div className="mb-10 space-y-6">
                        {/* Search Bar */}
                        <div className="relative group max-w-lg">
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500 shadow-sm text-sm"
                                aria-label="Search for a project"
                            />
                            <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-500 transition-colors">
                                <IconSearch className="h-5 w-5" />
                            </div>
                        </div>

                        {/* Filter Pills */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 border ${
                                        activeCategory === cat 
                                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-lg shadow-slate-900/20' 
                                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
                                    }`}
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
                         <div className="flex flex-col items-center justify-center py-24 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
                            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full mb-4">
                                <IconSearch className="h-8 w-8 text-slate-400" />
                            </div>
                            <p className="font-bold text-lg text-slate-700 dark:text-slate-300">No projects found</p>
                            <p className="mt-1 text-sm text-slate-500">We couldn't find any projects matching your criteria.</p>
                            <button 
                                onClick={() => {setSearchTerm(''); setActiveCategory('All');}} 
                                className="mt-6 px-6 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-500 text-sm font-bold transition-all duration-200 shadow-lg shadow-blue-500/20"
                            >
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
