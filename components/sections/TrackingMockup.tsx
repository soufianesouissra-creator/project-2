import { IconPin, IconWeighbridge, IconDocument } from '@/components/icons'

/**
 * Maquette de l'écran de suivi, construite EN CODE, aux jetons du site.
 *
 * Jamais une capture d'écran d'un outil tiers : elle daterait au premier
 * changement d'interface, elle exposerait des données clients, et elle
 * donnerait à voir le produit de quelqu'un d'autre à la place du nôtre.
 *
 * Rien ici n'est présenté comme une donnée réelle : la mention « Données
 * illustratives » est dans le cadre.
 */
export function TrackingMockup() {
  return (
    <div className="bg-gravel border-concrete/10 rounded-card border">
      <div className="border-concrete/10 flex items-center justify-between border-b px-4 py-3">
        <span className="eyebrow text-mist">Mission M-2308</span>
        <span className="border-marking text-marking rounded-[2px] border px-2 py-0.5 font-mono text-xs">
          En route
        </span>
      </div>

      {/* Trajet, posé sur la ligne de marquage. */}
      <div className="px-4 py-5">
        <ol className="flex items-start gap-3 font-mono text-xs">
          <li className="flex flex-1 flex-col gap-2">
            <span className="text-concrete">Carrière A</span>
            <span aria-hidden className="marking-line-x block w-full" />
            <span className="text-mist">Chargé 13:04 · 27,4 t</span>
          </li>
          <li className="flex flex-1 flex-col gap-2">
            <span className="text-concrete">En transit</span>
            <span aria-hidden className="marking-line-x block w-full opacity-40" />
            <span className="text-mist">42 km parcourus</span>
          </li>
          <li className="flex flex-1 flex-col gap-2">
            <span className="text-mist">Chantier RN9</span>
            <span aria-hidden className="bg-mist/30 block h-0.5 w-full" />
            <span className="text-mist">Arrivée estimée 14:35</span>
          </li>
        </ol>
      </div>

      <dl className="border-concrete/10 grid grid-cols-3 border-t font-mono text-xs">
        <Cell icon={<IconPin className="size-4" />} label="Position" value="Suivie" />
        <Cell icon={<IconWeighbridge className="size-4" />} label="Pesée" value="27,4 t" bordered />
        <Cell icon={<IconDocument className="size-4" />} label="Bon de livraison" value="À signer" bordered />
      </dl>

      <p className="border-concrete/10 text-mist border-t px-4 py-2.5 font-mono text-xs">
        Données illustratives
      </p>
    </div>
  )
}

function Cell({
  icon,
  label,
  value,
  bordered,
}: {
  readonly icon: React.ReactNode
  readonly label: string
  readonly value: string
  readonly bordered?: boolean
}) {
  return (
    <div className={bordered ? 'border-concrete/10 border-s px-4 py-4' : 'px-4 py-4'}>
      <dt className="text-mist flex items-center gap-2">
        {icon}
        {label}
      </dt>
      <dd className="text-concrete mt-2">{value}</dd>
    </div>
  )
}
