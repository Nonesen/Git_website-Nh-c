import { songs, translations, initialUsers } from './data.js';
import * as stats from './stats.js';
import * as auth from './auth.js';
import * as player from './player.js';
import * as ui from './ui.js';
import * as admin from './admin.js';

// Elements
let audio, playPauseBtn, prevBtn, nextBtn, shuffleBtn, repeatBtn, progressBar, progressFilled;
let currentTimeEl, durationTimeEl, volumeBar, volumeIcon, songGrid, searchInput, greetingText, headerClock;
let songCountEl, navHomeBtn, navRecentBtn, navExploreBtn, navLibraryBtn, navLikedBtn, likeBtn, likeIcon;
let switchAdminBtn, adminPanel, heroSection, songListSection, userAvatar, profileSection;
let authOverlay, mainApp, loginForm, signupForm, toSignup, toLogin, logoutBtn, headerGuest, headerLoginBtn, closeAuthBtn;
let loginUserInp, loginPassInp, signupNameInp, signupEmailInp, signupPhoneInp, signupUserInp, signupPassInp, loginSubmit, signupSubmit;
let toggleLoginPass, toggleSignupPass, playerTitle, playerArtist, playerImg, modal, openModalBtn, closeModalBtn, modalTitle, modalArtist, modalImg, discWrapper;
let profileAvatarImg, profileNameDisplay, profileUsernameDisplay, navProfileBtn, avatarUpload, profileTabs, profileContentBody, userDropdown, userProfileTrigger;
let settingsTrigger, settingsDropdown, settingsMenuMain, settingsMenuLang, langMenuBtn, langBackBtn, langOptions;
let musicTbody, userTbody, logsTbody, adminMusicTable, adminUserTable, adminLogsTable, adminPanelTitle;
let statVisitors, statTotalSongs, statTotalUsers, statTotalListens;

let playerEngine;
let currentLang = localStorage.getItem('vibraze_lang') || 'vi';
let likedSongs = JSON.parse(localStorage.getItem('vibraze_likes')) || [];

