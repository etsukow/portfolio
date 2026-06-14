import './globals.css';

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
