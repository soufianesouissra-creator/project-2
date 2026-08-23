/**
 * Injection de données structurées.
 *
 * `JSON.stringify` puis échappement de `<` : un contenu qui contiendrait
 * `</script>` fermerait la balise et deviendrait du HTML exécutable.
 */
export function JsonLd({ data }: { readonly data: unknown }) {
  if (!data) return null
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
