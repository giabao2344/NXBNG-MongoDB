/* =========================================================
   LỊCH NÔNG NGHIỆP — KHO DỮ LIỆU DÙNG CHUNG (data.js)
   Dùng chung cho: admin.html, blog.html, post.html, index.html,
                   dich-vu.html, dich-vu-chi-tiet.html
   Lưu trữ trong localStorage của trình duyệt.
   ========================================================= */

const LNN_KEYS = {
    services: 'lnn_services',
    posts: 'lnn_posts',
    groups: 'lnn_groups',
    products: 'lnn_products',
    featured: 'lnn_featured',
    banners: 'lnn_banners'
};

/* Danh sách năm hỗ trợ chọn trong Admin (mới nhất trước) — sản phẩm/lịch được
   quản lý và lọc theo từng năm. Có thể thêm năm mới bất kỳ lúc nào, hệ thống
   sẽ tự nhận thêm năm đó ngay khi có sản phẩm gắn năm đó. */
const LNN_YEARS = ['2028', '2027', '2026', '2025'];

/* ---------- Dữ liệu mẫu ban đầu ----------
   Chỉ được dùng MỘT LẦN DUY NHẤT khi trình duyệt này chưa từng
   có dữ liệu (localStorage trống) — để trang không bị "trắng"
   trước khi bạn đăng bài đầu tiên. Sau đó mọi thay đổi trong
   admin sẽ ghi đè lên hoàn toàn. */
const LNN_DEFAULT_POSTS = [
    {
        id: 'post_seed_1',
        title: 'Nghệ thuật sử dụng giấy Mỹ thuật trong in lịch độc quyền',
        tag: 'Xu hướng 2027',
        date: '2026-04-20',
        image: 'image/anh2.jpeg',
        excerpt: 'Khám phá lý do tại sao giấy mỹ thuật lại trở thành lựa chọn ưu tiên cho các dòng sản phẩm quà tặng cao cấp dịp cuối năm...',
        content: '> "Trong kỷ nguyên mới, bao bì không chỉ đóng vai trò bảo quản mà còn là \'đại sứ xanh\' kết nối thương hiệu với khách hàng."\n\n## 1. Vì sao giấy mỹ thuật lên ngôi\nGiấy mỹ thuật mang lại bề mặt vân độc đáo, cảm giác cầm nắm cao cấp và khả năng ăn màu tốt hơn giấy thường, rất phù hợp với các dòng lịch Tết, hộp quà biếu doanh nghiệp.\n\n## 2. Ứng dụng thực tế\nNhiều thương hiệu lớn đã chuyển sang dùng giấy mỹ thuật kết hợp kỹ thuật ép kim, dập nổi để tạo điểm nhấn sang trọng mà vẫn giữ được sự tinh giản.\n\n## 3. Lưu ý khi lựa chọn\nCần cân nhắc định lượng giấy, khả năng bắt mực và chi phí sản xuất để đảm bảo vừa đẹp vừa tối ưu ngân sách in ấn.',
        featured: true,
        createdAt: '2026-04-20'
    },
    {
        id: 'post_seed_2',
        title: 'Xu hướng thiết kế bao bì nông sản 2026',
        tag: 'Thiết kế',
        date: '2026-04-15',
        image: 'image/anh1.jpeg',
        excerpt: 'Khám phá những xu hướng thiết kế bao bì nông sản mới nhất, từ màu sắc, chất liệu đến phong cách...',
        content: '## 1. Sử dụng vật liệu tái chế đặc biệt\nXu hướng năm 2026 tập trung mạnh vào các loại giấy Kraft không tráng phủ, giấy tái chế từ bã mía hoặc rơm rạ, mang lại cảm giác thô mộc và thân thiện với môi trường.\n\n## 2. Phong cách tối giản (Minimalism)\nGiảm thiểu tối đa các chi tiết thừa, tập trung vào font chữ hiện đại và khoảng trắng để tôn vinh giá trị cốt lõi của sản phẩm.\n\n## 3. Màu sắc lấy cảm hứng từ thiên nhiên\nCác tông màu đất, xanh lá, vàng nắng được ưu tiên nhằm truyền tải nguồn gốc nông sản một cách chân thực nhất.',
        featured: false,
        createdAt: '2026-04-15'
    },
    {
        id: 'post_seed_3',
        title: 'Bí quyết chọn quà tặng Tết doanh nghiệp ý nghĩa',
        tag: 'Quà tặng',
        date: '2026-04-10',
        image: 'image/anh3.jpeg',
        excerpt: 'Những gợi ý giúp doanh nghiệp lựa chọn quà tặng Tết vừa tinh tế vừa thể hiện được bản sắc thương hiệu...',
        content: '## 1. Ưu tiên tính ứng dụng\nMột món quà được dùng thường xuyên (lịch để bàn, sổ tay) sẽ giúp thương hiệu hiện diện lâu dài trong mắt đối tác.\n\n## 2. Cá nhân hoá theo thương hiệu\nIn logo, thông điệp và bảng màu nhận diện lên bao bì giúp món quà trở thành một phần của chiến dịch truyền thông.\n\n## 3. Đóng gói tạo cảm xúc\nHộp quà được thiết kế tinh tế, có câu chuyện đi kèm sẽ để lại ấn tượng sâu sắc hơn nhiều so với giá trị món quà.',
        featured: false,
        createdAt: '2026-04-10'
    }
];

/* Dịch vụ mặc định — khớp với 5 tab bạn đã gửi mẫu (Sổ / Túi Giấy / Lịch / Hộp Cứng / Sản Phẩm Khác) */
const LNN_DEFAULT_SERVICES = [
    { id: 'svc_so', title: 'Sổ', image: 'image/soquatang (1).png', desc: 'Sổ quà tặng, sổ tay in logo theo yêu cầu doanh nghiệp.', detail: 'Chúng tôi nhận in sổ quà tặng, sổ tay bìa da, bìa simili theo file thiết kế có sẵn, số lượng lớn, đảm bảo chất lượng đồng đều.', createdAt: '2026-01-05' },
    { id: 'svc_tui-giay', title: 'Túi Giấy', image: 'image/sanphamtui.png', desc: 'In túi giấy thương hiệu, túi quà tặng, túi đựng lịch các loại.', detail: 'Xưởng sản xuất trực tiếp túi giấy Kraft, túi giấy mỹ thuật cho đa dạng ngành hàng: mỹ phẩm, thực phẩm, ngân hàng, quà Tết...', createdAt: '2026-01-04' },
    { id: 'svc_lich', title: 'Lịch', image: 'image/anhlichbloc.png', desc: 'Lịch Tết, lịch bloc, lịch bàn, lịch 52 tuần các kích cỡ.', detail: 'Sản xuất đầy đủ các dòng lịch Tết: bloc đại, bloc cực đại, lịch bàn, lịch 52 tuần, lịch độc quyền theo yêu cầu riêng.', createdAt: '2026-01-03' },
    { id: 'svc_hop-cung', title: 'Hộp Cứng', image: 'image/anhsanpham1.jpg', desc: 'Hộp cứng cao cấp, hộp quà tặng độc quyền theo thiết kế riêng.', detail: 'In và gia công hộp cứng bồi giấy mỹ thuật, ép nhũ, dập nổi — phù hợp làm hộp quà tặng cao cấp dịp lễ Tết.', createdAt: '2026-01-02' },
    { id: 'svc_khac', title: 'Sản Phẩm Khác', image: 'image/anh1.jpeg', desc: 'Tờ rơi, card visit, poster và các ấn phẩm khác theo yêu cầu.', detail: 'Ngoài các dòng sản phẩm chính, chúng tôi còn nhận in ấn đa dạng ấn phẩm quảng cáo, văn phòng phẩm theo yêu cầu riêng.', createdAt: '2026-01-01' }
];

