/* =========================================================
   LỊCH NÔNG NGHIỆP — Ô TÌM KIẾM + GỢI Ý TRÊN HEADER
   Dùng chung cho mọi trang có sẵn khung: #searchToggleBtn,
   #searchPanel, #searchInput, #searchResults (xem partial header).
   Yêu cầu: đã load data.js trước file này (dùng lnnSearch()).
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('searchToggleBtn');
    const panel = document.getElementById('searchPanel');
    const input = document.getElementById('searchInput');
    const results = document.getElementById('searchResults');
    const closeBtn = document.getElementById('searchCloseBtn');
    if (!toggleBtn || !panel || !input || !results) return; // trang chưa gắn khung tìm kiếm

    function esc(s) {
        if (typeof lnnEscape === 'function') return lnnEscape(s);
        return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function openPanel() {
        panel.classList.remove('hidden');
        renderPlaceholderIfEmpty();
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) mobileMenu.classList.add('hidden');
        setTimeout(() => input.focus(), 30);
    }
    function closePanel() {
        panel.classList.add('hidden');
    }
    function togglePanel() {
        panel.classList.contains('hidden') ? openPanel() : closePanel();
    }

    toggleBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        togglePanel();
    });
    if (closeBtn) closeBtn.addEventListener('click', function (e) { e.stopPropagation(); closePanel(); });

    document.addEventListener('click', function (e) {
        if (panel.classList.contains('hidden')) return;
        if (panel.contains(e.target) || toggleBtn.contains(e.target)) return;
        closePanel();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closePanel();
    });

    function renderPlaceholderIfEmpty() {
        if (!input.value.trim()) {
            results.innerHTML = '<p class="text-xs text-gray-400 px-4 py-6 text-center">Nhập tên dịch vụ, sản phẩm hoặc bài viết bạn muốn tìm...</p>';
        }
    }
    renderPlaceholderIfEmpty();

    function section(label, items, render) {
        if (!items || !items.length) return '';
        return `<p class="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-wide text-gray-400">${label}</p>`
            + items.map(render).join('');
    }

    function runSearch() {
        const q = input.value.trim();
        if (!q) { renderPlaceholderIfEmpty(); return; }
        if (typeof lnnSearch !== 'function') {
            results.innerHTML = '<p class="text-xs text-gray-400 px-4 py-6 text-center">Chức năng tìm kiếm chưa sẵn sàng trên trang này.</p>';
            return;
        }
        const r = lnnSearch(q);
        const html =
            section('Dịch vụ', r.services, s => `
                <a href="dich-vu-chi-tiet.html?id=${encodeURIComponent(s.id)}" class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition">
                    <img src="${esc(s.image)}" alt="" class="w-9 h-9 rounded-lg object-cover bg-gray-100 shrink-0" onerror="this.style.opacity=0">
                    <span class="text-sm font-medium text-slate-700 truncate">${esc(s.title)}</span>
                </a>`) +
            section('Mục sản phẩm', r.groups, g => `
                <a href="san-pham.html?group=${encodeURIComponent(g.id)}" class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition">
                    <span class="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center text-base shrink-0">📦</span>
                    <span class="text-sm font-medium text-slate-700 truncate">${esc(g.title)}</span>
                </a>`) +
            section('Sản phẩm', r.products, p => `
                <a href="san-pham.html?product=${encodeURIComponent(p.id)}" class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition">
                    <img src="${esc((p.images && p.images[0]) || p.image)}" alt="" class="w-9 h-9 rounded-lg object-cover bg-gray-100 shrink-0" onerror="this.style.opacity=0">
                    <span class="text-sm font-medium text-slate-700 truncate">${esc(p.title)}</span>
                </a>`) +
            section('Bài viết', r.posts, post => `
                <a href="post.html?id=${encodeURIComponent(post.id)}" class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition">
                    <img src="${esc(post.image)}" alt="" class="w-9 h-9 rounded-lg object-cover bg-gray-100 shrink-0" onerror="this.style.opacity=0">
                    <span class="text-sm font-medium text-slate-700 truncate">${esc(post.title)}</span>
                </a>`);

        results.innerHTML = html || `<p class="text-xs text-gray-400 px-4 py-6 text-center">Không tìm thấy kết quả phù hợp với "${esc(q)}".</p>`;
    }

    let debounceTimer;
    input.addEventListener('input', function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(runSearch, 150);
    });

    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const first = results.querySelector('a[href]');
            if (first) window.location.href = first.getAttribute('href');
        }
    });
});
