type ClassValue = string | number | null | undefined | false | ClassValue[]

/**
 * Concaténation de classes. Volontairement minuscule : pas de `tailwind-merge`
 * dans les dépendances tant qu'aucun composant n'a besoin de résoudre un
 * conflit de classes — les variantes sont exprimées par des maps, pas par
 * écrasement.
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
