import { plant } from "@/content/plant";
import { SITE_URL } from "@/lib/seo";

function Script({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Organization (+ LocalBusiness once real coordinates exist — TODO.md). */
export function OrganizationJsonLd() {
  const org: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: plant.legalName,
    url: SITE_URL,
    parentOrganization: { "@type": "Organization", name: "Groupe ALEQ", url: "https://aleq.ma" },
  };

  // Placeholder-free structured data only: LocalBusiness needs the real
  // address and GPS; it joins the graph when plant.gps is filled.
  if (plant.gps) {
    org.location = {
      "@type": "Place",
      geo: {
        "@type": "GeoCoordinates",
        latitude: plant.gps[0],
        longitude: plant.gps[1],
      },
    };
  }

  return <Script data={org} />;
}

export function ProductJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name,
        description,
        url: SITE_URL + path,
        brand: { "@type": "Organization", name: plant.legalName },
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path?: string }[];
}) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          ...(item.path ? { item: SITE_URL + item.path } : {}),
        })),
      }}
    />
  );
}
