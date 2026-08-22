type ClassValue = string | number | null | undefined | false | ClassValue[]

/**
 * Concaténation de classes. Volontairement minuscule : pas de `tailwind-merge`
 * dans les dépendances tant qu'aucun composant n'a besoin de résoudre un
 * conflit de classes — les variantes sont exprimées par des maps, pas par
 * écrasement.
 *
 * PIÈGE VÉRIFIÉ : cette fonction concatène, elle n'arbitre pas. Passer
 * `className="hidden"` à un composant dont la base contient `inline-flex` ne
 * masque rien — les deux règles sont des utilitaires d'affichage et c'est
 * l'ordre de la FEUILLE DE STYLE qui tranche, pas l'ordre des classes. Le CTA
 * de l'en-tête restait ainsi visible à 390 px. Pour masquer un composant,
 * envelopper l'appel (`<span class="hidden sm:block">`), ne pas lui passer la
 * classe.
 */
export function cn(...values: ClassValue[]): string {
  const out: string[] = []
  for (const value of values) {
    if (!value) continue
    if (Array.isArray(value)) {
      const nested = cn(...value)
      if (nested) out.push(nested)
    } else {
      out.push(String(value))
    }
  }
  return out.join(' ')
}
