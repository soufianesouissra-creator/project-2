import { ph } from '../placeholders'
import type { FleetCategoryKey } from '@/components/icons/FleetSilhouettes'

/**
 * Les six services (§6.2, §8.1).
 *
 * Typé pour qu'un CMS puisse remplacer ce fichier en v2 sans qu'aucun
 * composant ne bouge : les pages consomment `Service`, pas ce module.
 */

export type ServiceSlug =
  | 'materiaux-vrac'
  | 'enrobes-a-chaud'
  | 'transport-exceptionnel'
  | 'citernes'
  | 'camions-avec-chauffeur'
  | 'logistique-chantier'

export type ServiceIconKey =
  | 'tipper'
  | 'asphalt'
  | 'lowbed'
  | 'tank'
  | 'driver'
  | 'planning'

export interface ServiceKpi {
  readonly label: string
  readonly value: string
  /** Comment le chiffre est mesuré. Un indicateur sans définition ne vaut rien. */
  readonly note: string
}

export interface ServiceFaqItem {
  readonly id: string
  readonly question: string
  readonly answer: string
}

export interface Service {
  readonly slug: ServiceSlug
  readonly title: string
  /** Une ligne. C'est elle qui est affichée en carte et en méta-description. */
  readonly oneLine: string
  readonly icon: ServiceIconKey
  /** Ce que nous transportons — matières, engins, volumes. */
  readonly carries: readonly string[]
  readonly forWho: readonly string[]
  readonly included: readonly string[]
  /** Catégories de flotte mobilisées, pour filtrer la page Flotte. */
  readonly fleet: readonly FleetCategoryKey[]
  /** Précisions propres au service sur les 5 étapes d'une mission. */
  readonly stepNotes: Partial<Record<1 | 2 | 3 | 4 | 5, string>>
  readonly kpis: readonly ServiceKpi[]
  readonly faq: readonly ServiceFaqItem[]
  /** Photo attendue, décrite dans public/media/README.md. */
  readonly image: string
}

