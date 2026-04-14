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
    likedSongs: number[];
    toggleLike: (songId: number) => void;
    playlists: { id: string, name: string, songIds: number[] }[];
    createPlaylist: (name: string) => void;
    deletePlaylist: (id: string) => void;
    addToPlaylist: (playlistId: string, songId: number) => void;
    removeFromPlaylist: (playlistId: string, songId: number) => void;
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
    const [likedSongs, setLikedSongs] = useState<number[]>([]);
    const [playlists, setPlaylists] = useState<{ id: string, name: string, songIds: number[] }[]>([]);
    
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const savedLikes = localStorage.getItem('vibraze_likes');
        if (savedLikes) {
            setLikedSongs(JSON.parse(savedLikes));
        }
        
        const savedPlaylists = localStorage.getItem('vibraze_playlists');
        if (savedPlaylists) {
            setPlaylists(JSON.parse(savedPlaylists));
        } else {
            // Default playlists based on user's request: Nhạc Chill, Gaming Mix
            const defaults = [
                { id: 'p-1', name: 'Nhạc Chill', songIds: [] },
                { id: 'p-2', name: 'Gaming Mix', songIds: [] }
            ];
            setPlaylists(defaults);
            localStorage.setItem('vibraze_playlists', JSON.stringify(defaults));
        }
    }, []);

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio();
        }
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

        // Cleanup to prevent multiple instances or leaky event listeners if we're not careful
        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', onEnded);
        };
    }, [isRepeat, isShuffle, currentSong]);

    const playSong = async (song: Song) => {
        if (!audioRef.current) return;
        
        try {
            if (currentSong?.id !== song.id || !audioRef.current.src.includes(encodeURI(song.src))) {
                setCurrentSong(song);
                audioRef.current.src = song.src;
                audioRef.current.load();
                
                // Track recently played
                const recent = JSON.parse(localStorage.getItem('vibraze_recent') || '[]');
                const updated = [song.id, ...recent.filter((id: number) => id !== song.id)].slice(0, 20);
                localStorage.setItem('vibraze_recent', JSON.stringify(updated));
            }
            
            await audioRef.current.play();
            setIsPlaying(true);
        } catch (error) {
            console.warn("Playback interrupted", error);
        }
    };

    const togglePlay = async () => {
        if (!audioRef.current) return;
        try {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                await audioRef.current.play();
                setIsPlaying(true);
            }
        } catch (error) {
            console.warn("Toggle playback intercepted", error);
        }
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

    const createPlaylist = (name: string) => {
        const newPlaylist = { id: `p-${Date.now()}`, name, songIds: [] };
        const updated = [...playlists, newPlaylist];
        setPlaylists(updated);
        localStorage.setItem('vibraze_playlists', JSON.stringify(updated));
    };

    const deletePlaylist = (id: string) => {
        const updated = playlists.filter(p => p.id !== id);
        setPlaylists(updated);
        localStorage.setItem('vibraze_playlists', JSON.stringify(updated));
    };

    const addToPlaylist = (playlistId: string, songId: number) => {
        const updated = playlists.map(p => {
            if (p.id === playlistId && !p.songIds.includes(songId)) {
                return { ...p, songIds: [...p.songIds, songId] };
            }
            return p;
        });
        setPlaylists(updated);
        localStorage.setItem('vibraze_playlists', JSON.stringify(updated));
    };

    const removeFromPlaylist = (playlistId: string, songId: number) => {
        const updated = playlists.map(p => {
            if (p.id === playlistId) {
                return { ...p, songIds: p.songIds.filter(id => id !== songId) };
            }
            return p;
        });
        setPlaylists(updated);
        localStorage.setItem('vibraze_playlists', JSON.stringify(updated));
    };

    return (
        <PlayerContext.Provider value={{
            currentSong, isPlaying, duration, currentTime, volume, isShuffle, isRepeat,
            playSong, togglePlay, nextSong, prevSong, seek, setVolume, toggleShuffle, toggleRepeat,
            likedSongs, toggleLike,
            playlists, createPlaylist, deletePlaylist, addToPlaylist, removeFromPlaylist
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
