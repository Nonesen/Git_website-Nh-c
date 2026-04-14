'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import PlayerBar from '@/components/PlayerBar';
import SongGrid from '@/components/SongGrid';
import AuthModal from '@/components/AuthModal';
import AdminPanel from '@/components/AdminPanel';
import Profile from '@/components/Profile';
import { useLanguage } from '@/context/LanguageContext';
import { usePlayer } from '@/context/PlayerContext';

import { songs, Song } from '@/data/constants';

export default function Home() {
  const { t } = useLanguage();
  const { likedSongs } = usePlayer();
  const [activeTab, setActiveTab] = useState('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [recentSongs, setRecentSongs] = useState<Song[]>([]);
  const [displaySongs, setDisplaySongs] = useState<Song[]>(songs);

  // Load recently played from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('vibraze_recent');
    if (saved) {
      const recentIds = JSON.parse(saved);
      const filtered = recentIds.map((id: number) => songs.find(s => s.id === id)).filter(Boolean);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRecentSongs(filtered);
    }
  }, [activeTab]); // Refresh when switching tabs

  // Update displayed songs based on active tab
  useEffect(() => {
    if (activeTab === 'home') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplaySongs(songs);
    } else if (activeTab === 'explore') {
      setDisplaySongs([...songs].sort(() => Math.random() - 0.5));
    } else if (activeTab === 'recent') {
      setDisplaySongs(recentSongs);
    } else if (activeTab === 'liked') {
      const filtered = likedSongs.map((id: number) => songs.find(s => s.id === id)).filter(Boolean) as Song[];
      setDisplaySongs(filtered);
    }
  }, [activeTab, recentSongs, likedSongs]);

  const isAdminTab = activeTab.startsWith('admin-');

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="content">
        <Header 
          setActiveTab={setActiveTab} 
          onLoginClick={() => setIsAuthModalOpen(true)}
        />

        {activeTab === 'home' && (
          <section className="hero-section">
            <div className="hero-content">
              <h1>{t('hero-title')}</h1>
              <p>{t('hero-subtitle')}</p>
            </div>
          </section>
        )}

        {isAdminTab ? (
          <AdminPanel view={activeTab.split('-')[1] as 'music' | 'users' | 'stats'} />
        ) : activeTab === 'profile' ? (
          <Profile />
        ) : (
          <section className="song-list-container">
            <div className="section-header">
              <h2>
                {activeTab === 'home' ? t('song-list-title') : 
                 activeTab === 'recent' ? t('nav-recent') : 
                 activeTab === 'explore' ? t('nav-explore') : 
                 activeTab === 'liked' ? t('nav-liked') : t('song-list-title')}
              </h2>
              <span>{displaySongs.length} {t('song-count')}</span>
            </div>
            
            <SongGrid songs={displaySongs} />
          </section>
        )}
      </main>

      <PlayerBar />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
}
