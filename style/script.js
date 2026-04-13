// Song Data
const songs = [
    {
        id: 1,
        title: "4 Mùa Thương Em",
        artist: "Lập Nguyên",
        cover: "style/img/4MuaThuongEm.jpg",
        src: "style/sound/4MuaThuongEm_LapNguyen.mp3"
    },
    {
        id: 2,
        title: "Anh Thanh Niên",
        artist: "HuyR",
        cover: "style/img/AnhThanhNien.jpg",
        src: "style/sound/AnhThanhNien_HuyR.mp3"
    },
    {
        id: 3,
        title: "Còn Gì Đẹp Hơn (BCN)",
        artist: "Bùi Công Nam, Nguyễn Hùng",
        cover: "style/img/ConGiDepHon_BCN.jpg",
        src: "style/sound/ConGiDepHon_BuiCongNam_NguyenHung.mp3"
    },
    {
        id: 4,
        title: "Còn Gì Đẹp Hơn",
        artist: "Nguyễn Hùng",
        cover: "style/img/ConGiDepHon.jpg",
        src: "style/sound/ConGiDepHon_NguyenHung.mp3"
    },
    {
        id: 5,
        title: "Em Ổn Không",
        artist: "Thiên An",
        cover: "style/img/EmOnKhong.jpg",
        src: "style/sound/EmOnKhong_ThienAn.mp3"
    },
    {
        id: 6,
        title: "Giờ Thì",
        artist: "Bùi Trường Linh",
        cover: "style/img/GioThi.jpg",
        src: "style/sound/GioThi_BuiTruongLinh.mp3"
    },
    {
        id: 7,
        title: "Người Có Thương",
        artist: "Đạt Kaa",
        cover: "style/img/NguoiCoThuong.jpg",
        src: "style/sound/NguoiCoThuong_DatKaa.mp3"
    },
    {
        id: 8,
        title: "Người Em Cố Đô",
        artist: "Rum, Xuân Định",
        cover: "style/img/NguoiEmCoDo.jpg",
        src: "style/sound/NguoiEmCoDo_Rum_XuanDinh.mp3"
    },
    {
        id: 9,
        title: "Nhà Tôi Có Treo Một Lá Cờ",
        artist: "Hà Anh Tuấn",
        cover: "style/img/NhaToiCoTreoMotLaCo.jpg",
        src: "style/sound/NhaToiCoTreoMotLaCo_HaAnhTuan.mp3"
    },
    {
        id: 10,
        title: "Phép Màu",
        artist: "Nguyễn Hùng",
        cover: "style/img/PhepMau.jpg",
        src: "style/sound/PhepMau_NguyenHung.mp3"
    },
    {
        id: 11,
        title: "Phố Cũ Còn Anh",
        artist: "Quinn",
        cover: "style/img/PhoCuConAnh.jpg",
        src: "style/sound/PhoCuConAnh_Quinn.mp3"
    },
    {
        id: 12,
        title: "Thịnh Vượng Việt Nam Sáng Ngời",
        artist: "V.A",
        cover: "style/img/ThinhVuongVietNamSangNgoi.jpg",
        src: "style/sound/ThinhVuongVietNamSangNgoi.mp3"
    },
    {
        id: 13,
        title: "Yêu Được Không",
        artist: "Đức Phúc",
        cover: "style/img/YeuDuocKhong.jpg",
        src: "style/sound/YeuDuocKhong_DucPhuc.mp3"
    }
];

// Translations
const translations = {
    vi: {
        "nav-home": "Trang chủ",
        "nav-explore": "Khám phá",
        "nav-library": "Thư viện",
        "playlist-title": "PLAYLIST CỦA BẠN",
        "nav-liked": "Bài hát đã thích",
        "header-login": "Đăng nhập",
        "settings-lang": "Ngôn ngữ",
        "settings-feedback": "Góp ý",
        "settings-back": "Quay lại",
        "hero-title": "Khám phá âm nhạc mới",
        "hero-subtitle": "Hàng ngàn bài hát đang chờ đợi bạn tại Vibraze.",
        "btn-play-all": "Phát tất cả",
        "song-list-title": "Danh sách bài hát",
        "song-count": "bài hát",
        "nav-profile": "Hồ sơ",
        "nav-admin": "Chuyển sang Admin",
        "nav-logout": "Đăng xuất"
    },
    en: {
        "nav-home": "Home",
        "nav-explore": "Explore",
        "nav-library": "Library",
        "playlist-title": "YOUR PLAYLIST",
        "nav-liked": "Liked Songs",
        "header-login": "Log in",
        "settings-lang": "Language",
        "settings-feedback": "Feedback",
        "settings-back": "Back",
        "hero-title": "Discover new music",
        "hero-subtitle": "Thousands of songs are waiting for you on Vibraze.",
        "btn-play-all": "Play All",
        "song-list-title": "Song List",
        "song-count": "songs",
        "nav-profile": "Profile",
        "nav-admin": "Switch to Admin",
        "nav-logout": "Log out"
    }
};

