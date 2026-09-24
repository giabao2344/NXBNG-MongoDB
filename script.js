/* =========================================================
   LỊCH NÔNG NGHIỆP — SHARED SITE SCRIPT
   ========================================================= */

/* ---------- 1. Mobile menu toggle (dùng chung mọi trang) ---------- */
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            menuBtn.setAttribute('aria-expanded', mobileMenu.classList.contains('hidden') ? 'false' : 'true');
            const searchPanel = document.getElementById('searchPanel');
            if (searchPanel && !mobileMenu.classList.contains('hidden')) searchPanel.classList.add('hidden');
        });
        // Đóng menu khi bấm 1 link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        });
    }

    // ---------- 2. Khởi tạo AOS nếu có ----------
    if (window.AOS) {
        AOS.init({ duration: 900, once: true, offset: 60 });
    }
});

/* ---------- 3. Banner slider (chỉ chạy nếu trang có #banner-img) ----------
   Danh sách slide lấy trực tiếp từ dữ liệu Admin (lnnGetBanners() trong data.js)
   để khi Admin đổi/thêm/xóa banner, trang chủ tự động cập nhật theo — không cần
   sửa code. Nếu vì lý do nào đó chưa có data.js, dùng tạm 1 slide mặc định. */
const slides = (typeof lnnGetBanners === 'function' ? lnnGetBanners() : [])
    .map(b => ({ image: b.image, title: b.title, link: b.link || '' }));
if (!slides.length) {
    slides.push({
        image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2000',
        title: 'Giải pháp in ấn <br> chuyên nghiệp',
        link: ''
    });
}

let currentIndex = 0;
let autoSlide;

function buildDots(dotsWrap) {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = slides.map((_, i) =>
        `<div class="dot w-3 h-3 rounded-full cursor-pointer transition ${i === 0 ? 'bg-white' : 'bg-white/50'}"></div>`
    ).join('');
    dotsWrap.querySelectorAll('.dot').forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentIndex = i;
            updateSlide(currentIndex);
            resetTimer();
        });
    });
}

function updateSlide(index) {
    const imgElement = document.getElementById('banner-img');
    const titleElement = document.getElementById('banner-title');
    const dots = document.querySelectorAll('.dot');
    if (!imgElement || !titleElement) return;

    imgElement.style.opacity = 0;
    setTimeout(() => {
        imgElement.src = slides[index].image;
        titleElement.innerHTML = slides[index].title;
        imgElement.style.opacity = 0.6;

        dots.forEach((dot, i) => {
            dot.classList.toggle('bg-white', i === index);
            dot.classList.toggle('bg-white/50', i !== index);
        });
    }, 300);
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlide(currentIndex);
}

function resetTimer() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
    const bannerImg = document.getElementById('banner-img');
    if (!bannerImg) return; // Trang không có banner thì bỏ qua

    buildDots(document.getElementById('bannerDots'));
    updateSlide(0);

    if (slides.length > 1) autoSlide = setInterval(nextSlide, 5000);

    const prevBtn = document.querySelector('[data-slide="prev"]');
    const nextBtn = document.querySelector('[data-slide="next"]');
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
});