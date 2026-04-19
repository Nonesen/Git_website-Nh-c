'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system' | 'blue';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('dark'); 

    useEffect(() => {
        const savedTheme = localStorage.getItem('sonify_theme') as Theme;
        if (savedTheme) {
            setThemeState(savedTheme);
        } else {
            setThemeState('system');
        }
    }, []);

    useEffect(() => {
        const updateTheme = () => {
            const root = window.document.documentElement;
            let actualTheme = theme;
            
            if (theme === 'system') {
                const hour = new Date().getHours();
                // Day: 6 AM to 6 PM (18:00)
                actualTheme = (hour >= 6 && hour < 18) ? 'light' : 'dark';
            }

            root.setAttribute('data-theme', actualTheme);
            localStorage.setItem('sonify_theme', theme);
        };

        updateTheme();

        // If in system mode, check every minute for time-based changes
        let interval: NodeJS.Timeout;
        if (theme === 'system') {
            interval = setInterval(updateTheme, 60000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [theme]);

    const setTheme = (t: Theme) => {
        setThemeState(t);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