// State
let currentLang = localStorage.getItem('vibraze_lang') || 'vi';
let currentSongIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;
let currentRole = 'user';
let currentUser = null;

// Mock User Database
const defaultUsers = [
    { username: 'admin', password: 'admin123', name: 'Quản trị viên', role: 'admin' },
    { username: 'user', password: 'user123', name: 'Người dùng Demo', role: 'user' }
];
let users = JSON.parse(localStorage.getItem('vibraze_users')) || defaultUsers;

// Ensure defaults exist
defaultUsers.forEach(def => {
    if (!users.find(u => u.username === def.username)) users.push(def);
});
localStorage.setItem('vibraze_users', JSON.stringify(users));

// Global References
let audio, playPauseBtn, prevBtn, nextBtn, shuffleBtn, repeatBtn, progressBar, progressFilled;
let currentTimeEl, durationTimeEl, volumeBar, volumeIcon, songGrid, searchInput, greetingText;
let songCountEl, navHomeBtn, navExploreBtn, navLibraryBtn, navLikedBtn, btnPlayAll, likeBtn;
let likeIcon, roleBadge, switchAdminBtn, adminPanel, heroSection, songListSection, userAvatar;
let authOverlay, mainApp, loginForm, signupForm, toSignup, toLogin, logoutBtn, headerGuest, headerLoginBtn, closeAuthBtn;
let loginUserInp, loginPassInp, signupNameInp, signupEmailInp, signupPhoneInp, signupUserInp, signupPassInp, loginSubmit, signupSubmit;
let toggleLoginPass, toggleSignupPass;
let playerTitle, playerArtist, playerImg, modal, openModalBtn, closeModalBtn, modalTitle, modalArtist, modalImg, discWrapper;
let profileSection, profileAvatarImg, profileNameDisplay, profileUsernameDisplay, navProfileBtn, avatarUpload;
let profileTabs, profileContentBody, userDropdown, userProfileTrigger;
let settingsTrigger, settingsDropdown, settingsMenuMain, settingsMenuLang, langMenuBtn, langBackBtn, langOptions;
let musicTbody, userTbody, logsTbody, adminMusicTable, adminUserTable, adminLogsTable, adminPanelTitle;
let statVisitors, statTotalSongs, statTotalUsers, statTotalListens;

let loginLogs = JSON.parse(localStorage.getItem('vibraze_login_logs')) || [];
let totalVisitors = parseInt(localStorage.getItem('vibraze_visitor_count')) || 0;
let totalListens = parseInt(localStorage.getItem('vibraze_listen_count')) || 0;



let likedSongs = JSON.parse(localStorage.getItem('vibraze_likes')) || [];