function init() {
    // 1. Select Elements
    audio = document.getElementById('audio-player');
    playPauseBtn = document.getElementById('play-pause-btn');
    prevBtn = document.getElementById('prev-btn');
    nextBtn = document.getElementById('next-btn');
    shuffleBtn = document.getElementById('shuffle-btn');
    repeatBtn = document.getElementById('repeat-btn');
    progressBar = document.getElementById('progress-bar');
    progressFilled = document.getElementById('progress-filled');
    currentTimeEl = document.getElementById('current-time');
    durationTimeEl = document.getElementById('duration-time');
    volumeBar = document.getElementById('volume-bar');
    volumeIcon = document.getElementById('volume-icon');
    songGrid = document.getElementById('song-grid');
    searchInput = document.getElementById('search-input');
    greetingText = document.getElementById('greeting-text');
    headerClock = document.getElementById('header-clock');
    songCountEl = document.getElementById('song-count');
    navHomeBtn = document.getElementById('nav-home');
    navRecentBtn = document.getElementById('nav-recent');
    navExploreBtn = document.getElementById('nav-explore');
    navLibraryBtn = document.getElementById('nav-library');
    navLikedBtn = document.getElementById('nav-liked');
    likeBtn = document.querySelector('.like-btn');
    if (likeBtn) likeIcon = likeBtn.querySelector('i');
    switchAdminBtn = document.getElementById('switch-admin-btn');
    adminPanel = document.getElementById('admin-panel');
    heroSection = document.querySelector('.hero-section');
    songListSection = document.querySelector('.song-list-container');
    userAvatar = document.getElementById('user-avatar');
    authOverlay = document.getElementById('auth-overlay');
    mainApp = document.getElementById('main-app');
    loginForm = document.getElementById('login-form');
    signupForm = document.getElementById('signup-form');
    toSignup = document.getElementById('to-signup');
    toLogin = document.getElementById('to-login');
    logoutBtn = document.getElementById('logout-btn');
    headerGuest = document.getElementById('header-guest');
    headerLoginBtn = document.getElementById('header-login-btn');
    closeAuthBtn = document.getElementById('close-auth');
    loginUserInp = document.getElementById('login-username');
    loginPassInp = document.getElementById('login-password');
    signupNameInp = document.getElementById('signup-name');
    signupEmailInp = document.getElementById('signup-email');
    signupPhoneInp = document.getElementById('signup-phone');
    signupUserInp = document.getElementById('signup-username');
    signupPassInp = document.getElementById('signup-password');
    loginSubmit = document.getElementById('login-submit');
    signupSubmit = document.getElementById('signup-submit');
    toggleLoginPass = document.getElementById('toggle-login-pass');
    toggleSignupPass = document.getElementById('toggle-signup-pass');
    playerTitle = document.getElementById('player-title');
    playerArtist = document.getElementById('player-artist');
    playerImg = document.getElementById('player-img');
    modal = document.getElementById('player-modal');
    openModalBtn = document.getElementById('open-modal');
    closeModalBtn = document.getElementById('close-modal');
    modalTitle = document.getElementById('modal-title');
    modalArtist = document.getElementById('modal-artist');
    modalImg = document.getElementById('modal-img');
    discWrapper = document.getElementById('disc-wrapper');
    profileSection = document.getElementById('profile-section');
    profileAvatarImg = document.getElementById('profile-avatar-img');
    profileNameDisplay = document.getElementById('profile-name-display');
    profileUsernameDisplay = document.getElementById('profile-username-display');
    navProfileBtn = document.getElementById('nav-profile-btn');
    avatarUpload = document.getElementById('avatar-upload');
    profileTabs = document.querySelectorAll('.profile-tabs li');
    profileContentBody = document.querySelector('.profile-content-body');
    userDropdown = document.getElementById('user-dropdown');
    userProfileTrigger = document.getElementById('user-profile-trigger');
    settingsTrigger = document.getElementById('settings-trigger');
    settingsDropdown = document.getElementById('settings-dropdown');
    settingsMenuMain = document.getElementById('settings-menu-main');
    settingsMenuLang = document.getElementById('settings-menu-lang');
    langMenuBtn = document.getElementById('lang-menu-btn');
    langBackBtn = document.getElementById('lang-back-btn');
    langOptions = document.querySelectorAll('.lang-option');
    musicTbody = document.getElementById('music-tbody');
    userTbody = document.getElementById('user-tbody');
    logsTbody = document.getElementById('logs-tbody');
    adminMusicTable = document.getElementById('admin-music-table');
    adminUserTable = document.getElementById('admin-user-table');
    adminLogsTable = document.getElementById('admin-logs-table');
    adminPanelTitle = document.getElementById('admin-panel-title');
    statVisitors = document.getElementById('stat-visitors');
    statTotalSongs = document.getElementById('stat-total-songs');
    statTotalUsers = document.getElementById('stat-total-users');
    statTotalListens = document.getElementById('stat-total-listens');

    // 2. Initialize Engines
    playerEngine = player.initPlayer(audio, playPauseBtn, progressFilled, statTotalListens);
    if (!localStorage.getItem('vibraze_users')) {
        localStorage.setItem('vibraze_users', JSON.stringify(initialUsers));
        auth.setUsers(initialUsers);
    }

    // 3. Global Listeners
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => location.reload());
    }

    // Navigation
    if (navHomeBtn) navHomeBtn.addEventListener('click', () => switchTab(navHomeBtn, 'home'));
    if (navRecentBtn) navRecentBtn.addEventListener('click', () => switchTab(navRecentBtn, 'recent'));
    if (navExploreBtn) navExploreBtn.addEventListener('click', () => switchTab(navExploreBtn, 'explore'));
    if (navLibraryBtn) navLibraryBtn.addEventListener('click', () => switchTab(navLibraryBtn, 'library'));
    if (navLikedBtn) navLikedBtn.addEventListener('click', () => switchTab(navLikedBtn, 'liked'));

    // Admin Sidebar
    const navAdminManage = document.getElementById('nav-admin-manage');
    const navAdminUsers = document.getElementById('nav-admin-users');
    const navAdminStats = document.getElementById('nav-admin-stats');
    if (navAdminManage) navAdminManage.addEventListener('click', () => showAdminSection('music', navAdminManage));
    if (navAdminUsers) navAdminUsers.addEventListener('click', () => showAdminSection('users', navAdminUsers));
    if (navAdminStats) navAdminStats.addEventListener('click', () => showAdminSection('logs', navAdminStats));

    // Auth
    if (loginSubmit) loginSubmit.addEventListener('click', () => {
        const success = auth.handleLogin(loginUserInp.value, loginPassInp.value, loginUser);
        if (!success) alert("Sai tài khoản hoặc mật khẩu!");
    });
    if (signupSubmit) signupSubmit.addEventListener('click', () => {
        const res = auth.handleSignup(signupNameInp.value, signupEmailInp.value, signupPhoneInp.value, signupUserInp.value, signupPassInp.value);
        if (res.success) {
            alert("Đăng ký thành công!");
            toLogin.click();
        } else alert(res.message);
    });
    if (headerLoginBtn) headerLoginBtn.addEventListener('click', () => authOverlay.classList.add('active'));
    if (closeAuthBtn) closeAuthBtn.addEventListener('click', () => authOverlay.classList.remove('active'));
    if (toSignup) toSignup.addEventListener('click', () => { loginForm.style.display = 'none'; signupForm.style.display = 'block'; });
    if (toLogin) toLogin.addEventListener('click', () => { loginForm.style.display = 'block'; signupForm.style.display = 'none'; });
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);

    // Player Interactions
    if (playPauseBtn) playPauseBtn.addEventListener('click', () => playerEngine.togglePlay(songs, loadSong));
    if (nextBtn) nextBtn.addEventListener('click', () => playerEngine.nextSong(songs, loadSong));
    if (prevBtn) prevBtn.addEventListener('click', () => playerEngine.prevSong(songs, loadSong));
    if (shuffleBtn) shuffleBtn.addEventListener('click', () => playerEngine.toggleShuffle(shuffleBtn));
    if (repeatBtn) repeatBtn.addEventListener('click', () => playerEngine.toggleRepeat(repeatBtn));
    if (likeBtn) likeBtn.addEventListener('click', toggleLike);
    if (progressBar) progressBar.addEventListener('input', () => audio.currentTime = (progressBar.value / 100) * audio.duration);
    if (volumeBar) volumeBar.addEventListener('input', () => { audio.volume = volumeBar.value / 100; updateVolumeIcon(audio.volume); });

    // Settings
    if (settingsTrigger) settingsTrigger.addEventListener('click', (e) => { e.stopPropagation(); settingsDropdown.classList.toggle('active'); });
    if (langMenuBtn) langMenuBtn.addEventListener('click', () => { settingsMenuMain.style.display = 'none'; settingsMenuLang.style.display = 'block'; });
    if (langBackBtn) langBackBtn.addEventListener('click', () => { settingsMenuLang.style.display = 'none'; settingsMenuMain.style.display = 'block'; });
    langOptions.forEach(opt => opt.addEventListener('click', () => {
        const lang = opt.getAttribute('data-lang');
        setLanguage(lang);
        setTimeout(() => { settingsDropdown.classList.remove('active'); setTimeout(() => { settingsMenuMain.style.display = 'block'; settingsMenuLang.style.display = 'none'; }, 300); }, 400);
    }));

    // Feedback Logic
    const feedbackBtn = document.querySelector('[data-i18n="settings-feedback"]')?.parentElement?.parentElement;
    if (feedbackBtn) {
        feedbackBtn.addEventListener('click', () => {
            alert(currentLang === 'vi' ? "Cảm ơn bạn đã góp ý! Tính năng này đang được phát triển." : "Thank you for your feedback! This feature is under development.");
            settingsDropdown.classList.remove('active');
        });
    }

    // Other UI
    if (userProfileTrigger) userProfileTrigger.addEventListener('click', (e) => { e.stopPropagation(); userDropdown.classList.toggle('active'); });
    if (navProfileBtn) navProfileBtn.addEventListener('click', openProfile);
    if (avatarUpload) avatarUpload.addEventListener('change', handleAvatarUpload);
    profileTabs.forEach(tab => tab.addEventListener('click', () => {
        profileTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        updateProfileContent(tab.textContent.trim());
    }));
    if (openModalBtn) openModalBtn.addEventListener('click', () => { modal.classList.add('active'); updateModalInfo(); });
    if (closeModalBtn) closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));
    if (searchInput) searchInput.addEventListener('input', handleSearch);

    // Audio Sync
    if (audio) {
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', () => playerEngine.handleEnded(songs, loadSong, playerEngine.playSong, playerEngine.nextSong));
    }

    // 4. Final Start
    stats.recordVisit();
    startClock();
    setLanguage(currentLang);
    ui.renderSongs(songGrid, songs, currentLang, songCountEl, (s) => { 
        playerEngine.setIndex(songs.indexOf(s)); 
        loadSong(s); 
        playerEngine.playSong(); 
    });
    const savedUser = JSON.parse(sessionStorage.getItem('vibraze_session'));
    ui.updateGreeting(greetingText, currentLang, savedUser ? savedUser.name : "");
    loadSong(songs[0]);
    checkAuth();
}

