import { ph } from '../placeholders'
import type { KeyFigure } from '../fr/figures'
import type { MissionStep } from '../fr/mission'
import type { FleetBlock, FleetCategory } from '../fr/fleet'
import type { Sector } from '../fr/sectors'
import type { Milestone, Value } from '../fr/group'
import type { SafetyBlock } from '../fr/safety'
import type { FaqItem, Job } from '../fr/jobs'
import type { Region } from '../fr/coverage'
import type { ClientLogo, ProjectReference, Testimonial } from '../fr/references'

/** English copy for everything that is not a service page. */

export const KEY_FIGURES: readonly KeyFigure[] = [
  { id: 'camions', value: ph('N_CAMIONS'), label: 'trucks in service', note: 'At a reference date to be supplied.', pending: true },
  { id: 'tonnage', value: ph('TONNAGE_ANNUEL'), unit: 't', label: `moved in ${ph('ANNEE_REFERENCE')}`, note: 'Full calendar year.', pending: true },
  { id: 'km', value: ph('KM_ANNUEL'), unit: 'km', label: 'driven per year', note: 'Telematics reading, same year as the tonnage.', pending: true },
  { id: 'ponctualite', value: ph('TAUX_PONCTUALITE'), unit: '%', label: 'of deliveries on time', note: 'Definition of “on time” and period to be confirmed.', pending: true },
  { id: 'dispatch', value: '24/7', label: 'dispatch reachable', note: 'Detailed hours in the footer.', pending: false },
]

export const MISSION_STEPS: readonly MissionStep[] = [
  { n: 1, title: 'Enquiry', text: 'You describe the need: material, volume, origin, destination, delivery window.' },
  { n: 2, title: 'Planning', text: 'Dispatch assigns trucks and drivers, sets the rotations and confirms the schedule.' },
  { n: 3, title: 'Loading & weighing', text: 'Every load is weighed and documented. The weighbridge ticket follows the mission.' },
  { n: 4, title: 'Tracked transport', text: 'Position, speed and stages are tracked in real time. You are told of any variance.' },
  { n: 5, title: 'Delivery & proof', text: 'Delivery note signed, time-stamped and geolocated, available in your reporting.' },
]

export const FLEET: readonly FleetCategory[] = [
  { key: 'benne-8x4', name: '8x4 tipper trucks', use: 'Bulk, short haul, site access', capacity: '~18–20 t', count: ph('FLOTTE_CATEGORIES'), equipment: ['GPS', 'Sheeting'] },
  { key: 'semi-benne', name: 'Tipper semi-trailers', use: 'Bulk, long haul', capacity: '~27–30 t', count: ph('FLOTTE_CATEGORIES'), equipment: ['GPS', 'Sheeting'] },
  { key: 'semi-calorifugee', name: 'Insulated tipper semi-trailers', use: 'Hot-mix asphalt', capacity: '~27 t', count: ph('FLOTTE_CATEGORIES'), equipment: ['GPS', 'Thermal sheet'] },
  { key: 'porte-engins', name: 'Low loaders (gooseneck)', use: 'Earthmoving and compaction plant', capacity: ph('FLOTTE_CATEGORIES'), count: ph('FLOTTE_CATEGORIES'), equipment: ['GPS', 'Ramps', 'Securing'] },
  { key: 'citerne', name: 'Tankers', use: 'Water, diesel, binders', capacity: ph('FLOTTE_CATEGORIES'), count: ph('FLOTTE_CATEGORIES'), equipment: ['GPS', 'Dipping', 'One tanker per product'] },
  { key: 'plateau', name: 'Flatbeds', use: 'Precast, pipes, packaged materials', capacity: '13.6 m · ~25 t', count: ph('FLOTTE_CATEGORIES'), equipment: ['GPS', 'Securing'] },
  { key: 'service', name: 'Service vehicles', use: 'Escort, recovery, mobile workshop', capacity: '—', count: ph('FLOTTE_CATEGORIES'), equipment: ['GPS'] },
]

