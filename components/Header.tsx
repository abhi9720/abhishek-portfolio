import React, { useState } from 'react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../constants';
import { IconMapPin } from './icons/IconMapPin';
import { IconDownload } from './icons/IconDownload';
import { IconMail } from './icons/IconMail';
import ResumeModal from './ResumeModal';
import ContactModal from './ContactModal';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
    activeSection: string | null;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    const navLinks = [
        { name: 'About', href: '#about', id: 'about' },
        { name: 'Experience', href: '#experience', id: 'experience' },
        { name: 'Projects', href: '#projects', id: 'projects' },
        { name: 'Activity', href: '#github', id: 'github' },
        { name: 'Skills', href: '#skills', id: 'skills' },
        { name: 'Writing', href: '#publications', id: 'publications' },
    ];

    return (
        <>
            <header className="py-16 md:py-24 lg:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    <div className="lg:col-span-2 flex flex-col sm:flex-row gap-10 items-start">
                        {/* Profile Image with Glow */}
                        <div className="relative group shrink-0">
                             <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition duration-1000 animate-pulse-slow"></div>
                             <img 
                                src={PERSONAL_INFO.photoUrl} 
                                alt="Abhishek Tiwari"
                                className="relative rounded-full w-32 h-32 md:w-40 md:h-40 object-cover border-4 border-slate-100 dark:border-slate-800 shadow-2xl z-10"
                            />
                        </div>

                        <div className="flex flex-col space-y-5">
                            <div>
                                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                                    {PERSONAL_INFO.name}
                                </h1>
                                <h2 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mt-2">
                                    {PERSONAL_INFO.title}
                                </h2>
                                <p className="mt-3 text-lg text-slate-600 dark:text-slate-400 font-medium max-w-2xl leading-relaxed">
                                    Specializing in <span className="text-blue-600 dark:text-blue-400">high-load microservices</span>, real-time pipelines, and <span className="text-blue-600 dark:text-blue-400">LLM-powered</span> backend systems.
                                </p>
                            </div>

                            <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-500 text-sm font-medium uppercase tracking-wide">
                                <IconMapPin className="h-4 w-4" />
                                <span>{PERSONAL_INFO.location}</span>
                            </div>

                            <div className="flex items-center flex-wrap gap-4 pt-2">
                                <button
                                    onClick={() => setIsContactModalOpen(true)}
                                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-blue-600 rounded-full hover:bg-blue-500 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transform hover:-translate-y-1"
                                    aria-label="Contact Me"
                                >
                                    <IconMail className="h-4 w-4" />
                                    <span>Contact Me</span>
                                </button>
                                <button
                                    onClick={() => setIsResumeModalOpen(true)}
                                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-full hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
                                    aria-label="Download Resume"
                                >
                                    <IconDownload className="h-4 w-4" />
                                    <span>Resume</span>
                                </button>
                                
                                <div className="h-8 w-px bg-slate-300 dark:bg-slate-700 mx-2 hidden sm:block"></div>

                                <div className="flex items-center gap-4">
                                     {SOCIAL_LINKS.filter(l => ['GitHub', 'LinkedIn', 'Email'].includes(l.name)).map((link) => (
                                        <a
                                            key={link.name}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={link.name}
                                            className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110"
                                        >
                                            {link.icon}
                                        </a>
                                    ))}
                                    <ThemeToggle />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Navigation */}
                    <nav className="hidden lg:flex justify-end pt-12">
                        <ul className="space-y-1">
                            {navLinks.map((link) => {
                                const isActive = activeSection === link.id;
                                return (
                                    <li key={link.name}>
                                        <a 
                                            href={link.href} 
                                            className={`group flex items-center py-2 transition-all duration-300 ${isActive ? 'translate-x-[-10px]' : 'hover:translate-x-[-5px]'}`}
                                        >
                                            <span className={`mr-4 text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-200'}`}>
                                                {link.name}
                                            </span>
                                            <span className={`h-px transition-all duration-300 ${isActive ? 'w-16 bg-blue-600 dark:bg-blue-400' : 'w-8 bg-slate-300 dark:bg-slate-700 group-hover:w-16 group-hover:bg-slate-900 dark:group-hover:bg-slate-200'}`}></span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </header>
            <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
            <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
        </>
    );
};

export default Header;