function startClock() {
    const update = () => {
        if (!headerClock) return;
        const now = new Date();
        headerClock.textContent = now.toLocaleTimeString('vi-VN', { hour12: false });
    };
    setInterval(update, 1000);
    update();
}

// Logic Helpers
function loadSong(song) {
    if (!song) return;
    if (player.isPlaying && !audio.paused) stats.recordListen(statTotalListens);
    
    // Recently Played Logic
    let recent = JSON.parse(localStorage.getItem('vibraze_recent')) || [];
    recent = [song.id, ...recent.filter(id => id !== song.id)].slice(0, 20);
    localStorage.setItem('vibraze_recent', JSON.stringify(recent));

    playerTitle.textContent = song.title;
    playerArtist.textContent = song.artist;
    playerImg.src = song.cover;
    audio.src = song.src;
    updateBackgroundColor(song.cover);
    updateLikeButton();
    if (modal && modal.classList.contains('active')) updateModalInfo();
}

function updateProgress() {
    const { duration, currentTime } = audio;
    if (isNaN(duration)) return;
    const progressPercent = (currentTime / duration) * 100;
    if (progressBar) progressBar.value = progressPercent;
    if (progressFilled) progressFilled.style.width = `${progressPercent}%`;
    if (currentTimeEl) currentTimeEl.textContent = player.formatTime(currentTime);
    if (durationTimeEl) durationTimeEl.textContent = player.formatTime(duration);
}

