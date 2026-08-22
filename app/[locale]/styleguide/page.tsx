import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { setRequestLocale } from 'next-intl/server'

import { Accordion } from '@/components/ui/Accordion'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'
import { FileInput } from '@/components/ui/FileInput'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Stepper } from '@/components/ui/Stepper'
import { Table } from '@/components/ui/Table'
import { Tabs } from '@/components/ui/Tabs'
import { Textarea } from '@/components/ui/Textarea'
import { Tooltip } from '@/components/ui/Tooltip'

import { Counter } from '@/components/motion/Counter'
import { MarkingLine } from '@/components/motion/MarkingLine'
import { Marquee } from '@/components/motion/Marquee'
import { Reveal } from '@/components/motion/Reveal'

import { DispatchBoard } from '@/components/sections/DispatchBoard'
import { DEMO_ROWS, INCOMING_ROWS } from '@/content/fr/dispatch-board'
import { FLEET_SILHOUETTES } from '@/components/icons/FleetSilhouettes'
import * as Icons from '@/components/icons'
import { PLACEHOLDERS } from '@/content/placeholders'
import { DialogDemo, ToastDemo } from './Interactive'

export const metadata: Metadata = {
  title: 'Styleguide',
  // Cette page reste hors index même quand le site s'ouvrira en Phase 1 :
  // c'est un outil de développement, pas un contenu.
  robots: { index: false, follow: false, nocache: true },
}

const SECTIONS = [
  ['couleur', 'Couleur'],
  ['typographie', 'Typographie'],
  ['grille', 'Grille'],
  ['marquage', 'Ligne de marquage'],
  ['board', 'Tableau de dispatch'],
  ['boutons', 'Boutons'],
  ['puces', 'Puces et statuts'],
  ['cartes', 'Cartes'],
  ['formulaires', 'Formulaires'],
  ['navigation', 'Navigation de contenu'],
  ['donnees', 'Tableaux de données'],
  ['retours', 'Retours'],
  ['mouvement', 'Mouvement'],
  ['silhouettes', 'Silhouettes de flotte'],
  ['icones', 'Icônes'],
  ['trous', 'Faits manquants'],
] as const

const COLORS = [
  ['--asphalt', '#1B1D1F', 'Bandes sombres : hero, suivi, footer.', 'bg-asphalt'],
  ['--gravel', '#2A2E32', 'Surfaces élevées sur sombre, filets du board.', 'bg-gravel'],
  ['--concrete', '#E8E6E1', 'Fond de page par défaut.', 'bg-concrete'],
  ['--limestone', '#F7F6F3', 'Cartes, champs de formulaire sur clair.', 'bg-limestone'],
  ['--marking', '#F5B800', 'Trait, contour, puce, focus, CTA primaire. Jamais un grand aplat, jamais du texte sur clair.', 'bg-marking'],
  ['--ink', '#121315', 'Texte sur clair.', 'bg-ink'],
  ['--mist', '#8E949A', 'Métadonnée, légende, aide.', 'bg-mist'],
  ['--signal', '#C8371F', 'Erreur et urgence. Jamais décoratif.', 'bg-signal'],
] as const

const TYPE_SCALE = [
  ['96', 'text-6xl', 'Réservé aux très grands nombres.'],
  ['64', 'text-5xl', 'Chiffres clés, titre de page rare.'],
  ['48', 'text-4xl', 'H1 desktop.'],
  ['36', 'text-3xl', 'H2 de bande.'],
  ['28', 'text-2xl', 'H2, H3.'],
  ['22', 'text-xl', 'H3, chapô.'],
  ['18', 'text-lg', 'Texte long, intro.'],
  ['16', 'text-base', 'Texte courant.'],
  ['14', 'text-sm', 'Texte dense, libellés.'],
  ['12', 'text-xs', 'Mono : métadonnée, note, eyebrow.'],
] as const

