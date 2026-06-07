import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { CLINIC_CONFIG } from "@/lib/data";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(CLINIC_CONFIG.seo.canonicalUrl),
  title: {
    default: CLINIC_CONFIG.seo.title,
    template: `%s | ${CLINIC_CONFIG.name}`,
  },
  description: CLINIC_CONFIG.seo.description,
  keywords: CLINIC_CONFIG.seo.keywords,
  authors: [{ name: CLINIC_CONFIG.doctor.name }],
  creator: CLINIC_CONFIG.name,
  openGraph: {
    type: "website",
    locale: CLINIC_CONFIG.seo.locale,
    url: CLINIC_CONFIG.seo.canonicalUrl,
    siteName: CLINIC_CONFIG.name,
    title: CLINIC_CONFIG.seo.title,
    description: CLINIC_CONFIG.seo.description,
    images: [{ url: CLINIC_CONFIG.seo.ogImage, width: 1200, height: 630, alt: CLINIC_CONFIG.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: CLINIC_CONFIG.seo.title,
    description: CLINIC_CONFIG.seo.description,
    images: [CLINIC_CONFIG.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: CLINIC_CONFIG.seo.canonicalUrl },
  verification: { google: "YOUR_GOOGLE_VERIFICATION_CODE" },
};

export const viewport: Viewport = {
  themeColor: "#0F2D5E",
  width: "device-width",
  initialScale: 1,
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": `${CLINIC_CONFIG.seo.canonicalUrl}/#dental-clinic`,
  name: CLINIC_CONFIG.name,
  description: CLINIC_CONFIG.seo.description,
  url: CLINIC_CONFIG.seo.canonicalUrl,
  telephone: CLINIC_CONFIG.contact.phone,
  email: CLINIC_CONFIG.contact.email,
  image: `${CLINIC_CONFIG.seo.canonicalUrl}/og-image.jpg`,
  priceRange: "₹₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, Credit Card, Debit Card, UPI, Insurance",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${CLINIC_CONFIG.contact.address.line1}, ${CLINIC_CONFIG.contact.address.line2 ?? ""}`,
    addressLocality: CLINIC_CONFIG.contact.address.city,
    addressRegion: CLINIC_CONFIG.contact.address.state,
    postalCode: CLINIC_CONFIG.contact.address.pin,
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: "19.0590", longitude: "72.8360" },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "09:00", closes: "17:00" },
  ],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1247", bestRating: "5" },
  medicalSpecialty: ["Cosmetic Dentistry","Implant Dentistry","Orthodontics","Endodontics","Pediatric Dentistry"],
  hasMap: "https://maps.google.com/?q=PureSmile+Dental+Bandra+Mumbai",
  sameAs: [
    CLINIC_CONFIG.social.instagram ?? "",
    CLINIC_CONFIG.social.facebook ?? "",
    CLINIC_CONFIG.social.youtube ?? "",
  ].filter(Boolean),
};

const physicianSchema = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: CLINIC_CONFIG.doctor.name,
  jobTitle: CLINIC_CONFIG.doctor.title,
  worksFor: { "@type": "MedicalOrganization", name: CLINIC_CONFIG.name },
  medicalSpecialty: "Prosthodontics",
  alumniOf: "Nair Hospital Dental College, Mumbai",
  url: `${CLINIC_CONFIG.seo.canonicalUrl}/about`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }}
        />
      </head>
      <body className="font-body bg-dental-cream text-dental-slate-800 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
