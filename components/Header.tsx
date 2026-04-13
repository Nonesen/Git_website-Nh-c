'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import RealTimeClock from './RealTimeClock';

interface HeaderProps {
    setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setActiveTab }) => {
    const { t, language, setLanguage } = useLanguage();
    const { user, login, logout } = useAuth();
    const { theme, setTheme } = useTheme();
    
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [settingsView, setSettingsView] = useState<'main' | 'lang' | 'theme'>('main');
    
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const h = new Date().getHours();
        let base = "";
        if (language === 'vi') {
            base = h < 12 ? "Chào buổi sáng" : h < 18 ? "Chào buổi chiều" : "Chào buổi tối";
        } else {
            base = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
        }
        setGreeting(user ? `${base} ${user.name}` : base);
    }, [language, user]);

    return (
        <header className="top-nav">
            <div className="search-bar">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder={t('search-placeholder')} />
            </div>

            <div className="header-actions">
                {!user ? (
                    <div className="header-guest">
                        <button className="btn-login-header" onClick={() => login('user', '123')}>
                            {t('header-login')}
                        </button>
                    </div>
                ) : (
                    <div className="user-row-group">
                        <span id="greeting-text">{greeting}</span>
                        <RealTimeClock />
                        
                        <div className="user-avatar-wrap" onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}>
                            <img 
                                src={`https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff`} 
                                alt="Avatar" 
                            />
                            <i className="fa-solid fa-chevron-down dropdown-arrow"></i>
                            
                            {isUserDropdownOpen && (
                                <div className="user-dropdown active">
                                    <button onClick={() => { setActiveTab('profile'); setIsUserDropdownOpen(false); }}>
                                        <i className="fa-solid fa-user"></i> <span>{t('nav-profile')}</span>
                                    </button>
                                    <button onClick={logout} style={{ color: '#ef4444' }}>
                                        <i className="fa-solid fa-right-from-bracket"></i> <span>{t('nav-logout')}</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="header-settings" onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
                            <i className="fa-solid fa-gear"></i>
                            {isSettingsOpen && (
                                <div className="settings-dropdown active" onClick={(e) => e.stopPropagation()}>
                                    {settingsView === 'main' && (
                                        <div className="settings-menu-main">
                                            <div className="settings-menu-item" onClick={() => setSettingsView('lang')}>
                                                <div className="item-left"><i className="fa-solid fa-language"></i> <span>{t('settings-lang')}</span></div>
                                                <i className="fa-solid fa-chevron-right arrow-icon"></i>
                                            </div>
                                            <div className="settings-menu-item" onClick={() => setSettingsView('theme')}>
                                                <div className="item-left"><i className="fa-solid fa-circle-half-stroke"></i> <span>{t('settings-theme')}</span></div>
                                                <i className="fa-solid fa-chevron-right arrow-icon"></i>
                                            </div>
                                            <div className="settings-menu-item">
                                                <div className="item-left"><i className="fa-regular fa-comment-dots"></i> <span>{t('settings-feedback')}</span></div>
                                            </div>
                                        </div>
                                    )}

                                    {settingsView === 'lang' && (
                                        <div className="settings-menu-lang">
                                            <div className="submenu-header" onClick={() => setSettingsView('main')}>
                                                <i className="fa-solid fa-arrow-left"></i> <span>{t('settings-back')}</span>
                                            </div>
                                            <div className={`lang-option ${language === 'vi' ? 'active' : ''}`} onClick={() => setLanguage('vi')}>
                                                Tiếng Việt {language === 'vi' && <i className="fa-solid fa-check check-icon"></i>}
                                            </div>
                                            <div className={`lang-option ${language === 'en' ? 'active' : ''}`} onClick={() => setLanguage('en')}>
                                                English {language === 'en' && <i className="fa-solid fa-check check-icon"></i>}
                                            </div>
                                        </div>
                                    )}

                                    {settingsView === 'theme' && (
                                        <div className="settings-menu-lang">
                                            <div className="submenu-header" onClick={() => setSettingsView('main')}>
                                                <i className="fa-solid fa-arrow-left"></i> <span>{t('settings-back')}</span>
                                            </div>
                                            <div className={`lang-option ${theme === 'light' ? 'active' : ''}`} onClick={() => setTheme('light')}>
                                                {t('theme-light')} {theme === 'light' && <i className="fa-solid fa-check check-icon"></i>}
                                            </div>
                                            <div className={`lang-option ${theme === 'dark' ? 'active' : ''}`} onClick={() => setTheme('dark')}>
                                                {t('theme-dark')} {theme === 'dark' && <i className="fa-solid fa-check check-icon"></i>}
                                            </div>
                                            <div className={`lang-option ${theme === 'system' ? 'active' : ''}`} onClick={() => setTheme('system')}>
                                                {t('theme-system')} {theme === 'system' && <i className="fa-solid fa-check check-icon"></i>}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
