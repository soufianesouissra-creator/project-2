/**
 * Génère CONTENT_TODO.md depuis content/placeholders.ts.
 * La liste des faits manquants ne peut donc pas diverger du code.
 *
 *   node --experimental-strip-types scripts/gen-content-todo.mjs
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const { PLACEHOLDERS } = await import(join(root, 'content/placeholders.ts'))

const entries = Object.entries(PLACEHOLDERS)
const byPhase = new Map()
for (const [key, spec] of entries) {
  if (!byPhase.has(spec.phase)) byPhase.set(spec.phase, [])
  byPhase.get(spec.phase).push([key, spec])
}

const PHASE_TITLES = {
  0: 'Phase 0 — Fondations',
  1: 'Phase 1 — Parcours de conversion',
  2: 'Phase 2 — Crédibilité',
  3: 'Phase 3 — Mise à l’échelle',
}

let out = `# CONTENT_TODO — faits à fournir

> **Fichier généré.** Ne pas éditer à la main : \`pnpm gen:content-todo\`.
> La source est \`content/placeholders.ts\`.

Chaque ligne est un fait que le site affiche aujourd'hui entre crochets. Rien n'est inventé :
un nombre de camions, une certification, un client ou une date qui n'a pas été fournie reste
visible comme un trou, sur le site comme ici.

**${entries.length} faits en attente.**

Pour en combler un : remplacer la valeur dans \`content/fr/*.ts\`, retirer l'appel à \`ph('CLÉ')\`,
puis supprimer l'entrée du registre et relancer la génération.

`

for (const phase of [...byPhase.keys()].sort()) {
  const rows = byPhase.get(phase)
  out += `\n## ${PHASE_TITLES[phase]} — ${rows.length} faits\n\n`
  out += `| Fait | Ce qu'on attend | Où le trou est visible | Propriétaire |\n`
  out += `|---|---|---|---|\n`
  for (const [key, spec] of rows) {
    out += `| \`[${key}]\` | ${spec.expects} | ${spec.where} | ${spec.owner} |\n`
  }
}

const owners = [...new Set(entries.map(([, s]) => s.owner))].sort()
out += `\n## Par propriétaire\n\n`
for (const owner of owners) {
  const keys = entries.filter(([, s]) => s.owner === owner).map(([k]) => `\`[${k}]\``)
  out += `- **${owner}** (${keys.length}) : ${keys.join(', ')}\n`
}

out += `
## Ce qui n'est pas un trou

Ces contenus sont RÉDIGÉS et prêts, ils n'attendent qu'une relecture métier :
les six descriptions de service, les cinq étapes d'une mission, les cinq engagements sécurité,
la microcopie et les intitulés de la FAQ. Ils viennent du brief et suivent la voix du §3.

## Ce qui attend une validation, pas une donnée

- « Pourquoi nous rejoindre » (Carrières) — à valider par les RH avant publication.
- Réponses de la FAQ — les questions sont posées, les réponses doivent être validées par
  l'exploitation avant d'être publiées : une réponse fausse sur l'assurance ou la mobilisation
  engage l'entreprise.
`

writeFileSync(join(root, 'CONTENT_TODO.md'), out)
console.log(`CONTENT_TODO.md — ${entries.length} faits`)
