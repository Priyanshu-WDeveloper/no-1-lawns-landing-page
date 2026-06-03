'use client';

import Image from 'next/image';
import { AnimateOnScroll } from '@/components/site/AnimateOnScroll';

export function PageHero({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle?: string;
  image: string;
}) {
  return (
    <section className="relative h-64 md:h-80 overflow-hidden">
      <Image src={image} fill className="object-cover" alt="" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f10]/85 via-[#0a1f10]/40 to-transparent" />
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-white">
        <AnimateOnScroll noscroll>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {title}
          </h1>
        </AnimateOnScroll>
        <AnimateOnScroll noscroll delay={200}>
          <div className="mt-4 h-1 w-16 bg-primary" />
        </AnimateOnScroll>
        {subtitle && (
          <AnimateOnScroll noscroll delay={400}>
            <p className="mt-5 max-w-sm text-xl text-white/85">
              {subtitle}
            </p>
          </AnimateOnScroll>
        )}
      </div>
    </section>
  );
}
