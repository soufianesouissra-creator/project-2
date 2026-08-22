# CONTENT_TODO — faits à fournir

> **Fichier généré.** Ne pas éditer à la main : `pnpm gen:content-todo`.
> La source est `content/placeholders.ts`.

Chaque ligne est un fait que le site affiche aujourd'hui entre crochets. Rien n'est inventé :
un nombre de camions, une certification, un client ou une date qui n'a pas été fournie reste
visible comme un trou, sur le site comme ici.

**35 faits en attente.**

Pour en combler un : remplacer la valeur dans `content/fr/*.ts`, retirer l'appel à `ph('CLÉ')`,
puis supprimer l'entrée du registre et relancer la génération.


## Phase 0 — Fondations — 8 faits

| Fait | Ce qu'on attend | Où le trou est visible | Propriétaire |
|---|---|---|---|
| `[TEL]` | Numéro du standard, au format national (ex. 05 22 00 00 00). | Header, Footer, Contact, message d’erreur d’envoi | Direction |
| `[WHATSAPP]` | Numéro WhatsApp au format international sans espaces (ex. 212600000000). | Footer, menu mobile, Contact | Direction |
| `[EMAIL]` | Adresse de contact publique. | Footer, Contact | Direction |
| `[HORAIRES]` | Horaires d’ouverture du standard, et heures du dispatch si différentes. | Footer, Contact | Exploitation |
| `[VILLE_SIEGE]` | Ville du siège. | Couverture, Contact, Footer | Direction |
| `[ADRESSE_SIEGE]` | Adresse postale complète du siège. | Contact, Footer, Mentions légales | Direction |
| `[TOKENS_ALEQ]` | Tokens de marque ALEQ (neutres + typographie) SI le groupe impose son héritage. Sans réponse, les défauts du brief §4.2 font foi. | app/globals.css — bloc @theme | Communication |
| `[LOGO]` | Logo TRANSPOLEQ en SVG vectoriel (version sur clair et sur sombre), plus le verrou « Groupe ALEQ » s’il est imposé par le groupe. En attendant, le site affiche un verrou typographique. | components/sections/Wordmark.tsx — en-tête, pied de page, images OG | Communication |

## Phase 1 — Parcours de conversion — 18 faits

| Fait | Ce qu'on attend | Où le trou est visible | Propriétaire |
|---|---|---|---|
| `[HUBS]` | Liste des sites d’exploitation et des régions réellement desservies. | Couverture (carte) | Exploitation |
| `[N_CAMIONS]` | Nombre de camions en exploitation, à une date précise. | Chiffres clés, Flotte | Exploitation |
| `[TONNAGE_ANNUEL]` | Tonnage transporté sur une année civile complète, avec l’année. | Chiffres clés | Exploitation |
| `[ANNEE_REFERENCE]` | Année de référence des chiffres clés (celle du tonnage et des km). | Chiffres clés (note de bas de bloc) | Exploitation |
| `[KM_ANNUEL]` | Kilomètres parcourus par an, même année que le tonnage. | Chiffres clés | Exploitation |
| `[TAUX_PONCTUALITE]` | Taux de livraisons à l’heure, avec la définition de « à l’heure » et la période mesurée. | Chiffres clés | Exploitation |
| `[DELAI_RAPPEL]` | Délai de rappel réellement tenu par le dispatch (ex. 2 heures ouvrées). | Devis — écran de confirmation et e-mail de réponse automatique | Exploitation |
| `[RAISON_SOCIALE]` | Dénomination sociale exacte, telle qu’au registre du commerce. | Mentions légales, Footer | Juridique |
| `[FORME_JURIDIQUE]` | Forme juridique (SARL, SA, SARL AU…). | Mentions légales | Juridique |
| `[CAPITAL]` | Capital social en MAD. | Mentions légales | Juridique |
| `[RC]` | Numéro de registre du commerce et ville d’immatriculation. | Mentions légales, Footer | Juridique |
| `[ICE]` | Identifiant commun de l’entreprise (15 chiffres). | Mentions légales, Footer | Juridique |
| `[IF]` | Identifiant fiscal. | Mentions légales | Juridique |
| `[DIRECTEUR_PUBLICATION]` | Nom et qualité du directeur de la publication. | Mentions légales | Juridique |
| `[HEBERGEUR]` | Raison sociale et adresse de l’hébergeur. | Mentions légales | Juridique |
| `[CNDP]` | Numéro de déclaration CNDP (loi 09-08) une fois la déclaration faite. | Politique de confidentialité | Juridique |
| `[MEDIAS]` | Photos et vidéo listées dans public/media/README.md, aux formats et cadrages indiqués. | Toutes les pages | Communication |
| `[DOMAINE_ET_CLES]` | Accès DNS du domaine, clés Resend et Turnstile, jeton Vercel Blob. Aucun secret dans le dépôt. | Déploiement (.env.example) | Direction |

