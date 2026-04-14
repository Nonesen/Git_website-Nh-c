'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
    const { t } = useLanguage();
    const { user } = useAuth();

    const isAdmin = user?.role === 'admin';

    const navItems = [
        { id: 'home', icon: 'fa-house', label: 'nav-home', userOnly: false, adminOnly: false },
        { id: 'recent', icon: 'fa-clock-rotate-left', label: 'nav-recent', userOnly: true, adminOnly: false },
        { id: 'explore', icon: 'fa-compass', label: 'nav-explore', userOnly: true, adminOnly: false },
        { id: 'library', icon: 'fa-music', label: 'nav-library', userOnly: true, adminOnly: false },
        { id: 'admin-manage', icon: 'fa-list-check', label: 'Quản lý nhạc', userOnly: false, adminOnly: true },
        { id: 'admin-users', icon: 'fa-users', label: 'Quản lý User', userOnly: false, adminOnly: true },
        { id: 'admin-stats', icon: 'fa-chart-line', label: 'Thống kê', userOnly: false, adminOnly: true },
    ];

    return (
        <aside className="sidebar">
            <div className="logo" onClick={() => onTabChange('home')} style={{ cursor: 'pointer' }}>
                <i className="fa-solid fa-bolt-lightning"></i>
                <span>Vibraze</span>
            </div>
            
            <nav className="nav-menu">
                <ul>
                    {navItems.map(item => {
                        if (item.adminOnly && !isAdmin) return null;
                        // Always show for guests now
                        return (
                            <li 
                                key={item.id}
                                className={activeTab === item.id ? 'active' : ''}
                                onClick={() => onTabChange(item.id)}
                            >
                                <i className={`fa-solid ${item.icon}`}></i>
                                <span>{item.label.startsWith('nav-') ? t(item.label) : item.label}</span>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {!isAdmin && (
                <div className="playlists">
                    <h3>{t('playlist-title')}</h3>
                    <ul>
                        <li 
                            className={activeTab === 'liked' ? 'active' : ''}
                            onClick={() => onTabChange('liked')}
                        >
                            <i className="fa-solid fa-heart"></i>
                            <span>{t('nav-liked')}</span>
                        </li>
                        <li><i className="fa-solid fa-list-ul"></i> Nhạc Chill</li>
                        <li><i className="fa-solid fa-list-ul"></i> Gaming Mix</li>
                    </ul>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
