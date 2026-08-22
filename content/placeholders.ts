/**
 * Registre des faits que TRANSPOLEQ doit fournir (§14 du brief).
 *
 * Règle absolue : on n'invente ni un nombre de camions, ni une certification,
 * ni un client, ni une date. Tant qu'un fait manque, il s'affiche entre
 * crochets sur le site — visible, gênant, donc corrigé.
 *
 * `CONTENT_TODO.md` est GÉNÉRÉ depuis ce fichier (`pnpm gen:content-todo`) :
 * la liste ne peut pas diverger du code.
 */

export type PlaceholderOwner = 'Direction' | 'Exploitation' | 'RH' | 'Juridique' | 'Communication'

export interface PlaceholderSpec {
  /** Ce qu'on attend, en une phrase, sans ambiguïté sur l'unité et la période. */
  readonly expects: string
  /** Où le trou est visible sur le site. */
  readonly where: string
  readonly owner: PlaceholderOwner
  /** Phase qui a besoin du fait pour être publiable. */
  readonly phase: 0 | 1 | 2 | 3
}

export const PLACEHOLDERS = {
  // ── Coordonnées ───────────────────────────────────────────────────────────
  TEL: {
    expects: 'Numéro du standard, au format national (ex. 05 22 00 00 00).',
    where: 'Header, Footer, Contact, message d’erreur d’envoi',
    owner: 'Direction',
    phase: 0,
  },
  WHATSAPP: {
    expects: 'Numéro WhatsApp au format international sans espaces (ex. 212600000000).',
    where: 'Footer, menu mobile, Contact',
    owner: 'Direction',
    phase: 0,
  },
  EMAIL: {
    expects: 'Adresse de contact publique.',
    where: 'Footer, Contact',
    owner: 'Direction',
    phase: 0,
  },
  HORAIRES: {
    expects: 'Horaires d’ouverture du standard, et heures du dispatch si différentes.',
    where: 'Footer, Contact',
    owner: 'Exploitation',
    phase: 0,
  },
  VILLE_SIEGE: {
    expects: 'Ville du siège.',
    where: 'Couverture, Contact, Footer',
    owner: 'Direction',
    phase: 0,
  },
  ADRESSE_SIEGE: {
    expects: 'Adresse postale complète du siège.',
    where: 'Contact, Footer, Mentions légales',
    owner: 'Direction',
    phase: 0,
  },
  HUBS: {
    expects: 'Liste des sites d’exploitation et des régions réellement desservies.',
    where: 'Couverture (carte)',
    owner: 'Exploitation',
    phase: 1,
  },

  // ── Chiffres clés ─────────────────────────────────────────────────────────
  N_CAMIONS: {
    expects: 'Nombre de camions en exploitation, à une date précise.',
    where: 'Chiffres clés, Flotte',
    owner: 'Exploitation',
    phase: 1,
  },
  TONNAGE_ANNUEL: {
    expects: 'Tonnage transporté sur une année civile complète, avec l’année.',
    where: 'Chiffres clés',
    owner: 'Exploitation',
    phase: 1,
  },
  ANNEE_REFERENCE: {
    expects: 'Année de référence des chiffres clés (celle du tonnage et des km).',
    where: 'Chiffres clés (note de bas de bloc)',
    owner: 'Exploitation',
    phase: 1,
  },
  KM_ANNUEL: {
    expects: 'Kilomètres parcourus par an, même année que le tonnage.',
    where: 'Chiffres clés',
    owner: 'Exploitation',
    phase: 1,
  },
  TAUX_PONCTUALITE: {
    expects: 'Taux de livraisons à l’heure, avec la définition de « à l’heure » et la période mesurée.',
    where: 'Chiffres clés',
    owner: 'Exploitation',
    phase: 1,
  },
  DELAI_RAPPEL: {
    expects: 'Délai de rappel réellement tenu par le dispatch (ex. 2 heures ouvrées).',
    where: 'Devis — écran de confirmation et e-mail de réponse automatique',
    owner: 'Exploitation',
    phase: 1,
  },

  // ── Flotte ────────────────────────────────────────────────────────────────
  FLOTTE_CATEGORIES: {
    expects:
      'Pour chaque catégorie réellement exploitée : nombre, capacité utile, équipements. Les catégories non exploitées sont supprimées, pas laissées à zéro.',
    where: 'Flotte, teaser flotte de l’accueil',
    owner: 'Exploitation',
    phase: 2,
  },
  TAUX_IMMOBILISATION: {
    expects: 'Taux d’immobilisation de la flotte, avec sa période de calcul.',
    where: 'Flotte — Atelier & maintenance',
    owner: 'Exploitation',
    phase: 2,
  },
  POLITIQUE_RENOUVELLEMENT: {
    expects: 'Règle de renouvellement (âge ou kilométrage maximal), et âge moyen actuel.',
    where: 'Flotte — Renouvellement',
    owner: 'Exploitation',
    phase: 2,
  },

  // ── Groupe et références ──────────────────────────────────────────────────
  ANNEE_CREATION: {
    expects: 'Année de création de TRANSPOLEQ, et dates des jalons du groupe.',
    where: 'Le groupe — frise',
    owner: 'Direction',
    phase: 2,
  },
  CLIENTS_LOGOS: {
    expects:
      'Logos clients + autorisation ÉCRITE d’affichage pour chacun. Sans autorisation, ni logo ni nom.',
    where: 'Références, marquee de l’accueil',
    owner: 'Communication',
    phase: 2,
  },
  TEMOIGNAGES: {
    expects: 'Deux témoignages courts, avec nom, fonction, société et accord de publication.',
    where: 'Références, accueil',
    owner: 'Communication',
    phase: 2,
  },
  CERTIFICATIONS: {
    expects:
      'Certifications réellement détenues, avec organisme et date de validité. Aucune n’est listée par défaut.',
    where: 'Sécurité & conformité',
    owner: 'Juridique',
    phase: 2,
  },
  POSTES_OUVERTS: {
    expects: 'Postes réellement ouverts : intitulé, lieu, contrat, prérequis.',
    where: 'Carrières',
    owner: 'RH',
    phase: 2,
  },
  AVANTAGES_RH: {
    expects: 'Validation RH de la liste « Pourquoi nous rejoindre » avant publication.',
    where: 'Carrières',
    owner: 'RH',
    phase: 2,
  },

  // ── Mentions légales ──────────────────────────────────────────────────────
  RAISON_SOCIALE: {
    expects: 'Dénomination sociale exacte, telle qu’au registre du commerce.',
    where: 'Mentions légales, Footer',
    owner: 'Juridique',
    phase: 1,
  },
  FORME_JURIDIQUE: {
    expects: 'Forme juridique (SARL, SA, SARL AU…).',
    where: 'Mentions légales',
    owner: 'Juridique',
    phase: 1,
  },
  CAPITAL: {
    expects: 'Capital social en MAD.',
    where: 'Mentions légales',
    owner: 'Juridique',
    phase: 1,
  },
  RC: { expects: 'Numéro de registre du commerce et ville d’immatriculation.', where: 'Mentions légales, Footer', owner: 'Juridique', phase: 1 },
  ICE: { expects: 'Identifiant commun de l’entreprise (15 chiffres).', where: 'Mentions légales, Footer', owner: 'Juridique', phase: 1 },
  IF: { expects: 'Identifiant fiscal.', where: 'Mentions légales', owner: 'Juridique', phase: 1 },
  DIRECTEUR_PUBLICATION: {
    expects: 'Nom et qualité du directeur de la publication.',
    where: 'Mentions légales',
    owner: 'Juridique',
    phase: 1,
  },
  HEBERGEUR: {
    expects: 'Raison sociale et adresse de l’hébergeur.',
    where: 'Mentions légales',
    owner: 'Juridique',
    phase: 1,
  },
  CNDP: {
    expects: 'Numéro de déclaration CNDP (loi 09-08) une fois la déclaration faite.',
    where: 'Politique de confidentialité',
    owner: 'Juridique',
    phase: 1,
  },

  // ── Marque et médias ──────────────────────────────────────────────────────
  TOKENS_ALEQ: {
    expects:
      'Tokens de marque ALEQ (neutres + typographie) SI le groupe impose son héritage. Sans réponse, les défauts du brief §4.2 font foi.',
    where: 'app/globals.css — bloc @theme',
    owner: 'Communication',
    phase: 0,
  },
  LOGO: {
    expects:
      'Logo TRANSPOLEQ en SVG vectoriel (version sur clair et sur sombre), plus le verrou « Groupe ALEQ » s’il est imposé par le groupe. En attendant, le site affiche un verrou typographique.',
    where: 'components/sections/Wordmark.tsx — en-tête, pied de page, images OG',
    owner: 'Communication',
    phase: 0,
  },
  MEDIAS: {
    expects: 'Photos et vidéo listées dans public/media/README.md, aux formats et cadrages indiqués.',
    where: 'Toutes les pages',
    owner: 'Communication',
    phase: 1,
  },
  DOMAINE_ET_CLES: {
    expects:
      'Accès DNS du domaine, clés Resend et Turnstile, jeton Vercel Blob. Aucun secret dans le dépôt.',
    where: 'Déploiement (.env.example)',
    owner: 'Direction',
    phase: 1,
  },
} as const satisfies Record<string, PlaceholderSpec>

export type PlaceholderKey = keyof typeof PLACEHOLDERS

/**
 * Rend un fait manquant. Toujours passer par cette fonction : une clé inconnue
 * ne compile pas, donc un crochet ne peut pas traîner sans être au registre.
 */
export function ph(key: PlaceholderKey): string {
  return `[${key}]`
}