function updateVolumeIcon(v) {
    if (volumeIcon) volumeIcon.className = v === 0 ? 'fa-solid fa-volume-xmark' : v < 0.5 ? 'fa-solid fa-volume-low' : 'fa-solid fa-volume-high';
}

function hideAllSections() {
    if (adminPanel) adminPanel.style.display = 'none';
    if (heroSection) heroSection.style.display = 'none';
    if (songListSection) songListSection.style.display = 'none';
    if (profileSection) profileSection.style.display = 'none';
    document.querySelectorAll('.nav-menu li, .playlists li').forEach(li => li.classList.remove('active'));
}

function switchTab(btn, tab) {
    hideAllSections();
    if (btn) btn.classList.add('active');
    
    if (tab === 'home') {
        heroSection.style.display = 'block';
        songListSection.style.display = 'block';
        ui.renderHomeContent(songGrid, songs, currentLang, songCountEl, (s) => { loadSong(s); playerEngine.playSong(); });
    } else {
        songListSection.style.display = 'block';
        let list;
        if (tab === 'liked') list = songs.filter(s => likedSongs.includes(s.id));
        else if (tab === 'recent') {
            const recentIds = JSON.parse(localStorage.getItem('vibraze_recent')) || [];
            list = recentIds.map(id => songs.find(s => s.id === id)).filter(Boolean);
        } else if (tab === 'explore') list = [...songs].sort(() => 0.5 - Math.random());
        else list = songs;
        
        ui.renderSongs(songGrid, list, currentLang, songCountEl, (s) => { loadSong(s); playerEngine.playSong(); });
    }
}

