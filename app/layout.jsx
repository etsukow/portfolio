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

export const metadata = {
  title: 'Julien Evrard — Bigger on the inside.',
  description:
    "Julien Evrard — apprentice data & AI engineer. A portfolio that's bigger on the inside.",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
