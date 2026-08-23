import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { getContent } from '@/lib/content'
import { routing } from '@/lib/routing'

export const alt = 'TRANSPOLEQ — transport et logistique de chantier'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const COPY = {
  fr: {
    eyebrow: 'TRANSPORT & LOGISTIQUE DE CHANTIER · GROUPE ALEQ',
    title: 'Du gisement au chantier, chaque tonne à l’heure.',
    note: 'Flotte suivie · Chargements pesés · Livraisons tracées',
  },
  en: {
    eyebrow: 'SITE TRANSPORT & LOGISTICS · ALEQ GROUP',
    title: 'From pit to site, every tonne on time.',
    note: 'Tracked fleet · Weighed loads · Evidenced deliveries',
  },
} as const

/**
 * Image Open Graph.
 *
 * Dessinée aux jetons du site — bande d'enrobé, barre de marquage, Archivo en
 * chasse large — pour qu'un lien partagé sur WhatsApp ou LinkedIn se
 * reconnaisse avant d'être lu.
 *
 * La fonte est LUE DEPUIS LE DISQUE, pas téléchargée : `next/og` a besoin d'un
 * binaire, et une image de prévisualisation qui dépend d'un appel réseau échoue
 * un jour sur deux au pire moment.
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const copy = COPY[locale === 'en' ? 'en' : 'fr']
  const { CONTACT } = getContent(locale)

  const archivo = await readFile(join(process.cwd(), 'public/fonts/Archivo-Bold.ttf'))

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#1B1D1F',
          color: '#E8E6E1',
          padding: 72,
          fontFamily: 'Archivo',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 8, height: 44, backgroundColor: '#F5B800' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 34, letterSpacing: -0.5 }}>TRANSPOLEQ</div>
            <div style={{ fontSize: 16, color: '#8E949A', letterSpacing: 2 }}>GROUPE ALEQ</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 20, color: '#8E949A', letterSpacing: 2 }}>{copy.eyebrow}</div>
          <div style={{ fontSize: 68, lineHeight: 1.05, marginTop: 20, maxWidth: 940 }}>
            {copy.title}
          </div>
          {/* Ligne de marquage : tiret 24, espace 16. */}
          <div style={{ display: 'flex', gap: 16, marginTop: 36 }}>
            {Array.from({ length: 18 }, (_, index) => (
              <div key={index} style={{ width: 24, height: 3, backgroundColor: '#F5B800' }} />
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, color: '#8E949A' }}>
          <div>{copy.note}</div>
          <div>{CONTACT.city}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Archivo', data: archivo, weight: 700, style: 'normal' }],
    },
  )
}
