import { Space_Grotesk, JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';

// Self-hosted at build time (no render-blocking request to Google), exposed as
// CSS variables the components read via var(--font-*).
const sans = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
});
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const SITE_URL = 'https://etsukow.com';
const DESCRIPTION =
  'Julien Evrard — apprentice data & AI engineer. From C on a Nintendo 3DS to neural nets, shipped behind Docker & CI/CD. A portfolio that is bigger on the inside.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Julien Evrard — Bigger on the inside.',
  description: DESCRIPTION,
  keywords: [
    'Julien Evrard',
    'data engineer',
    'AI engineer',
    'apprentice',
    'machine learning',
    'Nintendo 3DS homebrew',
    'Luma3DS',
    'portfolio',
    'France',
  ],
  authors: [{ name: 'Julien Evrard', url: SITE_URL }],
  creator: 'Julien Evrard',
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Julien Evrard',
    title: 'Julien Evrard — Bigger on the inside.',
    description: DESCRIPTION,
    images: [
      { url: '/og.png', width: 2400, height: 1260, alt: 'Julien Evrard — Bigger on the inside.' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Julien Evrard — Bigger on the inside.',
    description: DESCRIPTION,
    images: ['/og.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#11111b',
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Julien Evrard',
  alternateName: 'etsu',
  url: SITE_URL,
  jobTitle: 'Apprentice Data & AI Engineer',
  email: 'mailto:julien.evrard@icloud.com',
  nationality: 'French',
  sameAs: [
    'https://github.com/etsukow',
    'https://www.linkedin.com/in/evrard-julien',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