export const SERVICES: readonly Service[] = [
  {
    slug: 'materiaux-vrac',
    title: 'Matériaux en vrac',
    oneLine:
      'Agrégats, sable, tout-venant, GNT : des rotations cadencées entre carrière et chantier, pesées à chaque chargement.',
    icon: 'tipper',
    carries: ['Agrégats et gravillons', 'Sable', 'Tout-venant', 'GNT 0/31,5 et 0/20', 'Terre et déblais'],
    forWho: ['Terrassement', 'Voirie', 'Carrières', 'Centrales à béton'],
    included: [
      'Planification des rotations',
      'Pesée au départ',
      'Bâchage',
      'Bon de livraison digital',
      'Reporting tonnage quotidien',
    ],
    fleet: ['benne-8x4', 'semi-benne'],
    stepNotes: {
      2: 'Le cadencement est calculé sur le débit de la carrière et la capacité de réception du chantier, pas sur le nombre de camions disponibles.',
      3: 'Le ticket de pesée de la carrière est rattaché à la mission : la quantité facturée est celle qui a été pesée.',
      5: 'Le tonnage cumulé du jour vous est envoyé le soir même.',
    },
    kpis: [
      { label: 'Tonnage transporté', value: ph('TONNAGE_ANNUEL'), note: `Année ${ph('ANNEE_REFERENCE')}.` },
      { label: 'Livraisons à l’heure', value: `${ph('TAUX_PONCTUALITE')} %`, note: 'Définition et période à confirmer par l’exploitation.' },
    ],
    faq: [
      {
        id: 'tonne-ou-rotation',
        question: 'Facturez-vous à la tonne ou à la rotation ?',
        answer:
          'Les deux existent selon le chantier. Le mode retenu est écrit sur le devis avant la première rotation, et il ne change pas en cours de mission.',
      },
      {
        id: 'quantite',
        question: 'Comment est garantie la quantité livrée ?',
        answer:
          'Chaque chargement est pesé au départ et le ticket de pesée est rattaché à la mission. Le bon de livraison reprend ce tonnage, signé et horodaté à l’arrivée.',
      },
      {
        id: 'mobilisation',
        question: 'En combien de temps pouvez-vous mobiliser des camions ?',
        answer: 'À confirmer par l’exploitation avant publication.',
      },
      {
        id: 'nuit-weekend',
        question: 'Travaillez-vous de nuit et le week-end ?',
        answer: 'À confirmer par l’exploitation avant publication.',
      },
    ],
    image: '/media/sections/chargement-carriere.jpg',
  },
  {
    slug: 'enrobes-a-chaud',
    title: 'Enrobés à chaud',
    oneLine:
      'Bennes bâchées et calorifugées, temps de trajet maîtrisé entre la centrale et le finisseur pour livrer à la température de pose.',
    icon: 'asphalt',
    carries: ['Enrobés bitumineux EB', 'Grave-bitume', 'Béton bitumineux mince', 'Émulsions et liants'],
    forWho: ['Ateliers de mise en œuvre', 'Entreprises routières', 'Centrales d’enrobage'],
    included: [
      'Cadencement avec l’atelier',
      'Suivi des temps d’attente au finisseur',
      'Nettoyage des bennes',
      'Suivi de température (si équipé)',
    ],
    fleet: ['semi-calorifugee', 'benne-8x4'],
    stepNotes: {
      2: 'Le nombre de camions est calé sur le débit du finisseur : un camion de trop attend et refroidit, un camion de moins arrête l’atelier.',
      4: 'Le temps entre la sortie de centrale et l’arrivée au finisseur est suivi mission par mission.',
      5: 'Les temps d’attente au finisseur sont dans le reporting — c’est ce qui permet de corriger le cadencement dès le lendemain.',
    },
    kpis: [
      { label: 'Temps d’attente moyen au finisseur', value: '[À MESURER]', note: 'Indicateur à instrumenter avec l’atelier.' },
      { label: 'Camions calorifugés', value: ph('FLOTTE_CATEGORIES'), note: 'Nombre à confirmer par l’exploitation.' },
    ],
    faq: [
      {
        id: 'temperature',
        question: 'Comment la température de pose est-elle tenue ?',
        answer:
          'Par des bennes bâchées et calorifugées et par un temps de trajet maîtrisé, pas par un réchauffage. C’est le cadencement avec la centrale qui fait la température à l’arrivée.',
      },
      {
        id: 'attente',
        question: 'Que se passe-t-il si l’atelier prend du retard ?',
        answer:
          'Le dispatch décale les départs de la centrale plutôt que de laisser des camions chargés en attente. Les temps d’attente constatés vous sont remontés.',
      },
      {
        id: 'nettoyage',
        question: 'Les bennes sont-elles nettoyées entre deux produits ?',
        answer:
          'Oui, le nettoyage est inclus. Un fond de benne mal nettoyé se retrouve dans la couche suivante.',
      },
      {
        id: 'nuit',
        question: 'Travaillez-vous de nuit ?',
        answer: 'À confirmer par l’exploitation avant publication.',
      },
    ],
    image: '/media/sections/enrobes-finisseur.jpg',
  },
  {
    slug: 'transport-exceptionnel',
    title: 'Transport exceptionnel & porte-engins',
    oneLine:
      'Pelles, compacteurs, finisseurs, ateliers complets : nous déplaçons vos engins d’un chantier à l’autre, autorisations et itinéraires compris.',
    icon: 'lowbed',
    carries: ['Pelles et chargeuses', 'Compacteurs', 'Finisseurs', 'Ateliers complets', 'Éléments préfabriqués hors gabarit'],
    forWho: ['Entreprises de TP', 'Loueurs d’engins', 'Industriels'],
    included: [
      'Étude d’itinéraire',
      'Autorisations de circulation',
      'Escorte si requise',
      'Arrimage',
      'Assurance',
    ],
    fleet: ['porte-engins', 'plateau', 'service'],
    stepNotes: {
      1: 'Donnez-nous les dimensions et la masse de l’engin : c’est ce qui détermine le matériel, l’itinéraire et le délai d’autorisation.',
      2: 'L’étude d’itinéraire et la demande d’autorisation précèdent la planification. Le délai administratif fait partie du délai annoncé.',
      3: 'Le chargement et l’arrimage sont contrôlés avant le départ, et le contrôle est documenté.',
    },
    kpis: [
      { label: 'Masse maximale transportée', value: ph('FLOTTE_CATEGORIES'), note: 'Capacité des porte-engins à confirmer.' },
      { label: 'Délai d’obtention d’autorisation', value: '[À CONFIRMER]', note: 'Dépend de l’itinéraire et des services instructeurs.' },
    ],
    faq: [
      {
        id: 'autorisations',
        question: 'Qui s’occupe des autorisations de circulation ?',
        answer:
          'Nous. L’étude d’itinéraire et la demande font partie de la prestation, et le délai administratif est annoncé avec le devis.',
      },
      {
        id: 'assurance',
        question: 'L’engin transporté est-il assuré ?',
        answer:
          'Une assurance marchandises transportées couvre les engins confiés. L’attestation est communiquée sur demande.',
      },
      {
        id: 'escorte',
        question: 'Quand une escorte est-elle nécessaire ?',
        answer:
          'Elle dépend du gabarit et de l’itinéraire retenu. Quand elle est requise, elle est chiffrée sur le devis, jamais ajoutée après coup.',
      },
      {
        id: 'acces',
        question: 'Et si le chantier est difficile d’accès ?',
        answer:
          'Décrivez l’accès dans votre demande — largeur de piste, pente, portance. Une reconnaissance est faite quand le doute subsiste.',
      },
    ],
    image: '/media/sections/porte-engins-chargement.jpg',
  },
  {
    slug: 'citernes',
    title: 'Citernes',
    oneLine:
      'Eau de chantier, gasoil et liants livrés sur site en citerne dédiée, volumes tracés.',
    icon: 'tank',
    carries: ['Eau de chantier', 'Gasoil', 'Liants et émulsions'],
    forWho: ['Chantiers isolés', 'Carrières', 'Centrales'],
    included: ['Citernes dédiées par produit', 'Jaugeage', 'Livraisons programmées'],
    fleet: ['citerne'],
    stepNotes: {
      2: 'Les livraisons sont programmées sur votre consommation, pas sur appel — un chantier à l’arrêt faute d’eau coûte plus cher qu’une rotation.',
      3: 'Le volume chargé est jaugé au départ et relevé à l’arrivée.',
    },
    kpis: [
      { label: 'Volume par citerne', value: ph('FLOTTE_CATEGORIES'), note: 'Capacités à confirmer par l’exploitation.' },
      { label: 'Citernes en exploitation', value: ph('FLOTTE_CATEGORIES'), note: 'Nombre à confirmer par l’exploitation.' },
    ],
    faq: [
      {
        id: 'dediees',
        question: 'Une même citerne transporte-t-elle plusieurs produits ?',
        answer:
          'Non. Les citernes sont dédiées par produit. C’est ce qui évite qu’un fond de gasoil se retrouve dans l’eau de chantier.',
      },
      {
        id: 'volume',
        question: 'Comment le volume livré est-il justifié ?',
        answer:
          'Par un jaugeage au départ et un relevé à l’arrivée, repris sur le bon de livraison.',
      },
      {
        id: 'isole',
        question: 'Livrez-vous des chantiers sans accès goudronné ?',
        answer:
          'Oui, sous réserve de la portance de la piste. Décrivez l’accès dans votre demande.',
      },
      {
        id: 'programmation',
        question: 'Peut-on programmer des livraisons récurrentes ?',
        answer:
          'Oui. Le plan de livraison est calé sur votre consommation et ajusté quand elle change.',
      },
    ],
    image: '/media/sections/citerne-chantier.jpg',
  },
  {
    slug: 'camions-avec-chauffeur',
    title: 'Camions avec chauffeur',
    oneLine:
      'Un camion et son chauffeur à votre disposition, à la journée, au mois ou pour la durée du projet.',
    icon: 'driver',
    carries: ['Selon le camion mis à disposition : bennes, plateaux, citernes'],
    forWho: ['Entreprises de TP', 'Carrières', 'Industriels'],
    included: [
      'Chauffeur formé',
      'GPS',
      'Maintenance et assurance incluses',
      'Remplacement en cas d’immobilisation',
      'Relevé d’heures digital',
    ],
    fleet: ['benne-8x4', 'semi-benne', 'plateau', 'citerne'],
    stepNotes: {
      1: 'Précisez le type de camion, la durée et le lieu de prise de service.',
      2: 'Le camion et le chauffeur sont nommés à l’avance, et restent les mêmes pendant la mise à disposition.',
      5: 'Le relevé d’heures est digital et disponible chaque jour — pas un carnet à recopier en fin de mois.',
    },
    kpis: [
      { label: 'Taux d’immobilisation', value: `${ph('TAUX_IMMOBILISATION')} %`, note: 'Période de calcul à confirmer.' },
      { label: 'Délai de remplacement', value: '[À CONFIRMER]', note: 'Engagement à valider par l’exploitation.' },
    ],
    faq: [
      {
        id: 'immobilisation',
        question: 'Que se passe-t-il si le camion tombe en panne ?',
        answer:
          'Il est remplacé. Le délai d’engagement est écrit sur le contrat de mise à disposition.',
      },
      {
        id: 'duree',
        question: 'Quelle est la durée minimale ?',
        answer: 'À confirmer par l’exploitation avant publication.',
      },
      {
        id: 'heures',
        question: 'Comment les heures sont-elles comptées ?',
        answer:
          'Par un relevé digital issu de la télématique, consultable chaque jour. Aucune heure n’est déclarée de mémoire.',
      },
      {
        id: 'chauffeur',
        question: 'Le chauffeur est-il toujours le même ?',
        answer:
          'Oui pendant la durée de la mise à disposition, hors congés et arrêts. Un chauffeur qui connaît le chantier va plus vite et casse moins.',
      },
    ],
    image: '/media/sections/convoi-route.jpg',
  },
  {
    slug: 'logistique-chantier',
    title: 'Logistique de chantier',
    oneLine:
      'Nous planifions vos approvisionnements, pilotons les rotations et vous rendons compte chaque jour.',
    icon: 'planning',
    carries: ['Tous matériaux et engins des cinq autres services'],
    forWho: ['Grands chantiers', 'Groupements d’entreprises'],
    included: [
      'Plan d’approvisionnement',
      'Dispatch dédié',
      'Coordination multi-fournisseurs',
      'Reporting quotidien',
    ],
    fleet: ['benne-8x4', 'semi-benne', 'semi-calorifugee', 'porte-engins', 'citerne', 'plateau'],
    stepNotes: {
      1: 'La demande porte sur un phasage de chantier, pas sur une rotation : donnez-nous le planning des tâches et les cadences visées.',
      2: 'Un dispatcher est nommé sur votre chantier. Il coordonne aussi les fournisseurs qui ne sont pas les nôtres.',
      5: 'Un point quotidien : tonnages livrés, rotations réalisées, temps d’attente, écarts sur le plan.',
    },
    kpis: [
      { label: 'Rotations pilotées par jour', value: '[À CONFIRMER]', note: 'Ordre de grandeur à valider par l’exploitation.' },
      { label: 'Livraisons à l’heure', value: `${ph('TAUX_PONCTUALITE')} %`, note: 'Définition et période à confirmer.' },
    ],
    faq: [
      {
        id: 'fournisseurs',
        question: 'Coordonnez-vous des fournisseurs qui ne sont pas les vôtres ?',
        answer:
          'Oui. Le dispatch dédié pilote le plan d’approvisionnement, quel que soit le transporteur qui exécute.',
      },
      {
        id: 'reporting',
        question: 'Que contient le reporting quotidien ?',
        answer:
          'Tonnages livrés, rotations réalisées, temps d’attente et écarts par rapport au plan. Les écarts sont expliqués, pas seulement chiffrés.',
      },
      {
        id: 'interlocuteur',
        question: 'Avons-nous un interlocuteur unique ?',
        answer:
          'Oui, un dispatcher nommé sur le chantier, joignable aux heures du dispatch.',
      },
      {
        id: 'maroc',
        question: 'Intervenez-vous dans tout le Maroc ?',
        answer: `Nous sommes basés à ${ph('VILLE_SIEGE')} et opérons sur tout le royaume. Les régions couvertes en propre sont listées sur la page d’accueil.`,
      },
    ],
    image: '/media/sections/dispatch-bureau.jpg',
  },
]

export function serviceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug)
}

/** Options du sélecteur de service, partagées par le devis et les CTA préremplis. */
export const SERVICE_OPTIONS = SERVICES.map((service) => ({
  value: service.slug,
  label: service.title,
}))
