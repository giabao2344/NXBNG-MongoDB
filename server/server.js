const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const allowed = (process.env.CORS_ORIGIN || '*').split(',').map(s => s.trim()).filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowed.includes('*') || allowed.includes(origin)) return cb(null, true);
    return cb(new Error('CORS blocked'));
  }
}));
app.use(express.json({ limit: '10mb' }));

const siteDataSchema = new mongoose.Schema({
  key: { type: String, unique: true, required: true },
  services: { type: Array, default: [] },
  groups: { type: Array, default: [] },
  products: { type: Array, default: [] },
  posts: { type: Array, default: [] },
  featured: { type: Array, default: [] },
  banners: { type: Array, default: [] },
  updatedAt: { type: Date, default: Date.now }
}, { collection: 'site_data' });

const SiteData = mongoose.model('SiteData', siteDataSchema);
const collections = ['services', 'groups', 'products', 'posts', 'featured', 'banners'];

app.get('/api/health', async (_req, res) => {
  res.json({ ok: true, mongodb: mongoose.connection.readyState === 1 });
});

app.get('/api/bootstrap', async (_req, res) => {
  try {
    const doc = await SiteData.findOne({ key: 'main' }).lean();
    if (!doc) return res.json({ data: null, updatedAt: null });
    const data = {};
    for (const key of collections) data[key] = Array.isArray(doc[key]) ? doc[key] : [];
    res.json({ data, updatedAt: doc.updatedAt || null });
  } catch (err) {
    res.status(500).json({ error: 'Không thể đọc dữ liệu MongoDB' });
  }
});

app.put('/api/data/:collection', async (req, res) => {
  const key = req.params.collection;
  if (!collections.includes(key)) return res.status(400).json({ error: 'Collection không hợp lệ' });
  if (!Array.isArray(req.body.data)) return res.status(400).json({ error: 'data phải là mảng' });

  try {
    const doc = await SiteData.findOneAndUpdate(
      { key: 'main' },
      { $set: { [key]: req.body.data, updatedAt: new Date() } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean();
    res.json({ ok: true, updatedAt: doc.updatedAt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Không thể lưu dữ liệu' });
  }
});

app.put('/api/data', async (req, res) => {
  try {
    const update = { updatedAt: new Date() };
    for (const key of collections) if (Array.isArray(req.body[key])) update[key] = req.body[key];
    const doc = await SiteData.findOneAndUpdate(
      { key: 'main' }, { $set: update },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean();
    res.json({ ok: true, updatedAt: doc.updatedAt });
  } catch (err) {
    res.status(500).json({ error: 'Không thể đồng bộ dữ liệu' });
  }
});

app.get('/', (_req, res) => res.json({ name: 'Lịch Nông Nghiệp API', status: 'running' }));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`API running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
