import { ImageResponse } from "next/og";
import { products } from "@/content/products";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "AleqFactory — fiche produit";

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#121214",
          color: "#E9E8E4",
          fontFamily: "monospace",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 2, color: "#8b949c" }}>
          {`${product?.norm ?? "NM EN 13108"} — ALEQFACTORY`}
        </div>
        <div style={{ fontSize: 130, fontWeight: 700, letterSpacing: -2 }}>
          {product?.name ?? "Produit"}
        </div>
        <div
          style={{
            display: "flex",
            borderTop: "1px solid #F24E1E",
            paddingTop: 24,
            fontSize: 26,
            color: "#8b949c",
          }}
        >
          {/* the OG default font has no ≥/≤ glyph */}
          {`FABRICATION ${product?.tempManufacture.replace("≥", "min.") ?? "—"} · POSE ${product?.tempLaying.replace("≥", "min.") ?? "—"}`}
        </div>
      </div>
    ),
    size,
  );
}
