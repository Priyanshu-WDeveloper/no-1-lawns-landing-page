import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/site/PageHero';
import { CTABanner } from '@/components/site/CTABanner';
import { getServices, getWebsiteConfig } from '@/lib/server-data';

export const metadata: Metadata = {
  title: 'Our Services — No.1 Lawns',
};

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
  const [services, config] = await Promise.all([
    getServices(),
    getWebsiteConfig().catch(() => null),
  ]);

  const banner = config?.websiteBannerList?.[1];
  const heroTitle = banner?.title || 'Our Services';
  const heroSubtitle = banner?.description || 'Professional garden maintenance services tailored to your needs.';

  return (
    <>
      <PageHero
        title={heroTitle}
        subtitle={heroSubtitle}
        image="/images/hero.png"
      />
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-4">
          {services.map((s) => (
            <div
              key={s._id}
              className="rounded-2xl border bg-white p-4 sm:p-5 shadow-sm"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                <img
                  src={s.image || '/images/hero-lawn.jpg'}
                  alt={s.title}
                  loading="lazy"
                  className="h-48 w-full rounded-xl object-cover sm:h-20 sm:w-28 sm:shrink-0"
                />

                <div className="flex flex-1 flex-col gap-4 min-w-0">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-base font-bold text-primary-dark">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {s.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-3 shrink-0">
                      <a
                        href="tel:0223234429"
                        className="flex h-10 w-10 mt-7 items-center justify-center rounded-full bg-primary/10 text-primary transition hover:bg-primary/20"
                      >
                        <Phone className="h-4 w-4" />
                      </a>

                      <div className="flex flex-col items-end gap-2">
                        <p className="text-lg font-semibold text-primary">
                          {s.price != null ? `From $${s.price}` : '$1-44'}
                        </p>
                        <Button
                          asChild
                          className="h-9 bg-primary px-5 text-sm text-white hover:bg-primary/90"
                        >
                          <Link href="/quote">Book Now</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <CTABanner phone={config?.websiteContactDetails?.phone} />
    </>
  );
}
