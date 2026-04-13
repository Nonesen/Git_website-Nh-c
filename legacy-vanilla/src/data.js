// Song Data
export const songs = [
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
export const translations = {
    vi: {
        "nav-home": "Trang chủ",
        "nav-recent": "Nghe gần đây",
        "nav-explore": "Khám phá",
        "nav-library": "Thư viện",
        "playlist-title": "PLAYLIST CỦA BẠN",
        "nav-liked": "Bài hát đã thích",
        "search-placeholder": "Tìm kiếm bài hát, nghệ sĩ...",
        "header-login": "Đăng nhập",
        "hero-title": "Khám phá âm nhạc mới",
        "hero-subtitle": "Hàng ngàn bài hát đang chờ đợi bạn tại Vibraze.",
        "btn-play-all": "Phát tất cả",
        "song-list-title": "Danh sách bài hát",
        "song-count": "bài hát",
        "settings-lang": "Ngôn ngữ",
        "settings-feedback": "Góp ý",
        "settings-back": "Quay lại",
        "profile-title": "Hồ sơ của tôi",
        "profile-tracks": "Bài hát",
        "profile-liked": "Đã thích",
        "nav-profile": "Hồ sơ",
        "nav-logout": "Đăng xuất",
        "lang-en": "English",
        "lang-vi": "Tiếng Việt",
        "nav-admin": "Quản trị viên",
        "nav-user": "Người dùng"
    },
    en: {
        "nav-home": "Home",
        "nav-recent": "Recently Played",
        "nav-explore": "Explore",
        "nav-library": "Library",
        "playlist-title": "YOUR PLAYLIST",
        "nav-liked": "Liked Songs",
        "search-placeholder": "Search songs, artists...",
        "header-login": "Sign In",
        "hero-title": "Discover New Music",
        "hero-subtitle": "Thousands of songs are waiting for you at Vibraze.",
        "btn-play-all": "Play All",
        "song-list-title": "Song List",
        "song-count": "songs",
        "settings-lang": "Language",
        "settings-feedback": "Feedback",
        "settings-back": "Back",
        "profile-title": "My Profile",
        "profile-tracks": "Tracks",
        "profile-liked": "Liked",
        "nav-profile": "Profile",
        "nav-logout": "Logout",
        "lang-en": "English",
        "lang-vi": "Vietnamese",
        "nav-admin": "Admin",
        "nav-user": "User view"
    }
};

// Users data (initial)
export const initialUsers = [
    { username: 'admin', password: '123', name: 'Quản trị viên', role: 'admin' },
    { username: 'user', password: '123', name: 'người dùng', role: 'user' }
];
