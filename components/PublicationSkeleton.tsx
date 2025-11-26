import React from 'react';

const SkeletonCard: React.FC = () => (
    <div className="flex flex-col sm:flex-row gap-6 p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 animate-pulse">
        <div className="w-full sm:w-48 md:w-64 aspect-video sm:aspect-[4/3] bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
        <div className="flex-1 flex flex-col justify-center space-y-4 py-1">
            <div className="flex items-center gap-2">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-20"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
            </div>
            <div className="space-y-2">
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
            </div>
            <div className="space-y-2">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
            </div>
             <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32 mt-auto"></div>
        </div>
    </div>
);

const PublicationSkeleton: React.FC = () => {
    return (
        <div className="flex flex-col gap-6">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
    );
};

export default PublicationSkeleton;