export const WORKSHOP: FleetBlock = {
  title: 'Workshop & maintenance',
  points: [
    'Preventive maintenance plan per vehicle, scheduled and documented.',
    'Roadworthiness testing tracked, never left to run to the deadline.',
    'Tyre management: pressure and tread checks, regrooving tracked.',
    `Off-road rate: ${ph('TAUX_IMMOBILISATION')} %.`,
  ],
}

export const RENEWAL: FleetBlock = {
  title: 'Renewal',
  points: [
    `Renewal rule: ${ph('POLITIQUE_RENOUVELLEMENT')}.`,
    'A truck leaving the fleet is not replaced by an older one.',
  ],
}

export const TELEMATICS: FleetBlock = {
  title: 'Telematics',
  points: [
    'A 4G tracker on every truck, without exception.',
    'CAN data from the vehicle: engine speed, road speed, consumption.',
    'Fuel monitoring, per vehicle and per driver.',
    'Driving behaviour: speed, braking, driving time.',
  ],
}

export const SECTORS: readonly Sector[] = [
  { id: 'btp', name: 'Construction & road infrastructure', need: 'A paver kept waiting costs more than a spare truck. Rates hold to the half-hour.', answer: 'Rotations paced on the crew’s output, insulated bodies for asphalt, waiting times at the paver tracked and corrected the next day.', fleet: ['semi-calorifugee', 'benne-8x4', 'semi-benne'], services: ['enrobes-a-chaud', 'materiaux-vrac', 'logistique-chantier'] },
  { id: 'carrieres', name: 'Quarries & materials', need: 'Stock that does not move ties up capital, and a disputed weighing ties up an invoice.', answer: 'Collections paced on your output, weighing at every load, ticket attached to the mission and cumulative tonnage every evening.', fleet: ['semi-benne', 'benne-8x4'], services: ['materiaux-vrac', 'camions-avec-chauffeur'] },
  { id: 'industrie', name: 'Industry & precast', need: 'Fragile finished goods, dimensions outside the envelope, and a line that does not stop.', answer: 'Flatbeds and appropriate securing, route survey for oversize loads, scheduled collections rather than on call.', fleet: ['plateau', 'porte-engins'], services: ['transport-exceptionnel', 'logistique-chantier'] },
  { id: 'energie-mines', name: 'Energy & mining', need: 'Remote sites, difficult tracks, and heavy plant to move between working faces.', answer: 'Low loaders and dedicated tankers, access survey before the first rotation, position tracking on routes where coverage is thin.', fleet: ['porte-engins', 'citerne', 'service'], services: ['transport-exceptionnel', 'citernes'] },
  { id: 'agriculture', name: 'Agriculture & agri-food', need: 'Short seasonal peaks, where a lot of capacity is needed for a short time.', answer: 'Trucks with driver by the day or by the month, without tying up a fleet the rest of the year.', fleet: ['benne-8x4', 'plateau', 'citerne'], services: ['camions-avec-chauffeur', 'materiaux-vrac'] },
  { id: 'collectivites', name: 'Public authorities & clients', need: 'Contracts to justify, quantities to evidence and deadlines to document.', answer: 'Delivery note signed, time-stamped and geolocated, weighbridge tickets retained, reporting exportable for your contract file.', fleet: ['benne-8x4', 'semi-benne', 'citerne'], services: ['materiaux-vrac', 'logistique-chantier'] },
]

export const MILESTONES: readonly Milestone[] = [
  { year: ph('ANNEE_CREATION'), title: 'TRANSPOLEQ founded', text: 'Date and circumstances to be supplied by management.' },
  { year: '[MILESTONE]', title: 'Group milestones', text: 'Founding of ALEQ, commissioning of the asphalt plant, growth stages: to be supplied.' },
]

export const VALUES: readonly Value[] = [
  { title: 'What is measured is what we state', sentence: 'We do not declare what the telematics can establish.', proof: 'Speed, braking, driving time and fuel are read from the trackers, not filled in by hand.' },
  { title: 'Quantity is evidenced', sentence: 'Every load is weighed, every delivery is signed.', proof: 'The weighbridge ticket is attached to the mission and the delivery note is time-stamped and geolocated.' },
  { title: 'A variance is reported', sentence: 'A known delay beats a discovered one.', proof: 'Dispatch calls as soon as a rotation slips, without waiting for the end of the day.' },
]

