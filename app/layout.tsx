import type { ReactNode } from 'react'

/**
 * Layout racine — délibérément vide.
 *
 * `<html>` et `<body>` vivent dans `app/[locale]/layout.tsx`, où la langue et
 * la direction d'écriture sont connues. Mais Next a besoin d'un layout racine
 * RÉEL : sans lui, il en synthétise un, et c'est ce layout fantôme qui possède
 * la frontière 404 — `app/[locale]/not-found.tsx` n'était alors jamais rendu,
 * même pour un `notFound()` levé depuis une vraie page. Le site répondait au
 * 404 par défaut de Next, en anglais et sans styles.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children
}
