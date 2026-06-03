'use client';

import { useState } from 'react';
import { PageHero } from '@/components/site/PageHero';
import { CTABanner } from '@/components/site/CTABanner';
import { BeforeAfterSlider } from '@/components/gallery/BeforeAfterSlider';
import { cn } from '@/lib/utils';
import { useGetGalleryItemsQuery } from '@/lib/redux/api';

export default function GalleryPage() {
  const { data: items = [], isLoading } = useGetGalleryItemsQuery();
  const [active, setActive] = useState('All');

  const categories = ['All', ...new Set(items.map((i) => i.category))];

  const filteredItems =
    active === 'All' ? items : items.filter((i) => i.category === active);

  const beforeAfterItems = items.filter((i) => i.isBeforeAfter);

  const masonryItems = filteredItems.filter((i) => !i.isBeforeAfter);

  const heights = ['h-52', 'h-64', 'h-56', 'h-72', 'h-48', 'h-60', 'h-68'];

  return (
    <>
      <PageHero
        title="Our Gallery"
        subtitle="See the difference we can make."
        image="/images/garden-foliage.jpg"
      />
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((f) => (
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

        {isLoading && (
          <>
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-9 w-20 rounded-full animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]"
                />
              ))}
            </div>
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [&>div]:break-inside-avoid">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={`relative ${heights[i % heights.length]} rounded-xl overflow-hidden mb-4 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]`}
                />
              ))}
            </div>
          </>
        )}

        {!isLoading && beforeAfterItems.length > 0 && (
          <>
            <h3 className="text-2xl font-bold text-primary-dark mb-6">
              Before & After
            </h3>
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {beforeAfterItems.map((item) => (
                <BeforeAfterSlider
                  key={item._id}
                  before={item.beforeImage || item.image}
                  after={item.afterImage || item.image}
                  alt={`${item.category} transformation before and after`}
                />
              ))}
            </div>
          </>
        )}

        {!isLoading && masonryItems.length > 0 && (
          <>
            <h3 className="text-2xl font-bold text-primary-dark mb-6">
              Our Work
            </h3>
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [&>div]:break-inside-avoid">
              {masonryItems.map((item, i) => (
                <div
                  key={item._id}
                  className={`relative ${heights[i % heights.length]} rounded-xl overflow-hidden mb-4 group`}
                >
                  <img
                    src={item.image}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt={item.category}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </>
        )}
      </section>
      <CTABanner />
    </>
  );
}
