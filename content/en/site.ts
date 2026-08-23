import { ph } from '../placeholders'
import type { LegalIdentity, NavItem, SiteContact } from '../fr/site'

/**
 * English site data.
 *
 * The FRENCH files are canonical: they define the types, and this module
 * mirrors them. Contact details, legal identifiers and entity names are facts,
 * not copy — they read from the same placeholders, so filling a fact once
 * fills it in both languages.
 */
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

export const MAIN_NAV: readonly NavItem[] = [
  { href: '/services', label: 'Services' },
  { href: '/flotte', label: 'Fleet' },
  { href: '/suivi', label: 'Tracking' },
  { href: '/groupe', label: 'Group' },
  { href: '/carrieres', label: 'Careers' },
]

export const FOOTER_NAV: readonly { readonly title: string; readonly items: readonly NavItem[] }[] = [
  {
    title: 'Services',
    items: [
      { href: '/services/materiaux-vrac', label: 'Bulk materials' },
      { href: '/services/enrobes-a-chaud', label: 'Hot-mix asphalt' },
      { href: '/services/transport-exceptionnel', label: 'Heavy haulage' },
      { href: '/services/citernes', label: 'Tankers' },
      { href: '/services/camions-avec-chauffeur', label: 'Trucks with driver' },
      { href: '/services/logistique-chantier', label: 'Site logistics' },
    ],
  },
  {
    title: 'Company',
    items: [
      { href: '/flotte', label: 'Fleet' },
      { href: '/securite', label: 'Safety & compliance' },
      { href: '/suivi', label: 'Tracking & technology' },
      { href: '/secteurs', label: 'Sectors' },
      { href: '/groupe', label: 'The group' },
      { href: '/references', label: 'References' },
      { href: '/carrieres', label: 'Careers' },
    ],
  },
]

export const LEGAL_NAV: readonly NavItem[] = [
  { href: '/mentions-legales', label: 'Legal notice' },
  { href: '/confidentialite', label: 'Privacy' },
  { href: '/contact', label: 'Contact' },
]

export const GROUP_ENTITIES: readonly {
  readonly name: string
  readonly verb: string
  readonly scope: string
  readonly href: string
  readonly current: boolean
}[] = [
  { name: 'ALEQ', verb: 'builds', scope: 'Road works, utilities, water supply, sewerage', href: 'https://aleq.ma', current: false },
  { name: 'AleqFactory', verb: 'produces', scope: 'Asphalt plant and paving', href: 'https://aleq.ma', current: false },
  { name: 'TRANSPOLEQ', verb: 'transports', scope: 'Materials, asphalt, plant, liquids', href: '/', current: true },
]

export const GROUP_CHAIN: readonly string[] = ['Quarry', 'Plant', 'Transport', 'Site']
