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
            <div className="section-header">
                 <h2>{view === 'music' ? 'Quản lý bài hát' : view === 'users' ? 'Quản lý người dùng' : 'Thống kê tổng quan'}</h2>
            </div>
            
            <div className="admin-tools" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                    <div className="stat-card" style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                        <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Tổng bài hát</h3>
                        <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-light)' }}>{songs.length}</p>
                    </div>
                    <div className="stat-card" style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                        <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Tổng người dùng</h3>
                        <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-light)' }}>{initialUsers.length}</p>
                    </div>
                    <div className="stat-card" style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                        <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Lượt nghe (Mock)</h3>
                        <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-light)' }}>1,234</p>
                    </div>
                </div>

                <div className="admin-main-content">
                    <div className="section-header">
                        <h3>{view === 'music' ? 'Danh sách bản ghi' : view === 'users' ? 'Tài khoản' : 'Chi tiết'}</h3>
                        {view === 'music' && (
                            <button className="btn-play-all" style={{ background: 'white', color: 'var(--primary-color)', border: 'none', padding: '10px 24px', borderRadius: '50px', fontWeight: 700, cursor: 'pointer' }}>
                                <i className="fa-solid fa-plus"></i> Thêm bài hát mới
                            </button>
                        )}
                    </div>

                    <div className="admin-table-container">
                        {view === 'music' && (
                            <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>Mã</th>
                                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>Cover</th>
                                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>Tiêu đề</th>
                                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>Nghệ sĩ</th>
                                        <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>Công cụ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {songs.map(song => (
                                        <tr key={song.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <td style={{ padding: '12px' }}>#{song.id}</td>
                                            <td style={{ padding: '12px' }}><img src={song.cover} alt="" style={{ width: '40px', borderRadius: '6px' }} /></td>
                                            <td style={{ padding: '12px', fontWeight: 600 }}>{song.title}</td>
                                            <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{song.artist}</td>
                                            <td style={{ padding: '12px', textAlign: 'right' }}>
                                                <button className="btn-action" style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: 'white', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', marginRight: '6px' }}><i className="fa-solid fa-pen"></i></button>
                                                <button className="btn-action delete" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}><i className="fa-solid fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {view === 'users' && (
                            <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>Tài khoản</th>
                                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>Tên hiển thị</th>
                                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>Phân quyền</th>
                                        <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>Công cụ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {initialUsers.map(u => (
                                        <tr key={u.username} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <td style={{ padding: '12px', fontWeight: 600 }}>{u.username}</td>
                                            <td style={{ padding: '12px' }}>{u.name}</td>
                                            <td style={{ padding: '12px' }}><span className="role-badge" style={{ background: u.role==='admin' ? '#f59e0b' : 'var(--primary-color)', padding: '4px 10px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 'bold' }}>{u.role}</span></td>
                                            <td style={{ padding: '12px', textAlign: 'right' }}>
                                                <button className="btn-action" style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: 'white', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}><i className="fa-solid fa-user-gear"></i> Chỉnh sửa</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminPanel;
