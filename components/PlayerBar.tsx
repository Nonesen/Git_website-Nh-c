'use client';

import React, { useState } from 'react';
import { usePlayer } from '@/context/PlayerContext';

const PlayerBar: React.FC = () => {
    const { 
        currentSong, isPlaying, duration, currentTime, volume, isShuffle, isRepeat,
        togglePlay, nextSong, prevSong, seek, setVolume, toggleShuffle, toggleRepeat
    } = usePlayer();

    if (!currentSong) return null;

    const formatTime = (time: number) => {
        if (isNaN(time)) return "00:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        seek((val / 100) * duration);
    };

    const progressPercent = duration ? (currentTime / duration) * 100 : 0;

    return (
        <footer className="player-bar">
            <div className="current-track">
                <div className="track-img">
                    <img src={currentSong.cover} alt="Cover" />
                </div>
                <div className="track-info">
                    <h4>{currentSong.title}</h4>
                    <p>{currentSong.artist}</p>
                </div>
                <button className="btn-icon like-btn"><i className="fa-regular fa-heart"></i></button>
            </div>

            <div className="player-controls">
                <div className="playback-buttons">
                    <button 
                        className={`btn-icon secondary ${isShuffle ? 'active' : ''}`} 
                        onClick={toggleShuffle}
                    >
                        <i className="fa-solid fa-shuffle"></i>
                    </button>
                    <button className="btn-icon primary" onClick={prevSong}>
                        <i className="fa-solid fa-backward-step"></i>
                    </button>
                    <button className="btn-icon play-btn main-play" onClick={togglePlay}>
                        <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                    </button>
                    <button className="btn-icon primary" onClick={nextSong}>
                        <i className="fa-solid fa-forward-step"></i>
                    </button>
                    <button 
                        className={`btn-icon secondary ${isRepeat ? 'active' : ''}`} 
                        onClick={toggleRepeat}
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
                            value={progressPercent || 0} 
                            onChange={handleProgressChange}
                            id="progress-bar"
                        />
                        <div className="progress-filled" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            <div className="extra-controls">
                <button className="btn-icon secondary"><i className="fa-solid fa-list"></i></button>
                <div className="volume-control">
                    <i className="fa-solid fa-volume-high"></i>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={volume * 100} 
                        onChange={(e) => setVolume(parseFloat(e.target.value) / 100)}
                        id="volume-bar"
                    />
                </div>
            </div>
        </footer>
    );
};

export default PlayerBar;
