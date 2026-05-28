import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import '@/styles/globals.css';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';

const _nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'No.1 Lawns — Garden Maintenance NZ',
  description:
    'Professional garden maintenance services across New Zealand. Lawn mowing, hedge trimming, landscaping and more.',
  icons: {
    icon: [
      {
        url: '/images/favicon-light.svg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/images/favicon-dark.svg',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/images/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/images/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${_nunito.className} min-h-screen flex flex-col bg-[#fafaf7] antialiased`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