function init() {
    // Select Elements
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
    songCountEl = document.getElementById('song-count');
    navHomeBtn = document.getElementById('nav-home');
    navExploreBtn = document.getElementById('nav-explore');
    navLibraryBtn = document.getElementById('nav-library');
    navLikedBtn = document.getElementById('nav-liked');
    btnPlayAll = document.getElementById('btn-play-all');
    likeBtn = document.querySelector('.like-btn');
    if (likeBtn) likeIcon = likeBtn.querySelector('i');
    roleBadge = document.getElementById('role-badge');
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
    
    // Profile Elements
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

    // Settings Dropdown Elements
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

    // Admin Sidebar Listeners
    const navAdminManage = document.getElementById('nav-admin-manage');
    const navAdminUsers = document.getElementById('nav-admin-users');
    const navAdminStats = document.getElementById('nav-admin-stats');

    if (navAdminManage) navAdminManage.addEventListener('click', () => showAdminSection('music', navAdminManage));
    if (navAdminUsers) navAdminUsers.addEventListener('click', () => showAdminSection('users', navAdminUsers));
    if (navAdminStats) navAdminStats.addEventListener('click', () => showAdminSection('logs', navAdminStats));

    // Track Visit
    recordVisit();

    // Logo Reload
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => location.reload());
    }




    // Attach Main Interaction Listeners
    if (loginSubmit) loginSubmit.addEventListener('click', handleLogin);
    if (signupSubmit) signupSubmit.addEventListener('click', handleSignup);
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    
    if (headerLoginBtn) headerLoginBtn.addEventListener('click', () => {
        authOverlay.classList.add('active');
    });

    if (closeAuthBtn) closeAuthBtn.addEventListener('click', () => {
        authOverlay.classList.remove('active');
    });

    if (toSignup) toSignup.addEventListener('click', () => {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    });
    
    if (toLogin) toLogin.addEventListener('click', () => {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    });

    if (toggleLoginPass) toggleLoginPass.addEventListener('click', () => togglePasswordVisibility(loginPassInp, toggleLoginPass));
    if (toggleSignupPass) toggleSignupPass.addEventListener('click', () => togglePasswordVisibility(signupPassInp, toggleSignupPass));

    if (loginUserInp) loginUserInp.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleLogin(); });
    if (loginPassInp) loginPassInp.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleLogin(); });

    if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlay);
    if (nextBtn) nextBtn.addEventListener('click', nextSong);
    if (prevBtn) prevBtn.addEventListener('click', prevSong);
    if (shuffleBtn) shuffleBtn.addEventListener('click', toggleShuffle);
    if (repeatBtn) repeatBtn.addEventListener('click', toggleRepeat);
    if (likeBtn) likeBtn.addEventListener('click', toggleLike);
    
    if (navHomeBtn) navHomeBtn.addEventListener('click', () => switchTab(navHomeBtn, 'home'));
    if (navExploreBtn) navExploreBtn.addEventListener('click', () => switchTab(navExploreBtn, 'explore'));
    if (navLibraryBtn) navLibraryBtn.addEventListener('click', () => switchTab(navLibraryBtn, 'library'));
    if (navLikedBtn) navLikedBtn.addEventListener('click', () => switchTab(navLikedBtn, 'liked'));
    
    if (btnPlayAll) btnPlayAll.addEventListener('click', () => {
        currentSongIndex = 0;
        loadSong(songs[0]);
        playSong();
    });

    if (switchAdminBtn) switchAdminBtn.addEventListener('click', toggleRole);
    
    if (userProfileTrigger) {
        userProfileTrigger.addEventListener('click', (e) => {
            console.log("Profile trigger clicked");
            e.stopPropagation();
            userDropdown.classList.toggle('active');
        });
    }

    // Stop propagation on dropdown content to prevent it from closing itself when clicked
    if (userDropdown) {
        userDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    if (navProfileBtn) navProfileBtn.addEventListener('click', () => {
        userDropdown.classList.remove('active');
        openProfile();
    });

    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);

    // Close dropdown on outside click
    window.addEventListener('click', () => {
        if (userDropdown && userDropdown.classList.contains('active')) {
            userDropdown.classList.remove('active');
        }
        if (settingsDropdown && settingsDropdown.classList.contains('active')) {
            settingsDropdown.classList.remove('active');
            // reset menu view
            setTimeout(() => {
                settingsMenuMain.style.display = 'block';
                settingsMenuLang.style.display = 'none';
            }, 300);
        }
    });

    // Settings Dropdown Logic
    if (settingsTrigger) {
        settingsTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            settingsDropdown.classList.toggle('active');
        });
    }

    if (settingsDropdown) {
        settingsDropdown.addEventListener('click', (e) => e.stopPropagation());
    }

    if (langMenuBtn) {
        langMenuBtn.addEventListener('click', () => {
            settingsMenuMain.style.display = 'none';
            settingsMenuLang.style.display = 'block';
        });
    }

    if (langBackBtn) {
        langBackBtn.addEventListener('click', () => {
            settingsMenuLang.style.display = 'none';
            settingsMenuMain.style.display = 'block';
        });
    }

    if (langOptions) {
        langOptions.forEach(opt => {
            opt.addEventListener('click', () => {
                const lang = opt.getAttribute('data-lang');
                setLanguage(lang);
                
                langOptions.forEach(o => {
                    o.classList.remove('active');
                    o.querySelector('.check-icon').style.display = 'none';
                });
                opt.classList.add('active');
                opt.querySelector('.check-icon').style.display = 'inline-block';
                
                // close dropdown after selection
                setTimeout(() => {
                    settingsDropdown.classList.remove('active');
                    setTimeout(() => {
                        settingsMenuMain.style.display = 'block';
                        settingsMenuLang.style.display = 'none';
                    }, 300);
                }, 400);
            });
        });
    }

    if (avatarUpload) avatarUpload.addEventListener('change', handleAvatarUpload);
    
    profileTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            profileTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            updateProfileContent(tab.textContent.trim());
        });
    });

    if (audio) {
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', handleEnded);
    }
    if (progressBar) progressBar.addEventListener('input', setProgress);
    if (volumeBar) volumeBar.addEventListener('input', setVolume);
    if (searchInput) searchInput.addEventListener('input', handleSearch);
    
    if (openModalBtn) openModalBtn.addEventListener('click', () => {
        modal.classList.add('active');
        updateModalInfo();
    });
    
    if (closeModalBtn) closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Start App State
    renderSongs(songs);
    updateGreeting();
    setLanguage(currentLang);
    loadSong(songs[currentSongIndex]);
    checkAuth();
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('vibraze_lang', lang);
    
    // Update active state in sub-menu on load
    if (langOptions) {
        langOptions.forEach(o => {
            if (o.getAttribute('data-lang') === lang) {
                o.classList.add('active');
                o.querySelector('.check-icon').style.display = 'inline-block';
            } else {
                o.classList.remove('active');
                o.querySelector('.check-icon').style.display = 'none';
            }
        });
    }
    
    document.documentElement.lang = lang;
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    // special case for search placeholder
    const searchInp = document.getElementById('search-input');
    if (searchInp) {
        searchInp.placeholder = lang === 'en' ? "Search songs, artists..." : "Tìm kiếm bài hát, nghệ sĩ...";
    }
}