export default async function StyleguidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="pt-16 lg:pt-20">
      <header className="bg-asphalt text-concrete">
        <div className="site-container py-16 lg:py-24">
          <p className="eyebrow text-mist">Outil de développement · noindex</p>
          <h1 className="font-display font-expanded mt-4 text-4xl font-bold lg:text-5xl">
            Système visuel
          </h1>
          <p className="text-concrete/80 mt-5 max-w-[62ch] text-lg">
            Tout ce dont les pages seront faites : jetons, composants, primitives de mouvement et
            l’élément signature. Rien d’autre ne sera introduit sans passer par ici.
          </p>
          <nav aria-label="Sections du styleguide" className="mt-10">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {SECTIONS.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-mist hover:text-marking font-mono text-xs transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* ── Couleur ──────────────────────────────────────────────────────── */}
      <Section id="couleur" title="Couleur" note="Trois règles : le jaune n’est jamais un grand aplat ni du texte sur clair ; le sombre arrive par bandes, jamais en fond global ; le signal ne décore pas.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COLORS.map(([token, hex, use, bg]) => (
            <div key={token} className="border-ink/10 border">
              <div className={`h-24 ${bg}`} />
              <div className="p-4">
                <p className="font-mono text-sm">{token}</p>
                <p className="text-mist font-mono text-xs">{hex}</p>
                <p className="text-ink/70 mt-2 text-sm">{use}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <div className="bg-concrete border-ink/10 border p-6">
            <p className="eyebrow text-mist">Sur béton</p>
            <p className="text-ink mt-3 text-lg">Texte principal — contraste 15,8:1</p>
            <p className="text-mist mt-1 font-mono text-sm">Métadonnée — 3,1:1, jamais seule porteuse</p>
          </div>
          <div className="bg-asphalt border-gravel border p-6">
            <p className="eyebrow text-mist">Sur enrobé</p>
            <p className="text-concrete mt-3 text-lg">Texte principal — contraste 13,7:1</p>
            <p className="text-marking mt-1 font-mono text-sm">Marquage — 9,7:1, lisible ici, jamais sur clair</p>
          </div>
        </div>
      </Section>

      {/* ── Typographie ──────────────────────────────────────────────────── */}
      <Section id="typographie" title="Typographie" note="Archivo pour le display, avec son axe de chasse. IBM Plex Sans pour le texte, IBM Plex Mono pour la donnée. Trois fontes, une seule voix.">
        <div className="grid gap-8 lg:grid-cols-3">
          <TypeSpecimen family="Archivo" role="Display" className="font-display font-expanded text-3xl font-bold">
            27,4 t
          </TypeSpecimen>
          <TypeSpecimen family="IBM Plex Sans" role="Texte" className="text-lg">
            Chaque chargement est pesé et documenté.
          </TypeSpecimen>
          <TypeSpecimen family="IBM Plex Mono" role="Donnée" className="font-mono text-lg">
            M-2308 · TPQ-014 · 14:32
          </TypeSpecimen>
        </div>

        <h3 className="font-display font-semicondensed text-ink mt-14 text-xl font-semibold">
          Axe de chasse — le geste du site
        </h3>
        <div className="border-ink/10 mt-4 flex flex-col gap-4 border p-6">
          <div>
            <p className="text-mist font-mono text-xs">wdth 125 — lettrage de bâche : H1 et grands nombres</p>
            <p className="font-display font-expanded text-ink text-3xl font-bold">CHAQUE TONNE À L’HEURE</p>
          </div>
          <div>
            <p className="text-mist font-mono text-xs">wdth 82 — titres de section</p>
            <p className="font-display font-semicondensed text-ink text-3xl font-semibold">CHAQUE TONNE À L’HEURE</p>
          </div>
        </div>

        <h3 className="font-display font-semicondensed text-ink mt-14 text-xl font-semibold">Échelle</h3>
        <ul className="border-ink/10 mt-4 divide-y divide-ink/10 border-y">
          {TYPE_SCALE.map(([px, className, use]) => (
            <li key={px} className="flex items-baseline gap-6 py-3">
              <span className="text-mist w-10 shrink-0 font-mono text-xs">{px}</span>
              <span className={`text-ink truncate ${className}`}>Tonnage</span>
              <span className="text-mist ms-auto hidden font-mono text-xs sm:block">{use}</span>
            </li>
          ))}
        </ul>
        <p className="text-mist mt-4 font-mono text-xs">
          H1 et grands nombres sont fluides en clamp() ; le reste est fixe.
        </p>
      </Section>

      {/* ── Grille ───────────────────────────────────────────────────────── */}
      <Section id="grille" title="Grille" note="12 colonnes, max 1440, gouttières 24 mobile / 40 desktop. Les bandes sont pleine largeur, le contenu se cale sur la grille à l’intérieur.">
        <div className="border-ink/10 grid grid-cols-4 gap-6 border p-4 lg:grid-cols-12">
          {Array.from({ length: 12 }, (_, index) => (
            <div
              key={index}
              className={`bg-marking/15 border-marking/40 h-20 border ${index >= 4 ? 'hidden lg:block' : ''}`}
            >
              <span className="text-mist block p-1 font-mono text-[0.625rem]">{index + 1}</span>
            </div>
          ))}
        </div>
        <p className="text-mist mt-4 font-mono text-xs">
          4 colonnes en dessous de 1024 px, 12 au-delà. La mesure de texte ne dépasse pas 68 caractères
          hors tableaux.
        </p>
      </Section>

      {/* ── Marquage ─────────────────────────────────────────────────────── */}
      <Section id="marquage" title="Ligne de marquage" note="Tiret 24, espace 16, épaisseur 2. Le seul motif décoratif récurrent du site : séparateurs, timeline, itinéraires, nav active, progression.">
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-mist mb-3 font-mono text-xs">Animée — se dessine dans le sens de la lecture</p>
            <MarkingLine />
          </div>
          <div>
            <p className="text-mist mb-3 font-mono text-xs">Statique (CSS, sans JavaScript)</p>
            <span className="marking-line-x block w-full" />
          </div>
          <div className="flex items-stretch gap-6">
            <span className="marking-line-y h-24 shrink-0" />
            <p className="text-ink/70 max-w-[52ch] text-sm">
              Verticale, elle porte la frise du groupe et la timeline de mission sur mobile. Elle est
              dessinée en SVG ou en dégradé répété — donc symétrisable en RTL sans retouche.
            </p>
          </div>
        </div>
      </Section>

      {/* ── Board ────────────────────────────────────────────────────────── */}
      <Section
        id="board"
        title="Tableau de dispatch"
        note="L’élément signature. Premier objet lisible de la page d’accueil : la thèse du site est qu’on peut montrer chaque tonne en mouvement, alors on la montre avant de l’écrire."
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,34rem)]">
          <div>
            <p className="text-mist mb-3 font-mono text-xs">
              live — un statut avance toutes les 6 s, une mission entre, la plus ancienne sort
            </p>
            <DispatchBoard rows={DEMO_ROWS} incoming={INCOMING_ROWS} live />
          </div>
          <div>
            <p className="text-mist mb-3 font-mono text-xs">
              largeur du hero (~540 px), statique — camion et matériau se replient dans la colonne
              trajet plutôt que de sortir du panneau
            </p>
            <DispatchBoard rows={DEMO_ROWS} />
          </div>
        </div>
        <p className="text-mist mt-4 max-w-[68ch] font-mono text-xs">
          Le board répond à la largeur de son CONTENEUR, pas à celle de la fenêtre : les deux
          panneaux ci-dessus sont le même composant, à la même taille d’écran. La mention « Données
          illustratives » fait partie du composant : on ne peut pas afficher le board sans elle. Les
          lignes sont une donnée typée (DispatchRow), pas du JSX — la Phase 3 branchera un flux
          anonymisé sans toucher au composant.
        </p>
      </Section>

      {/* ── Boutons ──────────────────────────────────────────────────────── */}
      <Section id="boutons" title="Boutons" note="Un bouton agit, un lien navigue. Les deux existent avec la même apparence et deux sémantiques — c’est ce que le clavier et le lecteur d’écran attendent.">
        <div className="flex flex-wrap items-end gap-3">
          <Button>Demander un devis</Button>
          <Button variant="secondary">Voir la flotte</Button>
          <Button variant="ghost">Retour</Button>
          <Button disabled>Bientôt disponible</Button>
        </div>
        <div className="mt-6 flex flex-wrap items-end gap-3">
          <Button size="sm">Petit</Button>
          <Button size="md">Moyen</Button>
          <Button size="lg">Grand</Button>
          <ButtonLink href="/styleguide" variant="ghost" size="md">
            Lien à l’apparence de bouton
          </ButtonLink>
        </div>
        <div className="bg-asphalt mt-6 flex flex-wrap items-end gap-3 p-6">
          <Button>Demander un devis</Button>
          <Button variant="ghost-dark">Voir la flotte</Button>
        </div>
        <p className="text-mist mt-4 font-mono text-xs">
          Le CTA primaire pose du texte --asphalt sur --marking (9,4:1), jamais du blanc.
        </p>
      </Section>

      {/* ── Puces ────────────────────────────────────────────────────────── */}
      <Section id="puces" title="Puces et statuts" note="Contour seulement. Ni vert ni rouge décoratif : « en cours » et « terminé » sont des étapes, pas un succès et un échec.">
        <div className="flex flex-wrap gap-3">
          <Chip>Agrégats</Chip>
          <Chip tone="active">En route</Chip>
          <Chip tone="muted">Livré 14:32</Chip>
          <Chip tone="alert">Immobilisé</Chip>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <StatusBadge tone="progress" label="En chargement" />
          <StatusBadge tone="done" label="Livré 13:58" />
          <StatusBadge tone="alert" label="Retard signalé" />
        </div>
      </Section>

      {/* ── Cartes ───────────────────────────────────────────────────────── */}
      <Section id="cartes" title="Cartes" note="L’élévation se lit par la valeur, jamais par une ombre portée. Une carte cliquable est un lien, pas une div avec un gestionnaire.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <Icons.IconTipper className="text-ink size-8" />
            <h3 className="font-display font-semicondensed mt-4 text-xl font-semibold">Matériaux en vrac</h3>
            <p className="text-ink/70 mt-2 text-sm">
              Des rotations cadencées entre carrière et chantier, pesées à chaque chargement.
            </p>
          </Card>
          <Card href="/styleguide">
            <Icons.IconAsphalt className="text-ink size-8" />
            <h3 className="font-display font-semicondensed mt-4 text-xl font-semibold">Enrobés à chaud</h3>
            <p className="text-ink/70 mt-2 text-sm">
              Bennes bâchées et calorifugées, livrées à la température de pose.
            </p>
            <span className="text-ink mt-4 inline-block text-sm font-medium underline underline-offset-4">
              Carte entièrement cliquable
            </span>
          </Card>
          <div className="bg-asphalt p-4">
            <Card onDark>
              <Icons.IconWeighbridge className="text-concrete size-8" />
              <h3 className="font-display font-semicondensed mt-4 text-xl font-semibold">Sur enrobé</h3>
              <p className="text-concrete/70 mt-2 text-sm">
                Même carte, posée sur une bande sombre : --gravel prend le relais de --limestone.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* ── Formulaires ──────────────────────────────────────────────────── */}
      <Section id="formulaires" title="Formulaires" note="Aucun champ n’est rendu sans passer par l’enveloppe commune : c’est ce qui garantit un libellé lié, une aide en mono et une erreur annoncée autrement que par la couleur.">
        <div className="grid max-w-3xl gap-6 sm:grid-cols-2">
          <Input id="societe" label="Société" placeholder="Raison sociale" required />
          <Input
            id="telephone"
            label="Téléphone"
            type="tel"
            required
            hint="Format national, ex. 06 12 34 56 78."
          />
          <Select
            id="service"
            label="Type de transport"
            required
            placeholder="Choisir un service"
            options={[
              { value: 'materiaux-vrac', label: 'Matériaux en vrac' },
              { value: 'enrobes-a-chaud', label: 'Enrobés à chaud' },
              { value: 'transport-exceptionnel', label: 'Transport exceptionnel' },
              { value: 'citernes', label: 'Citernes' },
              { value: 'camions-avec-chauffeur', label: 'Camions avec chauffeur' },
              { value: 'logistique-chantier', label: 'Logistique de chantier' },
            ]}
          />
          <Input
            id="tonnage"
            label="Tonnage"
            inputMode="decimal"
            error="Indiquez un tonnage, en tonnes."
          />
          <Textarea
            id="contraintes"
            label="Contraintes d’accès"
            className="sm:col-span-2"
            hint="Largeur de piste, pente, horaires de chantier, présence d’un pont bascule."
          />
          <FileInput id="cv" label="Votre CV" className="sm:col-span-2" />
        </div>

        <h3 className="font-display font-semicondensed text-ink mt-14 text-xl font-semibold">
          Progression — sur la ligne de marquage
        </h3>
        <Stepper className="mt-4 max-w-2xl" steps={['Le transport', 'Le trajet', 'Vos coordonnées']} current={1} />
      </Section>

      {/* ── Navigation de contenu ────────────────────────────────────────── */}
      <Section id="navigation" title="Navigation de contenu" note="Accordéon bâti sur details/summary natifs : clavier, lecteur d’écran et recherche dans la page fonctionnent sans JavaScript, et le contenu reste dans le DOM pour l’indexation FAQPage.">
        <Accordion
          className="max-w-3xl"
          items={[
            {
              id: 'facturation',
              question: 'Facturez-vous à la tonne ou à la rotation ?',
              answer: <p>Réponse à valider par l’exploitation avant publication.</p>,
            },
            {
              id: 'quantite',
              question: 'Comment est garantie la quantité livrée ?',
              answer: <p>Réponse à valider par l’exploitation avant publication.</p>,
            },
            {
              id: 'mobilisation',
              question: 'En combien de temps pouvez-vous mobiliser des camions ?',
              answer: <p>Réponse à valider par l’exploitation avant publication.</p>,
            },
          ]}
        />

        <h3 className="font-display font-semicondensed text-ink mt-14 text-xl font-semibold">Onglets</h3>
        <Tabs
          className="mt-4 max-w-3xl"
          items={[
            { id: 'inclus', label: 'Ce qui est inclus', content: <p className="text-ink/80">Planification des rotations, pesée au départ, bâchage, bon de livraison digital.</p> },
            { id: 'materiel', label: 'Matériel', content: <p className="text-ink/80">Bennes 8x4 et semi-remorques bennes, toutes équipées d’un traceur.</p> },
            { id: 'pour-qui', label: 'Pour qui', content: <p className="text-ink/80">Terrassement, voirie, carrières, centrales à béton.</p> },
          ]}
        />

        <h3 className="font-display font-semicondensed text-ink mt-14 text-xl font-semibold">Infobulle</h3>
        <p className="text-ink/80 mt-4 max-w-[62ch]">
          Le taux de ponctualité est mesuré sur{' '}
          <Tooltip label="Période et définition à confirmer par l’exploitation.">la période déclarée</Tooltip>. Une
          infobulle précise, elle n’informe jamais seule.
        </p>
      </Section>

      {/* ── Données ──────────────────────────────────────────────────────── */}
      <Section id="donnees" title="Tableaux de données" note="La densité est assumée là où la donnée vit. Le défilement horizontal est contenu dans le tableau, jamais dans la page.">
        <Table
          caption="Exemple de tableau de flotte"
          rowKey={(row) => row.category}
          columns={[
            { key: 'category', header: 'Catégorie', cell: (row) => row.category },
            { key: 'use', header: 'Utilisation', cell: (row) => row.use },
            { key: 'capacity', header: 'Capacité utile', align: 'end', cell: (row) => row.capacity },
            { key: 'count', header: 'Nombre', align: 'end', cell: (row) => <span className="text-mist">{row.count}</span> },
          ]}
          rows={[
            { category: 'Camions bennes 8x4', use: 'Vrac courte distance', capacity: '~18–20 t', count: '[N]' },
            { category: 'Semi-remorques bennes', use: 'Vrac longue distance', capacity: '~27–30 t', count: '[N]' },
            { category: 'Semi bennes calorifugées', use: 'Enrobés à chaud', capacity: '~27 t', count: '[N]' },
          ]}
        />
      </Section>

      {/* ── Retours ──────────────────────────────────────────────────────── */}
      <Section id="retours" title="Retours" note="Une confirmation dit ce qui s’est passé, pas ce qu’on ressent. « Demande envoyée », pas « Merci pour votre confiance ».">
        <div className="flex flex-wrap items-center gap-4">
          <DialogDemo />
          <ToastDemo />
        </div>
      </Section>

      {/* ── Mouvement ────────────────────────────────────────────────────── */}
      <Section id="mouvement" title="Mouvement" note="Règle unique : si un mouvement n’encode rien du transport — déplacement, séquence, progression — il est supprimé.">
        <div className="grid gap-8 lg:grid-cols-3">
          <div>
            <p className="text-mist mb-3 font-mono text-xs">Reveal — 12 px + opacité, 400 ms, une fois</p>
            <Reveal>
              <div className="bg-limestone border-ink/10 border p-6 text-sm">
                Révélation par défaut de toute section.
              </div>
            </Reveal>
          </div>
          <div>
            <p className="text-mist mb-3 font-mono text-xs">Counter — compte une fois, à l’entrée dans le champ</p>
            <p className="font-display font-expanded text-ink text-4xl font-bold">
              <Counter value={27.4} decimals={1} /> <span className="text-mist text-xl">t</span>
            </p>
          </div>
          <div>
            <p className="text-mist mb-3 font-mono text-xs">Marquee — défilement continu, arrêt au survol</p>
            <Marquee label="Exemple de défilement">
              {['Client A', 'Client B', 'Client C', 'Client D'].map((name) => (
                <span key={name} className="text-mist font-display font-expanded text-lg font-bold">
                  {name}
                </span>
              ))}
            </Marquee>
          </div>
        </div>
        <p className="text-mist mt-6 max-w-[68ch] font-mono text-xs">
          Toutes ces primitives rendent leur état final immédiatement sous prefers-reduced-motion.
          Aucune information n’est portée par le mouvement seul.
        </p>
      </Section>

      {/* ── Silhouettes ──────────────────────────────────────────────────── */}
      <Section id="silhouettes" title="Silhouettes de flotte" note="Illustrations maison au trait, pas des photos ni un jeu d’icônes. Toutes partagent la même cabine : la différence est portée par la remorque, qui est ce qu’un acheteur regarde.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(FLEET_SILHOUETTES).map(([key, Silhouette]) => (
            <div key={key} className="border-ink/10 border p-5">
              <div className="text-ink">
                <Silhouette />
              </div>
              <p className="text-mist mt-3 font-mono text-xs">{key}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Icônes ───────────────────────────────────────────────────────── */}
      <Section id="icones" title="Icônes" note="Trait 2 px, grille 24, extrémités carrées, aucun remplissage. Dessinées ici parce qu’aucun jeu tout fait ne contient de pont bascule — et parce qu’un camion générique ramène le site vers le gabarit.">
        <ul className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {Object.entries(Icons).map(([name, Icon]) => (
            <li key={name} className="border-ink/10 flex flex-col items-center gap-2 border p-4">
              <Icon className="text-ink size-7" />
              <span className="text-mist text-center font-mono text-[0.625rem] break-all">
                {name.replace('Icon', '')}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── Trous ────────────────────────────────────────────────────────── */}
      <Section id="trous" title="Faits manquants" note="Rien n’est inventé. Chaque fait que TRANSPOLEQ doit fournir est visible ici et dans CONTENT_TODO.md, qui est généré depuis le même registre — la liste ne peut pas diverger du code.">
        <p className="text-ink mb-6">
          <span className="font-display font-expanded text-3xl font-bold">
            {Object.keys(PLACEHOLDERS).length}
          </span>{' '}
          faits en attente.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(PLACEHOLDERS).map(([key, spec]) => (
            <div key={key} className="border-ink/10 border p-4">
              <div className="flex items-baseline justify-between gap-2">
                <code className="text-ink font-mono text-sm">[{key}]</code>
                <Chip tone="muted">Phase {spec.phase}</Chip>
              </div>
              <p className="text-ink/70 mt-2 text-sm">{spec.expects}</p>
              <p className="text-mist mt-2 font-mono text-xs">
                {spec.where} · {spec.owner}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

function Section({
  id,
  title,
  note,
  children,
}: {
  readonly id: string
  readonly title: string
  readonly note: string
  readonly children: ReactNode
}) {
  return (
    <section id={id} className="site-container scroll-mt-24 py-16 lg:py-24">
      <span aria-hidden className="marking-line-x mb-10 block w-full" />
      <h2 className="font-display font-semicondensed text-ink text-3xl font-semibold">{title}</h2>
      <p className="text-ink/70 mt-3 mb-10 max-w-[68ch]">{note}</p>
      {children}
    </section>
  )
}

function TypeSpecimen({
  family,
  role,
  className,
  children,
}: {
  readonly family: string
  readonly role: string
  readonly className: string
  readonly children: ReactNode
}) {
  return (
    <div className="border-ink/10 border p-6">
      <p className="eyebrow text-mist">{role}</p>
      <p className={`text-ink mt-4 ${className}`}>{children}</p>
      <p className="text-mist mt-4 font-mono text-xs">{family}</p>
    </div>
  )
}
