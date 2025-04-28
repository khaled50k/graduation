import { useState, useEffect } from 'react';

export const useTheme = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check localStorage first
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            // Check system preference if no saved theme
            if (!savedTheme) {
                return window.matchMedia('(prefers-color-scheme: dark)').matches;
            }
            return savedTheme === 'dark';
        }
        return false;
    });

    useEffect(() => {
        // Update localStorage and document class when theme changes
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            
            if (isDarkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }, [isDarkMode]);

    // Listen for system theme changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            const handleChange = (e) => {
                // Only update if there's no saved theme preference
                if (!localStorage.getItem('theme')) {
                    setIsDarkMode(e.matches);
                }
            };

            mediaQuery.addEventListener('change', handleChange);

            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, []);

    return [isDarkMode, setIsDarkMode];
};

export default useTheme; 