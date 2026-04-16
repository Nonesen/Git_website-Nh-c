'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
    const { t } = useLanguage();
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [userEmail, setUserEmail] = useState('');
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setStatus('submitting');
        
        try {
            // 1. Save to MongoDB Database (Primary)
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: userEmail,
                    message: message
                })
            });

            // 2. Attempt Gmail delivery via FormSubmit.co (Superior for direct gmail)
            await fetch('https://formsubmit.co/ajax/khoakpham83@gmail.com', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: userEmail,
                    message: message,
                    _subject: `Vibraze - Phản hồi mới từ ${userEmail}`,
                    _template: 'table' 
                })
            });

            setStatus('success');
            setMessage('');
            setTimeout(() => {
                onClose();
                setStatus('idle');
            }, 2500);

        } catch (error) {
            console.error('Feedback submission error:', error);
            setStatus('error');
        }
    };

    return (
        <div className="auth-overlay active" style={{ zIndex: 10000 }}>
            <div className="auth-card feedback-card">
                <button className="auth-close-btn" onClick={onClose}>&times;</button>
                
                <div className="auth-header">
                    <h2>{t('settings-feedback')}</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '8px' }}>
                        Chúng tôi luôn trân trọng ý kiến đóng góp của bạn!
                    </p>
                </div>

                {status === 'success' ? (
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                        <i className="fa-solid fa-circle-check" style={{ color: '#10b981', fontSize: '3rem', marginBottom: '1rem' }}></i>
                        <p>Cảm ơn bạn! Góp ý đã được gửi thành công.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group" style={{ marginTop: '1.5rem' }}>
                            <input 
                                type="email"
                                placeholder="Email của bạn để chúng tôi phản hồi..."
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                style={{
                                    width: '100%',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '10px',
                                    padding: '10px 14px',
                                    color: 'var(--text-main)',
                                    marginBottom: '12px',
                                    outline: 'none',
                                    fontSize: '0.9rem'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                                required
                            />
                            <textarea 
                                placeholder="Nhập nhận xét hoặc góp ý của bạn tại đây..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                style={{
                                    width: '100%',
                                    minHeight: '150px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '12px',
                                    padding: '12px',
                                    color: 'var(--text-main)',
                                    fontFamily: 'inherit',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    resize: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                                required
                            />
                        </div>

                        {status === 'error' && (
                            <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem' }}>
                                Có lỗi xảy ra, vui lòng thử lại sau.
                            </p>
                        )}

                        <button 
                            type="submit" 
                            className="btn-auth-submit" 
                            disabled={status === 'submitting'}
                            style={{ marginTop: '1rem' }}
                        >
                            {status === 'submitting' ? 'Đang gửi...' : 'Gửi góp ý'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default FeedbackModal;
