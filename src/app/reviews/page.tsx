import type { Metadata } from 'next';
import { Star } from 'lucide-react';
import { PageHero } from '@/components/site/PageHero';
import { CTABanner } from '@/components/site/CTABanner';
import { AnimateOnScroll } from '@/components/site/AnimateOnScroll';
import { ServiceCarousel } from '@/components/site/ServiceCarousel';
import {
  getReviews,
  getServices,
  getWebsiteConfig,
} from '@/lib/server-data';

export const metadata: Metadata = {
  title: 'Reviews — No.1 Lawns',
};

export const dynamic = 'force-dynamic';

export default async function ReviewsPage() {
  const [reviews, services, config] = await Promise.all([
    getReviews(),
    getServices(),
    getWebsiteConfig().catch(() => null),
  ]);

  const banner = config?.websiteBannerList?.[4];
  const heroTitle = banner?.title || 'What Our Customers Say';
  const heroSubtitle =
    banner?.description ||
    'Proud to have happy customers across New Zealand.';

  const statCards = config?.websiteAboutUs?.stats?.length
    ? config.websiteAboutUs.stats.slice(0, 3).map((s) => ({
        label: s.label,
        value: s.value.replace('★', '').trim(),
      }))
    : [
        { label: 'Google Rating', value: '5.0' },
        { label: 'Facebook Rating', value: '5.0' },
        { label: 'Recommend', value: '100%' },
      ];

  return (
    <>
      <PageHero
        title={heroTitle}
        subtitle={heroSubtitle}
        image="/images/garden-plants.jpg"
      />
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {statCards.map((s, i) => (
            <AnimateOnScroll key={i} delay={i * 100}>
              <div className="bg-white border rounded-xl p-8 text-center shadow-sm">
                <div className="text-sm font-semibold text-muted-foreground tracking-wide">
                  {s.label}
                </div>
                <div className="flex items-center gap-3 justify-center mt-3">
                  <div className="text-5xl font-bold text-primary-dark tabular-nums">
                    {s.value}
                  </div>
                  <div className="flex justify-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-7 w-7 fill-yellow-500 text-yellow-500 mt-1"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {reviews.map((r, i) => (
            <AnimateOnScroll key={r._id} delay={i * 100}>
              <div className="bg-white border rounded-2xl p-6 hover:shadow-md transition-[box-shadow] duration-300 flex flex-col h-full">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center font-bold text-white text-sm ring-2 ring-white shadow-md shrink-0">
                    {r.reviewerName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-semibold text-black leading-none">
                          {r.reviewerName}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {r.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-sm leading-7 text-muted-foreground flex-1">
                  {r.comment}
                </p>
                <div className="flex gap-1 mt-6">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {services.length > 0 && (
          <>
            <h3 className="text-2xl font-bold text-primary-dark mt-16 mb-6 text-center">
              See Our Work
            </h3>
            <ServiceCarousel
              services={services.slice(0, 8)}
              variant="image-only"
              phone={config?.websiteContactDetails?.phone}
              areas={{
                city: config?.websiteContactDetails?.city,
                country: config?.websiteContactDetails?.country,
              }}
              testimonial={reviews[0]}
            />
          </>
        )}
      </section>
      <CTABanner phone={config?.websiteContactDetails?.phone} />
    </>
  );
}
