'use client';

import React from 'react';
import { Song } from '@/data/constants';
import { usePlayer } from '@/context/PlayerContext';

interface SongCardProps {
    song: Song;
}

const SongCard: React.FC<SongCardProps> = ({ song }) => {
    const { playSong, currentSong, isPlaying } = usePlayer();

    const isCurrent = currentSong?.id === song.id;

    return (
        <div className={`song-card ${isCurrent ? 'active' : ''}`} onClick={() => playSong(song)}>
            <div className="img-wrap">
                <img src={song.cover} alt={song.title} />
                <div className={`play-overlay ${isCurrent && isPlaying ? 'playing' : ''}`}>
                    <i className={`fa-solid ${isCurrent && isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                </div>
                {song.isOnline && (
                    <div className="online-badge">
                        <i className="fa-solid fa-cloud"></i>
                        <span>Online</span>
                    </div>
                )}
            </div>
            <h4>{song.title}</h4>
            <p>{song.artist}</p>
        </div>
    );
};

export default SongCard;
