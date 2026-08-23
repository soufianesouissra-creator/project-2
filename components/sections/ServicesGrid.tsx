import { Card } from '@/components/ui/Card'
import { Link } from '@/lib/navigation'
import type { ServiceIconKey } from '@/content/fr/services'
import { getContent } from '@/lib/content'
import { useLocale } from 'next-intl'
import {
  IconAsphalt,
  IconDriver,
  IconLowbed,
  IconPlanning,
  IconTank,
  IconTipper,
} from '@/components/icons'

const ICONS: Record<ServiceIconKey, typeof IconTipper> = {
  tipper: IconTipper,
  asphalt: IconAsphalt,
  lowbed: IconLowbed,
  tank: IconTank,
  driver: IconDriver,
  planning: IconPlanning,
}

/**
 * Six services (§6.1.3).
 *
 * Pas de « 01 / 02 / 03 » : les six services n'ont pas d'ordre, donc un numéro
 * n'encoderait rien. La numérotation ne survit que sur la mission, où la
 * séquence est réelle.
 */
export function ServicesGrid({ heading = 'Ce que nous transportons' }: { readonly heading?: string }) {
  const locale = useLocale()
  const { SERVICES } = getContent(locale)
  return (
    <section className="site-container py-16 lg:py-24" aria-labelledby="services">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id="services" className="font-display font-semicondensed text-ink text-3xl font-semibold">
          {heading}
        </h2>
        <Link href="/services" className="text-ink text-sm font-medium underline underline-offset-4">
          Tous les services
        </Link>
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => {
          const Icon = ICONS[service.icon]
          return (
            <li key={service.slug} className="flex">
              <Card href={`/services/${service.slug}`} className="flex w-full flex-col">
                <Icon className="text-ink size-8" />
                <h3 className="font-display font-semicondensed mt-5 text-xl font-semibold">
                  {service.title}
                </h3>
                <p className="text-ink/70 mt-2 flex-1 text-sm">{service.oneLine}</p>
                <span className="text-ink mt-5 text-sm font-medium underline underline-offset-4">
                  En savoir plus
                </span>
              </Card>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
