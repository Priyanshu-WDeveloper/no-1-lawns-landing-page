import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { Toaster } from 'sonner';
import '@/styles/globals.css';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { ReduxProvider } from '@/lib/redux/provider';
import { getWebsiteConfig } from '@/lib/server-data';

const _nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'No.1 Lawns — Garden Maintenance NZ',
  description:
    'Professional garden maintenance services across New Zealand. Lawn mowing, hedge trimming, landscaping and more.',
  icons: {
    icon: [
      {
        url: '/images/app_icon.png',
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let contactDetails = undefined;
  let websiteLogo = undefined;

  try {
    const config = await getWebsiteConfig();
    contactDetails = config.websiteContactDetails;
    websiteLogo = config.websiteLogo;
  } catch {}

  return (
    <html lang="en">
      <body
        className={`${_nunito.className} min-h-screen flex flex-col bg-[#fafaf7] antialiased`}
      >
        <Header contactDetails={contactDetails} websiteLogo={websiteLogo} />
        <main className="flex-1">
          <ReduxProvider>{children}</ReduxProvider>
        </main>
        <Footer contactDetails={contactDetails} />
        <Toaster richColors closeButton position="top-right" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
