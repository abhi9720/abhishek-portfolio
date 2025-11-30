
import { useEffect, useRef } from 'react';

export const useModalFocus = (isOpen: boolean, onClose: () => void) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastActiveElement = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            // Store the element that had focus before opening the modal
            lastActiveElement.current = document.activeElement as HTMLElement;

            const container = containerRef.current;
            if (container) {
                // Focus the container or the first focusable element inside it
                const focusableElements = container.querySelectorAll<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                
                if (focusableElements.length > 0) {
                    focusableElements[0].focus();
                } else {
                    container.focus();
                }
            }

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    onClose();
                    return;
                }

                if (e.key === 'Tab') {
                    if (!containerRef.current) return;

                    const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );

                    if (focusableElements.length === 0) return;

                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];

                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                }
            };

            document.addEventListener('keydown', handleKeyDown);

            return () => {
                document.removeEventListener('keydown', handleKeyDown);
                // Restore focus to the element that triggered the modal
                if (lastActiveElement.current) {
                    lastActiveElement.current.focus();
                }
            };
        }
    }, [isOpen, onClose]);

    return containerRef;
};
