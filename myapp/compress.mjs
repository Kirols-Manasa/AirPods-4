 import sharp from 'sharp';

await sharp('E:/TEST/myapp/public/images/tabl.webp')
  .webp({ quality: 50, effort: 6 })
  .toFile('E:/TEST/myapp/public/images/tabl_compressed.webp');

console.log('✅ خلص!');