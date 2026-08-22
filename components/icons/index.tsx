import type { SVGProps } from 'react'

/**
 * Icônes maison, trait 2 px, grille 24.
 *
 * Dessinées ici plutôt qu'importées d'un jeu tout fait : une icône de camion
 * générique ramène le site vers le gabarit, et aucun jeu ne contient de pont
 * bascule. Toutes partagent la même géométrie — trait 2, extrémités carrées,
 * pas de remplissage — pour rester cohérentes avec les silhouettes de flotte.
 */
type IconProps = SVGProps<SVGSVGElement> & { readonly title?: string }

function Icon({ title, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      strokeLinejoin="miter"
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      className="size-6"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  )
}

/** Matériaux en vrac — benne basculante. */
export function IconTipper(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 17h20M4 17V9h9l3 4h6v4" />
      <path d="M4 9 6 4h7l1 5" />
      <circle cx="7" cy="19" r="2" />
      <circle cx="17" cy="19" r="2" />
    </Icon>
  )
}

/** Enrobés à chaud — benne bâchée, chaleur. */
export function IconAsphalt(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 18h20M4 18v-6h11l4 3v3" />
      <path d="M6 9c0-1.5 1.5-1.5 1.5-3M10 9c0-1.5 1.5-1.5 1.5-3M14 9c0-1.5 1.5-1.5 1.5-3" />
      <circle cx="7" cy="20" r="1.6" />
      <circle cx="17" cy="20" r="1.6" />
    </Icon>
  )
}

/** Transport exceptionnel — porte-engins col de cygne. */
export function IconLowbed(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 12h4l2 5h10l2-3h2" />
      <path d="M2 12V7h4v5" />
      <path d="M11 17V9h5v3" />
      <circle cx="6" cy="19" r="1.6" />
      <circle cx="18" cy="19" r="1.6" />
    </Icon>
  )
}

/** Citernes — cuve. */
export function IconTank(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 17h20" />
      <rect x="6" y="8" width="15" height="8" rx="4" />
      <path d="M12 8v8M2 16V9h4" />
      <circle cx="9" cy="19" r="1.6" />
      <circle cx="18" cy="19" r="1.6" />
    </Icon>
  )
}

/** Camions avec chauffeur — cabine et volant. */
export function IconDriver(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 18h20M4 18V8h8l3 4h5v6" />
      <circle cx="8" cy="12" r="2.5" />
      <path d="M8 9.5v5M5.5 12h5" />
    </Icon>
  )
}

/** Logistique de chantier — plan de rotations. */
export function IconPlanning(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="4" width="18" height="17" />
      <path d="M3 9h18M8 2v4M16 2v4M7 13h4M7 17h8M14 13h3" />
    </Icon>
  )
}

/** Pont bascule — pesée. */
export function IconWeighbridge(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 16h20M4 16v4M20 16v4" />
      <path d="M6 13h12l-2-5H8z" />
      <path d="M12 8V4M9 4h6" />
    </Icon>
  )
}

/** Position — repère de carte. */
export function IconPin(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Icon>
  )
}

/** Sécurité. */
export function IconShield(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3 4 6v6c0 5 3.4 8 8 9 4.6-1 8-4 8-9V6Z" />
      <path d="m8.5 12 2.5 2.5L16 9.5" />
    </Icon>
  )
}

/** Atelier — maintenance. */
export function IconWrench(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M15.5 3a5.5 5.5 0 0 0-5 7.7L3 18.2 5.8 21l7.5-7.5A5.5 5.5 0 1 0 15.5 3Z" />
      <circle cx="16" cy="8" r="1.5" />
    </Icon>
  )
}

/** Temps — délais, fenêtres horaires. */
export function IconClock(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.5l3.5 2" />
    </Icon>
  )
}

/** Document — bon de livraison, attestation. */
export function IconDocument(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 3h8l5 5v13H6z" />
      <path d="M14 3v5h5M9 13h7M9 17h5" />
    </Icon>
  )
}

/** Téléphone. */
export function IconPhone(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 3h4l1.5 4.5-2.5 2a13 13 0 0 0 4.5 4.5l2-2.5L21 13v4c0 1.1-.9 2-2 2A16.5 16.5 0 0 1 5 5c0-1.1.9-2 2-2Z" />
    </Icon>
  )
}

/** WhatsApp — silhouette de bulle, dessinée au même trait que le reste. */
export function IconWhatsapp(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3.5 20.5 5 16.4A8.5 8.5 0 1 1 8.2 19.5Z" />
      <path d="M9 9c0 3 3 6 6 6l1.2-1.6-2-1-1 1a6 6 0 0 1-2.6-2.6l1-1-1-2Z" />
    </Icon>
  )
}
