export function updateGreeting(greetingText, currentLang) {
    const h = new Date().getHours();
    let txtVI = h < 12 ? "Chào buổi sáng" : h < 18 ? "Chào buổi chiều" : "Chào buổi tối";
    let txtEN = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
    if (greetingText) {
        greetingText.textContent = currentLang === 'en' ? txtEN : txtVI;
    }
}

export function renderSongs(songGrid, songsToRender, currentLang, songCountEl, onSongClick) {
    if (!songGrid) return;
    songGrid.innerHTML = '';
    songsToRender.forEach((song) => {
        const card = document.createElement('div');
        card.className = 'song-card';
        card.innerHTML = `
            <div class="img-wrap">
                <img src="${song.cover}" alt="${song.title}">
                <div class="play-overlay"><i class="fa-solid fa-play"></i></div>
            </div>
            <h4>${song.title}</h4>
            <p>${song.artist}</p>`;
        card.addEventListener('click', () => onSongClick(song));
        songGrid.appendChild(card);
    });
    if (songCountEl) {
        const txt = currentLang === 'en' ? 'songs' : 'bài hát';
        songCountEl.innerHTML = `${songsToRender.length} <span data-i18n="song-count">${txt}</span>`;
    }
}

export function renderHomeContent(songGrid, songs, currentLang, songCountEl, onSongClick) {
    if (!songGrid) return;
    songGrid.innerHTML = '';
    
    // Innovation: Categorized Home Page
    const sections = [
        { title: currentLang === 'en' ? 'Trending Now' : 'Thịnh hành', list: songs.slice(0, 4) },
        { title: currentLang === 'en' ? 'New Releases' : 'Mới phát hành', list: songs.slice(4, 8) },
        { title: currentLang === 'en' ? 'Just for You' : 'Dành cho bạn', list: [...songs].sort(() => 0.5 - Math.random()).slice(0, 4) }
    ];

    sections.forEach(sec => {
        const secWrap = document.createElement('div');
        secWrap.className = 'home-section-wrap';
        secWrap.innerHTML = `<h3 class="home-sec-title">${sec.title}</h3>`;
        const grid = document.createElement('div');
        grid.className = 'song-grid';
        sec.list.forEach(song => {
            const card = document.createElement('div');
            card.className = 'song-card';
            card.innerHTML = `
                <div class="img-wrap">
                    <img src="${song.cover}" alt="${song.title}">
                    <div class="play-overlay"><i class="fa-solid fa-play"></i></div>
                </div>
                <h4>${song.title}</h4>
                <p>${song.artist}</p>`;
            card.addEventListener('click', () => onSongClick(song));
            grid.appendChild(card);
        });
        secWrap.appendChild(grid);
        songGrid.appendChild(secWrap);
    });
    
    if (songCountEl) songCountEl.innerHTML = '';
}
