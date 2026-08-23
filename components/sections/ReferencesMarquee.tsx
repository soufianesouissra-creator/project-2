import { Marquee } from '@/components/motion/Marquee'
import { getContent } from '@/lib/content'
import { useLocale } from 'next-intl'
import { Link } from '@/lib/navigation'

/**
 * Références (§6.1.8).
 *
 * Tant qu'aucune autorisation d'affichage n'a été obtenue, la section dit
 * exactement cela — plutôt que d'afficher des logos gris inventés ou un
 * carrousel vide. Un état vide honnête vaut mieux qu'une preuve fabriquée.
 */
export function ReferencesMarquee() {
  const locale = useLocale()
  const { CLIENT_LOGOS, TESTIMONIALS } = getContent(locale)
  const hasLogos = CLIENT_LOGOS.length > 0
  const hasTestimonials = TESTIMONIALS.length > 0

  return (
    <section className="bg-limestone py-16 lg:py-24" aria-labelledby="references">
      <div className="site-container">
        <h2 id="references" className="font-display font-semicondensed text-ink text-3xl font-semibold">
          Ils nous font transporter
        </h2>

        {hasLogos ? (
          <Marquee label="Clients" className="mt-10">
            {CLIENT_LOGOS.map((logo) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={logo.name}
                src={logo.file}
                alt={logo.name}
                className="h-10 w-auto grayscale transition-all duration-200 hover:grayscale-0"
              />
            ))}
          </Marquee>
        ) : (
          <p className="text-mist-ink mt-6 max-w-[68ch] font-mono text-sm">
            Aucun logo client n’est affiché : nous ne publions un nom ou une marque qu’avec une
            autorisation écrite de son titulaire. Les références chiffrées d’un chantier comparable au
            vôtre vous sont communiquées sur demande.
          </p>
        )}

        {hasTestimonials ? (
          <ul className="mt-12 grid gap-6 lg:grid-cols-2">
            {TESTIMONIALS.map((testimonial) => (
              <li key={testimonial.id} className="border-ink/10 border-s-2 ps-6">
                <blockquote className="text-ink text-lg">« {testimonial.quote} »</blockquote>
                <p className="text-mist-ink mt-3 font-mono text-xs">
                  {testimonial.name} · {testimonial.role} · {testimonial.company}
                </p>
              </li>
            ))}
          </ul>
        ) : null}

        <Link
          href="/references"
          className="text-ink mt-8 inline-block text-sm font-medium underline underline-offset-4"
        >
          Voir les références
        </Link>
      </div>
    </section>
  )
}
