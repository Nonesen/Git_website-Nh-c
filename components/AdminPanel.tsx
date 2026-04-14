'use client';

import React from 'react';

import { useAuth } from '@/context/AuthContext';
import { songs, initialUsers } from '@/data/constants';

interface AdminPanelProps {
    view: 'music' | 'users' | 'stats';
}

const AdminPanel: React.FC<AdminPanelProps> = ({ view }) => {
    const { user } = useAuth();
    
    if (user?.role !== 'admin') return <div className="content">Access Denied</div>;

    return (
        <section id="admin-panel" className="admin-section">
            <div className="admin-grid-top">
                <div className="admin-main-content">
                    <div className="section-header">
                        <h2>{view === 'music' ? 'Quản lý nhạc' : view === 'users' ? 'Quản lý User' : 'Thống kê hệ thống'}</h2>
                        {view === 'music' && (
                            <div className="admin-actions">
                                <button className="btn-primary-sm"><i className="fa-solid fa-plus"></i> Thêm nhạc</button>
                            </div>
                        )}
                    </div>

                    <div className="admin-table-container">
                        {view === 'music' && (
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Ảnh</th>
                                        <th>Tên bài hát</th>
                                        <th>Nghệ sĩ</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {songs.map(song => (
                                        <tr key={song.id}>
                                            <td>{song.id}</td>
                                            <td><img src={song.cover} alt="" /></td>
                                            <td>{song.title}</td>
                                            <td>{song.artist}</td>
                                            <td>
                                                <div className="admin-actions">
                                                    <button className="btn-action"><i className="fa-solid fa-pen"></i></button>
                                                    <button className="btn-action delete"><i className="fa-solid fa-trash"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {view === 'users' && (
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Vai trò</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {initialUsers.map(u => (
                                        <tr key={u.username}>
                                            <td>{u.username}</td>
                                            <td><span className="role-badge">{u.role}</span></td>
                                            <td>
                                                <div className="admin-actions">
                                                    <button className="btn-action"><i className="fa-solid fa-user-gear"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                <div className="admin-sidebar-stats">
                    <div className="stat-card">
                        <div className="stat-icon"><i className="fa-solid fa-users"></i></div>
                        <div className="stat-info">
                            <h3>Truy cập</h3>
                            <p>1,248</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon"><i className="fa-solid fa-music"></i></div>
                        <div className="stat-info">
                            <h3>Số bài hát</h3>
                            <p>{songs.length}</p>
                        </div>
                    </div>
                    <div className="stat-card accent">
                        <div className="stat-icon"><i className="fa-solid fa-clock-rotate-left"></i></div>
                        <div className="stat-info">
                            <h3>Lượt nghe</h3>
                            <p>4.2k</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminPanel;
