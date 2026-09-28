  // Chuyển ảnh base64 đang nằm trong site_data sang collection site_images.
// Chạy 1 lần:  node migrate-images.js   (cần MONGODB_URI trong .env, và PUBLIC_API_URL)
// Ví dụ .env:  PUBLIC_API_URL=https://lnn-mongodb-api.onrender.com
require('dotenv').config();
const mongoose = require('mongoose');

const BASE = (process.env.PUBLIC_API_URL || '').replace(/\/$/, '');
if (!process.env.MONGODB_URI || !BASE) {
  console.error('Thiếu MONGODB_URI hoặc PUBLIC_API_URL');
  process.exit(1);
}

const images = mongoose.connection.collection('site_images');
const site = mongoose.connection.collection('site_data');
const FIELDS = ['services', 'groups', 'products', 'posts', 'featured', 'banners'];
let moved = 0;

async function convert(value) {
  if (typeof value === 'string') {
    const m = value.match(/^data:(image\/[\w+.-]+);base64,(.+)$/s);
    if (!m) return value;
    const buf = Buffer.from(m[2], 'base64');
    const r = await images.insertOne({ contentType: m[1], data: buf, size: buf.length, createdAt: new Date() });
    moved++;
    return BASE + '/api/images/' + r.insertedId;
  }
  if (Array.isArray(value)) return Promise.all(value.map(convert));
  if (value && typeof value === 'object') {
    const out = {};
    for (const k of Object.keys(value)) out[k] = await convert(value[k]);
    return out;
  }
  return value;
}

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const doc = await site.findOne({ key: 'main' });
  if (!doc) { console.log('Không có document main'); process.exit(0); }
  const set = { updatedAt: new Date() };
  for (const f of FIELDS) if (Array.isArray(doc[f])) set[f] = await convert(doc[f]);
  await site.updateOne({ key: 'main' }, { $set: set });
  console.log('Đã chuyển', moved, 'ảnh base64 sang site_images');
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
