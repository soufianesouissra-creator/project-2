import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import { LegalLayout, LegalList, LegalSection } from '@/components/sections/LegalLayout'
import { pageMetadata } from '@/lib/seo'
import { routing } from '@/lib/routing'
import { CONTACT, LEGAL } from '@/content/fr/site'
import { ph } from '@/content/placeholders'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  return pageMetadata({
    locale,
    path: '/confidentialite',
    title: 'Politique de confidentialité',
    description:
      'Traitement des données personnelles collectées par le site TRANSPOLEQ, conformément à la loi 09-08.',
  })
}

/**
 * Politique de confidentialité — loi 09-08.
 *
 * Le texte décrit ce que le site fait RÉELLEMENT : les champs des trois
 * formulaires, la mesure d'audience conditionnée au consentement, et rien
 * d'autre. Une politique qui décrit des traitements inexistants est aussi
 * fausse qu'une qui en omet.
 */
export default async function ConfidentialitePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  return (
    <LegalLayout title="Politique de confidentialité" updated="à compléter">
      <LegalSection title="Responsable du traitement">
        <LegalList
          rows={[
            ['Responsable', LEGAL.legalName],
            ['Adresse', `${CONTACT.address}, ${CONTACT.city}`],
            ['Contact', CONTACT.email],
            ['Déclaration CNDP', ph('CNDP')],
          ]}
        />
      </LegalSection>

      <LegalSection title="Données collectées et finalités">
        <p>Le site ne collecte que ce que vous saisissez vous-même, dans trois formulaires :</p>
        <LegalList
          rows={[
            [
              'Demande de devis',
              'Type de transport, matériau, tonnage, fréquence, origine, destination, date, contraintes d’accès, société, nom, fonction, téléphone, e-mail, message. Finalité : établir et transmettre une proposition commerciale.',
            ],
            [
              'Contact',
              'Nom, société, téléphone, e-mail, message. Finalité : répondre à votre demande.',
            ],
            [
              'Candidature',
              'Nom, téléphone, e-mail, poste visé, permis, message, CV. Finalité : étudier votre candidature.',
            ],
          ]}
        />
        <p>
          Aucune donnée n’est collectée à votre insu, aucune n’est vendue, et aucune n’est utilisée
          pour de la prospection non sollicitée.
        </p>
      </LegalSection>

      <LegalSection title="Durée de conservation">
        <LegalList
          rows={[
            ['Demandes de devis', 'Trois ans à compter du dernier contact.'],
            ['Messages de contact', 'Un an à compter de la réponse.'],
            ['Candidatures', 'Deux ans à compter de la réception, sauf demande de suppression.'],
            ['Mesure d’audience', 'Treize mois, uniquement en cas de consentement.'],
          ]}
        />
      </LegalSection>

      <LegalSection title="Destinataires">
        <p>
          Les données sont transmises au dispatch et, pour les candidatures, au service des ressources
          humaines de {LEGAL.legalName}. Elles transitent par notre prestataire d’envoi d’e-mail et,
          pour les CV, par notre prestataire de stockage de fichiers. Aucun autre tiers n’y a accès.
        </p>
      </LegalSection>

      <LegalSection title="Mesure d’audience et cookies">
        <p>
          Le site ne dépose <strong>aucun cookie de mesure avant votre consentement</strong>. Un
          bandeau vous propose d’accepter ou de refuser, avec deux boutons de même poids. Refuser
          n’altère en rien le fonctionnement du site.
        </p>
        <p>
          Votre choix est conservé dans le stockage local de votre navigateur, sur votre appareil.
          Vous pouvez le modifier à tout moment en effaçant les données de site de votre navigateur.
        </p>
      </LegalSection>

      <LegalSection title="Vos droits">
        <p>
          Conformément à la loi 09-08 relative à la protection des personnes physiques à l’égard du
          traitement des données à caractère personnel, vous disposez d’un droit d’accès, de
          rectification et d’opposition sur les données qui vous concernent.
        </p>
        <p>
          Pour l’exercer, écrivez à {CONTACT.email} en précisant votre demande. Une réponse vous est
          apportée dans les délais prévus par la loi.
        </p>
        <p>
          Vous pouvez également saisir la Commission nationale de contrôle de la protection des données
          à caractère personnel (CNDP).
        </p>
      </LegalSection>

      <LegalSection title="Sécurité">
        <p>
          Les échanges avec ce site sont chiffrés (HTTPS). Les formulaires sont protégés contre les
          envois automatisés et limités en débit. Les données transmises ne sont conservées sur ce site
          à aucun moment : elles sont acheminées par e-mail aux services concernés.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
