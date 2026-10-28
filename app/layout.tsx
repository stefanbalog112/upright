import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Providers } from "@/components/ui/Providers";
import { basePath } from "@/lib/asset";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  keywords: [
    "short form video",
    "reels",
    "tiktok",
    "správa sociálnych sietí",
    "meta reklama",
    "branding",
    "webové stránky",
    "Rožňava",
    "Gemer",
    "Košice",
  ],
  // metadataBase je len doména; basePath sa doplní sám iba k súborom (OG obrázok), nie ku canonical
  alternates: { canonical: `${basePath}/` },
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: `${basePath}/`,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#141414",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sk" className={`${archivo.variable} antialiased`}>
      <body className="min-h-full">
        <a
          href="#obsah"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-signal focus:px-5 focus:py-3 focus:font-semibold focus:text-ink"
        >
          Preskočiť na obsah
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