## Phase 2 — Crédibilité — 9 faits

| Fait | Ce qu'on attend | Où le trou est visible | Propriétaire |
|---|---|---|---|
| `[FLOTTE_CATEGORIES]` | Pour chaque catégorie réellement exploitée : nombre, capacité utile, équipements. Les catégories non exploitées sont supprimées, pas laissées à zéro. | Flotte, teaser flotte de l’accueil | Exploitation |
| `[TAUX_IMMOBILISATION]` | Taux d’immobilisation de la flotte, avec sa période de calcul. | Flotte — Atelier & maintenance | Exploitation |
| `[POLITIQUE_RENOUVELLEMENT]` | Règle de renouvellement (âge ou kilométrage maximal), et âge moyen actuel. | Flotte — Renouvellement | Exploitation |
| `[ANNEE_CREATION]` | Année de création de TRANSPOLEQ, et dates des jalons du groupe. | Le groupe — frise | Direction |
| `[CLIENTS_LOGOS]` | Logos clients + autorisation ÉCRITE d’affichage pour chacun. Sans autorisation, ni logo ni nom. | Références, marquee de l’accueil | Communication |
| `[TEMOIGNAGES]` | Deux témoignages courts, avec nom, fonction, société et accord de publication. | Références, accueil | Communication |
| `[CERTIFICATIONS]` | Certifications réellement détenues, avec organisme et date de validité. Aucune n’est listée par défaut. | Sécurité & conformité | Juridique |
| `[POSTES_OUVERTS]` | Postes réellement ouverts : intitulé, lieu, contrat, prérequis. | Carrières | RH |
| `[AVANTAGES_RH]` | Validation RH de la liste « Pourquoi nous rejoindre » avant publication. | Carrières | RH |

## Par propriétaire

- **Communication** (5) : `[CLIENTS_LOGOS]`, `[TEMOIGNAGES]`, `[TOKENS_ALEQ]`, `[LOGO]`, `[MEDIAS]`
- **Direction** (7) : `[TEL]`, `[WHATSAPP]`, `[EMAIL]`, `[VILLE_SIEGE]`, `[ADRESSE_SIEGE]`, `[ANNEE_CREATION]`, `[DOMAINE_ET_CLES]`
- **Exploitation** (11) : `[HORAIRES]`, `[HUBS]`, `[N_CAMIONS]`, `[TONNAGE_ANNUEL]`, `[ANNEE_REFERENCE]`, `[KM_ANNUEL]`, `[TAUX_PONCTUALITE]`, `[DELAI_RAPPEL]`, `[FLOTTE_CATEGORIES]`, `[TAUX_IMMOBILISATION]`, `[POLITIQUE_RENOUVELLEMENT]`
- **Juridique** (10) : `[CERTIFICATIONS]`, `[RAISON_SOCIALE]`, `[FORME_JURIDIQUE]`, `[CAPITAL]`, `[RC]`, `[ICE]`, `[IF]`, `[DIRECTEUR_PUBLICATION]`, `[HEBERGEUR]`, `[CNDP]`
- **RH** (2) : `[POSTES_OUVERTS]`, `[AVANTAGES_RH]`

## Ce qui n'est pas un trou

Ces contenus sont RÉDIGÉS et prêts, ils n'attendent qu'une relecture métier :
les six descriptions de service, les cinq étapes d'une mission, les cinq engagements sécurité,
la microcopie et les intitulés de la FAQ. Ils viennent du brief et suivent la voix du §3.

## Ce qui attend une validation, pas une donnée

- « Pourquoi nous rejoindre » (Carrières) — à valider par les RH avant publication.
- Réponses de la FAQ — les questions sont posées, les réponses doivent être validées par
  l'exploitation avant d'être publiées : une réponse fausse sur l'assurance ou la mobilisation
  engage l'entreprise.
