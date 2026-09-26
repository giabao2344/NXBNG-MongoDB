
(function () {

  const base = (window.LNN_API_BASE || '')
    .replace(/\/$/, '');

  // Không có API thì bỏ qua
  if (!base || !window.fetch) {
    return;
  }

  const map = {
    services: 'lnn_services',
    groups: 'lnn_groups',
    products: 'lnn_products',
    posts: 'lnn_posts',
    featured: 'lnn_featured',
    banners: 'lnn_banners'
  };

  function same(a, b) {
    try {
      return JSON.stringify(a) === JSON.stringify(b);
    } catch (_) {
      return false;
    }
  }

  // =====================================================
  // Lấy dữ liệu từ MongoDB
  // =====================================================

  fetch(base + '/api/bootstrap', {
    cache: 'no-store'
  })

  .then(response => {

    if (!response.ok) {
      throw new Error('API ' + response.status);
    }

    return response.json();

  })

  .then(remote => {

    if (!remote || !remote.data) {
      console.warn(
        'MongoDB API không trả về data'
      );

      return;
    }

    const data = remote.data;

    let changed = false;

    // ===================================================
    // Đồng bộ từng loại dữ liệu
    // ===================================================

    Object.keys(map).forEach(key => {

      if (!Array.isArray(data[key])) {
        return;
      }

      const localStorageKey = map[key];

      let local = null;

      try {

        local = JSON.parse(
          localStorage.getItem(localStorageKey) || 'null'
        );

      } catch (_) {

        local = null;

      }

      // Nếu MongoDB khác localStorage
      if (!same(local, data[key])) {

        localStorage.setItem(
          localStorageKey,
          JSON.stringify(data[key])
        );

        changed = true;

        console.log(
          '[MongoDB] Đã đồng bộ:',
          key,
          '=>',
          data[key].length,
          'items'
        );
      }

    });

    // ===================================================
    // Lưu thời gian đồng bộ
    // ===================================================

    if (remote.updatedAt) {

      localStorage.setItem(
        'lnn_mongo_sync_version',
        String(remote.updatedAt)
      );

    }

    // ===================================================
    // QUAN TRỌNG
    // ===================================================
    // Nếu localStorage vừa được thay đổi,
    // reload trang để giao diện đọc dữ liệu mới.
    //
    // Không kiểm tra previous !== version nữa.
    // Vì dữ liệu có thể thay đổi trong localStorage
    // trong khi updatedAt vẫn giống nhau.

    if (changed) {

      console.log(
        '[MongoDB] Dữ liệu đã thay đổi -> reload trang'
      );

      setTimeout(() => {
        window.location.reload();
      }, 100);

    } else {

      console.log(
        '[MongoDB] Dữ liệu localStorage đã đồng bộ'
      );

    }

  })

  .catch(error => {

    console.warn(
      '[MongoDB] Không thể đồng bộ dữ liệu:',
      error.message
    );

    // Backend không hoạt động thì website
    // vẫn tiếp tục chạy bằng localStorage.

  });

})();
