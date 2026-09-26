
const dns = require('dns');

// Dùng Google DNS để xử lý MongoDB Atlas SRV
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 3000;

// ===============================
// CORS
// ===============================

const allowed = (process.env.CORS_ORIGIN || '*')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (
      !origin ||
      allowed.includes('*') ||
      allowed.includes(origin)
    ) {
      return cb(null, true);
    }

    return cb(new Error('CORS blocked'));
  }
}));

// ===============================
// JSON
// ===============================

app.use(express.json({
  limit: '10mb'
}));

// ===============================
// MONGOOSE SCHEMA
// ===============================

const siteDataSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      unique: true,
      required: true
    },

    services: {
      type: Array,
      default: []
    },

    groups: {
      type: Array,
      default: []
    },

    products: {
      type: Array,
      default: []
    },

    posts: {
      type: Array,
      default: []
    },

    featured: {
      type: Array,
      default: []
    },

    banners: {
      type: Array,
      default: []
    },

    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: 'site_data'
  }
);

const SiteData = mongoose.model(
  'SiteData',
  siteDataSchema
);

// Các trường dữ liệu được phép đồng bộ
const collections = [
  'services',
  'groups',
  'products',
  'posts',
  'featured',
  'banners'
];

// ==================================================
// API ROOT
// ==================================================

app.get('/', (_req, res) => {
  res.json({
    name: 'Lịch Nông Nghiệp API',
    status: 'running'
  });
});

// ==================================================
// API HEALTH
// ==================================================

app.get('/api/health', async (_req, res) => {
  res.json({
    ok: true,
    mongodb: mongoose.connection.readyState === 1
  });
});

// ==================================================
// API KIỂM TRA DATABASE
// ==================================================
// API này giúp kiểm tra Render đang đọc đúng dữ liệu hay không.

app.get('/api/debug', async (_req, res) => {
  try {
    const doc = await SiteData
      .findOne({ key: 'main' })
      .lean();

    res.json({
      mongodb: mongoose.connection.readyState === 1,

      database: mongoose.connection.name,

      collection: 'site_data',

      documentExists: !!doc,

      products: Array.isArray(doc?.products)
        ? doc.products.length
        : 0,

      groups: Array.isArray(doc?.groups)
        ? doc.groups.length
        : 0,

      services: Array.isArray(doc?.services)
        ? doc.services.length
        : 0,

      posts: Array.isArray(doc?.posts)
        ? doc.posts.length
        : 0,

      featured: Array.isArray(doc?.featured)
        ? doc.featured.length
        : 0,

      banners: Array.isArray(doc?.banners)
        ? doc.banners.length
        : 0,

      updatedAt: doc?.updatedAt || null
    });

  } catch (err) {
    console.error('Debug error:', err);

    res.status(500).json({
      error: 'Không thể kiểm tra MongoDB',
      message: err.message
    });
  }
});

// ==================================================
// API BOOTSTRAP
// ==================================================

app.get('/api/bootstrap', async (_req, res) => {
  try {
    const doc = await SiteData
      .findOne({ key: 'main' })
      .lean();

    if (!doc) {
      return res.json({
        data: null,
        updatedAt: null
      });
    }

    const data = {};

    for (const key of collections) {
      data[key] = Array.isArray(doc[key])
        ? doc[key]
        : [];
    }

    res.json({
      data,
      updatedAt: doc.updatedAt || null
    });

  } catch (err) {
    console.error('Bootstrap error:', err);

    res.status(500).json({
      error: 'Không thể đọc dữ liệu MongoDB'
    });
  }
});

// ==================================================
// API THÊM SẢN PHẨM MỚI
// ==================================================
// QUAN TRỌNG:
// API này dùng $push nên KHÔNG xóa các sản phẩm cũ.
//
// Ví dụ:
// 95 sản phẩm hiện tại
// +
// sản phẩm mới
// =
// 96 sản phẩm
//
// Không dùng $set cho toàn bộ products ở đây.

