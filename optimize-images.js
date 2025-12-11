/**
 * Script para optimizar imágenes de fondo
 * Instala sharp con: npm install --save-dev sharp
 * Ejecuta con: node optimize-images.js
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const images = [
  {
    input: 'public/assets/background.png',
    outputs: [
      { path: 'public/assets/background-optimized.webp', width: 768, quality: 80 },
      { path: 'public/assets/background-optimized@2x.webp', width: 1536, quality: 75 },
    ],
  },
  {
    input: 'public/assets/bg1.jpeg',
    outputs: [
      { path: 'public/assets/bg1-optimized.webp', width: 1920, quality: 80 },
      { path: 'public/assets/bg1-optimized@2x.webp', width: 2560, quality: 75 },
    ],
  },
];

async function optimizeImages() {
  console.log('🖼️  Optimizando imágenes...\n');

  for (const image of images) {
    console.log(`Procesando: ${image.input}`);

    if (!fs.existsSync(image.input)) {
      console.log(`⚠️  Archivo no encontrado: ${image.input}\n`);
      continue;
    }

    for (const output of image.outputs) {
      try {
        await sharp(image.input)
          .resize(output.width, null, {
            fit: 'inside',
            withoutEnlargement: true,
          })
          .webp({ quality: output.quality })
          .toFile(output.path);

        const stats = fs.statSync(output.path);
        const originalStats = fs.statSync(image.input);
        const reduction = ((1 - stats.size / originalStats.size) * 100).toFixed(1);

        console.log(`  ✓ ${output.path}`);
        console.log(`    Tamaño: ${(stats.size / 1024).toFixed(1)}KB (${reduction}% de reducción)`);
      } catch (error) {
        console.error(`  ✗ Error procesando ${output.path}:`, error.message);
      }
    }
    console.log('');
  }

  console.log('✅ Optimización completada!');
}

optimizeImages().catch(console.error);
