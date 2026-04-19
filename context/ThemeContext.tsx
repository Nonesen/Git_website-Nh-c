'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('dark'); // Default to dark as per original design

    useEffect(() => {
        const savedTheme = localStorage.getItem('sonify_theme') as Theme;
        if (savedTheme) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setThemeState(savedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            setThemeState('system');
        }
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        let actualTheme = theme;
        
        if (theme === 'system') {
            actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        root.setAttribute('data-theme', actualTheme);
        localStorage.setItem('sonify_theme', theme);
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