app.post('/api/data/products', async (req, res) => {
  try {
    const product = req.body;

    // Kiểm tra dữ liệu cơ bản
    if (!product || typeof product !== 'object') {
      return res.status(400).json({
        error: 'Dữ liệu sản phẩm không hợp lệ'
      });
    }

    if (!product.id) {
      return res.status(400).json({
        error: 'Sản phẩm phải có id'
      });
    }

    if (!product.title) {
      return res.status(400).json({
        error: 'Sản phẩm phải có title'
      });
    }

    // Kiểm tra sản phẩm đã tồn tại chưa
    const existing = await SiteData.findOne({
      key: 'main',
      products: {
        $elemMatch: {
          id: product.id
        }
      }
    }).lean();

    if (existing) {
      return res.status(409).json({
        error: 'Sản phẩm có id này đã tồn tại'
      });
    }

    // THÊM sản phẩm vào cuối mảng
    const doc = await SiteData.findOneAndUpdate(
      { key: 'main' },

      {
        $push: {
          products: product
        },

        $set: {
          updatedAt: new Date()
        }
      },

      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      }
    ).lean();

    res.json({
      ok: true,
      message: 'Đã thêm sản phẩm thành công',
      product,
      productCount: Array.isArray(doc.products)
        ? doc.products.length
        : 0,
      updatedAt: doc.updatedAt
    });

  } catch (err) {
    console.error('Add product error:', err);

    res.status(500).json({
      error: 'Không thể thêm sản phẩm',
      message: err.message
    });
  }
});

// ==================================================
// API CẬP NHẬT 1 SẢN PHẨM
// ==================================================
// API này cập nhật sản phẩm theo id.
// Các sản phẩm khác vẫn được giữ nguyên.

app.put('/api/data/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;

    if (!productId) {
      return res.status(400).json({
        error: 'Thiếu id sản phẩm'
      });
    }

    if (!updateData || typeof updateData !== 'object') {
      return res.status(400).json({
        error: 'Dữ liệu sản phẩm không hợp lệ'
      });
    }

    const doc = await SiteData.findOne({
      key: 'main'
    });

    if (!doc) {
      return res.status(404).json({
        error: 'Không tìm thấy dữ liệu site'
      });
    }

    const index = doc.products.findIndex(
      product => product && product.id === productId
    );

    if (index === -1) {
      return res.status(404).json({
        error: 'Không tìm thấy sản phẩm'
      });
    }

    // Giữ id cũ
    const updatedProduct = {
      ...doc.products[index],
      ...updateData,
      id: productId
    };

    doc.products[index] = updatedProduct;
    doc.updatedAt = new Date();

    await doc.save();

    res.json({
      ok: true,
      message: 'Đã cập nhật sản phẩm',
      product: updatedProduct,
      productCount: doc.products.length,
      updatedAt: doc.updatedAt
    });

  } catch (err) {
    console.error('Update product error:', err);

    res.status(500).json({
      error: 'Không thể cập nhật sản phẩm',
      message: err.message
    });
  }
});

// ==================================================
// API XÓA 1 SẢN PHẨM
// ==================================================
// Chỉ xóa đúng sản phẩm được yêu cầu.

app.delete('/api/data/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({
        error: 'Thiếu id sản phẩm'
      });
    }

    const doc = await SiteData.findOne({
      key: 'main'
    });

    if (!doc) {
      return res.status(404).json({
        error: 'Không tìm thấy dữ liệu site'
      });
    }

    const oldCount = doc.products.length;

    doc.products = doc.products.filter(
      product => !product || product.id !== productId
    );

    if (doc.products.length === oldCount) {
      return res.status(404).json({
        error: 'Không tìm thấy sản phẩm'
      });
    }

    doc.updatedAt = new Date();

    await doc.save();

    res.json({
      ok: true,
      message: 'Đã xóa sản phẩm',
      productCount: doc.products.length,
      updatedAt: doc.updatedAt
    });

  } catch (err) {
    console.error('Delete product error:', err);

    res.status(500).json({
      error: 'Không thể xóa sản phẩm',
      message: err.message
    });
  }
});

