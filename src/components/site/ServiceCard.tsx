'use client';

import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { NewLawnReview } from '@/types/new-lawns.types';
import { ServiceDetailModal } from './ServiceDetailModal';

export interface Service {
  title: string;
  description: string;
  image?: string;
  icon?: LucideIcon;
  price?: number;
}

export function ServiceCard({
  service,
  phone,
  areas,
  testimonial,
  variant = 'full',
  rating,
  bullets,
  reviewCount,
  badge,
}: {
  service: Service;
  phone?: string;
  areas?: { city?: string; country?: string };
  testimonial?: NewLawnReview;
  variant?: 'full' | 'image-only' | 'simple';
  rating?: number;
  bullets?: string[];
  reviewCount?: number;
  badge?: string;
}) {
  const Icon = service.icon;
  const starRating = rating ?? testimonial?.rating ?? 4.9;

  const trustBullets = ['Fully insured', 'Send Quote'];
  const displayBullets = bullets
    ? [...bullets.slice(0, 2), ...trustBullets]
    : trustBullets;

  const imageSection = (
    <div className="relative h-48 overflow-hidden">
      <img
        src={service.image || '/images/hero-lawn.jpg'}
        loading="lazy"
        className="w-full h-full object-cover outline outline-1 -outline-offset-1 outline-black/10 group-hover:scale-105 transition-transform duration-300"
        alt={service.title}
      />
      {badge && variant !== 'simple' && (
        <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          {badge}
        </div>
      )}
      {Icon && (
        <div className="absolute -bottom-6 left-5 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white shadow-md">
          <Icon className="h-6 w-6" />
        </div>
      )}
      {variant === 'image-only' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <h4 className="text-white font-bold text-sm">
              {service.title}
            </h4>
            <p className="text-white/80 text-xs mt-1 line-clamp-2">
              {service.description}
            </p>
          </div>
        </>
      )}
    </div>
  );

  if (variant === 'image-only') {
    return (
      <div className="h-full flex-1 bg-white rounded-lg overflow-hidden flex flex-col group hover:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.06)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)] transition-shadow duration-200">
        <ServiceDetailModal
          service={service}
          phone={phone}
          areas={areas}
          testimonial={testimonial}
        >
          <div className="relative cursor-pointer">
            {imageSection}
          </div>
        </ServiceDetailModal>
      </div>
    );
  }

  if (variant === 'simple') {
    return (
      <div className="h-full bg-white rounded-lg overflow-hidden flex flex-col group hover:-translate-y-1 hover:shadow-lg shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)] transition-all duration-200">
        {imageSection}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-bold text-primary-dark text-lg">
            {service.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground flex-1 line-clamp-3">
            {service.description}
          </p>
          <div className="mt-4">
            <ServiceDetailModal
              service={service}
              phone={phone}
              areas={areas}
              testimonial={testimonial}
            >
              <Button
                variant="outline"
                className="w-full gap-2 cursor-pointer"
                size="sm"
              >
                View Details <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </ServiceDetailModal>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white rounded-lg overflow-hidden flex flex-col group hover:-translate-y-1 hover:shadow-lg shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)] transition-all duration-200">
      {imageSection}
      <div
        className={
          Icon
            ? 'p-5 pt-8 flex flex-col flex-1'
            : 'p-5 pt-3 flex flex-col flex-1'
        }
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-primary-dark text-lg">
            {service.title}
          </h3>
          {service.price && (
            <span className="text-lg font-bold text-primary shrink-0">
              From ${service.price}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 mt-1">
          <div className="flex text-amber-400 text-sm">
            {'★'.repeat(Math.round(starRating))}
            {'☆'.repeat(5 - Math.round(starRating))}
          </div>
          <span className="text-sm text-muted-foreground ml-1">
            {starRating}
            {reviewCount != null && (
              <span> ({reviewCount} reviews)</span>
            )}
          </span>
        </div>

        <p className="mt-2 text-sm text-muted-foreground flex-1">
          {service.description}
        </p>

        <div className="mt-3 space-y-1">
          {displayBullets.map((b) => (
            <div
              key={b}
              className="flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <span className="text-primary shrink-0">✓</span>
              {b}
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <ServiceDetailModal
            service={service}
            phone={phone}
            areas={areas}
            testimonial={testimonial}
          >
            <Button
              variant="outline"
              className="w-full gap-2 cursor-pointer"
              size="sm"
            >
              View Details <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </ServiceDetailModal>
          <Link
            href={`/quote?service=${encodeURIComponent(service.title)}`}
          >
            <Button className="w-full gap-2" size="sm">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
