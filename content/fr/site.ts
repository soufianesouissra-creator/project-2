import { ph } from '../placeholders'

/**
 * Données de l'entreprise et structure de navigation.
 *
 * Typé de façon à ce qu'un CMS (Sanity, Payload) puisse remplacer ce fichier en
 * v2 sans qu'aucun composant ne bouge : les composants consomment les types,
 * pas ce module.
 */

export interface SiteContact {
  readonly phone: string
  /** Format international sans espaces, pour wa.me et tel:. */
  readonly phoneHref: string
  readonly whatsapp: string
  readonly email: string
  readonly hours: string
  readonly city: string
  readonly address: string
}

export interface NavItem {
  readonly href: string
  readonly label: string
}

export interface LegalIdentity {
  readonly legalName: string
  readonly legalForm: string
  readonly capital: string
  readonly rc: string
  readonly ice: string
  readonly taxId: string
}

export const CONTACT: SiteContact = {
  phone: ph('TEL'),
  phoneHref: ph('TEL'),
  whatsapp: ph('WHATSAPP'),
  email: ph('EMAIL'),
  hours: ph('HORAIRES'),
  city: ph('VILLE_SIEGE'),
  address: ph('ADRESSE_SIEGE'),
}

export const LEGAL: LegalIdentity = {
  legalName: ph('RAISON_SOCIALE'),
  legalForm: ph('FORME_JURIDIQUE'),
  capital: ph('CAPITAL'),
  rc: ph('RC'),
  ice: ph('ICE'),
  taxId: ph('IF'),
}

/** Navigation principale — 5 entrées, pas six. Un menu se lit d'un coup d'œil. */
export const MAIN_NAV: readonly NavItem[] = [
  { href: '/services', label: 'Services' },
  { href: '/flotte', label: 'Flotte' },
  { href: '/suivi', label: 'Suivi' },
  { href: '/groupe', label: 'Groupe' },
  { href: '/carrieres', label: 'Carrières' },
]

export const FOOTER_NAV: readonly { readonly title: string; readonly items: readonly NavItem[] }[] = [
  {
    title: 'Services',
    items: [
      { href: '/services/materiaux-vrac', label: 'Matériaux en vrac' },
      { href: '/services/enrobes-a-chaud', label: 'Enrobés à chaud' },
      { href: '/services/transport-exceptionnel', label: 'Transport exceptionnel' },
      { href: '/services/citernes', label: 'Citernes' },
      { href: '/services/camions-avec-chauffeur', label: 'Camions avec chauffeur' },
      { href: '/services/logistique-chantier', label: 'Logistique de chantier' },
    ],
  },
  {
    title: 'Entreprise',
    items: [
      { href: '/flotte', label: 'Flotte' },
      { href: '/securite', label: 'Sécurité & conformité' },
      { href: '/suivi', label: 'Suivi & technologie' },
      { href: '/secteurs', label: 'Secteurs' },
      { href: '/groupe', label: 'Le groupe' },
      { href: '/references', label: 'Références' },
      { href: '/carrieres', label: 'Carrières' },
    ],
  },
]

export const LEGAL_NAV: readonly NavItem[] = [
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/confidentialite', label: 'Confidentialité' },
  { href: '/contact', label: 'Contact' },
]

/** Les trois entités du groupe. L'ordre est celui de la chaîne, pas alphabétique. */
export const GROUP_ENTITIES: readonly {
  readonly name: string
  readonly verb: string
  readonly scope: string
  readonly href: string
  readonly current: boolean
}[] = [
  {
    name: 'ALEQ',
    verb: 'construit',
    scope: 'Travaux routiers, VRD, AEP, assainissement',
    href: 'https://aleq.ma',
    current: false,
  },
  {
    name: 'AleqFactory',
    verb: 'produit',
    scope: 'Centrale d’enrobage et mise en œuvre',
    href: 'https://aleq.ma',
    current: false,
  },
  {
    name: 'TRANSPOLEQ',
    verb: 'transporte',
    scope: 'Matériaux, enrobés, engins, liquides',
    href: '/',
    current: true,
  },
]

/** La chaîne intégrée, dessinée sur la ligne de marquage. */
export const GROUP_CHAIN: readonly string[] = ['Carrière', 'Centrale', 'Transport', 'Chantier']
