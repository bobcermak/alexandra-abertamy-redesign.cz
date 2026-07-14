import { PageWrapper, NavbarClient } from "@/components";
import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-montserrat-next",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://alexandra-abertamy.cz"),
  title: {
    default: "Chata Alexandra | Horská chata pro celou partu - Hřebečná, Abertamy",
    template: "%s | Chata Alexandra"
  },
  description: "Soukromá chata Alexandra v Hřebečné u Abertam. Až 15 hostů, vlastní sauna, plně vybavená kuchyň a klid Krušných hor — po celý rok. V provozu od roku 1927.",
  referrer: "strict-origin-when-cross-origin",
  keywords: [
    "chata Alexandra",
    "Hřebečná",
    "Abertamy",
    "ubytování Krušné hory",
    "pronájem chaty pro skupiny",
    "chata pro 15 osob",
    "chata se saunou",
    "rodinná chata Krušné hory",
    "firemní teambuilding chata",
    "ubytování Boží Dar"
  ],
  authors: [{ name: "Bohuslav Čermák" }],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: "https://alexandra-abertamy.cz",
    siteName: "Chata Alexandra",
    title: "Chata Alexandra | Horská chata pro celou partu - Hřebečná, Abertamy",
    description: "Až 15 hostů, vlastní sauna, plně vybavená kuchyň a klid Krušných hor — po celý rok. V provozu od roku 1927."
  },
  icons: {
    icon: [
      { url: "/images/assets/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/assets/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: "/images/assets/apple-touch-icon.png"
  }
};
export const viewport = {
  width: "device-width",
  initialScale: 1.0
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={montserrat.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              name: "Chata Alexandra",
              description:
                "Soukromá horská chata v Hřebečné u Abertam. Pronájem celé chaty pro skupiny — až 15 hostů, 5 pokojů, vlastní sauna a plně vybavená kuchyň. V provozu od roku 1927.",
              url: "https://alexandra-abertamy.cz",
              telephone: "+420602726090",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Pohraničníků 44/198",
                addressLocality: "Abertamy - Hřebečná",
                addressRegion: "Karlovarský kraj",
                addressCountry: "CZ"
              },
              numberOfRooms: 5,
              amenityFeature: [
                { "@type": "LocationFeatureSpecification", name: "Sauna", value: true },
                { "@type": "LocationFeatureSpecification", name: "Plně vybavená kuchyně", value: true },
                { "@type": "LocationFeatureSpecification", name: "Wi-Fi zdarma", value: true },
                { "@type": "LocationFeatureSpecification", name: "Parkování u chaty", value: true },
                { "@type": "LocationFeatureSpecification", name: "Ohniště a gril", value: true }
              ]
            })
          }}
        />
      </head>
      <body className="font-montserrat">
        <header>
            <NavbarClient/>
        </header>
        <PageWrapper>
          <main>
            {children}
          </main>
          <footer>
            
          </footer>
        </PageWrapper>
      </body>
    </html>
  )
}