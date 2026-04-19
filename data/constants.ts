export interface Song {
    id: number | string;
    title: string;
    artist: string;
    cover: string;
    src: string;
    isOnline?: boolean;
}

export const songs: Song[] = [
    {
        id: 1,
        title: "4 Mùa Thương Em",
        artist: "Lập Nguyên",
        cover: "/img/4MuaThuongEm.jpg",
        src: "/sound/4MuaThuongEm_LapNguyen.mp3"
    },
    {
        id: 2,
        title: "Anh Thanh Niên",
        artist: "HuyR",
        cover: "/img/AnhThanhNien.jpg",
        src: "/sound/AnhThanhNien_HuyR.mp3"
    },
    {
        id: 3,
        title: "Còn Gì Đẹp Hơn (BCN)",
        artist: "Bùi Công Nam, Nguyễn Hùng",
        cover: "/img/ConGiDepHon_BCN.jpg",
        src: "/sound/ConGiDepHon_BuiCongNam_NguyenHung.mp3"
    },
    {
        id: 4,
        title: "Còn Gì Đẹp Hơn",
        artist: "Nguyễn Hùng",
        cover: "/img/ConGiDepHon.jpg",
        src: "/sound/ConGiDepHon_NguyenHung.mp3"
    },
    {
        id: 5,
        title: "Em Ổn Không",
        artist: "Thiên An",
        cover: "/img/EmOnKhong.jpg",
        src: "/sound/EmOnKhong_ThienAn.mp3"
    },
    {
        id: 6,
        title: "Giờ Thì",
        artist: "Bùi Trường Linh",
        cover: "/img/GioThi.jpg",
        src: "/sound/GioThi_BuiTruongLinh.mp3"
    },
    {
        id: 7,
        title: "Người Có Thương",
        artist: "Đạt Kaa",
        cover: "/img/NguoiCoThuong.jpg",
        src: "/sound/NguoiCoThuong_DatKaa.mp3"
    },
    {
        id: 8,
        title: "Người Em Cố Đô",
        artist: "Rum, Xuân Định",
        cover: "/img/NguoiEmCoDo.jpg",
        src: "/sound/NguoiEmCoDo_Rum_XuanDinh.mp3"
    },
    {
        id: 9,
        title: "Nhà Tôi Có Treo Một Lá Cờ",
        artist: "Hà Anh Tuấn",
        cover: "/img/NhaToiCoTreoMotLaCo.jpg",
        src: "/sound/NhaToiCoTreoMotLaCo_HaAnhTuan.mp3"
    },
    {
        id: 10,
        title: "Phép Màu",
        artist: "Nguyễn Hùng",
        cover: "/img/PhepMau.jpg",
        src: "/sound/PhepMau_NguyenHung.mp3"
    },
    {
        id: 11,
        title: "Phố Cũ Còn Anh",
        artist: "Quinn",
        cover: "/img/PhoCuConAnh.jpg",
        src: "/sound/PhoCuConAnh_Quinn.mp3"
    },
    {
        id: 12,
        title: "Thịnh Vượng Việt Nam Sáng Ngời",
        artist: "V.A",
        cover: "/img/ThinhVuongVietNamSangNgoi.jpg",
        src: "/sound/ThinhVuongVietNamSangNgoi.mp3"
    },
    {
        id: 13,
        title: "Yêu Được Không",
        artist: "Đức Phúc",
        cover: "/img/YeuDuocKhong.jpg",
        src: "/sound/YeuDuocKhong_DucPhuc.mp3"
    }
];

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
        "hero-subtitle": "Hàng ngàn bài hát đang chờ đợi bạn tại Sonify.",
        "btn-play-all": "Phát tất cả",
        "song-list-title": "Danh sách bài hát",
        "song-count": "bài hát",
        "settings-lang": "Ngôn ngữ",
        "settings-feedback": "Góp ý",
        "settings-theme": "Giao diện",
        "settings-back": "Quay lại",
        "profile-title": "Hồ sơ của tôi",
        "profile-tracks": "Bài hát",
        "profile-liked": "Đã thích",
        "nav-profile": "Hồ sơ",
        "nav-logout": "Đăng xuất",
        "lang-en": "English",
        "lang-vi": "Tiếng Việt",
        "nav-admin": "Quản trị viên",
        "nav-user": "Người dùng",
        "theme-dark": "Tối",
        "theme-light": "Sáng",
        "theme-system": "Hệ thống",
        "search-local": "Nhạc trong máy",
        "search-online": "Kết quả trực tuyến",
        "online-track": "Trực tuyến",
        "searching": "Đang tìm kiếm..."
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
        "hero-subtitle": "Thousands of songs are waiting for you at Sonify.",
        "btn-play-all": "Play All",
        "song-list-title": "Song List",
        "song-count": "songs",
        "settings-lang": "Language",
        "settings-feedback": "Feedback",
        "settings-theme": "Theme",
        "settings-back": "Back",
        "profile-title": "My Profile",
        "profile-tracks": "Tracks",
        "profile-liked": "Liked",
        "nav-profile": "Profile",
        "nav-logout": "Logout",
        "lang-en": "English",
        "lang-vi": "Vietnamese",
        "nav-admin": "Admin",
        "nav-user": "User view",
        "theme-dark": "Dark",
        "theme-light": "Light",
        "theme-system": "System",
        "search-local": "Local Songs",
        "search-online": "Online Results",
        "online-track": "Online",
        "searching": "Searching..."
    }
};

export const initialUsers = [
    { username: 'admin', password: '1234', name: 'Quản trị viên', role: 'admin' },
    { username: 'user', password: '123', name: 'người dùng', role: 'user' }
];
