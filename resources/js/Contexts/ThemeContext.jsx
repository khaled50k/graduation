import React, { createContext, useContext, useEffect, useState } from 'react';
import { defaultTheme, colorSchemes, fontSizes } from '@/Config/theme';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme-settings');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        return savedTheme ? JSON.parse(savedTheme) : {
            colorScheme: 'blue',
            fontSize: 'default',
            isDark: systemPrefersDark,
            radius: 'base',
            spacing: 'default',
        };
    });

    // Handle system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            if (!localStorage.getItem('theme-settings')) {
                setTheme(prev => ({ ...prev, isDark: e.matches }));
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Apply theme changes
    useEffect(() => {
        const root = document.documentElement;
        const body = document.body;

        // Add transition class before making changes
        root.classList.add('theme-transition');

        // Batch all theme updates
        const applyTheme = () => {
            // 1. Apply CSS variables first
            const colors = colorSchemes[theme.colorScheme].primary;
            const sizes = fontSizes[theme.fontSize];

            // Apply colors
            Object.entries(colors).forEach(([key, value]) => {
                root.style.setProperty(`--primary-${key}`, value);
            });

            // Apply font sizes
            Object.entries(sizes).forEach(([key, value]) => {
                root.style.setProperty(`--font-${key}`, value);
            });

            // Apply border radius
            root.style.setProperty('--radius', defaultTheme.borderRadius[theme.radius]);

            // 2. Apply dark mode classes
            if (theme.isDark) {
                root.classList.add('dark');
                body.classList.add('dark', 'bg-gray-900');
            } else {
                root.classList.remove('dark');
                body.classList.remove('dark', 'bg-gray-900');
            }
        };

        // Execute theme updates
        requestAnimationFrame(() => {
            applyTheme();
            
            // Remove transition class after changes are complete
            setTimeout(() => {
                root.classList.remove('theme-transition');
            }, 200); // Match this with CSS transition duration
        });

        // Save theme settings to localStorage
        localStorage.setItem('theme-settings', JSON.stringify(theme));
    }, [theme]);

    const updateTheme = (updates) => {
        // Batch theme updates
        setTheme(prev => ({ ...prev, ...updates }));
    };

    return (
        <ThemeContext.Provider value={{ theme, updateTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext; 