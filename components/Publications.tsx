
import React, { useState, useEffect, useMemo } from 'react';
import type { Article } from '../types';
import { IconMedium } from './icons/IconMedium';
import { IconDevTo } from './icons/IconDevTo';
import PublicationSkeleton from './PublicationSkeleton';
import { PERSONAL_INFO } from '../constants';
import { IconChevronDown } from './icons/IconChevronDown';

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <div className="sticky top-0 z-10 py-4 mb-4 bg-slate-50/75 dark:bg-slate-900/75 backdrop-blur lg:static lg:mb-0 lg:py-0 lg:bg-transparent">
        <h2 className="text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-slate-900 to-blue-600 dark:from-slate-200 dark:to-blue-500 text-transparent bg-clip-text lg:sr-only">{title}</h2>
    </div>
);

const getSnippet = (html: string, maxLength: number = 120): string => {
    if (typeof document === 'undefined') {
        const text = html.replace(/<[^>]*>/g, '');
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    }
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const text = doc.body.textContent || "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
};

// Helper function to extract the first image URL from HTML content
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
    return (
        <a 
            href={article.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex flex-col sm:flex-row gap-6 p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
        >
            <div className="w-full sm:w-48 md:w-64 flex-shrink-0 aspect-video sm:aspect-[4/3] overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-900 relative">
                 <img 
                    src={article.thumbnail || `https://placehold.co/600x400/e2e8f0/64748b?text=${article.platform}`} 
                    alt={article.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                        // Fallback if the extracted image URL fails to load
                        (e.target as HTMLImageElement).src = `https://placehold.co/600x400/e2e8f0/64748b?text=${article.platform}`;
                    }}
                />
            </div>
            <div className="flex flex-col justify-center flex-grow py-1">
                <div className="flex items-center gap-2 mb-3">
                    {article.platform === 'Medium' ? <IconMedium className="h-5 w-5 text-slate-500" /> : <IconDevTo className="h-5 w-5 text-slate-500" />}
                     <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{article.platform}</span>
                     <span className="text-slate-300 dark:text-slate-600">•</span>
                     <span className="text-xs text-slate-500">{new Date(article.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                    {article.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {article.description}
                </p>
                <div className="mt-auto flex items-center text-blue-600 dark:text-blue-400 font-bold group/link">
                     <span className="border-b-2 border-transparent group-hover/link:border-blue-600 dark:group-hover/link:border-blue-400 transition-colors">Read the blog</span>
                </div>
            </div>
        </a>
    );
};

const Publications: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [status, setStatus] = useState<'loading' | 'succeeded' | 'failed'>('loading');
    const [activeTab, setActiveTab] = useState('Medium');
    const [visibleCount, setVisibleCount] = useState(4);

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

                // Process Medium feed
                const mediumResponse = responses[0];
                if (mediumResponse.status === 'fulfilled' && mediumResponse.value.ok) {
                    const mediumData = await mediumResponse.value.json();
                    if (mediumData.status === 'ok' && Array.isArray(mediumData.items)) {
                        const mediumArticles: Article[] = mediumData.items.map((item: any) => {
                            // Medium often puts the main image in the content/description if thumbnail is empty
                            // The api.rss2json might put it in thumbnail, but sometimes it doesn't.
                            // We check item.thumbnail, then try to parse item.content, then item.description.
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

                // Process DEV.to feed
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
                console.error("An unexpected error occurred while fetching articles:", error);
                setStatus('failed');
            }
        };

        fetchArticles();
    }, []);

    const filteredArticles = useMemo(() => {
        return articles.filter(article => article.platform === activeTab);
    }, [articles, activeTab]);

    const tabs = ['Medium', 'DEV.to'];

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setVisibleCount(4);
    };

    return (
        <section id="publications" className="scroll-mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                    <h2 className="sticky top-0 hidden lg:block py-4 text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-slate-900 to-blue-500 dark:from-slate-200 dark:to-blue-500 text-transparent bg-clip-text">Writing</h2>
                </div>
                <div className="lg:col-span-3">
                    <SectionHeader title="Writing" />

                    <div className="mb-8">
                        <div className="bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-xl inline-flex items-center">
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => handleTabChange(tab)}
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === tab ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/5' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-700/50 hover:scale-105'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {status === 'loading' && <PublicationSkeleton />}
                    
                    {status === 'failed' && (
                        <div className="text-center py-12 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                            <p className="font-semibold text-lg">Unable to load articles</p>
                            <p className="mt-2 text-sm">Please check your connection or try again later.</p>
                        </div>
                    )}

                    {status === 'succeeded' && (
                        <div className="flex flex-col gap-6">
                            {filteredArticles.slice(0, visibleCount).map((article) => (
                                <ArticleCard key={article.link} article={article} />
                            ))}
                            
                            {filteredArticles.length === 0 && (
                                <div className="text-center py-12 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                                    <p className="font-semibold text-lg">No articles found for {activeTab}</p>
                                </div>
                            )}

                             {visibleCount < filteredArticles.length && (
                                <div className="text-center mt-4">
                                    <button 
                                        onClick={() => setVisibleCount(prev => prev + 4)}
                                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 transform hover:scale-105"
                                    >
                                        <span>Show More</span>
                                        <IconChevronDown className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Publications;
