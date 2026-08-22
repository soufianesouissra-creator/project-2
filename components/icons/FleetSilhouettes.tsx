import type { SVGProps } from 'react'

/**
 * Silhouettes de flotte — illustrations maison, trait 2 px, vue de profil.
 *
 * Ni photo ni jeu d'icônes (§4.5). Une photo de camion ne dit pas la
 * catégorie ; une silhouette au trait la dit d'un coup d'œil, se décline en
 * sept variantes cohérentes, pèse deux kilo-octets et se recolore avec le
 * texte.
 *
 * Géométrie commune : boîte 200 × 72, sol à y = 62, roues de rayon 7 centrées
 * à y = 55. Toutes les catégories partagent la même cabine, ce qui fait porter
 * la différence par la remorque — exactement ce qu'un acheteur regarde.
 */
type SilhouetteProps = SVGProps<SVGSVGElement> & { readonly title: string }

function Silhouette({ title, children, ...rest }: SilhouetteProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 200 72"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      strokeLinejoin="miter"
      role="img"
      className="w-full"
      {...rest}
    >
      <title>{title}</title>
      {children}
    </svg>
  )
}

function Wheel({ cx }: { readonly cx: number }) {
  return <circle cx={cx} cy={55} r={7} />
}

/** Cabine commune, porteur ou tracteur. */
function Cab({ x = 6 }: { readonly x?: number }) {
  return (
    <>
      <path d={`M${x} 48 V28 L${x + 8} 18 H${x + 30} V48 Z`} />
      <path d={`M${x + 10} 20 H${x + 28} V30 H${x + 6} Z`} />
    </>
  )
}

/** Camion benne 8x4 — vrac courte distance. */
export function SilhouetteRigidTipper() {
  return (
    <Silhouette title="Camion benne 8x4">
      <Cab />
      <path d="M44 48 V22 H182 V48 Z" />
      <path d="M6 48 H182" />
      <Wheel cx={22} />
      <Wheel cx={40} />
      <Wheel cx={140} />
      <Wheel cx={162} />
    </Silhouette>
  )
}

/** Semi-remorque benne — vrac longue distance. */
export function SilhouetteSemiTipper() {
  return (
    <Silhouette title="Semi-remorque benne">
      <Cab />
      <path d="M6 48 H44" />
      <path d="M44 44 H192" />
      <path d="M48 44 V20 H190 V44" />
      <Wheel cx={20} />
      <Wheel cx={40} />
      <Wheel cx={150} />
      <Wheel cx={168} />
      <Wheel cx={186} />
    </Silhouette>
  )
}

/** Semi benne calorifugée — enrobés à chaud. Bâche thermique bombée. */
export function SilhouetteInsulatedTipper() {
  return (
    <Silhouette title="Semi benne calorifugée">
      <Cab />
      <path d="M6 48 H44" />
      <path d="M44 44 H192" />
      <path d="M48 44 V26 Q119 12 190 26 V44" />
      <path d="M62 32 H176 M62 38 H176" strokeWidth={1} />
      <Wheel cx={20} />
      <Wheel cx={40} />
      <Wheel cx={150} />
      <Wheel cx={168} />
      <Wheel cx={186} />
    </Silhouette>
  )
}

/** Porte-engins col de cygne — transport exceptionnel. */
export function SilhouetteLowbed() {
  return (
    <Silhouette title="Porte-engins col de cygne">
      <Cab />
      <path d="M6 48 H44" />
      <path d="M44 34 H70 L80 48 H152 L162 36 H194" />
      <path d="M194 36 V48 H162" />
      <path d="M194 40 L200 46" />
      <Wheel cx={20} />
      <Wheel cx={40} />
      <Wheel cx={168} />
      <Wheel cx={186} />
    </Silhouette>
  )
}

/** Citerne — eau, gasoil, liants. */
export function SilhouetteTank() {
  return (
    <Silhouette title="Citerne">
      <Cab />
      <path d="M6 48 H44" />
      <path d="M44 46 H192" />
      <rect x="48" y="20" width="144" height="26" rx="13" />
      <path d="M96 20 V46 M144 20 V46" strokeWidth={1} />
      <path d="M112 20 V14 H128 V20" />
      <Wheel cx={20} />
      <Wheel cx={40} />
      <Wheel cx={150} />
      <Wheel cx={168} />
      <Wheel cx={186} />
    </Silhouette>
  )
}

/** Plateau — préfabriqués, tubes, matériaux conditionnés. */
export function SilhouetteFlatbed() {
  return (
    <Silhouette title="Plateau">
      <Cab />
      <path d="M6 48 H44" />
      <path d="M44 44 H192 V48 H44 Z" />
      <path d="M56 44 V32 M96 44 V32 M136 44 V32 M176 44 V32" />
      <Wheel cx={20} />
      <Wheel cx={40} />
      <Wheel cx={150} />
      <Wheel cx={168} />
      <Wheel cx={186} />
    </Silhouette>
  )
}

/** Véhicule de service — escorte, dépannage, atelier mobile. */
export function SilhouetteServiceVehicle() {
  return (
    <Silhouette title="Véhicule de service">
      <path d="M30 48 V30 L42 20 H74 V48 Z" />
      <path d="M44 22 H72 V32 H38 Z" />
      <path d="M74 48 V26 H150 V48 Z" />
      <path d="M30 48 H150" />
      <Wheel cx={54} />
      <Wheel cx={128} />
    </Silhouette>
  )
}

export const FLEET_SILHOUETTES = {
  'benne-8x4': SilhouetteRigidTipper,
  'semi-benne': SilhouetteSemiTipper,
  'semi-calorifugee': SilhouetteInsulatedTipper,
  'porte-engins': SilhouetteLowbed,
  citerne: SilhouetteTank,
  plateau: SilhouetteFlatbed,
  service: SilhouetteServiceVehicle,
} as const

export type FleetCategoryKey = keyof typeof FLEET_SILHOUETTES
