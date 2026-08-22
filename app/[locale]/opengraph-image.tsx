import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "AleqFactory — Centrale d'enrobage";

/** Dark plate, mono label (DESIGN.md §10): the OG identity for every page. */
export default function OgImage() {
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
          CENTRALE D&apos;ENROBAGE — MAROC
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 110,
              fontWeight: 700,
              letterSpacing: -2,
            }}
          >
            ALEQ<span style={{ color: "#F24E1E" }}>FACTORY</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 34, color: "#E9E8E4" }}>
            Enrobés fabriqués, contrôlés, livrés à température.
          </div>
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
          CAPACITÉ 160 T/H · STOCK À CHAUD 100 T · LIVRAISON 120 KM / 2 H
        </div>
      </div>
    ),
    size,
  );
}