export const COMMITMENTS: readonly string[] = [
  'No truck leaves without a departure check.',
  'Every driver is trained before their first mission, then monitored.',
  'Speed, braking and driving time are measured by telematics, not declared.',
  'Maintenance is preventive, scheduled and documented.',
  'Every incident is reported, analysed and followed by an action.',
]

export const SAFETY_BLOCKS: readonly SafetyBlock[] = [
  { id: 'chauffeurs', title: 'Drivers', points: ['Recruitment on verified licences and experience.', 'Induction training: securing, sheeting, fuel-efficient driving, safe conduct at loading.', 'Driving monitored by telematics: speed, harsh braking, driving and rest time.', 'Deviations lead to a conversation, not an automatic penalty.'] },
  { id: 'vehicules', title: 'Vehicles', points: ['Roadworthiness tracked per vehicle, never left to run to the deadline.', 'Preventive maintenance scheduled, history retained.', 'Securing checked before every abnormal load departure.', 'Sheeting systematic on bulk and asphalt.'] },
  { id: 'conformite', title: 'Compliance', points: ['Goods transport authorisations kept current.', 'Public liability and goods-in-transit insurance.', 'Specific permits for abnormal loads, applied for per route.', 'Documents provided on request.'] },
  { id: 'incidents', title: 'Incidents', points: ['Every incident is reported, whatever its severity.', 'Root cause analysis, not a search for someone to blame.', 'Every analysis leads to a dated action, verified afterwards.'] },
]

export const AVAILABLE_DOCUMENTS: readonly string[] = [
  'Public liability insurance certificate',
  'Goods-in-transit insurance certificate',
  'Vehicle registration documents for the assigned trucks',
  'Transport authorisations',
  'Tax and social security compliance certificate',
]

export const CERTIFICATIONS: readonly { readonly name: string; readonly body: string; readonly validUntil: string }[] = []

export const JOBS: readonly Job[] = []

export const WHY_JOIN: readonly string[] = [
  'Recent, well-maintained trucks.',
  'Pay on a fixed date.',
  'Induction training and regular refreshers.',
  'A schedule known in advance.',
  'Full social cover and insurance.',
]

export const DRIVER_FAQ: readonly FaqItem[] = [
  { id: 'permis', question: 'Which licences are required?', answer: 'To be validated by HR before publication.' },
  { id: 'zones', question: 'Which areas do you run?', answer: 'To be validated by operations before publication.' },
  { id: 'rythme', question: 'What is the working pattern?', answer: 'To be validated by HR before publication.' },
  { id: 'logement', question: 'Is accommodation covered when away?', answer: 'To be validated by HR before publication.' },
]

export const REGIONS: readonly Region[] = [
  { id: 'tanger-tetouan', name: 'Tanger-Tétouan-Al Hoceïma', served: null },
  { id: 'oriental', name: 'Oriental', served: null },
  { id: 'fes-meknes', name: 'Fès-Meknès', served: null },
  { id: 'rabat-sale', name: 'Rabat-Salé-Kénitra', served: null },
  { id: 'beni-mellal', name: 'Béni Mellal-Khénifra', served: null },
  { id: 'casablanca', name: 'Casablanca-Settat', served: null },
  { id: 'marrakech', name: 'Marrakech-Safi', served: null },
  { id: 'draa-tafilalet', name: 'Drâa-Tafilalet', served: null },
  { id: 'souss-massa', name: 'Souss-Massa', served: null },
  { id: 'guelmim', name: 'Guelmim-Oued Noun', served: null },
  { id: 'laayoune', name: 'Laâyoune-Sakia El Hamra', served: null },
  { id: 'dakhla', name: 'Dakhla-Oued Ed-Dahab', served: null },
]

export const COVERAGE_INTRO = `Based in ${ph('VILLE_SIEGE')}, we operate throughout the kingdom.`

export const PROJECTS: readonly ProjectReference[] = []
export const TESTIMONIALS: readonly Testimonial[] = []
export const CLIENT_LOGOS: readonly ClientLogo[] = []
