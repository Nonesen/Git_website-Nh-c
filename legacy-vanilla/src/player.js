import { recordListen } from './stats.js';

export let isPlaying = false;
export let isShuffle = false;
export let isRepeat = false;
export let currentSongIndex = 0;

export function initPlayer(audio, playPauseBtn, progressFilled, statTotalListens) {
    if (!audio) return;

    return {
        togglePlay: (songs, loadSong) => {
            if (isPlaying) {
                isPlaying = false;
                if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
                document.body.classList.remove('playing');
                audio.pause();
            } else {
                isPlaying = true;
                if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                document.body.classList.add('playing');
                audio.play();
            }
        },
        playSong: () => {
            isPlaying = true;
            if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            document.body.classList.add('playing');
            audio.play();
        },
        pauseSong: () => {
            isPlaying = false;
            if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            document.body.classList.remove('playing');
            audio.pause();
        },
        nextSong: (songs, loadSong) => {
            currentSongIndex = isShuffle ? Math.floor(Math.random() * songs.length) : (currentSongIndex + 1) % songs.length;
            loadSong(songs[currentSongIndex]);
            isPlaying = true;
            if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            document.body.classList.add('playing');
            audio.play();
        },
        prevSong: (songs, loadSong) => {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            loadSong(songs[currentSongIndex]);
            isPlaying = true;
            if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            document.body.classList.add('playing');
            audio.play();
        },
        toggleShuffle: (shuffleBtn) => {
            isShuffle = !isShuffle;
            if (shuffleBtn) shuffleBtn.classList.toggle('active', isShuffle);
        },
        toggleRepeat: (repeatBtn) => {
            isRepeat = !isRepeat;
            if (repeatBtn) repeatBtn.classList.toggle('active', isRepeat);
        },
        handleEnded: (songs, loadSong, playSong, nextSong) => {
            recordListen(statTotalListens);
            if (isRepeat) playSong();
            else nextSong(songs, loadSong);
        },
        setIndex: (index) => {
            currentSongIndex = index;
        }
    };
}

export function formatTime(time) {
    const m = Math.floor(time / 60), s = Math.floor(time % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}
