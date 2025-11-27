import React from 'react';
import { PERSONAL_INFO } from '../constants';
import KeyHighlights from './KeyHighlights';
import SystemDesignGallery from './SystemDesignGallery';

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <div className="sticky top-0 z-10 py-4 bg-slate-50/75 dark:bg-slate-900/75 backdrop-blur lg:hidden">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100">{title}</h2>
    </div>
);

const About: React.FC = () => {
    return (
        <section id="about" className="scroll-mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                <div className="lg:col-span-1">
                    <h2 className="sticky top-0 hidden lg:block py-4 text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">About</h2>
                </div>
                <div className="lg:col-span-3">
                    <SectionHeader title="About" />
                    <div className="prose dark:prose-invert max-w-none">
                        <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                            {PERSONAL_INFO.summary}
                        </p>
                    </div>
                    <KeyHighlights />
                    <SystemDesignGallery />
                </div>
            </div>
        </section>
    );
};

export default About;