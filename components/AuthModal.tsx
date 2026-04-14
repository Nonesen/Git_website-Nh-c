'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const { login } = useAuth();
    const { t } = useLanguage();
    
    const [view, setView] = useState<'login' | 'signup'>('login');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const success = login(username, password);
        if (success) {
            onClose();
        } else {
            setError('Sai tên đăng nhập hoặc mật khẩu!');
        }
    };

    return (
        <div className={`auth-overlay ${isOpen ? 'active' : ''}`}>
            <div className="auth-card">
                <button className="auth-close-btn" onClick={onClose}>&times;</button>
                
                {view === 'login' ? (
                    <div id="login-form">
                        <div className="auth-header">
                            <h2>{t('header-login')}</h2>
                        </div>
                        {error && <p style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.85rem' }}>{error}</p>}
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    placeholder="Nhập username của bạn (user/admin)" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="form-group password-group">
                                <input 
                                    type="password" 
                                    placeholder="Nhập mật khẩu (admin123 hoặc user123)" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <i className="fa-regular fa-eye-slash toggle-password"></i>
                            </div>
                            
                            <div className="auth-options">
                                <label className="custom-checkbox">
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                    Nhớ cho lần đăng nhập tới
                                </label>
                                <a href="#" className="forgot-link">Quên mật khẩu?</a>
                            </div>

                            <button type="submit" className="btn-auth-submit">Đăng nhập</button>
                            <p className="auth-switch">Chưa có tài khoản? <span onClick={() => setView('signup')}>Đăng ký ngay</span></p>
                        </form>
                    </div>
                ) : (
                    <div id="signup-form">
                        <div className="auth-header">
                            <h2>Đăng ký tài khoản</h2>
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Họ và tên của bạn" />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Tên đăng nhập" />
                        </div>
                        <div className="form-group password-group">
                            <input type="password" placeholder="Mật khẩu của bạn" />
                            <i className="fa-regular fa-eye-slash toggle-password"></i>
                        </div>
                        <button className="btn-auth-submit">Đăng ký</button>
                        <p className="auth-switch">Đã có tài khoản? <span onClick={() => setView('login')}>Đăng nhập</span></p>
                    </div>
                )}

                <div className="demo-creds">
                    <p>Demo Admin: <strong>admin</strong> / <strong>admin123</strong></p>
                    <p>Demo User: <strong>user</strong> / <strong>user123</strong></p>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
