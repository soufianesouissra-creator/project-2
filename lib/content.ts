import type { Locale } from './routing'

import * as frSite from '@/content/fr/site'
import * as frServices from '@/content/fr/services'
import * as frFleet from '@/content/fr/fleet'
import * as frSectors from '@/content/fr/sectors'
import * as frGroup from '@/content/fr/group'
import * as frSafety from '@/content/fr/safety'
import * as frJobs from '@/content/fr/jobs'
import * as frFigures from '@/content/fr/figures'
import * as frMission from '@/content/fr/mission'
import * as frCoverage from '@/content/fr/coverage'
import * as frReferences from '@/content/fr/references'

import * as enSite from '@/content/en/site'
import * as enServices from '@/content/en/services'
import * as enMisc from '@/content/en/misc'

/**
 * Résolution du contenu par langue.
 *
 * Le FRANÇAIS est canonique : il définit les types et sert de repli. Une clé
 * qu'une traduction oublie retombe donc sur le français plutôt que de
 * disparaître de la page — un trou blanc est pire qu'une phrase non traduite.
 *
 * Les composants consomment `getContent(locale)`, jamais `@/content/fr/...`
 * directement : c'est ce qui rend l'ajout d'une langue possible sans toucher
 * une seule page.
 */
const FR = {
  ...frSite,
  ...frServices,
  ...frFleet,
  ...frSectors,
  ...frGroup,
  ...frSafety,
  ...frJobs,
  ...frFigures,
  ...frMission,
  ...frCoverage,
  ...frReferences,
}

const EN = { ...FR, ...enSite, ...enServices, ...enMisc }

export type SiteContent = typeof FR

export function getContent(locale: Locale | string): SiteContent {
  return locale === 'en' ? (EN as SiteContent) : FR
}

/** Recherche d'un service par slug, dans la bonne langue. */
export function findService(locale: Locale | string, slug: string) {
  return getContent(locale).SERVICES.find((service) => service.slug === slug)
}

/** Catégories de flotte d'un service, dans la bonne langue. */
export function fleetFor(locale: Locale | string, keys: readonly string[]) {
  return getContent(locale).FLEET.filter((category) => keys.includes(category.key))
}
