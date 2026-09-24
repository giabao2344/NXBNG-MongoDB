const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();
const mongoose = require('mongoose');
const seed = require('./seed-data.json');

const schema = new mongoose.Schema({
  key: { type: String, unique: true, required: true },
  services: Array, groups: Array, products: Array, posts: Array,
  featured: Array, banners: Array, updatedAt: { type: Date, default: Date.now }
}, { collection: 'site_data' });

const SiteData = mongoose.model('SiteData', schema);

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await SiteData.findOneAndUpdate(
    { key: 'main' },
    { $set: { ...seed, updatedAt: new Date() } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  console.log('Đã seed dữ liệu LNN vào MongoDB:', {
    services: seed.services.length,
    groups: seed.groups.length,
    products: seed.products.length,
    posts: seed.posts.length
  });
  await mongoose.disconnect();
})().catch(err => {
  console.error(err);
  process.exit(1);
});
