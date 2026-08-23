import { getTranslations } from 'next-intl/server'
import { ButtonLink } from '@/components/ui/Button'
import { MarkingLine } from '@/components/motion/MarkingLine'

export default async function NotFound() {
  const t = await getTranslations()

  return (
    <section className="site-container flex min-h-[70svh] flex-col justify-center py-32">
      <p className="eyebrow text-mist-ink">Erreur 404</p>
      <h1 className="font-display font-expanded text-ink mt-4 max-w-[16ch] text-4xl font-bold lg:text-5xl">
        {t('notFound.title')}
      </h1>
      <MarkingLine className="my-8 max-w-md" />
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/">{t('notFound.home')}</ButtonLink>
        <ButtonLink href="/services" variant="ghost">
          Voir les services
        </ButtonLink>
        <ButtonLink href="/contact" variant="ghost">
          Contact
        </ButtonLink>
      </div>
    </section>
  )
}
