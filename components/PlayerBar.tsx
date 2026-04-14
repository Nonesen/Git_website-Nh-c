'use client';

import React, { useState } from 'react';
import { usePlayer } from '@/context/PlayerContext';
import QueuePanel from './QueuePanel';

const PlayerBar: React.FC = () => {
    const {
        currentSong, isPlaying, duration, currentTime, volume, isShuffle, isRepeat,
        togglePlay, nextSong, prevSong, seek, setVolume, toggleShuffle, toggleRepeat,
        likedSongs, toggleLike, playlists, addToPlaylist
    } = usePlayer();

    const [isQueueOpen, setIsQueueOpen] = useState(false);
    const [isPlaylistMenuOpen, setIsPlaylistMenuOpen] = useState(false);

    if (!currentSong) return null;

    const formatTime = (time: number) => {
        if (!time || isNaN(time)) return '00:00';
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = duration ? (currentTime / duration) * 100 : 0;
    const isLiked = likedSongs.includes(currentSong.id);

    return (
        <footer className="player-bar">
            {/* LEFT — Track Info */}
            <div className="current-track">
                <div className="track-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={currentSong.cover} alt={currentSong.title} />
                </div>
                <div className="track-info">
                    <h4>{currentSong.title}</h4>
                    <p>{currentSong.artist}</p>
                </div>
                <div className="track-actions">
                    <button
                        className={`btn-icon like-btn ${isLiked ? 'active' : ''}`}
                        onClick={() => toggleLike(currentSong.id)}
                        title={isLiked ? 'Bỏ thích' : 'Thêm vào yêu thích'}
                    >
                        <i className={`${isLiked ? 'fa-solid' : 'fa-regular'} fa-heart`}
                            style={{ color: isLiked ? '#f43f5e' : '' }}
                        ></i>
                    </button>
                    <div className="playlist-add-container">
                        <button
                            className="btn-icon secondary"
                            onClick={() => setIsPlaylistMenuOpen(!isPlaylistMenuOpen)}
                            title="Thêm vào Album"
                        >
                            <i className="fa-solid fa-plus"></i>
                        </button>
                        {isPlaylistMenuOpen && (
                            <div className="playlist-dropdown">
                                <h4>Thêm vào Playlist</h4>
                                <ul>
                                    {playlists.map(p => (
                                        <li key={p.id} onClick={() => {
                                            addToPlaylist(p.id, currentSong.id);
                                            setIsPlaylistMenuOpen(false);
                                        }}>
                                            <i className="fa-solid fa-list-ul"></i>
                                            {p.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* CENTER — Controls */}
            <div className="player-controls">
                <div className="playback-buttons">
                    <button
                        className={`btn-icon secondary ${isShuffle ? 'active' : ''}`}
                        onClick={toggleShuffle}
                        title="Shuffle"
                    >
                        <i className="fa-solid fa-shuffle"></i>
                    </button>
                    <button className="btn-icon primary" onClick={prevSong} title="Previous">
                        <i className="fa-solid fa-backward-step"></i>
                    </button>
                    <button className="btn-icon main-play" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
                        <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                    </button>
                    <button className="btn-icon primary" onClick={nextSong} title="Next">
                        <i className="fa-solid fa-forward-step"></i>
                    </button>
                    <button
                        className={`btn-icon secondary ${isRepeat ? 'active' : ''}`}
                        onClick={toggleRepeat}
                        title="Repeat"
                    >
                        <i className="fa-solid fa-repeat"></i>
                    </button>
                </div>

                <div className="playback-progress">
                    <span>{formatTime(currentTime)}</span>
                    <div className="progress-bar-container">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress || 0}
                            onChange={e => seek((parseFloat(e.target.value) / 100) * duration)}
                            id="progress-bar"
                        />
                        <div className="progress-filled" style={{ width: `${progress}%` }}></div>
                    </div>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            {/* RIGHT — Volume & Queue */}
            <div className="extra-controls">
                <button
                    className={`btn-icon secondary ${isQueueOpen ? 'active' : ''}`}
                    onClick={() => setIsQueueOpen(o => !o)}
                    title="Queue"
                >
                    <i className="fa-solid fa-list"></i>
                </button>

                <div className="volume-control">
                    <i className={`fa-solid ${volume === 0 ? 'fa-volume-xmark' : volume < 0.5 ? 'fa-volume-low' : 'fa-volume-high'}`}></i>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={Math.round(volume * 100)}
                        onChange={e => setVolume(parseFloat(e.target.value) / 100)}
                        id="volume-bar"
                    />
                </div>
            </div>

            <QueuePanel isOpen={isQueueOpen} onClose={() => setIsQueueOpen(false)} />
        </footer>
    );
};

export default PlayerBar;
