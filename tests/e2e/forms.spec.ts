import { expect, test } from '@playwright/test'

/**
 * Formulaires — les deux parcours qui font vivre le site.
 *
 * Ils tournent en MODE TEST : sans clé Resend ni Turnstile, la Server Action va
 * jusqu'au bout et journalise au lieu d'envoyer. La limitation de débit, elle,
 * ne se desserre pas pour les tests — c'est pourquoi chaque test envoie au plus
 * un formulaire valide.
 */

test.describe('devis', () => {
  test('bloque une étape incomplète, en français', async ({ page }) => {
    await page.goto('/devis')
    await page.getByRole('button', { name: 'Étape suivante' }).click()

    await expect(page.locator('#service-error')).toHaveText('Choisissez un type de transport.')
    await expect(page.locator('#material-error')).toHaveText('Ce champ est requis.')
    // On reste sur l'étape 1 : avancer avec des champs vides ferait échouer
    // l'envoi trois écrans plus loin.
    await expect(page.locator('[aria-current="step"]')).toHaveText('Le transport')
  })

  test('se préremplit depuis un lien de service', async ({ page }) => {
    await page.goto('/devis?service=enrobes-a-chaud&material=EB%200%2F10')
    await expect(page.locator('#service')).toHaveValue('enrobes-a-chaud')
    await expect(page.locator('#material')).toHaveValue('EB 0/10')
  })

  test('va jusqu’à la confirmation', async ({ page }) => {
    await page.goto('/devis')
    await page.selectOption('#service', 'materiaux-vrac')
    await page.fill('#material', 'GNT 0/31,5')
    await page.selectOption('#frequency', 'ponctuel')
    await page.getByRole('button', { name: 'Étape suivante' }).click()

    await page.fill('#origin', 'Carrière A')
    await page.fill('#destination', 'Chantier RN9')
    await page.fill('#startDate', '2026-09-15')
    await page.getByRole('button', { name: 'Étape suivante' }).click()

    await page.fill('#company', 'Entreprise Test SARL')
    await page.fill('#name', 'Karim Bennani')
    await page.fill('#phone', '06 12 34 56 78')
    await page.getByRole('button', { name: 'Envoyer la demande' }).click()

    await expect(page.getByRole('heading', { name: 'Demande envoyée.' })).toBeVisible({ timeout: 15_000 })
  })
})

test.describe('contact', () => {
  test('refuse un téléphone invalide SANS perdre le message déjà écrit', async ({ page }) => {
    // React remet un formulaire à zéro quand son action se termine, refus
    // compris : le visiteur perdait son message et ne le réécrivait pas.
    await page.goto('/contact')
    await page.fill('#name', 'Test')
    await page.fill('#phone', '12345')
    await page.fill('#message', 'Bonjour, une question sur vos citernes.')
    await page.getByRole('button', { name: 'Envoyer le message' }).click()

    await expect(page.locator('#phone-error')).toHaveText(
      'Indiquez un numéro de téléphone valide (ex. 06 12 34 56 78).',
    )
    await expect(page.locator('#message')).toHaveValue('Bonjour, une question sur vos citernes.')
    await expect(page.locator('#name')).toHaveValue('Test')
  })
})

test.describe('candidature', () => {
  test('refuse un fichier qui n’est pas un PDF', async ({ page }) => {
    await page.goto('/carrieres')
    await page.setInputFiles('#cv', {
      name: 'cv.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('pas un pdf'),
    })
    await expect(page.locator('#cv-error')).toHaveText('Format accepté : PDF.')
  })
})
