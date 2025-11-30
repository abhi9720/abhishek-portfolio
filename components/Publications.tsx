
import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { Article } from '../types';
import { IconChevronLeft } from './icons/IconChevronLeft';
import { IconChevronRight } from './icons/IconChevronRight';
import PublicationSkeleton from './PublicationSkeleton';
import { PERSONAL_INFO } from '../constants';

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <div className="sticky top-0 z-10 py-4 mb-4 bg-slate-50/75 dark:bg-slate-900/75 backdrop-blur lg:static lg:mb-0 lg:py-0 lg:bg-transparent">
        <h2 className="text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-slate-900 to-blue-600 dark:from-slate-200 dark:to-blue-500 text-transparent bg-clip-text lg:sr-only">{title}</h2>
    </div>
);

const getSnippet = (html: string, maxLength: number = 100): string => {
    if (typeof document === 'undefined') {
        const text = html.replace(/<[^>]*>/g, '');
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    }
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const text = doc.body.textContent || "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
};

const extractImageFromHtml = (html: string): string | null => {
    if (typeof document === 'undefined') return null;
    try {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const img = doc.querySelector('img');
        return img ? img.getAttribute('src') : null;
    } catch (e) {
        return null;
    }
};

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
    const isMedium = article.platform === 'Medium';
    
    return (
        <a 
            href={article.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex flex-col flex-shrink-0 w-[280px] sm:w-[320px] h-[400px] rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 overflow-hidden shadow-subtle hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 snap-center"
        >
            {/* Image Section */}
            <div className="h-44 w-full overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                <img 
                    src={article.thumbnail || `https://placehold.co/600x400/e2e8f0/64748b?text=${article.platform}`} 
                    alt={article.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/600x400/e2e8f0/64748b?text=${article.platform}`;
                    }}
                />
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-1 p-5">
                {/* Platform Tag & Date */}
                <div className="flex items-center gap-3 mb-3">
                     <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                        isMedium 
                        ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900' 
                        : 'bg-transparent text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600'
                     }`}>
                        {article.platform}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {new Date(article.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 leading-tight line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {article.title}
                </h3>
                
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {article.description}
                </p>

                <div className="mt-auto flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    Read Article 
                    <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
            </div>
        </a>
    );
};

const Publications: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [filter, setFilter] = useState<'All' | 'Medium' | 'DEV.to'>('All');
    const [status, setStatus] = useState<'loading' | 'succeeded' | 'failed'>('loading');
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            setStatus('loading');
            const mediumRssUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${PERSONAL_INFO.nickname}`;
            const devToApiUrl = `https://dev.to/api/articles?username=${PERSONAL_INFO.nickname}`;

            try {
                const responses = await Promise.allSettled([
                    fetch(mediumRssUrl),
                    fetch(devToApiUrl)
                ]);

                const fetchedArticles: Article[] = [];

                // Process Medium
                const mediumResponse = responses[0];
                if (mediumResponse.status === 'fulfilled' && mediumResponse.value.ok) {
                    const mediumData = await mediumResponse.value.json();
                    if (mediumData.status === 'ok' && Array.isArray(mediumData.items)) {
                        const mediumArticles: Article[] = mediumData.items.map((item: any) => {
                            let thumbnail = item.thumbnail;
                            if (!thumbnail || thumbnail.trim() === '') {
                                thumbnail = extractImageFromHtml(item.content) || extractImageFromHtml(item.description) || '';
                            }
                            return {
                                title: item.title,
                                link: item.link,
                                pubDate: item.pubDate,
                                description: getSnippet(item.content),
                                platform: 'Medium',
                                thumbnail: thumbnail,
                            };
                        });
                        fetchedArticles.push(...mediumArticles);
                    }
                }

                // Process DEV.to
                const devToResponse = responses[1];
                if (devToResponse.status === 'fulfilled' && devToResponse.value.ok) {
                    const devToData = await devToResponse.value.json();
                    if (Array.isArray(devToData)) {
                        const devToArticles: Article[] = devToData.map((item: any) => ({
                            title: item.title,
                            link: item.url,
                            pubDate: item.published_at,
                            description: item.description,
                            platform: 'DEV.to',
                            thumbnail: item.cover_image || '',
                        }));
                        fetchedArticles.push(...devToArticles);
                    }
                }

                if (fetchedArticles.length > 0) {
                    const sortedArticles = fetchedArticles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
                    setArticles(sortedArticles);
                    setStatus('succeeded');
                } else {
                    setStatus('failed');
                }

            } catch (error) {
                console.error("Error fetching articles:", error);
                setStatus('failed');
            }
        };

        fetchArticles();
    }, []);

    const filteredArticles = useMemo(() => {
        if (filter === 'All') return articles;
        return articles.filter(article => article.platform === filter);
    }, [articles, filter]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = 340; // Card width + gap
            const targetScroll = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
            container.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="publications" className="scroll-mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                    <h2 className="sticky top-0 hidden lg:block py-4 text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-slate-900 to-blue-500 dark:from-slate-200 dark:to-blue-500 text-transparent bg-clip-text">Writing</h2>
                </div>
                <div className="lg:col-span-3">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                            <SectionHeader title="Writing" />
                            
                            {/* Filter Pills */}
                            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/60 rounded-lg">
                                {['All', 'Medium', 'DEV.to'].map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f as any)}
                                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all duration-300 ${
                                            filter === f 
                                            ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                        }`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        {/* Navigation Controls */}
                        {status === 'succeeded' && (
                            <div className="hidden sm:flex items-center gap-2">
                                <button 
                                    onClick={() => scroll('left')}
                                    className="p-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
                                    aria-label="Scroll left"
                                >
                                    <IconChevronLeft className="h-5 w-5" />
                                </button>
                                <button 
                                    onClick={() => scroll('right')}
                                    className="p-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
                                    aria-label="Scroll right"
                                >
                                    <IconChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                        )}
                    </div>

                    {status === 'loading' && <PublicationSkeleton />}
                    
                    {status === 'failed' && (
                        <div className="text-center py-12 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                            <p className="font-semibold text-lg">Unable to load articles</p>
                            <p className="mt-2 text-sm">Please check your connection or try again later.</p>
                        </div>
                    )}

                    {status === 'succeeded' && (
                        <div className="relative group/carousel">
                            {/* Horizontal Scroll Container */}
                            <div 
                                ref={scrollContainerRef}
                                className="flex gap-6 overflow-x-auto pb-8 pt-2 px-1 snap-x snap-mandatory scroll-smooth no-scrollbar"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {filteredArticles.length > 0 ? (
                                    filteredArticles.map((article, index) => (
                                        <ArticleCard key={`${article.link}-${index}`} article={article} />
                                    ))
                                ) : (
                                    <div className="w-full py-12 text-center text-slate-500 dark:text-slate-400 italic">
                                        No articles found for {filter}
                                    </div>
                                )}
                                
                                {/* End Spacer */}
                                {filteredArticles.length > 0 && <div className="w-1 flex-shrink-0"></div>}
                            </div>
                            
                            {/* Fade Gradients for visual cue */}
                            <div className="absolute top-0 bottom-8 left-0 w-8 bg-gradient-to-r from-slate-50 dark:from-slate-900 to-transparent pointer-events-none lg:hidden"></div>
                            <div className="absolute top-0 bottom-8 right-0 w-8 bg-gradient-to-l from-slate-50 dark:from-slate-900 to-transparent pointer-events-none lg:hidden"></div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Publications;
