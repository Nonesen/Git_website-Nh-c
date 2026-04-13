'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUsers } from '@/data/constants';

interface User {
    username: string;
    name: string;
    role: 'admin' | 'user';
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const savedSession = sessionStorage.getItem('vibraze_session');
        if (savedSession) {
            setUser(JSON.parse(savedSession));
        }
    }, []);

    const login = (username: string, password: string): boolean => {
        // Simple mock login based on initialUsers
        const found = initialUsers.find(u => u.username === username && u.password === password);
        if (found) {
            const userData: User = { 
                username: found.username, 
                name: found.name, 
                role: found.role as 'admin' | 'user' 
            };
            setUser(userData);
            sessionStorage.setItem('vibraze_session', JSON.stringify(userData));
            return true;
        }
        return false;
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
