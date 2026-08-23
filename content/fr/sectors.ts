/**
 * Secteurs (§6.6).
 *
 * Chaque fiche répond à trois questions dans l'ordre où un acheteur les pose :
 * quel est mon problème, comment y répondez-vous, avec quoi.
 */
import type { FleetCategoryKey } from '@/components/icons/FleetSilhouettes'
import type { ServiceSlug } from './services'

export interface Sector {
  readonly id: string
  readonly name: string
  readonly need: string
  readonly answer: string
  readonly fleet: readonly FleetCategoryKey[]
  readonly services: readonly ServiceSlug[]
}

export const SECTORS: readonly Sector[] = [
  {
    id: 'btp',
    name: 'BTP & infrastructures routières',
    need: 'Un finisseur qui attend coûte plus cher qu’un camion de trop. Les cadences se tiennent à la demi-heure près.',
    answer:
      'Rotations calées sur le débit de l’atelier, bennes calorifugées pour l’enrobé, temps d’attente au finisseur suivis et corrigés le lendemain.',
    fleet: ['semi-calorifugee', 'benne-8x4', 'semi-benne'],
    services: ['enrobes-a-chaud', 'materiaux-vrac', 'logistique-chantier'],
  },
  {
    id: 'carrieres',
    name: 'Carrières & matériaux',
    need: 'Un stock qui ne part pas immobilise du capital, et une pesée contestée immobilise une facture.',
    answer:
      'Enlèvements cadencés sur votre production, pesée à chaque chargement, ticket rattaché à la mission et tonnage cumulé chaque soir.',
    fleet: ['semi-benne', 'benne-8x4'],
    services: ['materiaux-vrac', 'camions-avec-chauffeur'],
  },
  {
    id: 'industrie',
    name: 'Industrie & préfabrication',
    need: 'Des produits finis fragiles, des dimensions qui sortent du gabarit, et une ligne qui ne s’arrête pas.',
    answer:
      'Plateaux et arrimage adapté, étude d’itinéraire pour le hors-gabarit, enlèvements programmés plutôt que sur appel.',
    fleet: ['plateau', 'porte-engins'],
    services: ['transport-exceptionnel', 'logistique-chantier'],
  },
  {
    id: 'energie-mines',
    name: 'Énergie & mines',
    need: 'Des sites éloignés, des pistes difficiles, et des engins lourds à déplacer entre deux fronts.',
    answer:
      'Porte-engins et citernes dédiées, reconnaissance d’accès avant la première rotation, suivi de position sur des trajets où le réseau est rare.',
    fleet: ['porte-engins', 'citerne', 'service'],
    services: ['transport-exceptionnel', 'citernes'],
  },
  {
    id: 'agriculture',
    name: 'Agriculture & agro-industrie',
    need: 'Des pics saisonniers courts, où il faut beaucoup de capacité pendant peu de temps.',
    answer:
      'Camions avec chauffeur à la journée ou au mois, sans immobiliser de flotte le reste de l’année.',
    fleet: ['benne-8x4', 'plateau', 'citerne'],
    services: ['camions-avec-chauffeur', 'materiaux-vrac'],
  },
  {
    id: 'collectivites',
    name: 'Collectivités & maîtres d’ouvrage publics',
    need: 'Des marchés à justifier, des quantités à prouver et des délais à documenter.',
    answer:
      'Bon de livraison signé, horodaté et géolocalisé, tickets de pesée conservés, reporting exportable pour vos pièces de marché.',
    fleet: ['benne-8x4', 'semi-benne', 'citerne'],
    services: ['materiaux-vrac', 'logistique-chantier'],
  },
]
