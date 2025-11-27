import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IconCloud } from './icons/IconCloud';
import { IconTrophy } from './icons/IconTrophy';
import { IconBrain } from './icons/IconBrain';
import { IconMaximize } from './icons/IconMaximize';
import { IconX } from './icons/IconX';

// --- SVG Architecture Diagrams ---

const AsyncQueueDiagram: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 800 400" className={`w-full h-full bg-slate-50 dark:bg-slate-900 ${className}`} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="grid-async" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-200 dark:text-slate-800" />
            </pattern>
            <marker id="arrowhead-async" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" className="fill-slate-400" />
            </marker>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-async)" />

        {/* API Gateway */}
        <g transform="translate(50, 150)">
            <rect width="100" height="100" rx="8" className="fill-white dark:fill-slate-800 stroke-blue-500 stroke-2" />
            <text x="50" y="55" textAnchor="middle" className="text-sm font-bold fill-slate-700 dark:fill-slate-200">API</text>
            <text x="50" y="75" textAnchor="middle" className="text-xs fill-slate-500">Producer</text>
        </g>

        {/* Arrow to Redis */}
        <line x1="150" y1="200" x2="240" y2="200" className="stroke-slate-400 stroke-2" markerEnd="url(#arrowhead-async)" strokeDasharray="5,5" />

        {/* Redis Streams (Queue) */}
        <g transform="translate(250, 150)">
            <rect width="120" height="100" rx="8" className="fill-red-50 dark:fill-red-900/20 stroke-red-500 stroke-2" />
            <text x="60" y="45" textAnchor="middle" className="text-sm font-bold fill-slate-700 dark:fill-slate-200">Redis</text>
            <text x="60" y="65" textAnchor="middle" className="text-xs fill-slate-500">Stream / Queue</text>
            {/* Queue items */}
            <rect x="20" y="75" width="15" height="10" className="fill-red-400" />
            <rect x="40" y="75" width="15" height="10" className="fill-red-400" />
            <rect x="60" y="75" width="15" height="10" className="fill-red-400" />
        </g>

        {/* Arrow to Workers */}
        <line x1="370" y1="200" x2="460" y2="200" className="stroke-slate-400 stroke-2" markerEnd="url(#arrowhead-async)" />

        {/* Worker Pool */}
        <g transform="translate(470, 130)">
            <rect width="140" height="140" rx="8" className="fill-white dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-600 stroke-2 stroke-dasharray-4" />
            <text x="70" y="25" textAnchor="middle" className="text-xs font-bold fill-slate-500 uppercase tracking-widest">Worker Pool</text>
            
            {/* Individual Workers */}
            <rect x="20" y="40" width="100" height="30" rx="4" className="fill-blue-50 dark:fill-blue-900/20 stroke-blue-400" />
            <text x="70" y="60" textAnchor="middle" className="text-xs fill-slate-600 dark:fill-slate-300">Worker 1</text>
            
            <rect x="20" y="80" width="100" height="30" rx="4" className="fill-blue-50 dark:fill-blue-900/20 stroke-blue-400" />
            <text x="70" y="100" textAnchor="middle" className="text-xs fill-slate-600 dark:fill-slate-300">Worker 2</text>
        </g>

        {/* Arrow to DB */}
        <line x1="610" y1="200" x2="680" y2="200" className="stroke-slate-400 stroke-2" markerEnd="url(#arrowhead-async)" />

        {/* Database */}
        <g transform="translate(690, 140)">
            <path d="M0 20 C0 10 25 0 50 0 C75 0 100 10 100 20 V 100 C100 110 75 120 50 120 C25 120 0 110 0 100 Z" className="fill-white dark:fill-slate-800 stroke-green-500 stroke-2" />
            <path d="M0 20 C0 30 25 40 50 40 C75 40 100 30 100 20" className="fill-none stroke-green-500 stroke-2" />
            <text x="50" y="70" textAnchor="middle" className="text-sm font-bold fill-slate-700 dark:fill-slate-200">Postgres</text>
             <text x="50" y="90" textAnchor="middle" className="text-xs fill-slate-500">Persistent Storage</text>
        </g>
    </svg>
);

