'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    username: string;
    name: string;
    role: 'admin' | 'user';
    likedSongs?: string[];
    playlists?: { id: string; name: string; songIds: (number | string)[] }[];
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const savedSession = sessionStorage.getItem('vibraze_session');
        if (savedSession) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUser(JSON.parse(savedSession));
        }
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (data.success) {
                const userData: User = data.user;
                setUser(userData);
                sessionStorage.setItem('vibraze_session', JSON.stringify(userData));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('vibraze_session');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
