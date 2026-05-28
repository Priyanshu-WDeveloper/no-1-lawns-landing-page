import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { CTABanner } from '@/components/site/CTABanner';
import Image from 'next/image';

import serviceAreaImg from '@public/images/service-area.png';

export const metadata: Metadata = {
  title: 'Service Areas — No.1 Lawns',
};

const areas = [
  {
    city: 'Auckland',
    title: 'Garden Services in Auckland',
    desc: 'Professional lawn mowing, landscaping and garden maintenance across the greater Auckland region.',
  },
  {
    city: 'Hamilton',
    title: 'Garden Services in Hamilton',
    desc: 'Reliable garden care including hedge trimming, weed control and clean-ups in Hamilton and surrounds.',
  },
  {
    city: 'Tauranga',
    title: 'Garden Services in Tauranga',
    desc: 'Expert landscaping and garden maintenance services for Tauranga homes and businesses.',
  },
  {
    city: 'Wellington',
    title: 'Garden Services in Wellington',
    desc: 'Full-service garden maintenance from lawn care to tree pruning across the Wellington region.',
  },
  {
    city: 'Christchurch',
    title: 'Garden Services in Christchurch',
    desc: 'Premium lawn and garden services for Christchurch properties, large and small.',
  },
];

export default function AreasPage() {
  return (
    <>
      <section className="container mx-auto px-4 py-14 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-primary-dark">
              Areas We Serve
            </h1>
            <p className="text-lg text-muted-foreground mt-3 leading-relaxed max-w-lg">
              Providing professional garden maintenance services
              across New Zealand.
            </p>
          </div>
          <div className="space-y-4">
            {areas.map((a) => (
              <a
                key={a.city}
                href="#"
                className="flex items-center justify-between bg-white border rounded-xl p-6 hover:shadow-lg transition-all duration-200 group"
              >
                <div>
                  <div className="font-bold text-primary-dark text-lg">
                    {a.title}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                    {a.desc}
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-primary shrink-0 ml-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden h-[850px] relative top-0 lg:sticky lg:top-24">
          <Image
            src={serviceAreaImg}
            fill
            priority
            className="object-contain"
            alt="Beautiful maintained garden"
          />
        </div>
      </section>
      <CTABanner />
    </>
  );
}
