import { ph } from '../placeholders'
import type { Service } from '../fr/services'

/** English service copy. Same slugs — URLs do not change between languages. */
export const SERVICES: readonly Service[] = [
  {
    slug: 'materiaux-vrac',
    title: 'Bulk materials',
    oneLine:
      'Aggregates, sand, all-in and graded base: paced rotations between quarry and site, weighed at every load.',
    icon: 'tipper',
    carries: ['Aggregates and chippings', 'Sand', 'All-in ballast', 'Graded base 0/31.5 and 0/20', 'Soil and spoil'],
    forWho: ['Earthworks', 'Road works', 'Quarries', 'Concrete plants'],
    included: ['Rotation planning', 'Weighing at departure', 'Sheeting', 'Digital delivery note', 'Daily tonnage report'],
    fleet: ['benne-8x4', 'semi-benne'],
    stepNotes: {
      2: 'Pacing is calculated on the quarry’s output and the site’s intake capacity, not on how many trucks happen to be free.',
      3: 'The quarry weighbridge ticket is attached to the mission: the quantity invoiced is the quantity weighed.',
      5: 'The day’s cumulative tonnage reaches you the same evening.',
    },
    kpis: [
      { label: 'Tonnage moved', value: ph('TONNAGE_ANNUEL'), note: `Year ${ph('ANNEE_REFERENCE')}.` },
      { label: 'On-time deliveries', value: `${ph('TAUX_PONCTUALITE')} %`, note: 'Definition and period to be confirmed by operations.' },
    ],
    faq: [
      { id: 'tonne-ou-rotation', question: 'Do you invoice by the tonne or by the rotation?', answer: 'Both exist, depending on the site. Whichever applies is written on the quotation before the first rotation, and it does not change mid-mission.' },
      { id: 'quantite', question: 'How is the delivered quantity guaranteed?', answer: 'Every load is weighed at departure and the ticket is attached to the mission. The delivery note carries that tonnage, signed and time-stamped on arrival.' },
      { id: 'mobilisation', question: 'How quickly can you mobilise trucks?', answer: 'To be confirmed by operations before publication.' },
      { id: 'nuit-weekend', question: 'Do you work nights and weekends?', answer: 'To be confirmed by operations before publication.' },
    ],
    image: '/media/sections/chargement-carriere.jpg',
  },
  {
    slug: 'enrobes-a-chaud',
    title: 'Hot-mix asphalt',
    oneLine:
      'Sheeted and insulated tippers, with journey time controlled between plant and paver so the mix arrives at laying temperature.',
    icon: 'asphalt',
    carries: ['Bituminous mixes', 'Base course', 'Thin surfacing', 'Emulsions and binders'],
    forWho: ['Paving crews', 'Road contractors', 'Asphalt plants'],
    included: ['Pacing with the paving crew', 'Waiting time at the paver tracked', 'Body cleaning', 'Temperature monitoring where fitted'],
    fleet: ['semi-calorifugee', 'benne-8x4'],
    stepNotes: {
      2: 'Truck count is set by the paver’s output: one too many waits and cools, one too few stops the crew.',
      4: 'Time from plant departure to arrival at the paver is tracked mission by mission.',
      5: 'Waiting times at the paver are in the report — which is what lets the pacing be corrected the next day.',
    },
    kpis: [
      { label: 'Average wait at the paver', value: '[TO MEASURE]', note: 'Indicator to be instrumented with the paving crew.' },
      { label: 'Insulated trucks', value: ph('FLOTTE_CATEGORIES'), note: 'Count to be confirmed by operations.' },
    ],
    faq: [
      { id: 'temperature', question: 'How is laying temperature maintained?', answer: 'Through sheeted, insulated bodies and controlled journey time — not through reheating. Pacing with the plant is what determines the temperature on arrival.' },
      { id: 'attente', question: 'What happens if the paving crew falls behind?', answer: 'Dispatch delays departures from the plant rather than leaving loaded trucks waiting. The waiting times recorded are reported back to you.' },
      { id: 'nettoyage', question: 'Are bodies cleaned between products?', answer: 'Yes, cleaning is included. Residue left in a body ends up in the next layer.' },
      { id: 'nuit', question: 'Do you work nights?', answer: 'To be confirmed by operations before publication.' },
    ],
    image: '/media/sections/enrobes-finisseur.jpg',
  },
  {
    slug: 'transport-exceptionnel',
    title: 'Heavy haulage & plant transport',
    oneLine:
      'Excavators, rollers, pavers, complete crews: we move your plant from one site to the next, permits and routing included.',
    icon: 'lowbed',
    carries: ['Excavators and loaders', 'Rollers', 'Pavers', 'Complete crews', 'Oversize precast units'],
    forWho: ['Civil works contractors', 'Plant hire companies', 'Industrial operators'],
    included: ['Route survey', 'Movement permits', 'Escort where required', 'Securing', 'Insurance'],
    fleet: ['porte-engins', 'plateau', 'service'],
    stepNotes: {
      1: 'Give us the machine’s dimensions and mass: that determines the equipment, the route and the permit lead time.',
      2: 'Route survey and permit application come before scheduling. Administrative lead time is part of the quoted lead time.',
      3: 'Loading and securing are checked before departure, and the check is documented.',
    },
    kpis: [
      { label: 'Maximum mass carried', value: ph('FLOTTE_CATEGORIES'), note: 'Low-loader capacity to be confirmed.' },
      { label: 'Permit lead time', value: '[TO CONFIRM]', note: 'Depends on the route and the authorities involved.' },
    ],
    faq: [
      { id: 'autorisations', question: 'Who handles movement permits?', answer: 'We do. The route survey and application are part of the service, and the administrative lead time is stated with the quotation.' },
      { id: 'assurance', question: 'Is the machine insured in transit?', answer: 'Goods-in-transit insurance covers plant entrusted to us. The certificate is provided on request.' },
      { id: 'escorte', question: 'When is an escort required?', answer: 'It depends on the load envelope and the route chosen. Where required it is priced on the quotation, never added afterwards.' },
      { id: 'acces', question: 'What if the site is hard to reach?', answer: 'Describe the access in your enquiry — track width, gradient, bearing capacity. We survey it when there is any doubt.' },
    ],
    image: '/media/sections/porte-engins-chargement.jpg',
  },
  {
    slug: 'citernes',
    title: 'Tankers',
    oneLine: 'Site water, diesel and binders delivered on site in dedicated tankers, with volumes traced.',
    icon: 'tank',
    carries: ['Site water', 'Diesel', 'Binders and emulsions'],
    forWho: ['Remote sites', 'Quarries', 'Plants'],
    included: ['One tanker per product', 'Dipping', 'Scheduled deliveries'],
    fleet: ['citerne'],
    stepNotes: {
      2: 'Deliveries are scheduled against your consumption rather than on call — a site stopped for want of water costs more than a rotation.',
      3: 'Volume loaded is dipped at departure and read again on arrival.',
    },
    kpis: [
      { label: 'Volume per tanker', value: ph('FLOTTE_CATEGORIES'), note: 'Capacities to be confirmed by operations.' },
      { label: 'Tankers in service', value: ph('FLOTTE_CATEGORIES'), note: 'Count to be confirmed by operations.' },
    ],
    faq: [
      { id: 'dediees', question: 'Does one tanker carry several products?', answer: 'No. Tankers are dedicated per product. That is what stops a residue of diesel ending up in site water.' },
      { id: 'volume', question: 'How is the delivered volume evidenced?', answer: 'By dipping at departure and a reading on arrival, both carried on the delivery note.' },
      { id: 'isole', question: 'Do you deliver to sites without surfaced access?', answer: 'Yes, subject to the track’s bearing capacity. Describe the access in your enquiry.' },
      { id: 'programmation', question: 'Can deliveries be set up as recurring?', answer: 'Yes. The delivery plan follows your consumption and is adjusted when it changes.' },
    ],
    image: '/media/sections/citerne-chantier.jpg',
  },
  {
    slug: 'camions-avec-chauffeur',
    title: 'Trucks with driver',
    oneLine: 'A truck and its driver at your disposal, by the day, by the month or for the length of the project.',
    icon: 'driver',
    carries: ['Depends on the truck supplied: tippers, flatbeds, tankers'],
    forWho: ['Civil works contractors', 'Quarries', 'Industrial operators'],
    included: ['Trained driver', 'GPS', 'Maintenance and insurance included', 'Replacement if off the road', 'Digital hours record'],
    fleet: ['benne-8x4', 'semi-benne', 'plateau', 'citerne'],
    stepNotes: {
      1: 'State the truck type, the duration and where the shift starts.',
      2: 'Truck and driver are named in advance, and stay the same for the duration.',
      5: 'The hours record is digital and available daily — not a logbook to be transcribed at month end.',
    },
    kpis: [
      { label: 'Off-road rate', value: `${ph('TAUX_IMMOBILISATION')} %`, note: 'Calculation period to be confirmed.' },
      { label: 'Replacement lead time', value: '[TO CONFIRM]', note: 'Commitment to be validated by operations.' },
    ],
    faq: [
      { id: 'immobilisation', question: 'What happens if the truck breaks down?', answer: 'It is replaced. The committed lead time is written into the hire agreement.' },
      { id: 'duree', question: 'What is the minimum duration?', answer: 'To be confirmed by operations before publication.' },
      { id: 'heures', question: 'How are hours counted?', answer: 'From a digital record produced by the telematics, visible daily. No hour is declared from memory.' },
      { id: 'chauffeur', question: 'Is it always the same driver?', answer: 'Yes for the duration of the hire, leave and sickness aside. A driver who knows the site is faster and breaks less.' },
    ],
    image: '/media/sections/convoi-route.jpg',
  },
  {
    slug: 'logistique-chantier',
    title: 'Site logistics',
    oneLine: 'We plan your supply, run the rotations and report to you every day.',
    icon: 'planning',
    carries: ['All materials and plant covered by the other five services'],
    forWho: ['Major sites', 'Joint ventures'],
    included: ['Supply plan', 'Dedicated dispatcher', 'Multi-supplier coordination', 'Daily reporting'],
    fleet: ['benne-8x4', 'semi-benne', 'semi-calorifugee', 'porte-engins', 'citerne', 'plateau'],
    stepNotes: {
      1: 'The enquiry is about a construction programme, not a single rotation: give us the task schedule and the rates you are aiming for.',
      2: 'A dispatcher is named to your site. They also coordinate suppliers who are not ours.',
      5: 'A daily review: tonnages delivered, rotations completed, waiting times, variance against plan.',
    },
    kpis: [
      { label: 'Rotations managed per day', value: '[TO CONFIRM]', note: 'Order of magnitude to be validated by operations.' },
      { label: 'On-time deliveries', value: `${ph('TAUX_PONCTUALITE')} %`, note: 'Definition and period to be confirmed.' },
    ],
    faq: [
      { id: 'fournisseurs', question: 'Do you coordinate suppliers who are not yours?', answer: 'Yes. The dedicated dispatcher runs the supply plan whoever carries the load.' },
      { id: 'reporting', question: 'What does the daily report contain?', answer: 'Tonnages delivered, rotations completed, waiting times and variance against plan. Variances are explained, not merely counted.' },
      { id: 'interlocuteur', question: 'Do we get a single point of contact?', answer: 'Yes, a dispatcher named to the site, reachable during dispatch hours.' },
      { id: 'maroc', question: 'Do you operate across Morocco?', answer: `We are based in ${ph('VILLE_SIEGE')} and operate throughout the kingdom. The regions covered are listed on the home page.` },
    ],
    image: '/media/sections/dispatch-bureau.jpg',
  },
]

/** Quote form options, in English. Values are the shared slugs. */
export const SERVICE_OPTIONS = SERVICES.map((service) => ({
  value: service.slug,
  label: service.title,
}))
