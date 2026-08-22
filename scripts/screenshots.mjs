/**
 * Captures de contrôle : chaque page en 390 px et en 1440 px.
 *
 * Sert à la relecture de fin de section — on regarde la page, on retire un
 * accessoire, on corrige. Exige un serveur lancé (`pnpm build && pnpm start`).
 *
 *   BASE_URL=http://localhost:3000 node scripts/screenshots.mjs
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = process.env.BASE_URL ?? 'http://localhost:3000'
const OUT = 'screenshots'
const VIEWPORTS = [
  { name: '390', width: 390, height: 844 },
  { name: '1440', width: 1440, height: 900 },
]
const PAGES = [
  { name: 'accueil', path: '/' },
  { name: 'styleguide', path: '/styleguide' },
  { name: '404', path: '/page-inexistante' },
]

mkdirSync(OUT, { recursive: true })

// L'environnement fournit un Chromium préinstallé dont le numéro de build ne
// correspond pas forcément à celui qu'attend le paquet playwright. On pointe
// donc l'exécutable directement quand la variable est renseignée.
const executablePath = process.env.CHROMIUM_PATH
const browser = await chromium.launch(executablePath ? { executablePath } : {})
for (const viewport of VIEWPORTS) {
  for (const page of PAGES) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 2,
      locale: 'fr-MA',
    })
    const tab = await context.newPage()
    await tab.goto(`${BASE}${page.path}`, { waitUntil: 'load' })
    // Laisser la mise en service du board et les révélations se jouer.
    await tab.waitForTimeout(2500)
    await tab.screenshot({ path: `${OUT}/${page.name}-${viewport.name}.png`, fullPage: true })

    // État défilé de l'en-tête : il passe en bande d'enrobé après 80 px.
    if (page.name === 'styleguide') {
      await tab.evaluate(() => window.scrollTo(0, 600))
      await tab.waitForTimeout(600)
      await tab.screenshot({ path: `${OUT}/header-scrolled-${viewport.name}.png` })
    }
    await context.close()
    console.log(`${page.name} @ ${viewport.name}`)
  }
}
await browser.close()