function showAdminSection(type, btn) {
    hideAllSections();
    if (btn) btn.classList.add('active');
    if (adminPanel) adminPanel.style.display = 'block';
    
    adminMusicTable.style.display = 'none';
    adminUserTable.style.display = 'none';
    adminLogsTable.style.display = 'none';

    if (statTotalSongs) statTotalSongs.textContent = songs.length;
    if (statTotalUsers) statTotalUsers.textContent = auth.users.length;
    if (statVisitors) statVisitors.textContent = stats.totalVisitors.toLocaleString();
    if (statTotalListens) statTotalListens.textContent = stats.totalListens.toLocaleString();

    if (type === 'music') { adminPanelTitle.textContent = "Quản lý bài hát"; adminMusicTable.style.display = 'block'; admin.renderAdminMusic(musicTbody, songs); }
    else if (type === 'users') { adminPanelTitle.textContent = "Danh sách tài khoản"; adminUserTable.style.display = 'block'; admin.renderAdminUsers(userTbody, auth.users); }
    else if (type === 'logs') { adminPanelTitle.textContent = "Lịch sử hệ thống"; adminLogsTable.style.display = 'block'; admin.renderAdminLogs(logsTbody, stats.loginLogs); }
}

function loginUser(user) {
    auth.setCurrentUser(user);
    authOverlay.classList.remove('active');
    headerGuest.style.display = 'none';
    userProfileTrigger.style.display = 'flex';
    ui.updateGreeting(greetingText, currentLang, user.name);
    const avatarApi = `https://ui-avatars.com/api/?name=${user.name}&background=${user.role === 'admin' ? 'f59e0b' : '6366f1'}&color=fff`;
    userAvatar.src = avatarApi;
    
    updateSidebarForRole(user.role);
    if (user.role === 'admin') showAdminSection('music');
    else switchTab(navHomeBtn, 'home');
}

function updateSidebarForRole(role) {
    const userItems = document.querySelectorAll('.user-only');
    const adminItems = document.querySelectorAll('.admin-only');
    const profileBtn = document.getElementById('nav-profile-btn');
    const switchBtn = document.getElementById('switch-admin-btn');
    if (switchBtn) switchBtn.style.display = 'none';

    if (role === 'admin') {
        userItems.forEach(el => el.style.display = 'none');
        adminItems.forEach(el => { if (el.tagName === 'LI') el.style.display = 'flex'; else el.style.display = 'block'; });
        if (profileBtn) profileBtn.style.display = 'none';
    } else {
        userItems.forEach(el => { if (el.tagName === 'LI') el.style.display = 'flex'; else el.style.display = 'block'; });
        adminItems.forEach(el => el.style.display = 'none');
        if (profileBtn) profileBtn.style.display = 'flex';
    }
}

function handleLogout() { sessionStorage.removeItem('vibraze_session'); location.reload(); }

function checkAuth() {
    const savedUser = JSON.parse(sessionStorage.getItem('vibraze_session'));
    if (savedUser) loginUser(savedUser);
    else { headerGuest.style.display = 'flex'; userProfileTrigger.style.display = 'none'; }
}