const GamificationDiagram: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 800 400" className={`w-full h-full bg-slate-50 dark:bg-slate-900 ${className}`} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="grid-game" width="20" height="20" patternUnits="userSpaceOnUse">
                 <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-200 dark:text-slate-800" />
            </pattern>
             <marker id="arrowhead-game" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" className="fill-slate-400" />
            </marker>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-game)" />

        {/* Clients */}
        <g transform="translate(30, 100)">
             <circle cx="30" cy="30" r="20" className="fill-slate-200 dark:fill-slate-700" />
             <circle cx="30" cy="90" r="20" className="fill-slate-200 dark:fill-slate-700" />
             <circle cx="30" cy="150" r="20" className="fill-slate-200 dark:fill-slate-700" />
             <text x="30" y="200" textAnchor="middle" className="text-xs font-bold fill-slate-500">Users</text>
        </g>

        {/* Arrow */}
        <path d="M 80 140 L 150 140" className="stroke-blue-500 stroke-2 stroke-dasharray-5,5" markerEnd="url(#arrowhead-game)">
             <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
        </path>

        {/* WebSocket Gateway */}
        <g transform="translate(160, 80)">
             <rect width="100" height="180" rx="8" className="fill-white dark:fill-slate-800 stroke-purple-500 stroke-2" />
             <text x="50" y="90" textAnchor="middle" className="text-sm font-bold fill-slate-700 dark:fill-slate-200">WS Gateway</text>
             <text x="50" y="110" textAnchor="middle" className="text-xs fill-slate-500">Go + Fiber</text>
        </g>

         {/* Arrow */}
         <line x1="260" y1="170" x2="330" y2="170" className="stroke-slate-400 stroke-2" markerEnd="url(#arrowhead-game)" />

         {/* Kafka */}
         <g transform="translate(340, 110)">
             <rect width="120" height="120" rx="4" className="fill-slate-800 dark:fill-black stroke-slate-600 stroke-2" />
             <line x1="20" y1="0" x2="20" y2="120" className="stroke-slate-600" />
             <line x1="60" y1="0" x2="60" y2="120" className="stroke-slate-600" />
             <line x1="100" y1="0" x2="100" y2="120" className="stroke-slate-600" />
             <text x="60" y="65" textAnchor="middle" className="text-sm font-bold fill-white">Kafka</text>
         </g>

         {/* Arrow */}
         <line x1="460" y1="170" x2="530" y2="170" className="stroke-slate-400 stroke-2" markerEnd="url(#arrowhead-game)" />

         {/* Processor */}
         <g transform="translate(540, 120)">
            <rect width="100" height="100" rx="100" className="fill-green-50 dark:fill-green-900/20 stroke-green-500 stroke-2" />
             <text x="50" y="50" textAnchor="middle" className="text-sm font-bold fill-slate-700 dark:fill-slate-200">Engine</text>
             <text x="50" y="70" textAnchor="middle" className="text-xs fill-slate-500">Aggregator</text>
         </g>
         
         {/* DBs */}
         <g transform="translate(680, 80)">
            <rect width="80" height="60" rx="4" className="fill-red-50 stroke-red-500 stroke-1" />
            <text x="40" y="35" textAnchor="middle" className="text-xs fill-red-800">Redis (Leaderboard)</text>
         </g>
         <g transform="translate(680, 180)">
            <path d="M0 10 C0 5 40 0 40 0 C40 0 80 5 80 10 V 50 C80 55 40 60 40 60 C40 60 0 55 0 50 Z" className="fill-blue-50 stroke-blue-500 stroke-1" />
            <text x="40" y="35" textAnchor="middle" className="text-xs fill-blue-800">Postgres</text>
         </g>
    </svg>
);

