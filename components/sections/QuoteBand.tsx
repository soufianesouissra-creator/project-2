'use client'

import { useState } from 'react'
import { useRouter } from '@/lib/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { getContent } from '@/lib/content'
import { useLocale } from 'next-intl'

/**
 * Bande devis finale (§6.1.11).
 *
 * Trois champs seulement. Ce n'est pas le formulaire de devis : c'est une porte
 * d'entrée qui PRÉREMPLIT `/devis`, pour que personne ne saisisse deux fois ce
 * qu'il vient de taper. Rien n'est envoyé d'ici — l'envoi se fait sur `/devis`,
 * où la validation, Turnstile et la limitation de débit s'appliquent.
 *
 * Aucun champ n'est requis ici : un acheteur qui ne connaît pas encore son
 * tonnage doit pouvoir avancer quand même.
 */
export function QuoteBand() {
  const locale = useLocale()
  const { SERVICE_OPTIONS } = getContent(locale)
  const router = useRouter()
  const [service, setService] = useState('')
  const [material, setMaterial] = useState('')
  const [phone, setPhone] = useState('')

  function handoff(event: React.FormEvent) {
    event.preventDefault()
    const params = new URLSearchParams()
    if (service) params.set('service', service)
    if (material) params.set('material', material)
    if (phone) params.set('phone', phone)
    const query = params.toString()
    router.push(query ? `/devis?${query}` : '/devis')
  }

  return (
    <section className="bg-asphalt text-concrete py-16 lg:py-24" aria-labelledby="devis">
      <div className="site-container grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2
            id="devis"
            className="font-display font-expanded max-w-[16ch] text-3xl font-bold lg:text-4xl"
          >
            Décrivez votre besoin, un dispatcher vous rappelle.
          </h2>
          <span aria-hidden className="marking-line-x my-8 block w-full max-w-sm" />
          <p className="text-concrete/75 max-w-[52ch]">
            Trois informations suffisent pour commencer. Le reste se remplit à l’étape suivante.
          </p>
        </div>

        <form
          onSubmit={handoff}
          className="bg-limestone rounded-card flex flex-col gap-5 p-6 lg:col-span-6 lg:col-start-7"
        >
          <Select
            id="band-service"
            label="Type de transport"
            placeholder="Choisir un service"
            options={SERVICE_OPTIONS}
            value={service}
            onChange={(event) => setService(event.target.value)}
          />
          <Input
            id="band-material"
            label="Matériau ou engin"
            placeholder="GNT 0/31,5, pelle 22 t…"
            value={material}
            onChange={(event) => setMaterial(event.target.value)}
          />
          <Input
            id="band-phone"
            label="Téléphone"
            type="tel"
            inputMode="tel"
            placeholder="06 12 34 56 78"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            hint="Un dispatcher vous rappelle. Le numéro n’est pas envoyé depuis cet écran."
          />
          <Button type="submit" size="lg" className="mt-1">
            Demander un devis
          </Button>
        </form>
      </div>
    </section>
  )
}
