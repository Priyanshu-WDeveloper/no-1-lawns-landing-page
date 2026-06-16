import type { Metadata } from 'next';
import { PageHero } from '@/components/site/PageHero';
import { CTABanner } from '@/components/site/CTABanner';
import { ServiceCard } from '@/components/site/ServiceCard';
import {
  getServices,
  getWebsiteConfig,
  getReviews,
} from '@/lib/server-data';

export const metadata: Metadata = {
  title: 'Our Services — No.1 Lawns',
};

export const dynamic = 'force-dynamic';

const serviceBadges: Record<string, string> = {
  'Lawn Mowing': 'Most Popular',
  'Garden Clean-Ups': 'Seasonal Service',
  'Stump Grinding': 'Specialist',
  'Artificial Lawns': 'Premium Service',
  'Garden Landscaping': 'Popular Pick',
  'Small Tree Removal / Pruning': 'Specialist',
  'Hedge Trimming': 'Seasonal Service',
};

const serviceReviewCounts: Record<string, number> = {
  'Lawn Mowing': 120,
  'Garden Clean-Ups': 74,
  'Stump Grinding': 23,
  'Artificial Lawns': 41,
  'Garden Landscaping': 68,
  'Small Tree Removal / Pruning': 31,
  'Weed Control': 56,
  'Hedge Trimming': 47,
};

const serviceBullets: Record<string, string[]> = {
  'Lawn Mowing': [
    'Professional zero-turn mowing for a perfect finish',
    'Edging, trimming and complete cleanup',
  ],
  'Garden Clean-Ups': [
    'Leaf and debris removal from all garden areas',
    'Green waste disposal and composting',
  ],
  'Stump Grinding': [
    'Complete stump removal below ground level',
    'Root grinding to prevent regrowth',
  ],
  'Artificial Lawns': [
    'Professional synthetic turf installation',
    'Base preparation and drainage planning',
  ],
  'Garden Landscaping': [
    'Full landscape design and consultation',
    'Plant selection suited to your climate',
  ],
  'Small Tree Removal / Pruning': [
    'Safe tree removal in tight access areas',
    'Crown reduction and thinning for health',
  ],
  'Weed Control': [
    'Targeted spraying for broadleaf and grass weeds',
    'Manual weeding in garden beds and borders',
  ],
  'Hedge Trimming': [
    'Formal hedge shaping and levelling',
    'Overgrown hedge reduction and recovery',
  ],
};

const defaultBullets = [
  'Professional service tailored to your needs',
  'Quality workmanship guaranteed',
];

function getBadge(title: string): string | undefined {
  const key = Object.keys(serviceBadges).find(
    (k) =>
      title.toLowerCase().includes(k.toLowerCase()) ||
      k.toLowerCase().includes(title.toLowerCase()),
  );
  return key ? serviceBadges[key] : undefined;
}

function getReviewCount(title: string): number | undefined {
  const key = Object.keys(serviceReviewCounts).find(
    (k) =>
      title.toLowerCase().includes(k.toLowerCase()) ||
      k.toLowerCase().includes(title.toLowerCase()),
  );
  return key ? serviceReviewCounts[key] : undefined;
}

function getBullets(title: string): string[] {
  const key = Object.keys(serviceBullets).find(
    (k) =>
      title.toLowerCase().includes(k.toLowerCase()) ||
      k.toLowerCase().includes(title.toLowerCase()),
  );
  return key ? serviceBullets[key] : defaultBullets;
}

export default async function ServicesPage() {
  const [services, config, reviews] = await Promise.all([
    getServices(),
    getWebsiteConfig().catch(() => null),
    getReviews().catch(() => []),
  ]);

  const banner = config?.websiteBannerList?.[1];
  const heroTitle = banner?.title || 'Our Services';
  const heroSubtitle =
    banner?.description ||
    'Professional garden maintenance services tailored to your needs.';
  const heroImg = banner?.image || '/images/hero-lawn.jpg';
  return (
    <>
      <PageHero
        title={heroTitle}
        subtitle={heroSubtitle}
        image={heroImg}
      />
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard
              key={s._id}
              service={{
                title: s.title,
                description: s.description,
                image: s.image,
                price: s.price ?? 44,
              }}
              phone={config?.websiteContactDetails?.phone}
              areas={config?.websiteContactDetails}
              rating={4.9}
              reviewCount={getReviewCount(s.title)}
              badge={getBadge(s.title)}
              bullets={getBullets(s.title)}
              testimonial={reviews[0]}
            />
          ))}
        </div>
      </section>
      <CTABanner phone={config?.websiteContactDetails?.phone} />
    </>
  );
}
