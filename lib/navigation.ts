import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

/**
 * Toujours importer `Link` d'ici, jamais de `next/link` : c'est ce qui
 * préfixera automatiquement les URL le jour où `/en` existera.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
