import type { Metadata } from 'next';
import Image from 'next/image';
import { Users, Wrench, Leaf, Heart, MapPin } from 'lucide-react';
import { PageHero } from '@/components/site/PageHero';
import { CTABanner } from '@/components/site/CTABanner';

export const metadata: Metadata = {
  title: 'About Us — No.1 Lawns',
};

const values = [
  {
    icon: Users,
    title: 'Highly Experienced Team',
    sub: 'Skilled professionals with years of experience.',
  },
  {
    icon: Wrench,
    title: 'Top Quality Equipment',
    sub: 'We use the best tools for the best results.',
  },
  {
    icon: Leaf,
    title: 'Eco Friendly Solutions',
    sub: 'Safe for your family, pets and the environment.',
  },
  {
    icon: Heart,
    title: 'Customer Satisfaction',
    sub: "We don't stop until you're 100% satisfied.",
  },
];

const stats = [
  { v: '10+', l: 'Years Experience' },
  { v: '1000+', l: 'Happy Customers' },
  { v: '5★', l: 'Google Rating' },
  { v: '100%', l: 'Satisfaction' },
];

const areas = [
  'Auckland',
  'Hamilton',
  'Tauranga',
  'Wellington',
  'Christchurch',
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Us"
        subtitle="Local, reliable and passionate about beautiful gardens."
        image="/images/garden-plants.jpg"
      />
      <section className="container mx-auto px-4 py-14 grid md:grid-cols-2 gap-10 items-start">
        <div>
          <div className="max-w-lg">
            <h2 className="text-3xl font-bold text-primary-dark">
              Our Story
            </h2>
            <p className="mt-4 text-muted-foreground">
              NO.1 LAWNS was founded with a simple mission — to
              provide high quality, reliable and affordable garden
              maintenance services across New Zealand.
            </p>
            <p className="mt-3 text-muted-foreground">
              We take pride in our work and treat every garden as if
              it were our own.
            </p>
          </div>

          <div className="mt-8 space-y-5">
            {values.map((v) => (
              <div key={v.title} className="flex gap-4">
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
            ))}
          </div>
        </div>
        <Image
          src="/images/garden-foliage.jpg"
          width={800}
          height={600}
          alt="Garden"
          className="rounded-lg shadow-md w-full h-full object-cover max-h-[600px]"
        />
      </section>

      <section className="bg-primary/5 py-10">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">
                {s.v}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {s.l}
              </div>
            </div>
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
          {areas.map((a) => (
            <div key={a} className="flex flex-col items-center gap-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="text-sm font-medium">{a}</div>
            </div>
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