const RAGDiagram: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 800 400" className={`w-full h-full bg-slate-50 dark:bg-slate-900 ${className}`} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="grid-rag" width="20" height="20" patternUnits="userSpaceOnUse">
                 <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-200 dark:text-slate-800" />
            </pattern>
             <marker id="arrowhead-rag" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" className="fill-slate-400" />
            </marker>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-rag)" />

        {/* User Query */}
        <g transform="translate(50, 160)">
             <rect width="120" height="60" rx="20" className="fill-white dark:fill-slate-800 stroke-slate-400 stroke-2" />
             <text x="60" y="35" textAnchor="middle" className="text-sm font-bold fill-slate-700 dark:fill-slate-200">User Query</text>
        </g>

        {/* Arrow */}
        <line x1="170" y1="190" x2="230" y2="190" className="stroke-slate-400 stroke-2" markerEnd="url(#arrowhead-rag)" />

        {/* Embedding Model */}
        <g transform="translate(230, 150)">
             <rect width="80" height="80" rx="8" className="fill-yellow-50 dark:fill-yellow-900/20 stroke-yellow-500 stroke-2" />
             <text x="40" y="45" textAnchor="middle" className="text-xs font-bold fill-slate-700 dark:fill-slate-200">Embed</text>
        </g>

        {/* Arrow */}
        <line x1="310" y1="190" x2="370" y2="190" className="stroke-slate-400 stroke-2" markerEnd="url(#arrowhead-rag)" />

        {/* Vector DB */}
        <g transform="translate(370, 140)">
             <rect width="100" height="100" rx="4" className="fill-indigo-50 dark:fill-indigo-900/20 stroke-indigo-500 stroke-2" />
             {/* Cubes */}
             <rect x="25" y="25" width="20" height="20" className="fill-indigo-300" />
             <rect x="55" y="25" width="20" height="20" className="fill-indigo-300" />
             <rect x="25" y="55" width="20" height="20" className="fill-indigo-300" />
             <rect x="55" y="55" width="20" height="20" className="fill-indigo-300" />
             <text x="50" y="125" textAnchor="middle" className="text-xs font-bold fill-indigo-500">Pinecone</text>
        </g>

        {/* Arrow (Context) */}
        <line x1="470" y1="190" x2="550" y2="190" className="stroke-slate-400 stroke-2" markerEnd="url(#arrowhead-rag)" />
        <text x="510" y="180" textAnchor="middle" className="text-[10px] fill-slate-400">Context</text>

        {/* LLM */}
        <g transform="translate(550, 130)">
             <path d="M20 40 Q 60 10, 100 40 T 180 40 V 100 H 20 Z" className="fill-blue-50 dark:fill-blue-900/20 stroke-blue-500 stroke-2" />
             <text x="100" y="80" textAnchor="middle" className="text-lg font-bold fill-slate-700 dark:fill-slate-200">LLM</text>
             <text x="100" y="100" textAnchor="middle" className="text-xs fill-slate-500">GPT-4</text>
        </g>
    </svg>
);


interface DesignItem {
    id: string;
    title: string;
    category: string;
    description: string;
    tech: string[];
    Thumbnail: React.FC<{ className?: string }>;
    icon: React.FC<{ className?: string }>;
}

const SYSTEM_DESIGNS: DesignItem[] = [
    {
        id: 'async-queue',
        category: 'Pipelines & Distributed Systems',
        title: 'Async Task Queue Architecture',
        tech: ['Go', 'Redis Streams', 'Asynq', 'DLQ', 'Prometheus'],
        description: 'Distributed task runner with retry logic, dead-letter queues, and real-time observability metrics.',
        Thumbnail: AsyncQueueDiagram,
        icon: IconCloud,
    },
    {
        id: 'gamification',
        category: 'Pipelines & Distributed Systems',
        title: 'Real-Time Gamification Pipeline',
        tech: ['Kafka', 'WebSockets', 'Redis', 'Go', 'Postgres'],
        description: 'High-throughput event ingestion pipeline handling 50K+ concurrent users with sub-millisecond latency.',
        Thumbnail: GamificationDiagram,
        icon: IconTrophy,
    },
    {
        id: 'rag-system',
        category: 'AI / LLM Systems',
        title: 'RAG Architecture',
        tech: ['LangChain', 'OpenAI', 'Pinecone', 'Python', 'FastAPI'],
        description: 'Context-aware retrieval system with semantic search, embedding generation, and multi-turn memory.',
        Thumbnail: RAGDiagram,
        icon: IconBrain,
    }
];

