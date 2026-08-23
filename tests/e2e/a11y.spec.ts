import { expect, test } from '@playwright/test'

/** Accessibilité — les points du §10 qui se vérifient sans outil externe. */

test('le lien de saut apparaît au clavier et mène au contenu', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  const skip = page.getByRole('link', { name: 'Aller au contenu' })
  await expect(skip).toBeFocused()
  await expect(skip).toBeVisible()
})

test('chaque champ du devis a un libellé lié', async ({ page }) => {
  await page.goto('/devis')
  const orphans = await page.evaluate(() => {
    const bad: string[] = []
    for (const field of document.querySelectorAll('input, select, textarea')) {
      if (field.getAttribute('type') === 'hidden') continue
      const id = field.id
      const labelled =
        (id && document.querySelector(`label[for="${id}"]`)) ||
        field.getAttribute('aria-label') ||
        field.closest('label')
      if (!labelled) bad.push(id || field.getAttribute('name') || field.tagName)
    }
    return bad
  })
  // Le champ piège est volontairement hors lecteur d'écran mais garde un label.
  expect(orphans, `champs sans libellé : ${orphans.join(', ')}`).toEqual([])
})

test('l’accordéon de la FAQ s’ouvre au clavier', async ({ page }) => {
  await page.goto('/services/citernes')
  const first = page.locator('details').first()
  await first.locator('summary').focus()
  await page.keyboard.press('Enter')
  await expect(first).toHaveAttribute('open', '')
})

test('le menu mobile se ferme avec Échap', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'menu plein écran mobile uniquement')
  await page.goto('/')
  await page.getByRole('button', { name: 'Ouvrir le menu' }).click()
  await expect(page.locator('#menu-mobile')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.locator('#menu-mobile')).toBeHidden()
})

test('le bandeau de consentement propose refuser aussi visiblement qu’accepter', async ({ page }) => {
  await page.goto('/')
  const banner = page.getByRole('dialog', { name: 'Mesure d’audience' })
  await expect(banner.getByRole('button', { name: 'Accepter' })).toBeVisible()
  await expect(banner.getByRole('button', { name: 'Refuser' })).toBeVisible()
})
