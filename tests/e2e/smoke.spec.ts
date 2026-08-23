import { expect, test } from '@playwright/test'

/**
 * Parcours critiques.
 *
 * Chaque test fige un DÉFAUT RÉEL rencontré en construisant le site, pas une
 * intention. Un test qui ne pourrait jamais échouer ne protège rien.
 */

const PUBLIC_PATHS = [
  '/', '/services', '/services/materiaux-vrac', '/services/enrobes-a-chaud',
  '/services/transport-exceptionnel', '/services/citernes',
  '/services/camions-avec-chauffeur', '/services/logistique-chantier',
  '/flotte', '/securite', '/suivi', '/secteurs', '/groupe', '/references',
  '/carrieres', '/contact', '/devis', '/mentions-legales', '/confidentialite',
]

test.describe('pages publiques', () => {
  for (const path of PUBLIC_PATHS) {
    test(`${path} répond, a un seul h1 et ne défile pas horizontalement`, async ({ page }) => {
      const response = await page.goto(path)
      expect(response?.status(), `statut HTTP de ${path}`).toBe(200)

      await expect(page.locator('h1')).toHaveCount(1)

      // §10 : le corps de page ne défile jamais horizontalement. Ce contrôle a
      // pris deux composants en flagrant délit (board et marquee) : tous deux
      // déclaraient leur propre conteneur de défilement mais leur parent ne
      // pouvait pas rétrécir sous leur contenu.
      const { clientWidth, scrollWidth } = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }))
      expect(scrollWidth, `${path} déborde horizontalement`).toBeLessThanOrEqual(clientWidth + 1)
    })
  }
})

test('la 404 est en français, avec en-tête et pied de page', async ({ page }) => {
  // Sans layout racine réel, Next rendait sa propre 404 en anglais alors que la
  // page française existait et compilait.
  const response = await page.goto('/cette-page-nexiste-pas')
  expect(response?.status()).toBe(404)
  await expect(page.getByText('Cette page n’est pas sur notre itinéraire.')).toBeVisible()
  // L'en-tête et le pied de page du site encadrent bien la 404 — c'est ce qui
  // la distingue de la page par défaut de Next. On vise le pied de page :
  // la navigation principale est masquée en CSS sur mobile, donc absente de
  // l'arbre d'accessibilité.
  await expect(page.getByRole('contentinfo')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Retour à l’accueil' })).toBeVisible()
})

test('le styleguide reste hors index', async ({ page }) => {
  await page.goto('/styleguide')
  const robots = page.locator('meta[name="robots"]')
  await expect(robots.first()).toHaveAttribute('content', /noindex/)
})

test('le tableau de dispatch affiche sa mention et ne rogne pas le statut', async ({ page }) => {
  await page.goto('/')
  const board = page.locator('section[aria-label^="Tableau de dispatch"]').first()
  // `exact` : la légende de tableau, réservée aux lecteurs d'écran, contient
  // aussi ces mots.
  await expect(board.getByText('Données illustratives', { exact: true })).toBeVisible()

  // La colonne Statut est la seule qui dise ce qui se passe : elle sortait du
  // panneau quand les points de rupture étaient calés sur la fenêtre.
  const chip = board.locator('td').last()
  const inside = await chip.evaluate((cell) => {
    const panel = cell.closest('section')
    if (!panel) return false
    return cell.getBoundingClientRect().right <= panel.getBoundingClientRect().right + 1
  })
  expect(inside, 'la puce de statut sort du panneau').toBe(true)
})
