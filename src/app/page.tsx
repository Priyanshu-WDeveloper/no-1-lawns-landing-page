// import heroImg from '@public/images/hero.png';
import Image from 'next/image';
import { Phone, Leaf, ShieldCheck, User, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServiceCarousel } from '@/components/site/ServiceCarousel';
import { SectionHeading } from '@/components/site/SectionHeading';
import { CTABanner } from '@/components/site/CTABanner';
import { AnimateOnScroll } from '@/components/site/AnimateOnScroll';
import {
  getServices,
  getWebsiteConfig,
  getReviews,
} from '@/lib/server-data';

const featureIcons = [Leaf, ShieldCheck, User, MapPin];

export const dynamic = 'force-dynamic';

export default async function Home() {
  let serviceList: any[] = [];
  let config;
  let reviews: any[] = [];
  try {
    const [svc, cfg, rev] = await Promise.all([
      getServices(),
      getWebsiteConfig(),
      getReviews(),
    ]);
    serviceList = svc;
    config = cfg;
    reviews = rev;
  } catch {
    config = null;
  }

  const banner = config?.websiteBannerList?.[0];
  const heroTitle =
    banner?.title ||
    'Beautiful Gardens,<br />Well Maintained,<br />All Year Round.';
  const heroDesc =
    banner?.description ||
    'Professional garden maintenance services to keep your outdoor spaces healthy, clean and beautiful.';
  const heroImg = banner?.image;
  const features = config?.websiteAboutUs?.features?.length
    ? config.websiteAboutUs.features.map((f, i) => ({
        icon: featureIcons[i % featureIcons.length],
        title: f.title,
        sub: f.description,
      }))
    : [];

  return (
    <>
      <section className="relative">
        <section className="relative h-[85vh] overflow-hidden">
          <Image
            src={heroImg || '/images/hero-lawn.jpg'}
            fill
            priority
            className="object-cover outline outline-1 -outline-offset-1 outline-black/10"
            alt="Beautiful maintained garden"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f10]/85 via-[#0a1f10]/40 to-transparent" />
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <AnimateOnScroll noscroll>
                <h1
                  className="text-4xl md:text-6xl font-bold leading-tight text-balance"
                  dangerouslySetInnerHTML={{ __html: heroTitle }}
                />
              </AnimateOnScroll>
              <AnimateOnScroll noscroll delay={200}>
                <div className="mt-4 h-1 w-16 bg-primary" />
              </AnimateOnScroll>
              <AnimateOnScroll noscroll delay={400}>
                <p className="mt-5 text-white/85 text-lg">
                  {heroDesc}
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll noscroll delay={600}>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href="/quote">
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-white gap-2"
                    >
                      Send Quote
                    </Button>
                  </a>
                  {config?.websiteContactDetails?.phone && (
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                    >
                      <Phone className="h-4 w-4" />{' '}
                      {config.websiteContactDetails.phone}
                    </Button>
                  )}
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>
        <div className="container mx-auto px-4 -mt-10 relative z-10">
          <div className="bg-primary text-white rounded-md grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/20">
            {features.map((f, i) => (
              <AnimateOnScroll key={f.title} delay={i * 100}>
                <div className="flex items-center gap-3 p-5">
                  <f.icon className="h-7 w-7 shrink-0" />
                  <div>
                    <div className="font-semibold text-sm">
                      {f.title}
                    </div>
                    <div className="text-xs text-white/80">
                      {f.sub}
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <SectionHeading
          eyebrow="OUR SERVICES"
          title="Complete Garden Maintenance"
          subtitle="One stop solution for all your garden care needs."
        />
        <ServiceCarousel
          services={serviceList.slice(0, 8)}
          phone={config?.websiteContactDetails?.phone}
          areas={{
            city: config?.websiteContactDetails?.city,
            country: config?.websiteContactDetails?.country,
          }}
          testimonial={reviews[0]}
        />
      </section>

      <CTABanner phone={config?.websiteContactDetails?.phone} />
    </>
  );
}
