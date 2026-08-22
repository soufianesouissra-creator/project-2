import {
  Archivo,
  Bricolage_Grotesque,
  IBM_Plex_Mono,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";

// Display — variable: width axis wide for headlines, condensed for large numbers.
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-bricolage",
  display: "swap",
});

export const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

// Data / utility — the weighbridge-printout vernacular.
export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
  // Not preloaded: mono sets small labels, so its swap is invisible next to
  // the display font's — and the h1's Bricolage arrives sooner without the
  // two extra files competing for slow-4G bandwidth.
  preload: false,
});

export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500"],
  variable: "--font-plex-arabic",
  display: "swap",
  // Not preloaded: FR/EN pages never paint Arabic glyphs; unicode-range
  // fetches it on /ar only. Saves two font downloads from every LCP.
  preload: false,
});
