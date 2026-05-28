'use client';

import Image from 'next/image';
import { useState } from 'react';
import { PageHero } from '@/components/site/PageHero';
import { CTABanner } from '@/components/site/CTABanner';
import { BeforeAfterSlider } from '@/components/gallery/BeforeAfterSlider';
import { cn } from '@/lib/utils';

const filters = [
  'All',
  'Lawn Mowing',
  'Landscaping',
  'Hedge Trimming',
  'Tree Work',
  'Clean-Ups',
];

const photos = [
  '/images/hero-lawn.jpg',
  '/images/artificial-lawn.jpg',
  '/images/garden-foliage.jpg',
  '/images/landscaping.jpg',
  '/images/hedge-trimming.jpg',
  '/images/lawn-mowing.jpg',
  '/images/garden-plants.jpg',
  '/images/stump-grinding.jpg',
  '/images/weed-control.jpg',
];

const heights = ['h-52', 'h-64', 'h-56', 'h-72', 'h-48', 'h-60', 'h-68'];

export default function GalleryPage() {
  const [active, setActive] = useState('All');
  return (
    <>
      <PageHero
        title="Our Gallery"
        subtitle="See the difference we can make."
        image="/images/garden-foliage.jpg"
      />
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm border transition',
                active === f
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-foreground/70 border-border hover:border-primary',
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <h3 className="text-2xl font-bold text-primary-dark mb-6">
          Before & After
        </h3>
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <BeforeAfterSlider
            before={photos[0]}
            after={photos[1]}
            alt="Lawn transformation before and after"
          />
          <BeforeAfterSlider
            before={photos[2]}
            after={photos[3]}
            alt="Garden makeover before and after"
          />
        </div>

        <h3 className="text-2xl font-bold text-primary-dark mb-6">
          Our Work
        </h3>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [&>div]:break-inside-avoid">
          {photos.map((p, i) => (
            <div
              key={i}
              className={`relative ${heights[i % heights.length]} rounded-xl overflow-hidden mb-4 group`}
            >
              <Image
                src={p}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                alt=""
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </section>
      <CTABanner />
    </>
  );
}
