# NXBNG — đồng bộ Dịch vụ / Danh mục / Sản phẩm với MongoDB

## Đã đối chiếu
Dữ liệu mặc định trong `data.js` được đối chiếu với website `https://innongnghiep.com/`.
Hiện gói có:
- 5 nhóm dịch vụ
- 27 danh mục/mục sản phẩm
- 95 sản phẩm có ảnh
- 3 bài viết mẫu
- 3 banner
- 4 sản phẩm nổi bật

Ngoài các ảnh đang dùng, thư mục `image/sanpham/website-extra/` chứa các ảnh bổ sung lấy từ gói ảnh bạn cung cấp, kèm `manifest.json`.

## MongoDB
Website tĩnh trên GitHub Pages không tự chạy Node.js/Express. Vì vậy phần MongoDB được tách thành API trong thư mục `server/`.

### 1. Tạo MongoDB Atlas
Tạo một database MongoDB Atlas và lấy connection string.

### 2. Chạy API
Trong `server/`:
```bash
npm install
```
Copy `.env.example` thành `.env`, sau đó điền:
```env
MONGODB_URI=...
CORS_ORIGIN=https://innongnghiep.com,https://www.innongnghiep.com
PORT=3000
```

Seed dữ liệu ban đầu:
```bash
npm run seed
```

Chạy API:
```bash
npm start
```

### 3. Đưa API lên Render/Railway/VPS
Sau khi deploy, ví dụ API có:
`https://api-innongnghiep.example.com`

Mở `config.js` và đổi:
```js
window.LNN_API_BASE = 'https://api-innongnghiep.example.com';
```

Commit/push cả website lên GitHub Pages.

## Cách hoạt động
- Người xem mở website: `mongo-sync.js` lấy dữ liệu mới nhất từ MongoDB và cập nhật localStorage.
- Admin thêm/sửa/xóa dịch vụ, danh mục, sản phẩm, blog, banner hoặc sản phẩm nổi bật: `data.js` lưu localStorage đồng thời PUT dữ liệu lên API MongoDB.
- Nếu API tạm thời không hoạt động, website vẫn dùng dữ liệu localStorage đã có.

## Lưu ý ảnh
Ảnh sản phẩm đang dùng đường dẫn trong thư mục `image/`. Khi deploy GitHub Pages, các ảnh này đi cùng website.
Ảnh upload mới từ Admin hiện vẫn theo cơ chế base64/localStorage của hệ thống cũ; không nên upload hàng trăm ảnh lớn trực tiếp vào MongoDB. Nếu muốn, bước tiếp theo nên chuyển ảnh upload sang Cloudinary/S3/Cloudflare R2 và MongoDB chỉ lưu URL ảnh.
