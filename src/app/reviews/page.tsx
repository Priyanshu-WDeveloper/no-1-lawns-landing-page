import type { Metadata } from 'next';
import Image from 'next/image';
import { Star, TrendingUp } from 'lucide-react';
import { PageHero } from '@/components/site/PageHero';
import { CTABanner } from '@/components/site/CTABanner';

export const metadata: Metadata = {
  title: 'Reviews — No.1 Lawns',
};

const reviews = [
  {
    name: 'James Thompson',
    loc: 'Auckland',
    date: '2 weeks ago',
    text: 'Amazing service! My lawn looks better than ever. The team was on time, friendly and very professional.',
  },
  {
    name: 'Sarah Mitchell',
    loc: 'Hamilton',
    date: '1 month ago',
    text: 'Very happy with the hedge trimming and clean up. Highly recommend NO.1 LAWNS!',
  },
  {
    name: 'David Wilson',
    loc: 'Tauranga',
    date: '2 months ago',
    text: 'Great communication and excellent work. Our garden has never looked so good.',
  },
  {
    name: 'Emma Richardson',
    loc: 'Wellington',
    date: '3 weeks ago',
    text: 'Fast response, affordable pricing, and the garden transformation exceeded our expectations.',
  },
];

const gallery = [
  '/images/hero-lawn.jpg',
  '/images/artificial-lawn.jpg',
  '/images/garden-foliage.jpg',
  '/images/landscaping.jpg',
];

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        title="What Our Customers Say"
        subtitle="Proud to have happy customers across New Zealand."
        image="/images/garden-plants.jpg"
      />
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border rounded-xl p-8 text-center shadow-sm">
            <div className="text-sm font-semibold text-muted-foreground tracking-wide">
              Google Rating
            </div>
            <div className="flex items-center gap-3 justify-center mt-3 ">
              <div className="text-5xl font-bold text-primary-dark ">
                5.0
              </div>
              <div className="flex justify-center gap-0.5 ">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-7 w-7 fill-yellow-500 text-yellow-500 mt-1"
                  />
                ))}
              </div>
            </div>
            <div className="text-sm text-muted-foreground mt-3">
              Based on <span className="font-semibold">180+</span>{' '}
              reviews
            </div>
          </div>
          <div className="bg-white border rounded-xl p-8 text-center shadow-sm">
            <div className="text-sm font-semibold text-muted-foreground tracking-wide">
              Facebook Rating
            </div>
            <div className="flex items-center gap-3 justify-center mt-3 ">
              <div className="text-5xl font-bold text-primary-dark ">
                5.0
              </div>
              <div className="flex justify-center gap-0.5 ">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-7 w-7 fill-yellow-500 text-yellow-500 mt-1"
                  />
                ))}
              </div>
            </div>
            <div className="text-sm text-muted-foreground mt-3">
              Based on <span className="font-semibold">130+</span>{' '}
              reviews
            </div>
          </div>
          <div className="bg-white border rounded-xl p-8 text-center shadow-sm">
            <div className="flex items-center gap-3 justify-center mt-3 ">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center ">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div className="text-5xl font-bold text-primary-dark">
                100%
              </div>
            </div>
            <div className="text-lg font-bold text-[#6d5d5d] mt-3">
              Recommend Us
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="bg-white border rounded-2xl p-6 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                {/* <div className="h-12 w-12 rounded-full overflow-hidden shrink-0">
                  <img
                    src={r.image}
                    alt={r.name}
                    className="h-full w-full object-cover"
                  />
                </div> */}
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center font-bold text-white text-sm ring-2 ring-white shadow-md shrink-0">
                  {r.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-semibold text-black leading-none">
                        {r.name}
                      </h4>

                      <p className="text-xs text-muted-foreground mt-1">
                        {r.loc}
                      </p>
                    </div>

                    <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                      {r.date}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-sm leading-7 text-muted-foreground">
                {r.text}
              </p>

              <div className="flex gap-1 mt-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-bold text-primary-dark mt-16 mb-6 text-center">
          See Our Work
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
          {gallery.map((g, i) => (
            <div
              key={i}
              // className="relative h-52 w-80 shrink-0 snap-start rounded-xl overflow-hidden group"
              className="relative h-52 w-75 shrink-0 snap-start rounded-xl overflow-hidden group"
            >
              <Image
                src={g}
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