/* Mục sản phẩm mặc định (thuộc từng dịch vụ ở trên) */
const LNN_DEFAULT_GROUPS = [
    { id: 'grp_tui_1', serviceId: 'svc_tui-giay', title: 'IN TÚI GIẤY THƯƠNG HIỆU DẦU GỘI ĐẦU' },
    { id: 'grp_tui_2', serviceId: 'svc_tui-giay', title: 'IN TÚI GIẤY QUÀ TẶNG, QUÀ TẾT QT' },
    { id: 'grp_tui_3', serviceId: 'svc_tui-giay', title: 'IN TÚI GIẤY THỜI TRANG, GIÀY DÉP, SUDIO' },
    { id: 'grp_tui_4', serviceId: 'svc_tui-giay', title: 'IN TÚI GIẤY MỸ PHẨM, VÀNG BẠC, PHỤ KIỆN' },
    { id: 'grp_tui_5', serviceId: 'svc_tui-giay', title: 'IN TÚI GIẤY HOA QUẢ, THỰC PHẨM, YẾN SÀO CAO CẤP' },
    { id: 'grp_tui_6', serviceId: 'svc_tui-giay', title: 'IN TÚI GIẤY CÔNG TY, TRUNG TÂM NHA KHOA, PHÒNG KHÁM' },
    { id: 'grp_tui_7', serviceId: 'svc_tui-giay', title: 'IN TÚI GIẤY BÁNH KẸO CÁC THƯƠNG HIỆU' },
    { id: 'grp_tui_8', serviceId: 'svc_tui-giay', title: 'IN TÚI GIẤY CÁC NGÂN HÀNG' },
    { id: 'grp_tui_9', serviceId: 'svc_tui-giay', title: 'TÚI ĐỰNG LỊCH' },
    { id: 'grp_tui_10', serviceId: 'svc_tui-giay', title: 'TÚI ĐỘC QUYỀN' },

    { id: 'grp_lich_1', serviceId: 'svc_lich', title: 'LỊCH TẾT 2026' },
    { id: 'grp_lich_2', serviceId: 'svc_lich', title: 'BÌA TREO BLOC' },
    { id: 'grp_lich_3', serviceId: 'svc_lich', title: 'BLOC CỰC ĐẠI' },
    { id: 'grp_lich_4', serviceId: 'svc_lich', title: 'BLOC ĐẠI' },
    { id: 'grp_lich_5', serviceId: 'svc_lich', title: 'BLOC SIÊU CỰC ĐẠI' },
    { id: 'grp_lich_6', serviceId: 'svc_lich', title: 'BLOC SIÊU CỰC ĐẠI ĐẶC BIỆT' },
    { id: 'grp_lich_7', serviceId: 'svc_lich', title: 'BLOC SIÊU ĐẠI' },
    { id: 'grp_lich_8', serviceId: 'svc_lich', title: 'BLOC TRUNG ĐẶC BIỆT' },
    { id: 'grp_lich_9', serviceId: 'svc_lich', title: 'BLOC TRUNG MÀU' },
    { id: 'grp_lich_10', serviceId: 'svc_lich', title: 'LỊCH 52 TUẦN' },
    { id: 'grp_lich_11', serviceId: 'svc_lich', title: 'LỊCH ĐỘC QUYỀN' },
    { id: 'grp_lich_12', serviceId: 'svc_lich', title: 'BLOC ĐẠI ĐẶC BIỆT' },
    { id: 'grp_lich_13', serviceId: 'svc_lich', title: "BLOC TRUNG P'LUYA" },
    { id: 'grp_lich_14', serviceId: 'svc_lich', title: 'LỊCH BÀN' },

    { id: 'grp_hop_1', serviceId: 'svc_hop-cung', title: 'HỘP CỨNG ĐỘC QUYỀN' },
    { id: 'grp_hopgiay', serviceId: 'svc_hop-cung', title: 'HỘP GIẤY' },

    { id: 'grp_so_1', serviceId: 'svc_so', title: 'SỔ QUÀ TẶNG' }
];

/* Banner slide mặc định cho trang chủ — quản lý đầy đủ (thêm/sửa/xóa/đổi ảnh)
   trong tab "Banner trang chủ" ở Admin. */
