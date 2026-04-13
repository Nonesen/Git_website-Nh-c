'use client';

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Song, songs } from '@/data/constants';

interface PlayerContextType {
    currentSong: Song | null;
    isPlaying: boolean;
    duration: number;
    currentTime: number;
    volume: number;
    isShuffle: boolean;
    isRepeat: boolean;
    playSong: (song: Song) => void;
    togglePlay: () => void;
    nextSong: () => void;
    prevSong: () => void;
    seek: (time: number) => void;
    setVolume: (volume: number) => void;
    toggleShuffle: () => void;
    toggleRepeat: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
    const [currentSong, setCurrentSong] = useState<Song | null>(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolumeState] = useState(0.8);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio();
        audioRef.current.volume = volume;

        const audio = audioRef.current;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const onEnded = () => {
            if (isRepeat) {
                audio.currentTime = 0;
                audio.play();
            } else {
                nextSong();
            }
        };

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', onEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', onEnded);
            audio.pause();
        };
    }, [isRepeat, isShuffle, currentSong]); // Re-bind on these changes if needed, but careful with state

    const playSong = (song: Song) => {
        if (!audioRef.current) return;
        
        if (currentSong?.id !== song.id) {
            setCurrentSong(song);
            audioRef.current.src = song.src;
            audioRef.current.load();
            
            // Track recently played
            const recent = JSON.parse(localStorage.getItem('vibraze_recent') || '[]');
            const updated = [song.id, ...recent.filter((id: number) => id !== song.id)].slice(0, 20);
            localStorage.setItem('vibraze_recent', JSON.stringify(updated));
        }
        
        audioRef.current.play();
        setIsPlaying(true);
    };

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const nextSong = () => {
        if (!currentSong) return;
        let nextIdx;
        if (isShuffle) {
            nextIdx = Math.floor(Math.random() * songs.length);
        } else {
            const currentIdx = songs.findIndex(s => s.id === currentSong.id);
            nextIdx = (currentIdx + 1) % songs.length;
        }
        playSong(songs[nextIdx]);
    };

    const prevSong = () => {
        if (!currentSong) return;
        const currentIdx = songs.findIndex(s => s.id === currentSong.id);
        const prevIdx = (currentIdx - 1 + songs.length) % songs.length;
        playSong(songs[prevIdx]);
    };

    const seek = (time: number) => {
        if (!audioRef.current) return;
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    const setVolume = (v: number) => {
        if (!audioRef.current) return;
        audioRef.current.volume = v;
        setVolumeState(v);
    };

    const toggleShuffle = () => setIsShuffle(!isShuffle);
    const toggleRepeat = () => setIsRepeat(!isRepeat);

    return (
        <PlayerContext.Provider value={{
            currentSong, isPlaying, duration, currentTime, volume, isShuffle, isRepeat,
            playSong, togglePlay, nextSong, prevSong, seek, setVolume, toggleShuffle, toggleRepeat
        }}>
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayer() {
    const context = useContext(PlayerContext);
    if (context === undefined) {
        throw new Error('usePlayer must be used within a PlayerProvider');
    }
    return context;
}
