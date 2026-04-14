'use client';

import React from 'react';
import { usePlayer } from '@/context/PlayerContext';

const Background: React.FC = () => {
    const { currentSong } = usePlayer();
    
    if (!currentSong) return null;

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            backgroundImage: `url(${currentSong.cover})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(80px) brightness(0.5)',
            transform: 'scale(1.2)',
            transition: 'background-image 1s ease-in-out'
        }} />
    );
};

export default Background;
