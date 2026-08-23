import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { NextRequest } from 'next/server'

/**
 * Rendu à la demande : `force-static` VIDE `searchParams`, et toutes les
 * vignettes sortaient alors avec le titre par défaut — visuellement correctes,
 * donc invisibles à la relecture. Le résultat est mis en cache par URL via
 * l'en-tête `Cache-Control` ci-dessous.
 */
export const dynamic = 'force-dynamic'

const SIZE = { width: 1200, height: 630 }

/**
 * Images Open Graph dynamiques.
 *
 * `app/[locale]/opengraph-image.tsx` ne couvre que la RACINE de son segment :
 * `/flotte` et `/services/citernes` n'héritaient de rien et se partageaient
 * sans vignette. Cette route accepte un titre et rend la même composition, ce
 * qui donne à chaque page sa propre image.
 *
 * Servie à `/og` et non `/api/og` : `robots.txt` ferme `/api/`, et certains
 * robots sociaux le respectent avant d'aller chercher une vignette.
 *
 * La fonte est lue sur le disque : une image de prévisualisation qui dépend
 * d'un appel réseau échoue un jour sur deux, au pire moment.
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const title = (params.get('title') ?? 'Transport et logistique de chantier').slice(0, 120)
  const eyebrow = (params.get('eyebrow') ?? 'GROUPE ALEQ').slice(0, 80).toUpperCase()
  const locale = params.get('locale') === 'en' ? 'en' : 'fr'

  const note =
    locale === 'en'
      ? 'Tracked fleet · Weighed loads · Evidenced deliveries'
      : 'Flotte suivie · Chargements pesés · Livraisons tracées'

  const archivo = await readFile(join(process.cwd(), 'public/fonts/Archivo-Bold.ttf'))

  // Le titre décroît quand il s'allonge : une ligne de plus vaut mieux qu'un
  // texte qui déborde du cadre.
  const fontSize = title.length > 78 ? 46 : title.length > 46 ? 56 : 68

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
          <div style={{ fontSize: 20, color: '#8E949A', letterSpacing: 2 }}>{eyebrow}</div>
          <div style={{ fontSize, lineHeight: 1.05, marginTop: 20, maxWidth: 980 }}>{title}</div>
          <div style={{ display: 'flex', gap: 16, marginTop: 36 }}>
            {Array.from({ length: 18 }, (_, index) => (
              <div key={index} style={{ width: 24, height: 3, backgroundColor: '#F5B800' }} />
            ))}
          </div>
        </div>

        <div style={{ fontSize: 20, color: '#8E949A' }}>{note}</div>
      </div>
    ),
    {
      ...SIZE,
      fonts: [{ name: 'Archivo', data: archivo, weight: 700, style: 'normal' }],
      headers: {
        // Un robot social revient rarement : un jour de cache navigateur, un an
        // en CDN avec revalidation en arrière-plan.
        'Cache-Control': 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400',
      },
    },
  )
}