const SystemDesignGallery: React.FC = () => {
    const [selectedDesign, setSelectedDesign] = useState<DesignItem | null>(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedDesign) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedDesign]);

    return (
        <div className="mt-24 pt-10 border-t border-slate-200 dark:border-slate-800">
             <div className="flex items-center gap-3 mb-10">
                <div className="h-8 w-1 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest">
                    System Architecture Snapshots
                </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {SYSTEM_DESIGNS.map((design, index) => (
                    <div 
                        key={design.id} 
                        className="group relative flex flex-col bg-white dark:bg-slate-800 rounded-[1.5rem] overflow-hidden border border-slate-200 dark:border-slate-700/60 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer animate-fade-in-up"
                        style={{ animationDelay: `${index * 150}ms` }}
                        onClick={() => setSelectedDesign(design)}
                    >
                        {/* Decorative Side Accent */}
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 to-indigo-600 z-20"></div>

                        {/* Top Image Section (Now using SVG Thumbnail) */}
                        <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700/50">
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-blue-600/10 transition-colors duration-300 z-10" />
                            
                            <div className="w-full h-full transform transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1">
                                <design.Thumbnail />
                            </div>
                            
                            {/* Floating Icon */}
                            <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 p-2.5 rounded-xl backdrop-blur-md shadow-lg z-20 border border-slate-200 dark:border-slate-700 group-hover:scale-110 transition-transform duration-300">
                                {React.createElement(design.icon, { className: "h-5 w-5 text-blue-600 dark:text-blue-400" })}
                            </div>
                        </div>
                        
                        {/* Content Section */}
                        <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900/30">
                             {/* Category Label */}
                             <div className="mb-3">
                                <span className="inline-block px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30">
                                    {design.category}
                                </span>
                            </div>

                            <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {design.title}
                            </h4>
                            
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5 line-clamp-3">
                                {design.description}
                            </p>

                            {/* Tech Stack Pills */}
                            <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                                {design.tech.slice(0, 4).map(t => (
                                    <span key={t} className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 rounded-md border border-slate-200 dark:border-slate-600/50">
                                        {t}
                                    </span>
                                ))}
                                {design.tech.length > 4 && (
                                     <span className="px-2.5 py-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
                                        +{design.tech.length - 4}
                                    </span>
                                )}
                            </div>
                            
                            {/* Action Footer */}
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Architecture</span>
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform duration-300">
                                    <span>View Diagram</span>
                                    <IconMaximize className="h-3.5 w-3.5" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal (Portal) */}
            {selectedDesign && createPortal(
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/95 backdrop-blur-md p-4 animate-fade-in-up"
                    onClick={() => setSelectedDesign(null)}
                >
                    <button 
                        className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white transition-colors bg-slate-800/50 rounded-full hover:bg-slate-700 z-[110]"
                        onClick={(e) => { e.stopPropagation(); setSelectedDesign(null); }}
                    >
                        <IconX className="h-8 w-8" />
                    </button>
                    
                    <div 
                        className="max-w-6xl w-full max-h-[90vh] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900">
                            <div>
                                <div className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-1">{selectedDesign.category}</div>
                                <h3 className="text-2xl font-bold text-white">{selectedDesign.title}</h3>
                            </div>
                            <div className="hidden sm:flex gap-2">
                                 {selectedDesign.tech.map(t => (
                                    <span key={t} className="px-3 py-1 text-xs font-semibold text-blue-200 bg-blue-900/30 rounded-full border border-blue-800">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex-grow overflow-auto bg-slate-950 flex items-center justify-center p-8 relative">
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20"></div>
                            
                            {/* Render SVG Component in Full Screen Mode */}
                            <div className="w-full max-w-4xl aspect-video bg-slate-100 dark:bg-slate-900 rounded-lg shadow-2xl overflow-hidden border border-slate-800">
                                <selectedDesign.Thumbnail />
                            </div>

                        </div>
                        <div className="p-6 bg-slate-900 border-t border-slate-800 text-slate-300 text-sm leading-relaxed">
                            <strong className="text-white block mb-1">Description:</strong>
                            {selectedDesign.description}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default SystemDesignGallery;