function togglePasswordVisibility(input, icon) {
    const isPass = input.type === 'password';
    input.type = isPass ? 'text' : 'password';
    icon.className = isPass ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash';
}

function checkAuth() {
    const savedUser = JSON.parse(sessionStorage.getItem('vibraze_session'));
    if (savedUser) {
        loginUser(savedUser);
    } else {
        headerGuest.style.display = 'flex';
        userProfileTrigger.style.display = 'none';
        authOverlay.classList.remove('active');
    }
}

function handleLogin() {
    const uVal = loginUserInp.value;
    const pVal = loginPassInp.value;
    const user = users.find(u => u.username === uVal && u.password === pVal);
    if (user) {
        recordLoginLog(user.username);
        loginUser(user);
    } else {
        alert("Sai tài khoản hoặc mật khẩu!");
    }
}


function handleSignup() {
    const name = signupNameInp.value;
    const email = signupEmailInp.value;
    const phone = signupPhoneInp.value;
    const user = signupUserInp.value;
    const pass = signupPassInp.value;
    
    if (!name || !user || !pass || !email || !phone) return alert("Vui lòng điền đủ thông tin!");
    if (users.find(u => u.username === user)) return alert("Username đã tồn tại!");
    
    const newUser = { 
        username: user, 
        password: pass, 
        name: name, 
        email: email, 
        phone: phone, 
        role: 'user' 
    };
    users.push(newUser);
    localStorage.setItem('vibraze_users', JSON.stringify(users));
    alert("Đăng ký thành công! Hãy đăng nhập.");
    toLogin.click();
}

function loginUser(user) {
    currentUser = user;
    currentRole = user.role;
    sessionStorage.setItem('vibraze_session', JSON.stringify(user));
    
    authOverlay.classList.remove('active');
    headerGuest.style.display = 'none';
    userProfileTrigger.style.display = 'flex';
    
    greetingText.textContent = `Chào ${user.name}`;
    roleBadge.textContent = user.role;
    roleBadge.style.background = user.role === 'admin' ? '#f59e0b' : 'var(--primary-color)';
    userAvatar.src = `https://ui-avatars.com/api/?name=${user.name}&background=${user.role === 'admin' ? 'f59e0b' : '6366f1'}&color=fff`;
    
    if (user.role === 'admin') {
        updateSidebarForRole('admin');
        showAdminSection('music'); // Default admin view
    } else {
        updateSidebarForRole('user');
        switchTab(navHomeBtn, 'home');
    }
}

