'use client';

import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
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
}: {
  service: Service;
  phone?: string;
  areas?: { city?: string; country?: string };
  testimonial?: NewLawnReview;
}) {
  const Icon = service.icon;
  return (
    <div className="h-full bg-white rounded-lg overflow-hidden flex flex-col group hover:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.06)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)] transition-shadow duration-200">
      <div className="relative">
        <img
          src={service.image || '/images/hero-lawn.jpg'}
          loading="lazy"
          className="w-full h-44 object-cover outline outline-1 -outline-offset-1 outline-black/10"
          alt={service.title}
        />
        {Icon && (
          <div className="absolute -bottom-6 left-5 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white shadow-md">
            <Icon className="h-6 w-6" />
          </div>
        )}
        {service.price && (
          <div className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            From ${service.price}
          </div>
        )}
      </div>
      <div
        className={
          Icon
            ? 'p-5 pt-8 flex flex-col flex-1'
            : 'p-5 pt-3 flex flex-col flex-1'
        }
      >
        <h3 className="font-bold text-primary-dark text-lg">
          {service.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground flex-1">
          {service.description}
        </p>
        <ServiceDetailModal
          service={service}
          phone={phone}
          areas={areas}
          testimonial={testimonial}
        >
          <button className="mt-4 inline-flex items-center gap-1 text-primary text-sm font-semibold cursor-pointer">
            Learn More <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </ServiceDetailModal>
      </div>
    </div>
  );
}
