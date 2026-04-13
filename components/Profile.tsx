'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

const Profile: React.FC = () => {
    const { user } = useAuth();
    const { t } = useLanguage();

    if (!user) return <div className="empty-state">Vui lòng đăng nhập</div>;

    return (
        <section id="profile-section" className="profile-section">
            <div className="profile-header">
                <div className="profile-info-main">
                    <div className="profile-avatar-container">
                        <img 
                            src={`https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff`} 
                            alt="Avatar" 
                        />
                        <label className="upload-label">
                            <i className="fa-solid fa-camera"></i>
                            <span>Upload image</span>
                        </label>
                    </div>
                    <div className="profile-text">
                        <h1>{user.name}</h1>
                        <p>@{user.username}</p>
                    </div>
                </div>
            </div>
            <nav className="profile-tabs">
                <ul>
                    <li className="active">All</li>
                    <li>Popular tracks</li>
                    <li>Tracks</li>
                    <li>Albums</li>
                </ul>
            </nav>
            <div className="profile-content-body">
                <div className="empty-state">
                    <i className="fa-solid fa-music"></i>
                    <p>Chưa có nội dung để hiển thị.</p>
                </div>
            </div>
        </section>
    );
};

export default Profile;