function updateSidebarForRole(role) {
    const userItems = document.querySelectorAll('.user-only');
    const adminItems = document.querySelectorAll('.admin-only');
    
    // Select dropdown buttons
    const profileBtn = document.getElementById('nav-profile-btn');
    const switchBtn = document.getElementById('switch-admin-btn');

    // Always hide the switch button as per latest request
    if (switchBtn) switchBtn.style.display = 'none';

    if (role === 'admin') {
        userItems.forEach(el => el.style.display = 'none');
        adminItems.forEach(el => el.style.display = 'flex');
        
        // Admin: Only Logout is needed (Profile hidden)
        if (profileBtn) profileBtn.style.display = 'none';
    } else {
        userItems.forEach(el => el.style.display = 'flex');
        adminItems.forEach(el => el.style.display = 'none');
        
        // User: Profile and Logout needed
        if (profileBtn) profileBtn.style.display = 'flex';
    }
}

function hideAllSections() {
    if (adminPanel) adminPanel.style.display = 'none';
    if (heroSection) heroSection.style.display = 'none';
    if (songListSection) songListSection.style.display = 'none';
    if (profileSection) profileSection.style.display = 'none';
    
    // Reset sidebar active states
    document.querySelectorAll('.nav-menu li, .playlists li').forEach(li => li.classList.remove('active'));
}

function switchTab(btn, tab) {
    hideAllSections();
    if (btn) btn.classList.add('active');
    
    if (searchInput) searchInput.value = '';
    const list = tab === 'liked' ? songs.filter(s => likedSongs.includes(s.id)) : tab === 'explore' ? [...songs].sort(() => 0.5 - Math.random()) : songs;
    renderSongs(list);
    
    const isHome = tab === 'home';
    if (songListSection) songListSection.style.display = 'block';
    if (heroSection) heroSection.style.display = isHome ? 'block' : 'none';
}

function showAdminSection(type, btn) {
    hideAllSections();
    if (btn) btn.classList.add('active');

    if (adminPanel) adminPanel.style.display = 'block';
    
    adminMusicTable.style.display = 'none';
    adminUserTable.style.display = 'none';
    adminLogsTable.style.display = 'none';

    // Update real stats
    if (statTotalSongs) statTotalSongs.textContent = songs.length;
    if (statTotalUsers) statTotalUsers.textContent = users.length;
    if (statVisitors) statVisitors.textContent = totalVisitors.toLocaleString();
    if (statTotalListens) statTotalListens.textContent = totalListens.toLocaleString();

    if (type === 'music') {
        adminPanelTitle.textContent = "Quản lý bài hát";
        adminMusicTable.style.display = 'block';
        renderAdminMusic();
    } else if (type === 'users') {
        adminPanelTitle.textContent = "Danh sách tài khoản";
        adminUserTable.style.display = 'block';
        renderAdminUsers();
    } else if (type === 'logs') {
        adminPanelTitle.textContent = "Lịch sử hệ thống";
        adminLogsTable.style.display = 'block';
        renderAdminLogs();
    }
}

async function recordLoginLog(username) {
    let location = "Unknown";
    try {
        const resp = await fetch('https://ipapi.co/json/');
        const data = await resp.json();
        location = `${data.city}, ${data.country_name}`;
    } catch (e) {
        location = "Vị trí không xác định";
    }

    const newLog = {
        user: username,
        time: new Date().toLocaleString('vi-VN'),
        location: location,
        device: getDeviceFromUA()
    };
    
    loginLogs.unshift(newLog);
    if (loginLogs.length > 50) loginLogs.pop();
    localStorage.setItem('vibraze_login_logs', JSON.stringify(loginLogs));
}

function recordVisit() {
    if (!sessionStorage.getItem('vibraze_visit_tracked')) {
        totalVisitors++;
        localStorage.setItem('vibraze_visitor_count', totalVisitors);
        sessionStorage.setItem('vibraze_visit_tracked', 'true');
    }
}

function recordListen() {
    totalListens++;
    localStorage.setItem('vibraze_listen_count', totalListens);
    // Update display if currently in admin panel
    if (statTotalListens) statTotalListens.textContent = totalListens.toLocaleString();
}


function getDeviceFromUA() {
    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) return "Mobile Device";
    if (/tablet/i.test(ua)) return "Tablet Device";
    return "Desktop / PC";
}

