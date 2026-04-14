# 🎵 Vibraze — Premium Music Experience

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel" />
</div>

<br/>

> Ứng dụng nghe nhạc trực tuyến cao cấp, được xây dựng với thiết kế glassmorphism và trải nghiệm người dùng hiện đại — không cần cài đặt, không cần local server.

## 🔗 Live Demo

**[▶ Mở Vibraze trực tuyến](https://git-website-nh-c.vercel.app)**

---

## ✨ Tính năng nổi bật

| Tính năng | Mô tả |
|---|---|
| 🎵 **Music Player** | Phát nhạc đầy đủ tính năng: play/pause, skip, shuffle, repeat |
| 🌈 **Dynamic Background** | Nền web tự động đổi màu theo bìa album đang phát (như Apple Music) |
| ❤️ **Persistent Favorites** | Lưu bài hát yêu thích bền vào localStorage |
| 📋 **Queue Panel** | Xem hàng chờ bài hát, click để phát bất kỳ bài nào |
| 🌐 **Đa ngôn ngữ** | Hỗ trợ Tiếng Việt & English |
| 🌙 **Dark / Light Mode** | Chuyển đổi chủ đề sáng/tối mượt mà |
| 👤 **Hệ thống tài khoản** | Đăng nhập user/admin, session được ghi nhớ |
| 🔐 **Admin Panel** | Quản lý nhạc, người dùng và xem thống kê (dành cho admin) |
| 📊 **Lịch sử nghe** | Ghi nhớ bài đã nghe gần đây |
| 📱 **Responsive** | Giao diện tương thích mọi màn hình |

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) + App Router
- **UI:** React 19 + TypeScript 5 + Vanilla CSS
- **State:** React Context API (Player, Auth, Theme, Language)
- **Fonts:** Inter + Plus Jakarta Sans (Google Fonts)
- **Icons:** Font Awesome 6
- **Deployment:** [Vercel](https://vercel.com) — auto-deploy on every push to `main`

---

## 🚀 Tài khoản Demo

| Username | Password | Vai trò |
|---|---|---|
| `admin` | `admin123` | Admin (toàn quyền) |
| `user` | `user123` | Người dùng |

---

## 💻 Chạy local (tùy chọn)

```bash
# Clone repo
git clone https://github.com/Nonesen/Git_website-Nh-c.git
cd Git_website-Nh-c/Vibraze

# Cài đặt
npm install

# Chạy dev server
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt.

> **Lưu ý:** Bạn **không cần** chạy local để dùng ứng dụng — chỉ cần mở link Vercel bên trên là đủ!

---

## 📁 Cấu trúc dự án

```
Vibraze/
├── app/
│   ├── layout.tsx       # Root layout + Providers
│   ├── page.tsx         # Main page
│   └── globals.css      # Global styles
├── components/
│   ├── Header.tsx       # Thanh điều hướng + Settings
│   ├── Sidebar.tsx      # Menu điều hướng trái
│   ├── PlayerBar.tsx    # Thanh phát nhạc phía dưới
│   ├── QueuePanel.tsx   # Panel hàng chờ bài hát
│   ├── Background.tsx   # Dynamic background theo album
│   ├── SongCard.tsx     # Card từng bài hát
│   ├── SongGrid.tsx     # Grid danh sách nhạc
│   ├── Profile.tsx      # Trang hồ sơ người dùng
│   ├── AdminPanel.tsx   # Bảng quản trị
│   └── AuthModal.tsx    # Modal đăng nhập
├── context/
│   ├── PlayerContext.tsx   # State phát nhạc + Likes
│   ├── AuthContext.tsx     # State xác thực
│   ├── ThemeContext.tsx    # State giao diện
│   └── LanguageContext.tsx # State ngôn ngữ
└── data/
    └── constants.ts     # Dữ liệu bài hát + bản dịch
```

---

## 🔄 Deployment

Dự án được tự động deploy lên **Vercel** mỗi khi có push lên nhánh `main`.  
Không cần thao tác thủ công — commit & push là website cập nhật ngay.

```
main branch → Vercel auto-build → Live in ~30s
```
