# Nhật Ký Thay Đổi & Phát Triển - Sonify (18/04/2026)

Tài liệu này ghi nhận toàn bộ các chỉnh sửa và nâng cấp quan trọng đã được thực hiện cho dự án Web Nhạc Sonify trong phiên làm việc hôm nay.

## 1. Khắc Phục Lỗi Hệ Thống (Bug Fixes)
- **Hệ thống Đăng nhập (Authentication)**:
    - Sửa lỗi không cho phép mật khẩu dạng văn bản thuần (plain-text) đăng nhập. Giờ đây các tài khoản mặc định như `user/123`, `admin/1234` đã hoạt động tốt.
    - Cập nhật hiển thị lỗi chi tiết: Người dùng sẽ thấy lý do cụ thể khi đăng nhập thất bại thay vì thông báo chung chung.
- **Trình phát nhạc (Player Stability)**:
    - Khắc phục lỗi âm thanh bị chồng chéo khi chuyển đổi giữa nhạc Online (YouTube) và nhạc Offline (Local).
    - Đồng bộ hóa trạng thái `Play/Pause` giữa các nền tảng phát nhạc khác nhau.

## 2. Nâng Cấp Tính Năng (New Features)
- **Bộ Quét File Tự Động (File Scanner API)**:
    - Phát triển API `/api/files` để quét toàn bộ dữ liệu trong thư mục `public/sound` và `public/img`.
- **Trình Chọn File Chuyên Nghiệp (Interactive File Picker)**:
    - Thay thế các ô nhập liệu thủ công bằng giao diện **Duyệt File Modal**.
    - **Xem trước ảnh (Image Preview)**: Cho phép xem hình thu nhỏ của ảnh bìa ngay trong lúc chọn.
    - **Tìm kiếm (Search)**: Tích hợp thanh tìm kiếm file ngay trong cửa sổ chọn nhạc/ảnh.
    - **Smart-Fill**: Tự động trích xuất tên bài hát từ tên file để điền vào Tiêu đề.
- **Hỗ Trợ Nguồn Nhạc Đa Dạng**:
    - Cho phép bài hát tự thêm thủ công sử dụng link YouTube trực tiếp (Tự động nhận diện URL).
    - Tương thích tốt với các link chia sẻ file nhạc.

## 3. Quy Trình Kỹ Thuật (Technical Updates)
- **TypeScript**: Sửa lỗi Type Check trong `AuthContext` để đảm bảo dự án build thành công 100% trên Vercel.
- **Build & Lint**: Đã chạy `npm run lint` và `npm run build` thành công trên máy cục bộ trước khi triển khai.
- **Deployment**: Đã đẩy (Push) toàn bộ phiên bản ổn định nhất lên GitHub Main Branch để Vercel tự động cập nhật bản Live.

---
**Ghi chú**: Phiên bản hiện tại đã sẵn sàng để sử dụng cho cả người dùng và quản trị viên.
**Người thực hiện**: Antigravity AI (Pair Programming)
