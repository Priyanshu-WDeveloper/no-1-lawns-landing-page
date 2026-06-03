import type { Metadata } from 'next';
import Image from 'next/image';
import { Users, Wrench, Leaf, Heart, MapPin } from 'lucide-react';
import { PageHero } from '@/components/site/PageHero';
import { CTABanner } from '@/components/site/CTABanner';
import { AnimateOnScroll } from '@/components/site/AnimateOnScroll';
import { getWebsiteConfig } from '@/lib/server-data';

export const metadata: Metadata = {
  title: 'About Us — No.1 Lawns',
};

export const dynamic = 'force-dynamic';

const valueIcons = [Users, Wrench, Leaf, Heart];

export default async function AboutPage() {
  let config;
  try {
    config = await getWebsiteConfig();
  } catch {
    config = null;
  }

  const banner = config?.websiteBannerList?.[2];
  const heroTitle = banner?.title || 'About Us';
  const heroSubtitle = banner?.description || 'Local, reliable and passionate about beautiful gardens.';

  const features = config?.websiteAboutUs?.features;
  const stats = config?.websiteAboutUs?.stats;
  const provinces = config?.websiteContactDetails?.provinces;
  const aboutImage = config?.websiteAboutUs?.image;

  const displayValues = features && features.length > 0
    ? features.map((f, i) => ({
        icon: valueIcons[i % valueIcons.length],
        title: f.title,
        sub: f.description,
      }))
    : [];

  const displayStats = stats && stats.length > 0
    ? stats.map((s) => ({ v: s.value, l: s.label }))
    : [];

  const displayAreas = provinces
    ? provinces.split(',').map((s: string) => s.trim()).filter(Boolean)
    : [];

  return (
    <>
      <PageHero
        title={heroTitle}
        subtitle={heroSubtitle}
        image="/images/garden-plants.jpg"
      />
      <section className="container mx-auto px-4 py-14 grid md:grid-cols-2 gap-10 items-start">
        <div>
          <div className="max-w-lg">
            <h2 className="text-3xl font-bold text-primary-dark">
              {config?.websiteAboutUs?.title || 'Our Story'}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {config?.websiteAboutUs?.description ||
                'NO.1 LAWNS was founded with a simple mission — to provide high quality, reliable and affordable garden maintenance services across New Zealand. We take pride in our work and treat every garden as if it were our own.'}
            </p>
          </div>

          <div className="mt-8 space-y-5">
            {displayValues.map((v, i) => (
              <AnimateOnScroll key={v.title} delay={i * 100}>
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <v.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-primary-dark">
                    {v.title}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {v.sub}
                  </div>
                </div>
              </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
        {aboutImage ? (
          <img
            src={aboutImage}
            width={800}
            height={600}
            loading="lazy"
            alt="About us"
            className="rounded-lg shadow-md w-full object-cover max-h-[600px] outline outline-1 -outline-offset-1 outline-black/10"
          />
        ) : (
          <Image
            src="/images/garden-foliage.jpg"
            width={800}
            height={600}
            alt="Garden"
            className="rounded-lg shadow-md w-full object-cover max-h-[600px] outline outline-1 -outline-offset-1 outline-black/10"
          />
        )}
      </section>

      <section className="bg-primary/5 py-10">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {displayStats.map((s, i) => (
            <AnimateOnScroll key={s.l} delay={i * 100}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary tabular-nums">
                {s.v}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {s.l}
              </div>
            </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-14 text-center">
        <h3 className="text-2xl font-bold text-primary-dark">
          Areas We Serve
        </h3>
        <p className="text-muted-foreground mt-2">
          Proudly servicing many areas across New Zealand.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-8">
          {displayAreas.map((a) => (
            <div key={a} className="flex flex-col items-center gap-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="text-sm font-medium">{a}</div>
            </div>
          ))}
        </div>
      </section>

      <CTABanner phone={config?.websiteContactDetails?.phone} />
    </>
  );
}
