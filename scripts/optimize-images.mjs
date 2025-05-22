import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

async function optimizeHeader(filename) {
    try {
        const inputPath = join(projectRoot, 'src', 'assets', 
            `${filename}.jpg`);
        const outputPath = join(projectRoot, 'src', 'assets',  `${filename}.webp`);
        
        await sharp(inputPath)
            // .resize(1920, null, { // null maintains aspect ratio
            //     withoutEnlargement: true,
            //     fit: 'inside'
            // })
            .webp({
                quality: 80,
                effort: 6 // higher compression effort
            })
            .toFile(outputPath);

        console.log(' image optimized successfully!');
    } catch (error) {
        console.error('Error optimizing header image:', error);
    }
}

for (const filename of ['1', '2', '3', '4', '5', '6', '7', '8']) {
    await optimizeHeader(filename);
}
