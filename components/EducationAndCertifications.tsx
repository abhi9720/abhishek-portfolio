
import React from 'react';
import { EDUCATION, CERTIFICATIONS } from '../constants';
import { IconExternalLink } from './icons/IconExternalLink';

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <div className="sticky top-0 z-10 py-4 mb-4 bg-slate-50/75 dark:bg-slate-900/75 backdrop-blur lg:static lg:mb-0 lg:py-0 lg:bg-transparent">
        <h2 className="text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-slate-900 to-blue-600 dark:from-slate-200 dark:to-blue-500 text-transparent bg-clip-text lg:sr-only">{title}</h2>
    </div>
);

const EducationCard: React.FC = () => (
    <div className="group relative">
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

const CertificationItem: React.FC<{ cert: typeof CERTIFICATIONS[0] }> = ({ cert }) => (
    <a 
        href={cert.link}
        target="_blank" 
        rel="noopener noreferrer"
        className="group flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 hover:border-blue-200 dark:hover:border-blue-800 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all duration-300 hover:-translate-y-1"
    >
        <div className="h-12 w-12 shrink-0 rounded-lg bg-white p-2 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
            <img src={cert.logo} alt={cert.issuer} className="w-full h-full object-contain" />
        </div>
        <div className="flex-1 min-w-0">
            <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors pr-6">
                {cert.name}
            </h4>
            <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-slate-600 dark:text-slate-400">{cert.issuer}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                <span className="text-xs text-slate-500 dark:text-slate-500">{cert.date}</span>
            </div>
            {cert.credentialId && (
                <div className="mt-2 text-xs font-mono text-slate-500 dark:text-slate-500 truncate">
                    ID: {cert.credentialId}
                </div>
            )}
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500">
            <IconExternalLink className="h-4 w-4" />
        </div>
    </a>
);

const EducationAndCertifications: React.FC = () => {
    return (
        <section id="education" className="scroll-mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                <div className="lg:col-span-1">
                     <h2 className="sticky top-0 hidden lg:block py-4 text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">Education & Certs</h2>
                </div>
                <div className="lg:col-span-3">
                    <SectionHeader title="Education & Certifications" />
                    
                    <div className="mb-12">
                         <h3 className="flex items-center text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">
                            <span className="w-8 h-[2px] bg-blue-500 mr-3 rounded-full"></span>
                            Academic Background
                        </h3>
                        <EducationCard />
                    </div>

                    <div>
                        <h3 className="flex items-center text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">
                            <span className="w-8 h-[2px] bg-blue-500 mr-3 rounded-full"></span>
                            Licenses & Certifications
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {CERTIFICATIONS.map((cert, index) => (
                                <CertificationItem key={index} cert={cert} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EducationAndCertifications;
