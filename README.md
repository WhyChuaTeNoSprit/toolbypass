# Vietnam Link Analyzer

Công cụ frontend tĩnh bằng HTML, CSS và JavaScript để kiểm tra cấu trúc URL và sắp xếp chuỗi URL mà bạn đã quan sát được.

## Tính năng

- Phân tích tên miền, giao thức, đường dẫn và tham số truy vấn.
- Cảnh báo một số dấu hiệu cơ bản như HTTP, IDN và URL có tham số.
- Kiểm tra danh sách URL thủ công, mỗi dòng một địa chỉ.
- Không gửi URL đến máy chủ; mọi phân tích chạy trong trình duyệt.
- Không cần cài Node.js, không cần API key.

## Chạy trên máy tính

1. Tải hoặc giải nén dự án.
2. Mở `index.html` bằng trình duyệt hiện đại.
3. Dán URL và chọn **Phân tích URL**.

## Đưa lên GitHub Pages

1. Tạo repository mới tại https://github.com/new, ví dụ `vietnam-link-analyzer`.
2. Tải các tệp trong thư mục dự án lên repository (không tải cả file ZIP làm nội dung website).
3. Mở **Settings → Pages**.
4. Trong phần Build and deployment, chọn **Deploy from a branch**.
5. Chọn branch `main` và folder `/(root)`, nhấn **Save**.
6. Chờ GitHub Pages xuất bản; URL website sẽ hiện ở mục Pages.

## Giới hạn

- Đây là bộ phân tích URL tĩnh; nó không tự truy cập website, theo dõi HTTP redirect thực tế hoặc lấy link đích ẩn.
- Nó không vượt CAPTCHA, đăng nhập, nhiệm vụ quảng cáo, yêu cầu thanh toán hoặc các cơ chế kiểm soát truy cập.
- Các cảnh báo chỉ mang tính tham khảo, không phải đánh giá bảo mật toàn diện.
- Chỉ mở liên kết nếu bạn tin tưởng nguồn gửi.

## Cấu trúc

- `index.html` — giao diện
- `style.css` — kiểu giao diện
- `analyzer.js` — logic phân tích URL
- `app.js` — xử lý tương tác
