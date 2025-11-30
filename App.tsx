import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Publications from './components/Publications';
import Footer from './components/Footer';
import AnimatedSection from './components/AnimatedSection';
import { useScrollSpy } from './hooks/useScrollSpy';
import GitHubActivity from './components/GitHubActivity';
import { useTheme } from './contexts/ThemeContext';
import AIAssistantButton from './components/AIAssistantButton';
import AIChatModal from './components/AIChatModal';

const App: React.FC = () => {
  const [coords, setCoords] = useState({ x: -1000, y: -1000 });
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleWindowMouseMove = (event: MouseEvent) => {
      setCoords({
        x: event.clientX,
        y: event.clientY,
      });
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, []);

  const sectionIds = ['about', 'experience', 'skills', 'projects', 'github', 'publications'];
  const activeSection = useScrollSpy(sectionIds);

  const toggleAIChat = useCallback(() => {
    setIsAIChatOpen(prevIsOpen => {
        if (prevIsOpen) {
            setIsFullScreen(false); // Always exit fullscreen when closing
        }
        return !prevIsOpen;
    });
  }, []);

  const closeAIChat = useCallback(() => {
      setIsAIChatOpen(false);
      setIsFullScreen(false);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 dark:bg-slate-900 dark:text-slate-300 transition-colors duration-300 selection:bg-blue-200 dark:selection:bg-blue-900">
       <div 
        className="pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute"
        style={{
          background: `radial-gradient(600px at ${coords.x}px ${coords.y}px, ${theme === 'dark' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.1)'}, transparent 80%)`
        }}
      ></div>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header activeSection={activeSection} />
        {/* Increased spacing to space-y-32 for better hierarchy */}
        <main className="space-y-32 pb-32">
          <AnimatedSection><About /></AnimatedSection>
          <AnimatedSection><Experience /></AnimatedSection>
          <AnimatedSection><Skills /></AnimatedSection>
          <AnimatedSection><Projects /></AnimatedSection>
          <AnimatedSection><GitHubActivity /></AnimatedSection>
          <AnimatedSection><Publications /></AnimatedSection>
        </main>
        <Footer />
      </div>

      {!isFullScreen && (
        <AIAssistantButton 
          onClick={toggleAIChat}
          isOpen={isAIChatOpen}
        />
      )}
      
      <AIChatModal 
        isOpen={isAIChatOpen} 
        onClose={closeAIChat}
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
      />
    </div>
  );
};

export default App;