/**
 * Contrôle Lighthouse local, sur les trois pages du §10.
 *
 * Exige un BUILD DE PRODUCTION servi (`pnpm build && pnpm start`) : mesurer le
 * serveur de développement n'a aucun sens — il n'a ni minification, ni
 * découpage de bundle, ni cache.
 *
 *   node scripts/lighthouse.mjs
 */
import lighthouse from 'lighthouse'
import { launch } from 'chrome-launcher'

const BASE = process.env.BASE_URL ?? 'http://localhost:3000'
/**
 * `simulate` (défaut) applique le modèle « lantern » de Lighthouse par-dessus
 * une trace non bridée. Contre `localhost`, où le serveur répond en 8 ms, ce
 * modèle surestime lourdement le LCP : il annonçait 3,3 s là où un vrai
 * navigateur bridé en 4G et CPU ÷4 mesure moins d'une seconde.
 *
 * `THROTTLING=devtools` applique un bridage RÉEL. Plus lent à exécuter, mais
 * c'est le chiffre à croire tant que le site n'est pas déployé.
 */
const THROTTLING = process.env.THROTTLING === 'devtools' ? 'devtools' : 'simulate'
const PAGES = ['/', '/services/materiaux-vrac', '/devis']

const BUDGETS = {
  performance: 0.9,
  accessibility: 0.9,
  'best-practices': 0.9,
  seo: 0.9,
}

const chrome = await launch({
  chromePath: process.env.CHROMIUM_PATH,
  chromeFlags: ['--headless=new', '--no-sandbox', '--disable-dev-shm-usage'],
})

let failed = false

console.log(`Lighthouse · mobile · bridage ${THROTTLING} · ${BASE}\n`)

for (const path of PAGES) {
  const result = await lighthouse(
    `${BASE}${path}`,
    { port: chrome.port, output: 'json', logLevel: 'error' },
    // Mobile, 4G simulée — le lecteur type est sur un chantier.
    {
      extends: 'lighthouse:default',
      settings: {
        formFactor: 'mobile',
        throttlingMethod: THROTTLING,
        screenEmulation: { mobile: true, width: 390, height: 844, deviceScaleFactor: 2 },
      },
    },
  )

  const scores = Object.fromEntries(
    Object.entries(result.lhr.categories).map(([key, category]) => [key, category.score ?? 0]),
  )
  const lcp = result.lhr.audits['largest-contentful-paint']?.numericValue ?? 0
  const cls = result.lhr.audits['cumulative-layout-shift']?.numericValue ?? 0

  const line = Object.entries(BUDGETS)
    .map(([key, min]) => {
      const score = scores[key] ?? 0
      const ok = score >= min
      if (!ok) failed = true
      return `${key} ${Math.round(score * 100)}${ok ? '' : ' ✗'}`
    })
    .join(' · ')

  // Le seuil de LCP n'est opposable qu'en bridage réel : voir la note sur
  // `THROTTLING` plus haut.
  if (THROTTLING === 'devtools' && lcp > 2500) failed = true
  if (cls > 0.05) failed = true

  console.log(
    `${path.padEnd(30)} ${line} · LCP ${Math.round(lcp)} ms${lcp > 2500 ? ' ✗' : ''} · CLS ${cls.toFixed(3)}${cls > 0.05 ? ' ✗' : ''}`,
  )
}

await chrome.kill()
process.exit(failed ? 1 : 0)
