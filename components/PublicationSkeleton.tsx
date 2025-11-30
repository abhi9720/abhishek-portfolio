
import React from 'react';

const SkeletonCard: React.FC = () => (
    <div className="flex flex-col flex-shrink-0 w-[280px] sm:w-[320px] h-[380px] rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 animate-pulse">
        <div className="h-44 w-full bg-slate-200 dark:bg-slate-700 rounded-t-2xl"></div>
        <div className="flex-1 p-5 space-y-4">
             <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
             <div className="space-y-2">
                <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
             </div>
             <div className="space-y-2 mt-2">
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
             </div>
             <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-20 mt-auto"></div>
        </div>
    </div>
);

const PublicationSkeleton: React.FC = () => {
    return (
        <div className="flex gap-6 overflow-hidden pb-8 px-1">
            {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
    );
};

export default PublicationSkeleton;
