
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { IconX } from './icons/IconX';
import { IconSparkles } from './icons/IconSparkles';
import { IconSend } from './icons/IconSend';
import { IconDownload } from './icons/IconDownload';
import IconSpinner from './icons/IconSpinner';
import { ChatMessage } from '../types';
import { PERSONAL_INFO } from '../constants';
import { GENERATED_AI_CONTEXT } from '../data/aiContext';
import TypingIndicator from './TypingIndicator';
import MarkdownRenderer from './MarkdownRenderer';
import { IconMaximize } from './icons/IconMaximize';
import { IconMinimize } from './icons/IconMinimize';
import { IconRobot } from './icons/IconRobot';
import { IconSidebar } from './icons/IconSidebar';
import QuickSuggestions from './QuickSuggestions';
import ChatInfoPanel from './ChatInfoPanel';
import { useModalFocus } from '../hooks/useModalFocus';

interface AIChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  isFullScreen: boolean;
  setIsFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CHAT_HISTORY_KEY = 'ai_chat_history';

const AIChatWindow: React.FC<AIChatWindowProps> = ({ isOpen, onClose, isFullScreen, setIsFullScreen }) => {
    const modalRef = useModalFocus(isOpen, onClose);
    const [chat, setChat] = useState<Chat | null>(null);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [contextKeyword, setContextKeyword] = useState<string>(''); // For Right Panel switching
    const [showInfoPanel, setShowInfoPanel] = useState(true);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Initial greeting based on time of day
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning.";
        if (hour < 18) return "Good afternoon.";
        return "Good evening.";
    };

    const [messages, setMessages] = useState<ChatMessage[]>(() => {
        if (typeof window === 'undefined') return [];
        const savedHistoryRaw = localStorage.getItem(CHAT_HISTORY_KEY);
        if (savedHistoryRaw) {
            try {
                const parsed = JSON.parse(savedHistoryRaw);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            } catch (e) {
                console.error("Failed to parse chat history:", e);
            }
        }
        return [{ 
            sender: 'ai', 
            text: `${getGreeting()} I am Abhishek's AI Career Assistant.\n\nI can provide details on his **backend expertise**, **microservices architecture**, or **leadership at PeopleStrong**. How may I assist you?` 
        }];
    });

    const toggleFullScreen = () => setIsFullScreen(prev => !prev);

    useEffect(() => {
        const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        const systemInstruction = `You are the AI Career Assistant for Abhishek Tiwari, a Backend-leaning Full-Stack Engineer. The current date is ${today}.

**CORE PERSONA:**
- **Tone:** Formal, professional, and direct.
- **Identity:** Speak in the first person ("I") as Abhishek.
- **Style:** Concise. Avoid conversational fillers (e.g., "Thank you for asking", "Here is the information"). Provide the answer immediately.

**RESPONSE PROTOCOL:**
1.  **Technical Inquiries:** MUST use **bullet points** to structure the response.
2.  **Metrics:** Highlight key numbers using **bold text** (e.g., "**100K+ req/day**", "**35% latency reduction**").
3.  **Context:** STRICTLY rely on the "Context Document" below. If a specific skill or project is not found, state clearly that it is not in your professional history, then pivot to relevant existing skills.
4.  **Formatting:** Use Markdown.

**KNOWLEDGE BASE (Context Document):**
${GENERATED_AI_CONTEXT}`;

        const historyForGemini = messages
            .filter(msg => (messages.length > 1) || (msg.sender === 'user'))
            .map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }]
            }));
            
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const newChat = ai.chats.create({
                model: 'gemini-2.5-flash',
                history: historyForGemini,
                config: { systemInstruction },
            });
            setChat(newChat);
        } catch (e) {
            console.error("Failed to initialize AI Chat:", e);
            setError("Failed to initialize AI Chat. Please reload the page.");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Save history
    useEffect(() => {
        if (messages.length > 1) {
            localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
        }
    }, [messages]);

    // Handle Context Switching for Right Panel
    useEffect(() => {
        const lastMsg = messages[messages.length - 1];
        if (lastMsg) {
            const text = lastMsg.text.toLowerCase();
            if (text.includes('project') || text.includes('build') || text.includes('app')) {
                setContextKeyword('project');
            } else if (text.includes('skill') || text.includes('stack') || text.includes('java') || text.includes('go')) {
                setContextKeyword('skill');
            }
        }
    }, [messages]);

    // Scroll to bottom
    useLayoutEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, isLoading]);

    const handleSendMessage = async (text: string) => {
        if (!text.trim() || isLoading || !chat) return;

        const userMessage: ChatMessage = { sender: 'user', text };
        setMessages(prev => [...prev, userMessage]);
        setUserInput('');
        setIsLoading(true);
        setError(null);

        try {
            const result = await chat.sendMessage({ message: text });
            const aiMessage: ChatMessage = { sender: 'ai', text: result.text };
            setMessages(prev => [...prev, aiMessage]);
        } catch (err) {
            console.error(err);
            setError("Connection issue. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage(userInput);
    };

    const handleDownloadChat = async () => {
         if (!chatContainerRef.current || messages.length <= 1 || isDownloading) return;
    
        setIsDownloading(true);
        const chatElement = chatContainerRef.current;
        const originalStyles = {
            maxHeight: chatElement.style.maxHeight,
            overflowY: chatElement.style.overflowY,
            backgroundColor: chatElement.style.backgroundColor,
        };
        const themeBackgroundColor = window.getComputedStyle(chatElement).backgroundColor;
        chatElement.style.maxHeight = 'none';
        chatElement.style.overflowY = 'visible';
        chatElement.style.backgroundColor = themeBackgroundColor;
    
        try {
            const canvas = await html2canvas(chatElement, { scale: 2, useCORS: true, backgroundColor: themeBackgroundColor });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const ratio = canvasWidth / pdfWidth;
            const imgHeight = canvasHeight / ratio;
            let heightLeft = imgHeight;
            let position = 0;
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;
            while (heightLeft > 0) {
                position -= pdfHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
                heightLeft -= pdfHeight;
            }
            pdf.save(`AI-Chat-Abhishek-Tiwari-${new Date().toISOString().split('T')[0]}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
            setError("Could not generate PDF.");
        } finally {
            chatElement.style.maxHeight = originalStyles.maxHeight;
            chatElement.style.overflowY = originalStyles.overflowY;
            chatElement.style.backgroundColor = originalStyles.backgroundColor;
            setIsDownloading(false);
        }
    };

    // --- RENDER HELPERS ---
    const containerClasses = `
        z-50 transition-all duration-300 ease-out transform-gpu
        ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}
        ${isFullScreen ? 'fixed inset-0' : 'fixed bottom-4 sm:bottom-8 right-4 sm:right-8 w-[calc(100vw-2rem)] sm:w-full max-w-5xl'}
    `;

    // Height calculation: Full screen or fixed height
    const modalHeightClass = isFullScreen ? 'h-full rounded-none' : 'h-[85vh] sm:h-[800px] max-h-[85vh] rounded-2xl';

    return (
        <div
            ref={modalRef}
            className={containerClasses}
            role="dialog"
            aria-modal="true"
            aria-hidden={!isOpen}
            tabIndex={-1}
            outline-none
        >
            <div className={`bg-white dark:bg-slate-900 shadow-2xl flex border border-slate-200 dark:border-slate-700 relative overflow-hidden ${modalHeightClass}`}>
                
                {/* LEFT SIDE: CHAT INTERFACE */}
                <div className="flex-1 flex flex-col min-w-0">
                    
                    {/* Header */}
                    <header className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md z-10">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                                    <IconRobot className="h-6 w-6" />
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full animate-pulse"></div>
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-none">
                                    Abhishek’s AI Career Assistant
                                </h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                                    Powered by Cutting-Edge AI • Always Available
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                             <button 
                                onClick={() => setShowInfoPanel(!showInfoPanel)} 
                                className={`p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden lg:block ${showInfoPanel ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400' : ''}`}
                                title="Toggle Info Panel"
                             >
                                <IconSidebar className="h-5 w-5"/>
                             </button>
                             <button onClick={handleDownloadChat} disabled={isDownloading} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="Download PDF">
                                {isDownloading ? <IconSpinner className="h-4 w-4 animate-spin"/> : <IconDownload className="h-5 w-5"/>}
                             </button>
                             <button onClick={toggleFullScreen} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden sm:block">
                                {isFullScreen ? <IconMinimize className="h-5 w-5"/> : <IconMaximize className="h-5 w-5"/>}
                             </button>
                             <button onClick={onClose} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                <IconX className="h-6 w-6"/>
                             </button>
                        </div>
                    </header>

                    {/* Chat Area */}
                    <main ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 space-y-5 custom-scrollbar bg-slate-50/30 dark:bg-slate-900/50">
                        <div className="text-center py-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
                                <IconSparkles className="h-3 w-3" />
                                AI Persona Active
                            </div>
                            <p className="text-xs text-slate-400 dark:text-slate-500">
                                Ask about my background, skills, or specific projects.
                            </p>
                        </div>

                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''} animate-fade-in-up`}>
                                {msg.sender === 'ai' && (
                                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 text-white shadow-md mt-1">
                                        <IconRobot className="h-5 w-5"/>
                                    </div>
                                )}
                                <div className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                                    msg.sender === 'user' 
                                    ? 'bg-blue-600 text-white rounded-br-none' 
                                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-100 dark:border-slate-700'
                                }`}>
                                    {msg.sender === 'ai' 
                                        ? <MarkdownRenderer text={msg.text} /> 
                                        : <p className="whitespace-pre-wrap">{msg.text}</p>
                                    }
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-start gap-3">
                                 <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 text-white shadow-md mt-1">
                                    <IconRobot className="h-5 w-5"/>
                                </div>
                                <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-bl-none border border-slate-100 dark:border-slate-700 shadow-sm">
                                    <TypingIndicator />
                                </div>
                            </div>
                        )}
                        {error && <div className="text-red-500 text-xs text-center">{error}</div>}
                    </main>

                    {/* Input Area */}
                    <footer className="flex-shrink-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 p-2 sm:p-4 z-20">
                        <QuickSuggestions onSelect={handleSendMessage} />
                        <form onSubmit={handleFormSubmit} className="relative mt-2 flex items-center gap-2">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Type your question..."
                                className="w-full pl-4 pr-12 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                                disabled={isLoading}
                            />
                            <button 
                                type="submit" 
                                disabled={isLoading || !userInput.trim()}
                                className="absolute right-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            >
                                <IconSend className="h-5 w-5" />
                            </button>
                        </form>
                    </footer>
                </div>

                {/* RIGHT SIDE: DYNAMIC CONTEXT PANEL (Desktop Only) */}
                <div 
                    className={`hidden lg:block transition-all duration-300 ease-in-out overflow-hidden flex-shrink-0 ${
                        showInfoPanel ? 'w-[320px] xl:w-[380px] border-l border-slate-200 dark:border-slate-700 opacity-100' : 'w-0 border-none opacity-0'
                    } ${isFullScreen && showInfoPanel ? 'border-l border-slate-200 dark:border-slate-700' : ''}`}
                >
                    <ChatInfoPanel activeContext={contextKeyword} />
                </div>
            </div>
        </div>
    );
};

export default AIChatWindow;
