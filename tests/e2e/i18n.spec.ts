import { expect, test } from '@playwright/test'

/** Langues : ce qui casse silencieusement quand on en ajoute une. */

test('l’anglais sert du contenu anglais, pas du français', async ({ page }) => {
  await page.goto('/en/services/citernes')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Tankers')
  await expect(page.getByText('Eau de chantier, gasoil')).toHaveCount(0)
})

test('html porte lang et dir', async ({ page }) => {
  await page.goto('/en')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')

  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr-MA')
})

test('le sélecteur de langue reste sur la même page', async ({ page }) => {
  // Renvoyer à l'accueil ferait perdre sa fiche à qui bascule depuis un service.
  await page.goto('/flotte')
  await page.getByRole('link', { name: 'English' }).click()
  await expect(page).toHaveURL(/\/en\/flotte$/)
})

test('chaque page annonce sa canonique et ses alternatives', async ({ page }) => {
  await page.goto('/flotte')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/flotte$/)
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute('href', /\/en\/flotte$/)
  await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1)
})

test('chaque page porte une vignette de partage', async ({ page }) => {
  // La convention de fichier de Next ne couvre que la racine du segment :
  // /flotte se partageait sans image.
  for (const path of ['/', '/flotte', '/services/citernes', '/en/carrieres']) {
    await page.goto(path)
    await expect(page.locator('meta[property="og:image"]'), `og:image manquant sur ${path}`).toHaveCount(1)
  }
})
