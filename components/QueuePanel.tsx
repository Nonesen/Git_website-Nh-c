'use client';

import React from 'react';
import { usePlayer } from '@/context/PlayerContext';
import { songs } from '@/data/constants';

interface QueuePanelProps {
    isOpen: boolean;
    onClose: () => void;
}

const QueuePanel: React.FC<QueuePanelProps> = ({ isOpen, onClose }) => {
    const { currentSong, playSong } = usePlayer();

    if (!isOpen) return null;

    // Find the next songs
    const currentIndex = currentSong ? songs.findIndex(s => s.id === currentSong.id) : 0;
    const upcomingSongs = [
        ...songs.slice(currentIndex + 1),
        ...songs.slice(0, currentIndex)
    ];

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '320px',
            height: 'calc(100vh - var(--player-height))',
            background: 'var(--bg-sidebar)',
            borderLeft: '1px solid var(--glass-border)',
            padding: '20px',
            transform: 'translateX(0)',
            transition: 'transform 0.3s ease',
            zIndex: 900,
            overflowY: 'auto'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Hàng chờ</h3>
                <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '10px' }}>Đang phát</p>
                {currentSong && (
                    <div 
                        style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', background: 'var(--primary-color)', borderRadius: '8px' }}
                    >
                        <img src={currentSong.cover} alt="" style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                        <div>
                            <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: 'white' }}>{currentSong.title}</p>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>{currentSong.artist}</p>
                        </div>
                        <div className="visualizer-mini" style={{ marginLeft: 'auto', display: 'flex', gap: '3px', alignItems: 'flex-end', height: '15px' }}>
                            <div className="bar" style={{ width: '3px', background: 'white', animation: 'bounce 0.8s infinite alternate' }}></div>
                            <div className="bar" style={{ width: '3px', background: 'white', animation: 'bounce 0.5s infinite alternate' }}></div>
                            <div className="bar" style={{ width: '3px', background: 'white', animation: 'bounce 1s infinite alternate' }}></div>
                        </div>
                    </div>
                )}
            </div>

            <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '10px' }}>Tiếp theo</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {upcomingSongs.map(song => (
                        <div 
                            key={`queue-${song.id}`}
                            onClick={() => playSong(song)}
                            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px', cursor: 'pointer', borderRadius: '8px', transition: 'background 0.2s' }}
                            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                            <img src={song.cover} alt="" style={{ width: '35px', height: '35px', borderRadius: '4px', objectFit: 'cover' }} />
                            <div>
                                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-main)' }}>{song.title}</p>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{song.artist}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes bounce {
                    0% { height: 3px; }
                    100% { height: 100%; }
                }
            `}} />
        </div>
    );
};

export default QueuePanel;
