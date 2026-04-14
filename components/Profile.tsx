'use client';

import React, { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { usePlayer } from '@/context/PlayerContext';
import { songs } from '@/data/constants';

const Profile: React.FC = () => {
    const { user } = useAuth();
    const { likedSongs, playlists, createPlaylist, playSong, deletePlaylist } = usePlayer();
    
    const [activeTab, setActiveTab] = useState('All');
    const [isEditingName, setIsEditingName] = useState(false);
    const [userName, setUserName] = useState(user?.name || 'Người dùng');
    const [avatar, setAvatar] = useState(`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=6366f1&color=fff&size=200`);
    const [cover, setCover] = useState('https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070');
    
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const coverInputRef = useRef<HTMLInputElement>(null);

    if (!user) return <div className="empty-state">Vui lòng đăng nhập</div>;

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => setAvatar(event.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => setCover(event.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    const likedList = songs.filter(s => likedSongs.includes(s.id));

    const renderContent = () => {
        if (activeTab === 'All' || activeTab === 'Tracks') {
            if (likedList.length === 0) {
                return (
                    <div className="empty-state">
                        <i className="fa-solid fa-music"></i>
                        <p>Bạn chưa thích bài hát nào.</p>
                    </div>
                );
            }
            return (
                <div className="song-grid-mini">
                    {likedList.map(song => (
                        <div key={song.id} className="song-card-mini" onClick={() => playSong(song)}>
                            <img src={song.cover} alt={song.title} />
                            <div className="song-details">
                                <h4>{song.title}</h4>
                                <p>{song.artist}</p>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        if (activeTab === 'Albums' || activeTab === 'Popular tracks') {
            return (
                <div className="albums-container">
                    <div className="albums-header">
                        <h3>Bộ sưu tập của bạn</h3>
                        <button className="btn-primary-sm" onClick={() => {
                            const name = prompt('Nhập tên Album mới:');
                            if (name) createPlaylist(name);
                        }}>
                            <i className="fa-solid fa-plus"></i> Tạo Album mới
                        </button>
                    </div>
                    {playlists.length === 0 ? (
                        <div className="empty-state">
                            <i className="fa-solid fa-folder-open"></i>
                            <p>Bạn chưa tạo album nào.</p>
                        </div>
                    ) : (
                        <div className="playlist-grid">
                            {playlists.map(p => (
                                <div key={p.id} className="playlist-item">
                                    <div className="playlist-cover">
                                        <i className="fa-solid fa-compact-disc"></i>
                                    </div>
                                    <div className="playlist-info">
                                        <h4>{p.name}</h4>
                                        <p>{p.songIds.length} bài hát</p>
                                    </div>
                                    <button className="delete-btn" onClick={(e) => {
                                        e.stopPropagation();
                                        if (confirm('Xóa album này?')) deletePlaylist(p.id);
                                    }}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }
    };

    return (
        <section id="profile-section" className="profile-section">
            <div className="profile-header" style={{ backgroundImage: `url(${cover})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="profile-cover-overlay"></div>
                <button className="edit-cover-btn" onClick={() => coverInputRef.current?.click()}>
                    <i className="fa-solid fa-camera"></i> Đổi ảnh bìa
                </button>
                <input type="file" ref={coverInputRef} hidden accept="image/*" onChange={handleCoverChange} />
                
                <div className="profile-info-main">
                    <div className="profile-avatar-container" onClick={() => avatarInputRef.current?.click()}>
                        <img src={avatar} alt="Avatar" />
                        <div className="upload-overlay">
                            <i className="fa-solid fa-camera"></i>
                        </div>
                        <input type="file" ref={avatarInputRef} hidden accept="image/*" onChange={handleAvatarChange} />
                    </div>
                    <div className="profile-text">
                        <div className="profile-name-edit">
                            {isEditingName ? (
                                <input 
                                    type="text" 
                                    value={userName} 
                                    autoFocus
                                    onChange={(e) => setUserName(e.target.value)}
                                    onBlur={() => setIsEditingName(false)}
                                    onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                                />
                            ) : (
                                <h1 onClick={() => setIsEditingName(true)}>
                                    {userName} <i className="fa-solid fa-pen-to-square edit-icon"></i>
                                </h1>
                            )}
                        </div>
                        <p>@{user.username}</p>
                    </div>
                </div>
            </div>
            
            <nav className="profile-tabs">
                <ul>
                    {['All', 'Popular tracks', 'Tracks', 'Albums'].map(tab => (
                        <li 
                            key={tab} 
                            className={activeTab === tab ? 'active' : ''} 
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </li>
                    ))}
                </ul>
            </nav>
            
            <div className="profile-content-body">
                {renderContent()}
            </div>
        </section>
    );
};

export default Profile;