const LNN_DEFAULT_BANNERS = [
    { id: 'banner_1', title: 'Chúc Mừng Năm Mới<br>Lịch Bloc 2027', image: 'image/banner-tet-2027.jpg', link: 'dich-vu.html' },
    { id: 'banner_2', title: 'Giải pháp in ấn <br> chuyên nghiệp', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2000', link: 'dich-vu.html' },
    { id: 'banner_3', title: 'Thiết kế bao bì <br> sáng tạo', image: 'https://images.unsplash.com/photo-1503694978374-8a2fa686963a?q=80&w=2000', link: 'san-pham.html' }
];

/* Toàn bộ danh mục sản phẩm thực tế (đồng bộ từ innongnghiep.com, dữ liệu năm 2026) —
   mỗi sản phẩm có trường year để quản lý/lọc theo từng năm trong Admin. Admin có thể
   thêm/sửa/xóa hoặc bổ sung sản phẩm của các năm tiếp theo (2027, 2028...) tự do. */
const LNN_DEFAULT_PRODUCTS = [
    { id: 'prod_001', groupId: 'grp_lich_1', title: 'BLOC: SIÊU ĐẠI - PHONG THỦY TÀI LỘC', image: 'image/sanpham/Vw9o_lich_NN_-1--pdf_-7-.png', images: ['image/sanpham/Vw9o_lich_NN_-1--pdf_-7-.png'], desc: 'Kích thước: 20cm x 30cm — Mã: NN 10 — Giá tham khảo: 299.000đ', year: '2026' },
    { id: 'prod_002', groupId: 'grp_lich_1', title: 'BLOC: SIÊU ĐẠI - CUỘC SỐNG TƯƠI ĐẸP', image: 'image/sanpham/p2A5_lich_NN_-1--pdf_-5-.png', images: ['image/sanpham/p2A5_lich_NN_-1--pdf_-5-.png'], desc: 'Kích thước: 20cm x 30cm — Mã: NN 12 — Giá tham khảo: 300.000đ', year: '2026' },
    { id: 'prod_003', groupId: 'grp_lich_1', title: 'BLOC: CỰC ĐẠI - THƯ PHÁP', image: 'image/sanpham/WdWy_lich_NN_-1--pdf_-3-.png', images: ['image/sanpham/WdWy_lich_NN_-1--pdf_-3-.png'], desc: 'Kích thước: 25cm x 35cm — Mã: NN 14 — Giá tham khảo: 400.000đ', year: '2026' },
    { id: 'prod_004', groupId: 'grp_lich_1', title: 'BLOC SIÊU CỰC ĐẠI - VIỆT NAM RẠNG RỠ', image: 'image/sanpham/tsHv_lich_NN_-1--pdf_-2-.png', images: ['image/sanpham/tsHv_lich_NN_-1--pdf_-2-.png'], desc: 'Kích thước: 29cm x 41cm — Mã: NN 16 — Giá tham khảo: 550.000đ', year: '2026' },
    { id: 'prod_005', groupId: 'grp_lich_2', title: 'BÌA TREO 2B', image: 'image/sanpham/cbCc_lich_NN_-1--pdf.png', images: ['image/sanpham/cbCc_lich_NN_-1--pdf.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_006', groupId: 'grp_lich_2', title: 'BÌA TREO 1D', image: 'image/sanpham/UOJz_lich_NN_-1--pdf_-4-.png', images: ['image/sanpham/UOJz_lich_NN_-1--pdf_-4-.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_007', groupId: 'grp_lich_2', title: 'BÌA TREO 1C', image: 'image/sanpham/JFIw_lich_NN_-1--pdf_-3-.png', images: ['image/sanpham/JFIw_lich_NN_-1--pdf_-3-.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_008', groupId: 'grp_lich_2', title: 'BÌA TREO 1B', image: 'image/sanpham/lDnI_lich_NN_-1--pdf_-2-.png', images: ['image/sanpham/lDnI_lich_NN_-1--pdf_-2-.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_009', groupId: 'grp_lich_3', title: 'BLOC CỰC ĐẠI - BONSAI THƯ PHÁP 2', image: 'image/sanpham/crl5_Untitled_design.png', images: ['image/sanpham/crl5_Untitled_design.png'], desc: 'Kích thước: 25cm x 35cm — Mã: NN 13 — Giá tham khảo: 280.000đ', year: '2026' },
    { id: 'prod_010', groupId: 'grp_lich_3', title: 'BLOC CỰC ĐẠI - BONSAI THƯ PHÁP 1', image: 'image/sanpham/buB3_Thiết_kế_chưa_có_tên-zip_-_1.png', images: ['image/sanpham/buB3_Thiết_kế_chưa_có_tên-zip_-_1.png'], desc: 'Kích thước: 25cm x 35cm — Mã: NN 14 — Giá tham khảo: 280.000đ', year: '2026' },
    { id: 'prod_011', groupId: 'grp_lich_3', title: 'BLOC CỰC ĐẠI - CUỘC SỐNG TƯƠI ĐẸP', image: 'image/sanpham/Fvh7_lich_NN_-1--pdf_-4-.png', images: ['image/sanpham/Fvh7_lich_NN_-1--pdf_-4-.png'], desc: 'Kích thước: 25cm x 35cm — Mã: NN 15 — Giá tham khảo: 280.000đ', year: '2026' },
    { id: 'prod_012', groupId: 'grp_lich_3', title: 'BLOC CỰC ĐẠI - TRỌN BỘ CUỘC SỐNG TƯƠI ĐẸP', image: 'image/sanpham/MHVZ_lich_NN_-1--pdf_-1-.png', images: ['image/sanpham/MHVZ_lich_NN_-1--pdf_-1-.png'], desc: 'Kích thước: 25cm x 35cm — Mã: NN 15 — Giá tham khảo: 400.000đ', year: '2026' },
    { id: 'prod_013', groupId: 'grp_lich_4', title: 'BLOC - BÌA + LỊCH + TÚI 4', image: 'image/sanpham/vsLG_lich_NN_-1--pdf.png', images: ['image/sanpham/vsLG_lich_NN_-1--pdf.png'], desc: 'Kích thước: 14,5cm x 20,5cm — Mã: NN 06 — Giá tham khảo: 150.000đ', year: '2026' },
    { id: 'prod_014', groupId: 'grp_lich_4', title: 'BLOC - BÌA + LỊCH + TÚI 3', image: 'image/sanpham/azCa_lich_NN_-1--pdf_-1-.png', images: ['image/sanpham/azCa_lich_NN_-1--pdf_-1-.png'], desc: 'Kích thước: 14,5cm x 20,5cm — Mã: NN 06 — Giá tham khảo: 150.000đ', year: '2026' },
    { id: 'prod_015', groupId: 'grp_lich_4', title: 'BLOC - BÌA + LỊCH + TÚI 1', image: 'image/sanpham/PmW5_NN_06.png', images: ['image/sanpham/PmW5_NN_06.png'], desc: 'Kích thước: 14,5cm x 20,5cm — Mã: NN 06 — Giá tham khảo: 150.000đ', year: '2026' },
    { id: 'prod_016', groupId: 'grp_lich_4', title: 'BLOC ĐẠI - BÌA + LỊCH + TÚI 2', image: 'image/sanpham/xjKp_lich_NN_-1--pdf_-1-.png', images: ['image/sanpham/xjKp_lich_NN_-1--pdf_-1-.png'], desc: 'Kích thước: 14,5cm x 20,5cm — Mã: NN 06 — Giá tham khảo: 150.000đ', year: '2026' },
    { id: 'prod_017', groupId: 'grp_lich_5', title: 'BLOC SIÊU CỰC ĐẠI - TRỌN BỘ VIỆT NAM TƯƠI ĐẸP', image: 'image/sanpham/azOU_lich_NN_-1--pdf.png', images: ['image/sanpham/azOU_lich_NN_-1--pdf.png'], desc: 'Kích thước: 30cm x 40cm — Mã: NN 16 — Giá tham khảo: 550.000đ', year: '2026' },
    { id: 'prod_018', groupId: 'grp_lich_5', title: 'VIỆT NAM QUÊ HƯƠNG TÔI 2', image: 'image/sanpham/wjBC_NN_16.png', images: ['image/sanpham/wjBC_NN_16.png'], desc: 'Kích thước: 30cm x 40cm — Mã: NN 14 — Giá tham khảo: 550.000đ', year: '2026' },
    { id: 'prod_019', groupId: 'grp_lich_5', title: 'VIỆT NAM QUÊ HƯƠNG TÔI 1', image: 'image/sanpham/KrHz_NN_16_-1-.png', images: ['image/sanpham/KrHz_NN_16_-1-.png'], desc: 'Kích thước: 30cm x 40cm — Mã: NN 14 — Giá tham khảo: 550.000đ', year: '2026' },
    { id: 'prod_020', groupId: 'grp_lich_6', title: 'BLOC SIÊU CỰC ĐẠI ĐẶC BIỆT - LỊCH ĐỘC QUYỀN 4', image: 'image/sanpham/yivV_lich_NN_-1--pdf_-4-.png', images: ['image/sanpham/yivV_lich_NN_-1--pdf_-4-.png'], desc: 'Kích thước: 20cm x 48cm — Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_021', groupId: 'grp_lich_6', title: 'BLOC SIÊU CỰC ĐẠI ĐẶC BIỆT - LỊCH ĐỘC QUYỀN 5', image: 'image/sanpham/GGy5_lich_NN_-1--pdf.png', images: ['image/sanpham/GGy5_lich_NN_-1--pdf.png'], desc: 'Kích thước: 20cm x 48cm — Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_022', groupId: 'grp_lich_6', title: 'BLOC SIÊU CỰC ĐẠI ĐẶC BIỆT - LỊCH ĐỘC QUYỀN 3', image: 'image/sanpham/CG4w_lich_NN_-1--pdf_-3-.png', images: ['image/sanpham/CG4w_lich_NN_-1--pdf_-3-.png'], desc: 'Kích thước: 20cm x 48cm — Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_023', groupId: 'grp_lich_6', title: 'BLOC SIÊU CỰC ĐẠI ĐẶC BIỆT - LỊCH ĐỘC QUYỀN 2', image: 'image/sanpham/GgJU_lich_NN_-1--pdf_-2-.png', images: ['image/sanpham/GgJU_lich_NN_-1--pdf_-2-.png'], desc: 'Kích thước: 20cm x 48cm — Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_024', groupId: 'grp_lich_7', title: 'BLOC SIÊU ĐẠI - NON NƯỚC VIỆT NAM KHÔNG HỘP', image: 'image/sanpham/Q4xr_lich_NN_-1--pdf.png', images: ['image/sanpham/Q4xr_lich_NN_-1--pdf.png'], desc: 'Kích thước: 20cm x 30cm — Mã: NN 12 — Giá tham khảo: 230.000đ', year: '2026' },
    { id: 'prod_025', groupId: 'grp_lich_7', title: 'BLOC SIÊU ĐẠI - BON SAI PHONG THỦY', image: 'image/sanpham/499N_lich_NN_-1--pdf_-3-.png', images: ['image/sanpham/499N_lich_NN_-1--pdf_-3-.png'], desc: 'Kích thước: 20cm x 30cm — Mã: NN 13 — Giá tham khảo: 170.000đ', year: '2026' },
    { id: 'prod_026', groupId: 'grp_lich_7', title: 'BLOC SIÊU ĐẠI - BON SAI PHONG THỦY KHÔNG HỘP', image: 'image/sanpham/IC3N_lich_NN_-1--pdf.png', images: ['image/sanpham/IC3N_lich_NN_-1--pdf.png'], desc: 'Kích thước: 20cm x 30cm — Mã: NN 14 — Giá tham khảo: 230.000đ', year: '2026' },
    { id: 'prod_027', groupId: 'grp_lich_7', title: 'BLOC SIÊU ĐẠI - TRỌN BỘ NON NƯỚC VIỆT NAM', image: 'image/sanpham/eqoE_NN_12_-_NN11.png', images: ['image/sanpham/eqoE_NN_12_-_NN11.png'], desc: 'Kích thước: 20cm x 30cm — Mã: NN 12 — Giá tham khảo: 300.000đ', year: '2026' },
    { id: 'prod_028', groupId: 'grp_lich_8', title: 'HOA TRÁI BỐN MÙA 2', image: 'image/sanpham/PY19_P8UJ_lich_NN_-1--pdf_-3-.png', images: ['image/sanpham/PY19_P8UJ_lich_NN_-1--pdf_-3-.png'], desc: 'Kích thước: 12cm x 17cm — Giá tham khảo: 66.000đ', year: '2026' },
    { id: 'prod_029', groupId: 'grp_lich_8', title: 'HOA TRÁI BỐN MÙA 1', image: 'image/sanpham/kdEi_c07j_lich_NN_-1--pdf_-2-.png', images: ['image/sanpham/kdEi_c07j_lich_NN_-1--pdf_-2-.png'], desc: 'Kích thước: 12cm x 17cm — Giá tham khảo: 66.000đ', year: '2026' },
    { id: 'prod_030', groupId: 'grp_lich_8', title: 'BLOC TRUNG ĐẶC BIỆT - HOA THIÊN NHIÊN 2', image: 'image/sanpham/W80c_lich_NN_-1--pdf_-6-.png', images: ['image/sanpham/W80c_lich_NN_-1--pdf_-6-.png'], desc: 'Kích thước: 12cm x 17cm — Mã: NN 04 — Giá tham khảo: 66.000đ', year: '2026' },
    { id: 'prod_031', groupId: 'grp_lich_8', title: 'BLOC TRUNG ĐẶC BIỆT - HOA THIÊN NHIÊN 1', image: 'image/sanpham/ogP6_lich_NN_-1--pdf_-5-.png', images: ['image/sanpham/ogP6_lich_NN_-1--pdf_-5-.png'], desc: 'Kích thước: 12cm x 17cm — Mã: NN 04 — Giá tham khảo: 66.000đ', year: '2026' },
    { id: 'prod_032', groupId: 'grp_lich_9', title: 'BLOC TRUNG MÀU - HOA THIÊN NHIÊN 3', image: 'image/sanpham/z7Mi_lich_NN_-1--pdf_-3-.png', images: ['image/sanpham/z7Mi_lich_NN_-1--pdf_-3-.png'], desc: 'Mã: NN 03 — Giá tham khảo: 47.000đ', year: '2026' },
    { id: 'prod_033', groupId: 'grp_lich_9', title: 'BLOC TRUNG MÀU - HOA THIÊN NHIÊN 4', image: 'image/sanpham/Wwvz_lich_NN_-1--pdf.png', images: ['image/sanpham/Wwvz_lich_NN_-1--pdf.png'], desc: 'Mã: NN 03 — Giá tham khảo: 47.000đ', year: '2026' },
    { id: 'prod_034', groupId: 'grp_lich_9', title: 'BLOC TRUNG MÀU - HOA THIÊN NHIÊN 1', image: 'image/sanpham/3mjk_lich_NN_-1--pdf_-1-.png', images: ['image/sanpham/3mjk_lich_NN_-1--pdf_-1-.png'], desc: 'Kích thước: 10,5cm x 14,5cm — Mã: NN 03 — Giá tham khảo: 47.000đ', year: '2026' },
    { id: 'prod_035', groupId: 'grp_lich_9', title: 'BLOC TRUNG MÀU - HOA THIÊN NHIÊN 2', image: 'image/sanpham/nuv4_lich_NN_-1--pdf_-2-.png', images: ['image/sanpham/nuv4_lich_NN_-1--pdf_-2-.png'], desc: 'Kích thước: 10,5cm x 14,5cm — Mã: NN 03 — Giá tham khảo: 47.000đ', year: '2026' },
    { id: 'prod_036', groupId: 'grp_lich_10', title: 'LỊCH 52 TUẦN 4C', image: 'image/sanpham/aya4_lich_NN_-1--pdf.png', images: ['image/sanpham/aya4_lich_NN_-1--pdf.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_037', groupId: 'grp_lich_10', title: 'LỊCH 52 TUẦN 4B', image: 'image/sanpham/vvUk_lich_NN_-1--pdf_-2-.png', images: ['image/sanpham/vvUk_lich_NN_-1--pdf_-2-.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_038', groupId: 'grp_lich_10', title: 'LỊCH 52 TUẦN 2B', image: 'image/sanpham/iJUz_lich_NN_-1--pdf_-2-.png', images: ['image/sanpham/iJUz_lich_NN_-1--pdf_-2-.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_039', groupId: 'grp_lich_10', title: 'LỊCH 52 TUẦN 2A', image: 'image/sanpham/CQVu_lich_NN_-1--pdf.png', images: ['image/sanpham/CQVu_lich_NN_-1--pdf.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_040', groupId: 'grp_lich_11', title: 'LỊCH ĐỘC QUYỀN HABECO 2025', image: 'image/sanpham/NTpO_lich_NN_-1--pdf_-2-.png', images: ['image/sanpham/NTpO_lich_NN_-1--pdf_-2-.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_041', groupId: 'grp_lich_11', title: 'LỊCH ĐỘC QUYỀN VNPT 2023', image: 'image/sanpham/ioNi_lich_NN_-1--pdf_-6-.png', images: ['image/sanpham/ioNi_lich_NN_-1--pdf_-6-.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_042', groupId: 'grp_lich_11', title: 'LỊCH ĐỘC QUYỀN NGÂN HÀNG CHÍNH SÁCH XÃ HỘI 2023', image: 'image/sanpham/7qMJ_lich_NN_-1--pdf_-5-.png', images: ['image/sanpham/7qMJ_lich_NN_-1--pdf_-5-.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_043', groupId: 'grp_lich_11', title: 'LỊCH ĐỘC QUYỀN 2D', image: 'image/sanpham/8AzO_lich_NN_-1--pdf.png', images: ['image/sanpham/8AzO_lich_NN_-1--pdf.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_044', groupId: 'grp_lich_12', title: 'BLOC ĐẠI ĐẶC BIỆT - TRỌN BỘ CUỘC SỐNG TƯƠI ĐẸP', image: 'image/sanpham/p5NL_dmxp_N10_-_N11.png', images: ['image/sanpham/p5NL_dmxp_N10_-_N11.png'], desc: 'Kích thước: 17cm x 25cm — Mã: NN 10 — Giá tham khảo: 250.000đ', year: '2026' },
    { id: 'prod_045', groupId: 'grp_lich_12', title: 'BLOC ĐẠI ĐẶC BIỆT - CUỘC SỐNG TƯƠI ĐẸP KHÔNG HỘP', image: 'image/sanpham/mkIw_lich_NN_-1--pdf.png', images: ['image/sanpham/mkIw_lich_NN_-1--pdf.png'], desc: 'Kích thước: 17cm x 25cm — Mã: NN 09 KH — Giá tham khảo: 190.000đ', year: '2026' },
    { id: 'prod_046', groupId: 'grp_lich_12', title: 'BLOC ĐẠI ĐẶC BIỆT - BONSAI PHONG THỦY KHÔNG HỘP', image: 'image/sanpham/sdmX_lich_NN_-1--pdf.png', images: ['image/sanpham/sdmX_lich_NN_-1--pdf.png'], desc: 'Kích thước: 17cm x 25cm — Mã: NN 07 KH — Giá tham khảo: 190.000đ', year: '2026' },
    { id: 'prod_047', groupId: 'grp_lich_12', title: 'BLOC ĐẠI ĐẶC BIỆT - TRỌN BỘ BONSAI PHONG THỦY KHÔNG HỘP', image: 'image/sanpham/vgyT_lich_NN_-1--pdf.png', images: ['image/sanpham/vgyT_lich_NN_-1--pdf.png'], desc: 'Kích thước: 17cm x 24cm — Mã: NN 08 KH — Giá tham khảo: 190.000đ', year: '2026' },
    { id: 'prod_048', groupId: 'grp_lich_13', title: 'BLOC TIỂU PƠLUYA - TRANH DÂN GIAN', image: 'image/sanpham/AvE5_lich_NN_-1--pdf_-2-.png', images: ['image/sanpham/AvE5_lich_NN_-1--pdf_-2-.png'], desc: 'Kích thước: 7,5cm x 10,5cm — Mã: NN 01 — Giá tham khảo: 16.800đ', year: '2026' },
    { id: 'prod_049', groupId: 'grp_lich_13', title: 'BLOC TRUNG PƠLUYA - TRANH DÂN GIAN 2', image: 'image/sanpham/vYhB_lich_NN_-1--pdf.png', images: ['image/sanpham/vYhB_lich_NN_-1--pdf.png'], desc: 'Kích thước: 10,5cm x 14,5cm — Mã: NN 02 — Giá tham khảo: 25.000đ', year: '2026' },
    { id: 'prod_050', groupId: 'grp_lich_13', title: 'BLOC TRUNG PƠLUYA - TRANH DÂN GIAN 1', image: 'image/sanpham/uLY8_lich_NN_-1--pdf_-1-.png', images: ['image/sanpham/uLY8_lich_NN_-1--pdf_-1-.png'], desc: 'Kích thước: 10,5cm x 14,5cm — Mã: NN 02 — Giá tham khảo: 25.000đ', year: '2026' },
    { id: 'prod_051', groupId: 'grp_lich_14', title: 'TRỌN BỘ LỊCH BÀN ĐỘC QUYỀN LPBANK 2024', image: 'image/sanpham/kJCY_lich_NN_-1--pdf_-6-.png', images: ['image/sanpham/kJCY_lich_NN_-1--pdf_-6-.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_052', groupId: 'grp_lich_14', title: 'LỊCH BÀN ĐỘC QUYỀN LPBANK 2024', image: 'image/sanpham/dplj_lich_NN_-1--pdf_-3-.png', images: ['image/sanpham/dplj_lich_NN_-1--pdf_-3-.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_053', groupId: 'grp_lich_14', title: 'LỊCH BÀN ĐỘC QUYỀN XI MĂNG XUÂN THÀNH 2024', image: 'image/sanpham/5o0Q_lich_NN_-1--pdf_-4-.png', images: ['image/sanpham/5o0Q_lich_NN_-1--pdf_-4-.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_054', groupId: 'grp_hop_1', title: 'HỘP CỨNG BÁNH TRUNG THU ĐỘC QUYỀN 6', image: 'image/sanpham/50aI_lich_NN_-1--pdf_-2-.png', images: ['image/sanpham/50aI_lich_NN_-1--pdf_-2-.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_055', groupId: 'grp_hop_1', title: 'HỘP CỨNG BÁNH TRUNG THU ĐỘC QUYỀN 5', image: 'image/sanpham/Jleq_lich_NN_-1--pdf_-1-.png', images: ['image/sanpham/Jleq_lich_NN_-1--pdf_-1-.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_056', groupId: 'grp_hop_1', title: 'HỘP CỨNG BÁNH TRUNG THU ĐỘC QUYỀN 4', image: 'image/sanpham/CZ8V_lich_NN_-1--pdf.png', images: ['image/sanpham/CZ8V_lich_NN_-1--pdf.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_057', groupId: 'grp_hop_1', title: 'HỘP CỨNG ĐỰNG QUÀ ĐỘC QUYỀN MOBIFONE', image: 'image/sanpham/hqt7_lich_NN_-1--pdf_-16-.png', images: ['image/sanpham/hqt7_lich_NN_-1--pdf_-16-.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_058', groupId: 'grp_hopgiay', title: 'HỘP GIẤY 3', image: 'image/sanpham/mi7O_lich_NN_-1--pdf_-4-.png', images: ['image/sanpham/mi7O_lich_NN_-1--pdf_-4-.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_059', groupId: 'grp_hopgiay', title: 'HỘP GIẤY 2', image: 'image/sanpham/RTX5_lich_NN_-1--pdf_-3-.png', images: ['image/sanpham/RTX5_lich_NN_-1--pdf_-3-.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_060', groupId: 'grp_hopgiay', title: 'HỘP GIẤY 1', image: 'image/sanpham/Y94g_lich_NN_-1--pdf_-2-.png', images: ['image/sanpham/Y94g_lich_NN_-1--pdf_-2-.png'], desc: 'Kích thước: 9cm x 9cm x 5,5cm — Mã: L1-018 — Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_061', groupId: 'grp_tui_1', title: 'IN TÚI GIẤY THƯƠNG HIỆU DẦU GỘI DG 1', image: 'image/sanpham/oaYi_lich_NN_-1--pdf_-4-.png', images: ['image/sanpham/oaYi_lich_NN_-1--pdf_-4-.png'], desc: 'Kích thước: Theo yêu cầu — Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_062', groupId: 'grp_tui_1', title: 'IN TÚI GIẤY THƯƠNG HIỆU DẦU GỘI DG 2', image: 'image/sanpham/Xq1R_lich_NN_-1--pdf_-3-.png', images: ['image/sanpham/Xq1R_lich_NN_-1--pdf_-3-.png'], desc: 'Kích thước: Theo yêu cầu — Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_063', groupId: 'grp_tui_1', title: 'IN TÚI GIẤY THƯƠNG HIỆU DẦU GỘI DG 3', image: 'image/sanpham/K9S8_lich_NN_-1--pdf_-2-.png', images: ['image/sanpham/K9S8_lich_NN_-1--pdf_-2-.png'], desc: 'Kích thước: Theo yêu cầu — Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_064', groupId: 'grp_tui_1', title: 'IN TÚI GIẤY THƯƠNG HIỆU DẦU GỘI DG 4', image: 'image/sanpham/KLJG_HNpd_mau-tui-giay-in-thuong-hieu-dau-goi-DG-5.jpg', images: ['image/sanpham/KLJG_HNpd_mau-tui-giay-in-thuong-hieu-dau-goi-DG-5.jpg'], desc: 'Kích thước: Theo yêu cầu — Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_065', groupId: 'grp_tui_2', title: 'IN TÚI GIẤY QUÀ TẶNG, QUÀ TẾT QT 2', image: 'image/sanpham/Fa1g_lich_NN_-1--pdf_-6-.png', images: ['image/sanpham/Fa1g_lich_NN_-1--pdf_-6-.png'], desc: 'Kích thước: Theo yêu cầu — Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_066', groupId: 'grp_tui_2', title: 'IN TÚI GIẤY QUÀ TẶNG, QUÀ TẾT QT 1', image: 'image/sanpham/2Pc3_lich_NN_-1--pdf_-1-.png', images: ['image/sanpham/2Pc3_lich_NN_-1--pdf_-1-.png'], desc: 'Kích thước: Theo yêu cầu — Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_067', groupId: 'grp_tui_2', title: 'TÚI IN QUÀ TẶNG, QUÀ TẾT QT', image: 'image/sanpham/0JQc_lich_NN_-1--pdf.png', images: ['image/sanpham/0JQc_lich_NN_-1--pdf.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_068', groupId: 'grp_tui_3', title: 'TÚI IN THỜI TRANG, GIÀY DÉP, SUDIO TT 1', image: 'image/sanpham/yLWT_lich_NN_-1--pdf_-3-.png', images: ['image/sanpham/yLWT_lich_NN_-1--pdf_-3-.png'], desc: 'Kích thước: Theo yêu cầu — Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_069', groupId: 'grp_tui_3', title: 'TÚI GIẤY IN THỜI TRANG, GIÀY DÉP, SUDIO', image: 'image/sanpham/vaqZ_lich_NN_-1--pdf_-2-.png', images: ['image/sanpham/vaqZ_lich_NN_-1--pdf_-2-.png'], desc: 'Kích thước: Theo yêu cầu — Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_070', groupId: 'grp_tui_4', title: 'TÚI IN MỸ PHẨM, VÀNG BẠC, PHỤ KIỆN', image: 'image/sanpham/DOZ0_lich_NN_-1--pdf_-4-.png', images: ['image/sanpham/DOZ0_lich_NN_-1--pdf_-4-.png'], desc: 'Kích thước: Theo yêu cầu — Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_071', groupId: 'grp_tui_5', title: 'TÚI IN HOA QUẢ, THỰC PHẨM, YẾN SÀO CAO CẤP HQ 10', image: 'image/sanpham/duPl_lich_NN_-1--pdf.png', images: ['image/sanpham/duPl_lich_NN_-1--pdf.png'], desc: 'Kích thước: Theo yêu cầu — Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_072', groupId: 'grp_tui_5', title: 'TÚI IN HOA QUẢ, THỰC PHẨM, YẾN SÀO CAO CẤP HQ 9', image: 'image/sanpham/CU8U_lich_NN_-1--pdf_-10-.png', images: ['image/sanpham/CU8U_lich_NN_-1--pdf_-10-.png'], desc: 'Kích thước: Theo yêu cầu — Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_073', groupId: 'grp_tui_5', title: 'TÚI IN HOA QUẢ, THỰC PHẨM, YẾN SÀO CAO CẤP HQ 8', image: 'image/sanpham/DTYt_lich_NN_-1--pdf_-9-.png', images: ['image/sanpham/DTYt_lich_NN_-1--pdf_-9-.png'], desc: 'Kích thước: Theo yêu cầu — Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_074', groupId: 'grp_tui_5', title: 'TÚI IN HOA QUẢ, THỰC PHẨM, YẾN SÀO CAO CẤP HQ 7', image: 'image/sanpham/88Pg_b8lj_mau-tui-giay-hoa-qua-thuc-pham-yen-saoHQ4-1.jpg', images: ['image/sanpham/88Pg_b8lj_mau-tui-giay-hoa-qua-thuc-pham-yen-saoHQ4-1.jpg'], desc: 'Kích thước: Theo yêu cầu — Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_075', groupId: 'grp_tui_6', title: 'TÚI GIẤY IN PHÒNG KHÁM PK 1', image: 'image/sanpham/zPXB_lich_NN_-1--pdf_-3-.png', images: ['image/sanpham/zPXB_lich_NN_-1--pdf_-3-.png'], desc: 'Kích thước: Theo yêu cầu — Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_076', groupId: 'grp_tui_6', title: 'TÚI GIẤY IN PHÒNG KHÁM', image: 'image/sanpham/F0Si_lich_NN_-1--pdf_-1-.png', images: ['image/sanpham/F0Si_lich_NN_-1--pdf_-1-.png'], desc: 'Kích thước: Theo yêu cầu — Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_077', groupId: 'grp_tui_6', title: 'TÚI GIẤY IN CÔNG TY CT 2', image: 'image/sanpham/hJp4_lich_NN_-1--pdf.png', images: ['image/sanpham/hJp4_lich_NN_-1--pdf.png'], desc: 'Kích thước: Theo yêu cầu — Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_078', groupId: 'grp_tui_6', title: 'TÚI GIẤY IN CÔNG TY CT 1', image: 'image/sanpham/4By8_lich_NN_-1--pdf_-6-.png', images: ['image/sanpham/4By8_lich_NN_-1--pdf_-6-.png'], desc: 'Kích thước: Theo yêu cầu — Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_079', groupId: 'grp_tui_7', title: 'TÚI GIẤY THƯƠNG HIỆU BÁNH KẸO BK6', image: 'image/sanpham/5oMf_lich_NN_-1--pdf_-1-.png', images: ['image/sanpham/5oMf_lich_NN_-1--pdf_-1-.png'], desc: 'Kích thước: Theo yêu cầu — Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_080', groupId: 'grp_tui_7', title: 'TÚI GIẤY THƯƠNG HIỆU BÁNH KẸO BK5', image: 'image/sanpham/msFT_lich_NN_-1--pdf.png', images: ['image/sanpham/msFT_lich_NN_-1--pdf.png'], desc: 'Kích thước: Theo yêu cầu — Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_081', groupId: 'grp_tui_7', title: 'TÚI GIẤY THƯƠNG HIỆU BÁNH KẸO BK4', image: 'image/sanpham/tJuI_lich_NN_-1--pdf_-9-.png', images: ['image/sanpham/tJuI_lich_NN_-1--pdf_-9-.png'], desc: 'Kích thước: Theo yêu cầu — Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_082', groupId: 'grp_tui_7', title: 'TÚI GIẤY THƯƠNG HIỆU BÁNH KẸO BK3', image: 'image/sanpham/QFVj_lich_NN_-1--pdf_-7-.png', images: ['image/sanpham/QFVj_lich_NN_-1--pdf_-7-.png'], desc: 'Kích thước: Theo yêu cầu — Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_083', groupId: 'grp_tui_8', title: 'TÚI GIẤY NGÂN HÀNG NH', image: 'image/sanpham/2jSO_lich_NN_-1--pdf_-2-.png', images: ['image/sanpham/2jSO_lich_NN_-1--pdf_-2-.png'], desc: 'Kích thước: Theo yêu cầu — Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_084', groupId: 'grp_tui_9', title: 'TÚI ĐỰNG LỊCH 4', image: 'image/sanpham/YZEt_lich_NN_-1--pdf_-5-.png', images: ['image/sanpham/YZEt_lich_NN_-1--pdf_-5-.png'], desc: 'Kích thước: 28,5cm x 61cm x 5,5cm — Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_085', groupId: 'grp_tui_9', title: 'TÚI ĐỰNG LỊCH 3', image: 'image/sanpham/BMri_lich_NN_-1--pdf_-2-.png', images: ['image/sanpham/BMri_lich_NN_-1--pdf_-2-.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_086', groupId: 'grp_tui_9', title: 'TÚI ĐỰNG LỊCH 2', image: 'image/sanpham/f0nU_lich_NN_-1--pdf_-1-.png', images: ['image/sanpham/f0nU_lich_NN_-1--pdf_-1-.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_087', groupId: 'grp_tui_9', title: 'TÚI GIẤY ĐỰNG LỊCH 1', image: 'image/sanpham/Mraw_lich_NN_-1--pdf.png', images: ['image/sanpham/Mraw_lich_NN_-1--pdf.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_088', groupId: 'grp_tui_10', title: 'TÚI ĐỘC QUYỀN 2', image: 'image/sanpham/aIdE_lich_NN_-1--pdf_-5-.png', images: ['image/sanpham/aIdE_lich_NN_-1--pdf_-5-.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_089', groupId: 'grp_tui_10', title: 'TÚI ĐỘC QUYỀN 1', image: 'image/sanpham/EHd8_lich_NN_-1--pdf_-4-.png', images: ['image/sanpham/EHd8_lich_NN_-1--pdf_-4-.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_090', groupId: 'grp_so_1', title: 'SỔ QUÀ TẶNG 6', image: 'image/sanpham/G5eT_lich_NN_-1--pdf_-1-.png', images: ['image/sanpham/G5eT_lich_NN_-1--pdf_-1-.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_091', groupId: 'grp_so_1', title: 'SỔ QUÀ TẶNG 5', image: 'image/sanpham/qBxH_lich_NN_-1--pdf.png', images: ['image/sanpham/qBxH_lich_NN_-1--pdf.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_092', groupId: 'grp_so_1', title: 'SỔ QUÀ TẶNG 4', image: 'image/sanpham/c7Ka_lich_NN_-1--pdf_-3-.png', images: ['image/sanpham/c7Ka_lich_NN_-1--pdf_-3-.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_093', groupId: 'grp_so_1', title: 'SỔ QUÀ TẶNG 3', image: 'image/sanpham/TSyC_lich_NN_-1--pdf_-2-.png', images: ['image/sanpham/TSyC_lich_NN_-1--pdf_-2-.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_094', groupId: 'grp_so_1', title: 'SỔ QUÀ TẶNG 2', image: 'image/sanpham/RYWQ_lich_NN_-1--pdf_-1-.png', images: ['image/sanpham/RYWQ_lich_NN_-1--pdf_-1-.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
    { id: 'prod_095', groupId: 'grp_so_1', title: 'SỔ QUÀ TẶNG 1', image: 'image/sanpham/i5A4_lich_NN_-1--pdf.png', images: ['image/sanpham/i5A4_lich_NN_-1--pdf.png'], desc: 'Giá tham khảo: Liên hệ', year: '2026' },
];

/* Sản phẩm nổi bật riêng cho mục "Lịch Mới 2027" ở trang chủ — quản lý độc lập trong Admin */
const LNN_DEFAULT_FEATURED = [
    { id: 'feat_1', title: 'Lịch Bloc Đại 2027 — Mẫu Hoa Mai', image: 'image/anhlichbloc.png' },
    { id: 'feat_2', title: 'Lịch Để Bàn 2027 — Phong Cảnh Việt', image: 'image/anh1.jpeg' },
    { id: 'feat_3', title: 'Lịch 52 Tuần 2027 — Thư Pháp', image: 'image/anh2.jpeg' },
    { id: 'feat_4', title: 'Bộ Lịch Tết 2027 Cao Cấp', image: 'image/anhsanpham1.jpg' }
];

/* ---------- Helpers chung ---------- */
function lnnUid(prefix) {
    return (prefix || 'id') + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function lnnEscape(str) {
    if (str === undefined || str === null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function lnnFormatDate(dateStr) {
    if (!dateStr) return '';
    const parts = String(dateStr).split('-');
    if (parts.length !== 3) return dateStr;
    const [y, m, d] = parts;
    return `${d}/${m}/${y}`;
}

/* ---------- Chuyển file ảnh (chọn từ máy) thành dữ liệu lưu trực tiếp ----------
   Vì trang admin chạy hoàn toàn trên trình duyệt (không có server để lưu file
   thật vào thư mục image/), ảnh được nén nhỏ lại rồi lưu thẳng dưới dạng
   base64 (data URL) trong localStorage — trình duyệt vẫn hiển thị được bình
   thường qua thẻ <img>, không cần đường dẫn file. */
function lnnFileToDataUrl(file, maxWidth, quality) {
    return new Promise((resolve, reject) => {
        if (!file || !file.type || !file.type.startsWith('image/')) {
            reject(new Error('Không phải file ảnh'));
            return;
        }
        const reader = new FileReader();
        reader.onerror = () => reject(reader.error || new Error('Đọc file thất bại'));
        reader.onload = () => {
            const img = new Image();
            img.onerror = () => reject(new Error('Ảnh không hợp lệ'));
            img.onload = () => {
                let width = img.naturalWidth;
                let height = img.naturalHeight;
                const limit = maxWidth || 1600;
                if (width > limit) {
                    height = Math.round(height * (limit / width));
                    width = limit;
                }
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                const mime = file.type === 'image/png' || file.type === 'image/svg+xml' ? file.type : 'image/jpeg';
                resolve(canvas.toDataURL(mime, quality || 0.82));
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
    });
}


/* ---------- Đồng bộ MongoDB (tùy chọn, dùng qua REST API) ---------- */
function lnnRemoteSave(collection, list) {
    try {
        const base = (window.LNN_API_BASE || '').replace(/\/$/, '');
        if (!base) return;
        fetch(base + '/api/data/' + encodeURIComponent(collection), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: list || [] })
        }).catch(() => {});
    } catch (e) {}
}

/* ---------- Dịch vụ ---------- */
function lnnGetServices() {
    try {
        const raw = localStorage.getItem(LNN_KEYS.services);
        if (raw === null) {
            localStorage.setItem(LNN_KEYS.services, JSON.stringify(LNN_DEFAULT_SERVICES));
            return LNN_DEFAULT_SERVICES.slice();
        }
        return JSON.parse(raw) || [];
    } catch (e) {
        return [];
    }
}

function lnnSaveServices(list) {
    localStorage.setItem(LNN_KEYS.services, JSON.stringify(list || []));
    lnnRemoteSave('services', list || []);
}

function lnnGetServiceById(id) {
    return lnnGetServices().find(s => s.id === id) || null;
}

/* ---------- Mục sản phẩm (thuộc 1 dịch vụ) ---------- */
function lnnGetGroups() {
    try {
        const raw = localStorage.getItem(LNN_KEYS.groups);
        if (raw === null) {
            localStorage.setItem(LNN_KEYS.groups, JSON.stringify(LNN_DEFAULT_GROUPS));
            return LNN_DEFAULT_GROUPS.slice();
        }
        return JSON.parse(raw) || [];
    } catch (e) {
        return [];
    }
}

function lnnSaveGroups(list) {
    localStorage.setItem(LNN_KEYS.groups, JSON.stringify(list || []));
    lnnRemoteSave('groups', list || []);
}

function lnnGetGroupsByService(serviceId) {
    return lnnGetGroups().filter(g => g.serviceId === serviceId);
}

function lnnGetGroupById(id) {
    return lnnGetGroups().find(g => g.id === id) || null;
}

/* ---------- Sản phẩm (thuộc 1 mục sản phẩm) ---------- */
function lnnGetProducts() {
    try {
        const raw = localStorage.getItem(LNN_KEYS.products);
        if (raw === null) {
            localStorage.setItem(LNN_KEYS.products, JSON.stringify(LNN_DEFAULT_PRODUCTS));
            return LNN_DEFAULT_PRODUCTS.slice();
        }
        return JSON.parse(raw) || [];
    } catch (e) {
        return [];
    }
}

function lnnSaveProducts(list) {
    localStorage.setItem(LNN_KEYS.products, JSON.stringify(list || []));
    lnnRemoteSave('products', list || []);
}

/* year (tùy chọn): nếu truyền vào ('2026', '2027'...) chỉ trả về sản phẩm của đúng năm đó.
   Không truyền hoặc truyền 'all' -> trả về toàn bộ sản phẩm trong mục, không phân biệt năm. */
function lnnGetProductsByGroup(groupId, year) {
    let list = lnnGetProducts().filter(p => p.groupId === groupId);
    if (year && year !== 'all') list = list.filter(p => (p.year || '2026') === year);
    return list;
}

/* Danh sách các năm đang thực sự có sản phẩm, mới nhất trước — dùng cho bộ lọc năm
   ở Admin và ở trang Sản phẩm ngoài website. Luôn đảm bảo có ít nhất các năm trong LNN_YEARS. */
function lnnGetProductYears() {
    const used = new Set(lnnGetProducts().map(p => p.year || '2026'));
    LNN_YEARS.forEach(y => used.add(y));
    return Array.from(used).sort((a, b) => b.localeCompare(a));
}

/* ---------- Sản phẩm nổi bật trang chủ (mục "Lịch Mới 2027") ---------- */
function lnnGetFeatured() {
    try {
        const raw = localStorage.getItem(LNN_KEYS.featured);
        if (raw === null) {
            localStorage.setItem(LNN_KEYS.featured, JSON.stringify(LNN_DEFAULT_FEATURED));
            return LNN_DEFAULT_FEATURED.slice();
        }
        return JSON.parse(raw) || [];
    } catch (e) {
        return [];
    }
}

function lnnSaveFeatured(list) {
    localStorage.setItem(LNN_KEYS.featured, JSON.stringify(list || []));
    lnnRemoteSave('featured', list || []);
}

function lnnGetFeaturedById(id) {
    return lnnGetFeatured().find(f => f.id === id) || null;
}

/* ---------- Banner trang chủ (slide ảnh lớn, quản lý trong Admin) ---------- */
function lnnGetBanners() {
    try {
        const raw = localStorage.getItem(LNN_KEYS.banners);
        if (raw === null) {
            localStorage.setItem(LNN_KEYS.banners, JSON.stringify(LNN_DEFAULT_BANNERS));
            return LNN_DEFAULT_BANNERS.slice();
        }
        const list = JSON.parse(raw);
        return (list && list.length) ? list : LNN_DEFAULT_BANNERS.slice();
    } catch (e) {
        return LNN_DEFAULT_BANNERS.slice();
    }
}

function lnnSaveBanners(list) {
    localStorage.setItem(LNN_KEYS.banners, JSON.stringify(list || []));
    lnnRemoteSave('banners', list || []);
}

function lnnGetBannerById(id) {
    return lnnGetBanners().find(b => b.id === id) || null;
}

/* Trả về mảng ảnh của 1 sản phẩm (ưu tiên p.images; nếu dữ liệu cũ chỉ có 1 ảnh thì fallback về p.image) */
function lnnProductImages(p) {
    if (!p) return [];
    if (Array.isArray(p.images) && p.images.length) return p.images;
    if (p.image) return [p.image];
    return [];
}

/* Xóa 1 dịch vụ kèm toàn bộ mục sản phẩm + sản phẩm con của nó */
function lnnDeleteServiceCascade(serviceId) {
    const groupsOfService = lnnGetGroupsByService(serviceId).map(g => g.id);
    lnnSaveServices(lnnGetServices().filter(s => s.id !== serviceId));
    lnnSaveGroups(lnnGetGroups().filter(g => g.serviceId !== serviceId));
    lnnSaveProducts(lnnGetProducts().filter(p => !groupsOfService.includes(p.groupId)));
}

/* Xóa 1 mục sản phẩm kèm toàn bộ sản phẩm con của nó */
function lnnDeleteGroupCascade(groupId) {
    lnnSaveGroups(lnnGetGroups().filter(g => g.id !== groupId));
    lnnSaveProducts(lnnGetProducts().filter(p => p.groupId !== groupId));
}

/* ---------- Bài viết Blog ---------- */
function lnnGetPosts() {
    try {
        const raw = localStorage.getItem(LNN_KEYS.posts);
        if (raw === null) {
            localStorage.setItem(LNN_KEYS.posts, JSON.stringify(LNN_DEFAULT_POSTS));
            return LNN_DEFAULT_POSTS.slice();
        }
        return JSON.parse(raw) || [];
    } catch (e) {
        return [];
    }
}

function lnnSavePosts(list) {
    localStorage.setItem(LNN_KEYS.posts, JSON.stringify(list || []));
    lnnRemoteSave('posts', list || []);
}

function lnnGetPostById(id) {
    return lnnGetPosts().find(p => p.id === id) || null;
}

/* ---------- Dựng nội dung chi tiết bài viết theo bố cục mẫu ----------
   Cú pháp hỗ trợ trong ô "Nội dung chi tiết" của admin (mỗi khối cách nhau bởi 1 dòng trống):
   - Dòng bắt đầu bằng "## "  -> tiêu đề phụ (H2)
   - Dòng bắt đầu bằng ">  "  -> đoạn trích dẫn nổi bật (in nghiêng, chữ lớn)
   - Còn lại                  -> đoạn văn bản thường
   Nếu bài viết không dùng cú pháp này, toàn bộ nội dung vẫn được
   hiển thị gọn gàng thành các đoạn văn theo đúng bố cục mẫu. */
function lnnRenderContent(raw) {
    if (!raw) return '<p class="mb-6">Nội dung đang được cập nhật.</p>';
    const blocks = String(raw).split(/\n\s*\n/);
    return blocks.map(block => {
        const b = block.trim();
        if (!b) return '';
        if (b.startsWith('## ')) {
            return `<h2 class="text-2xl font-bold text-slate-900 mt-12 mb-6">${lnnEscape(b.slice(3).trim())}</h2>`;
        }
        if (b.startsWith('> ')) {
            return `<p class="text-xl text-slate-800 font-normal italic mb-10">${lnnEscape(b.slice(2).trim())}</p>`;
        }
        return `<p class="mb-6">${lnnEscape(b).replace(/\n/g, '<br>')}</p>`;
    }).join('');
}

/* =========================================================
   TÌM KIẾM TOÀN TRANG (dùng cho ô tìm kiếm trên header)
   ========================================================= */

/* Bỏ dấu tiếng Việt + chuyển thường, để tìm kiếm không phân biệt dấu/hoa-thường */
function lnnStripAccents(str) {
    return String(str || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D')
        .toLowerCase();
}

/* Tìm theo từ khóa trên Dịch vụ, Mục sản phẩm, Sản phẩm, Bài viết.
   Trả về { services, groups, products, posts }, mỗi mảng đã giới hạn theo `limit`. */
function lnnSearch(query, limit) {
    limit = limit || 6;
    const q = lnnStripAccents(query).trim();
    if (!q) return { services: [], groups: [], products: [], posts: [] };

    const has = (text) => lnnStripAccents(text).includes(q);

    const services = lnnGetServices()
        .filter(s => has(s.title) || has(s.desc))
        .slice(0, limit);

    const groups = lnnGetGroups()
        .filter(g => has(g.title))
        .slice(0, limit);

    const products = lnnGetProducts()
        .filter(p => has(p.title) || has(p.desc))
        .slice(0, limit);

    const posts = lnnGetPosts()
        .filter(p => has(p.title) || has(p.excerpt))
        .slice(0, limit);

    return { services, groups, products, posts };
}