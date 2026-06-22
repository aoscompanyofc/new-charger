/**
 * Converte a imagem do carregador sem fundo para WebP transparente.
 * Uso: node scripts/convert-cutout.mjs <caminho-da-imagem.png>
 */
import sharp from 'sharp'
import { resolve, basename } from 'path'

const input = process.argv[2]
if (!input) {
  console.error('Uso: node scripts/convert-cutout.mjs <caminho-do-arquivo.png>')
  process.exit(1)
}

const out = resolve('public/images/hero-charger-cutout.webp')

sharp(resolve(input))
  .resize(1400)
  .webp({ quality: 88 })
  .toFile(out)
  .then(info => {
    console.log(`✓ ${basename(out)}: ${info.width}x${info.height} — ${Math.round(info.size / 1024)}KB`)
    console.log('  Reinicie o servidor: npm run dev')
  })
  .catch(err => console.error('Erro:', err.message))