function renderAdminMusic() {
    if (!musicTbody) return;
    musicTbody.innerHTML = '';
    songs.forEach(song => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>#${song.id}</td>
            <td><img src="${song.cover}" alt=""></td>
            <td>${song.title}</td>
            <td>${song.artist}</td>
            <td>
                <div class="admin-actions">
                    <button class="btn-action" title="Sửa"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn-action delete" title="Xóa"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        `;
        musicTbody.appendChild(tr);
    });
}

function renderAdminUsers() {
    if (!userTbody) return;
    userTbody.innerHTML = '';
    users.forEach(u => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${u.username}</td>
            <td>${u.name}</td>
            <td>${u.email || 'N/A'}</td>
            <td><span class="role-badge" style="background: ${u.role === 'admin' ? '#f59e0b' : 'var(--primary-color)'}; font-size: 0.6rem;">${u.role}</span></td>
            <td>
                <div class="admin-actions">
                    <button class="btn-action" title="Chỉnh sửa"><i class="fa-solid fa-user-pen"></i></button>
                    <button class="btn-action delete" title="Khóa"><i class="fa-solid fa-ban"></i></button>
                </div>
            </td>
        `;
        userTbody.appendChild(tr);
    });
}

function renderAdminLogs() {
    if (!logsTbody) return;
    logsTbody.innerHTML = '';
    loginLogs.forEach(log => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${log.user}</strong></td>
            <td>${log.time}</td>
            <td>${log.location}</td>
            <td><i class="fa-solid fa-desktop"></i> ${log.device}</td>
        `;
        logsTbody.appendChild(tr);
    });
}

function handleLogout() {
    sessionStorage.removeItem('vibraze_session');
    location.reload();
}

function renderSongs(songsToRender) {
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
        card.addEventListener('click', () => {
            currentSongIndex = songs.findIndex(s => s.id === song.id);
            loadSong(song);
            playSong();
        });
        songGrid.appendChild(card);
    });
    if (songCountEl) {
        const txt = currentLang === 'en' ? 'songs' : 'bài hát';
        songCountEl.innerHTML = `${songsToRender.length} <span data-i18n="song-count">${txt}</span>`;
    }
}

function toggleRole() {
    hideAllSections();
    if (currentRole === 'admin') {
        currentRole = 'user';
        if (switchAdminBtn) switchAdminBtn.innerHTML = '<i class="fa-solid fa-shield"></i> <span data-i18n="nav-admin">Chuyển sang Admin</span>';
        updateSidebarForRole('user');
        switchTab(navHomeBtn, 'home');
    } else {
        currentRole = 'admin';
        if (switchAdminBtn) switchAdminBtn.innerHTML = '<i class="fa-solid fa-user"></i> <span data-i18n="nav-user">Chuyển sang User</span>';
        updateSidebarForRole('admin');
        showAdminSection('music');
    }
    
    if (userDropdown) userDropdown.classList.remove('active');
    
    if (currentUser) {
        currentUser.role = currentRole;
        roleBadge.textContent = currentRole;
        roleBadge.style.background = currentRole === 'admin' ? '#f59e0b' : 'var(--primary-color)';
        userAvatar.src = `https://ui-avatars.com/api/?name=${currentUser.name}&background=${currentRole === 'admin' ? 'f59e0b' : '6366f1'}&color=fff`;
        profileAvatarImg.src = `https://ui-avatars.com/api/?name=${currentUser.name}&background=${currentRole === 'admin' ? 'f59e0b' : '6366f1'}&color=fff&size=200`;
    }
}

function loadSong(song) {
    if (!song || !playerTitle) return;
    
    // If a song is currently playing, treat switching as 1 listen
    if (isPlaying && audio && !audio.paused) {
        recordListen();
    }

    playerTitle.textContent = song.title;
    playerArtist.textContent = song.artist;
    playerImg.src = song.cover;
    audio.src = song.src;
    updateBackgroundColor(song.cover);
    updateLikeButton();
    if (modal && modal.classList.contains('active')) updateModalInfo();
}


function playSong() {
    isPlaying = true;
    if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    document.body.classList.add('playing');
    if (audio) audio.play();
}

function pauseSong() {
    isPlaying = false;
    if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    document.body.classList.remove('playing');
    if (audio) audio.pause();
}

function togglePlay() { isPlaying ? pauseSong() : playSong(); }