function handleSearch(e) {
    const term = e.target.value.toLowerCase();
    const list = songs.filter(s => s.title.toLowerCase().includes(term) || s.artist.toLowerCase().includes(term));
    ui.renderSongs(songGrid, list, currentLang, songCountEl, (s) => { loadSong(s); playerEngine.playSong(); });
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('vibraze_lang', lang);
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) el.textContent = translations[lang][key];
    });
    if (searchInput) searchInput.placeholder = translations[lang]['search-placeholder'];
    langOptions.forEach(o => {
        const isActive = o.getAttribute('data-lang') === lang;
        o.classList.toggle('active', isActive);
        o.querySelector('.check-icon').style.display = isActive ? 'inline-block' : 'none';
    });
    const savedUser = JSON.parse(sessionStorage.getItem('vibraze_session'));
    ui.updateGreeting(greetingText, lang, savedUser ? savedUser.name : "");
}

function toggleLike() {
    const id = songs[player.currentSongIndex].id, idx = likedSongs.indexOf(id);
    idx > -1 ? likedSongs.splice(idx, 1) : likedSongs.push(id);
    localStorage.setItem('vibraze_likes', JSON.stringify(likedSongs));
    updateLikeButton();
}

function updateLikeButton() {
    if (!likeIcon) return;
    const liked = likedSongs.includes(songs[player.currentSongIndex].id);
    likeIcon.className = liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
    likeIcon.style.color = liked ? '#ef4444' : 'var(--text-main)';
}

function updateBackgroundColor(src) {
    const c = document.createElement('canvas'), ctx = c.getContext('2d'), img = new Image();
    img.crossOrigin = "Anonymous"; img.src = src;
    img.onload = () => {
        c.width = c.height = 50; ctx.drawImage(img, 0, 0, 50, 50);
        try {
            const d = ctx.getImageData(0, 0, 50, 50).data;
            let r=0, g=0, b=0;
            for(let i=0; i<d.length; i+=4) { r+=d[i]; g+=d[i+1]; b+=d[i+2]; }
            const p = d.length/4;
            document.documentElement.style.setProperty('--dynamic-bg', `rgba(${Math.floor(r/p)-30}, ${Math.floor(g/p)-30}, ${Math.floor(b/p)-30}, 0.8)`);
        } catch(e) { document.documentElement.style.setProperty('--dynamic-bg', '#1e1b4b'); }
    };
}

function openProfile() {
    if (!auth.currentUser) return;
    hideAllSections();
    profileNameDisplay.textContent = auth.currentUser.name;
    profileUsernameDisplay.textContent = `@${auth.currentUser.username}`;
    profileAvatarImg.src = userAvatar.src;
    profileSection.style.display = 'block';
    profileTabs.forEach(t => t.classList.remove('active'));
    profileTabs[0].classList.add('active');
    updateProfileContent('All');
}

function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => { profileAvatarImg.src = event.target.result; userAvatar.src = event.target.result; alert("Avatar đã cập nhật!"); };
        reader.readAsDataURL(file);
    }
}

function updateProfileContent(tabName) {
    profileContentBody.innerHTML = '';
    if (tabName === 'All' || tabName === 'Tracks') {
        const likedList = songs.filter(s => likedSongs.includes(s.id));
        if (likedList.length > 0) {
            likedList.forEach(song => {
                const item = document.createElement('div');
                item.className = 'song-card';
                item.innerHTML = `<div class="img-wrap"><img src="${song.cover}" alt="${song.title}"><div class="play-overlay"><i class="fa-solid fa-play"></i></div></div><h4>${song.title}</h4><p>${song.artist}</p>`;
                item.addEventListener('click', () => { player.currentSongIndex = songs.findIndex(s => s.id === song.id); loadSong(song); playerEngine.playSong(); });
                profileContentBody.appendChild(item);
            });
            profileContentBody.style.display = 'grid'; profileContentBody.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))'; profileContentBody.style.gap = '20px';
        } else {
            profileContentBody.innerHTML = `<div class="empty-state"><i class="fa-solid fa-music"></i><p>Bạn chưa có bài hát nào.</p></div>`;
            profileContentBody.style.display = 'block';
        }
    }
}

function updateModalInfo() {
    const s = songs[player.currentSongIndex];
    if (modalTitle) modalTitle.textContent = s.title;
    if (modalArtist) modalArtist.textContent = s.artist;
    if (modalImg) modalImg.src = s.cover;
}

// Start
init();
