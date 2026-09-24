/* LNN MongoDB bridge
   - Lấy dữ liệu từ MongoDB về localStorage trước khi trang render.
   - Nếu dữ liệu remote khác dữ liệu local, cập nhật localStorage và tải lại 1 lần.
   - Các hàm lnnSave* trong data.js đồng thời PUT dữ liệu lên MongoDB.
*/
(function () {
  const base = (window.LNN_API_BASE || '').replace(/\/$/, '');
  if (!base || !window.fetch) return;

  const SYNC_KEY = 'lnn_mongo_sync_version';

  function same(a, b) {
    try { return JSON.stringify(a) === JSON.stringify(b); } catch (_) { return false; }
  }

  fetch(base + '/api/bootstrap', { cache: 'no-store' })
    .then(r => r.ok ? r.json() : Promise.reject(new Error('API ' + r.status)))
    .then(remote => {
      if (!remote || !remote.data) return;
      const d = remote.data;
      let changed = false;
      const map = {
        services: 'lnn_services',
        groups: 'lnn_groups',
        products: 'lnn_products',
        posts: 'lnn_posts',
        featured: 'lnn_featured',
        banners: 'lnn_banners'
      };

      Object.keys(map).forEach(k => {
        if (!Array.isArray(d[k])) return;
        const key = map[k];
        let local = null;
        try { local = JSON.parse(localStorage.getItem(key) || 'null'); } catch (_) {}
        if (!same(local, d[k])) {
          localStorage.setItem(key, JSON.stringify(d[k]));
          changed = true;
        }
      });

      const version = String(remote.updatedAt || '');
      const previous = localStorage.getItem(SYNC_KEY);
      if (version) localStorage.setItem(SYNC_KEY, version);

      if (changed && previous !== version) {
        location.reload();
      }
    })
    .catch(() => {
      // Backend chưa cấu hình/không online: website vẫn hoạt động bằng localStorage.
    });
})();