function nextSong() {
    currentSongIndex = isShuffle ? Math.floor(Math.random() * songs.length) : (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
}

function updateProgress() {
    if (!audio) return;
    const { duration, currentTime } = audio;
    if (isNaN(duration)) return;
    const progressPercent = (currentTime / duration) * 100;
    if (progressBar) progressBar.value = progressPercent;
    if (progressFilled) progressFilled.style.width = `${progressPercent}%`;
    if (currentTimeEl) currentTimeEl.textContent = formatTime(currentTime);
    if (durationTimeEl) durationTimeEl.textContent = formatTime(duration);
}

function setProgress() {
    if (audio && progressBar) audio.currentTime = (progressBar.value / 100) * audio.duration;
}

function formatTime(time) {
    const m = Math.floor(time / 60), s = Math.floor(time % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

function setVolume() {
    if (!audio || !volumeBar) return;
    const v = volumeBar.value / 100;
    audio.volume = v;
    if (volumeIcon) volumeIcon.className = v === 0 ? 'fa-solid fa-volume-xmark' : v < 0.5 ? 'fa-solid fa-volume-low' : 'fa-solid fa-volume-high';
}

function toggleShuffle() { isShuffle = !isShuffle; shuffleBtn.classList.toggle('active', isShuffle); }
function toggleRepeat() { isRepeat = !isRepeat; repeatBtn.classList.toggle('active', isRepeat); }
function handleEnded() { 
    recordListen(); // Count listen on finish
    isRepeat ? playSong() : nextSong(); 
}

function handleSearch(e) {
    const term = e.target.value.toLowerCase();
    renderSongs(songs.filter(s => s.title.toLowerCase().includes(term) || s.artist.toLowerCase().includes(term)));
}

function updateGreeting() {
    const h = new Date().getHours();
    let txtVI = h < 12 ? "Chào buổi sáng" : h < 18 ? "Chào buổi chiều" : "Chào buổi tối";
    let txtEN = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
    if (greetingText) {
        greetingText.textContent = currentLang === 'en' ? txtEN : txtVI;
    }
}

function toggleLike() {
    const id = songs[currentSongIndex].id, idx = likedSongs.indexOf(id);
    idx > -1 ? likedSongs.splice(idx, 1) : likedSongs.push(id);
    localStorage.setItem('vibraze_likes', JSON.stringify(likedSongs));
    updateLikeButton();
}

function updateLikeButton() {
    if (!likeIcon) return;
    const liked = likedSongs.includes(songs[currentSongIndex].id);
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

function updateModalInfo() {
    if (!modalTitle) return;
    const s = songs[currentSongIndex];
    modalTitle.textContent = s.title;
    modalArtist.textContent = s.artist;
    modalImg.src = s.cover;
}

function openProfile() {
    if (!currentUser) return;
    hideAllSections();
    profileNameDisplay.textContent = currentUser.name;
    profileUsernameDisplay.textContent = `@${currentUser.username}`;
    profileAvatarImg.src = `https://ui-avatars.com/api/?name=${currentUser.name}&background=${currentUser.role === 'admin' ? 'f59e0b' : '6366f1'}&color=fff&size=200`;
    profileSection.style.display = 'block';
    profileTabs.forEach(t => t.classList.remove('active'));
    profileTabs[0].classList.add('active');
    updateProfileContent('All');
}

function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            profileAvatarImg.src = event.target.result;
            userAvatar.src = event.target.result;
            alert("Avatar đã được cập nhật thành công!");
        };
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
                item.innerHTML = `
                    <div class="img-wrap">
                        <img src="${song.cover}" alt="${song.title}">
                        <div class="play-overlay"><i class="fa-solid fa-play"></i></div>
                    </div>
                    <h4>${song.title}</h4>
                    <p>${song.artist}</p>`;
                item.addEventListener('click', () => {
                    currentSongIndex = songs.findIndex(s => s.id === song.id);
                    loadSong(song);
                    playSong();
                });
                profileContentBody.appendChild(item);
            });
            profileContentBody.style.display = 'grid';
            profileContentBody.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
            profileContentBody.style.gap = '20px';
        } else {
            profileContentBody.innerHTML = `<div class="empty-state"><i class="fa-solid fa-music"></i><p>Bạn chưa có bài hát nào ở mục này.</p></div>`;
            profileContentBody.style.display = 'block';
        }
    } else {
        profileContentBody.innerHTML = `<div class="empty-state"><i class="fa-solid fa-folder-open"></i><p>Mục "${tabName}" hiện đang trống.</p></div>`;
        profileContentBody.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', init);
