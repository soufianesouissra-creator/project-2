import { defineConfig, devices } from '@playwright/test'

/**
 * Suite de navigateur (§9, §13).
 *
 * Elle tourne contre un BUILD DE PRODUCTION, pas contre le serveur de
 * développement : c'est en production que le middleware de langue, les
 * en-têtes de sécurité et les Server Actions se comportent comme chez le
 * visiteur.
 *
 * `CHROMIUM_PATH` permet de pointer un Chromium déjà installé quand le
 * numéro de build ne correspond pas à celui qu'attend le paquet.
 */
const PORT = Number(process.env.PORT ?? 3000)
const BASE_URL = process.env.BASE_URL ?? `http://localhost:${PORT}`

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: BASE_URL,
    locale: 'fr-MA',
    timezoneId: 'Africa/Casablanca',
    trace: 'on-first-retry',
    launchOptions: process.env.CHROMIUM_PATH
      ? { executablePath: process.env.CHROMIUM_PATH }
      : undefined,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Pixel 5'] } },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: 'pnpm start',
        url: `http://localhost:${PORT}`,
        reuseExistingServer: true,
        timeout: 120_000,
      },
})