// ==================================================
// API GHI ĐÈ MỘT COLLECTION
// ==================================================
// API cũ vẫn được giữ để không làm hỏng frontend hiện tại.
//
// CẢNH BÁO:
// Nếu frontend gọi:
// PUT /api/data/products
//
// với data = []
//
// thì toàn bộ products sẽ bị thay bằng [].
//
// Vì vậy frontend nên dùng:
// POST /api/data/products
//
// khi THÊM sản phẩm.

app.put('/api/data/:collection', async (req, res) => {
  const key = req.params.collection;

  if (!collections.includes(key)) {
    return res.status(400).json({
      error: 'Collection không hợp lệ'
    });
  }

  if (!Array.isArray(req.body.data)) {
    return res.status(400).json({
      error: 'data phải là mảng'
    });
  }

  try {
    const doc = await SiteData.findOneAndUpdate(
      { key: 'main' },

      {
        $set: {
          [key]: req.body.data,
          updatedAt: new Date()
        }
      },

      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      }
    ).lean();

    res.json({
      ok: true,

      collection: key,

      count: Array.isArray(doc[key])
        ? doc[key].length
        : 0,

      updatedAt: doc.updatedAt
    });

  } catch (err) {
    console.error('Update collection error:', err);

    res.status(500).json({
      error: 'Không thể lưu dữ liệu'
    });
  }
});

// ==================================================
// API ĐỒNG BỘ TOÀN BỘ DỮ LIỆU
// ==================================================
// API này vẫn giữ nguyên chức năng cũ.
//
// CHÚ Ý:
// Chỉ những field được gửi lên mới được cập nhật.

app.put('/api/data', async (req, res) => {
  try {
    const update = {
      updatedAt: new Date()
    };

    for (const key of collections) {
      if (Array.isArray(req.body[key])) {
        update[key] = req.body[key];
      }
    }

    const doc = await SiteData.findOneAndUpdate(
      { key: 'main' },

      {
        $set: update
      },

      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      }
    ).lean();

    res.json({
      ok: true,
      updatedAt: doc.updatedAt
    });

  } catch (err) {
    console.error('Sync data error:', err);

    res.status(500).json({
      error: 'Không thể đồng bộ dữ liệu'
    });
  }
});

// ==================================================
// MONGODB CONNECTION
// ==================================================

if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI chưa được cấu hình');

  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI)

  .then(async () => {

    console.log('====================================');
    console.log('MongoDB connected successfully');
    console.log('Database:', mongoose.connection.name);
    console.log('====================================');

    // Kiểm tra dữ liệu site_data
    try {
      const doc = await SiteData
        .findOne({ key: 'main' })
        .lean();

      if (!doc) {

        console.log('⚠️ Chưa có document key = main');

      } else {

        const productCount = Array.isArray(doc.products)
          ? doc.products.length
          : 0;

        const groupCount = Array.isArray(doc.groups)
          ? doc.groups.length
          : 0;

        const serviceCount = Array.isArray(doc.services)
          ? doc.services.length
          : 0;

        const postCount = Array.isArray(doc.posts)
          ? doc.posts.length
          : 0;

        console.log('====================================');
        console.log('Site data found');
        console.log('Products:', productCount);
        console.log('Groups:', groupCount);
        console.log('Services:', serviceCount);
        console.log('Posts:', postCount);
        console.log('====================================');

      }

    } catch (err) {

      console.error(
        'Không thể kiểm tra site_data:',
        err.message
      );

    }

    // Khởi động server
    app.listen(PORT, () => {

      console.log('====================================');
      console.log(`API running on port ${PORT}`);
      console.log('====================================');

    });

  })

  .catch(err => {

    console.error(
      'MongoDB connection failed:',
      err.message
    );

    process.exit(1);

  });

