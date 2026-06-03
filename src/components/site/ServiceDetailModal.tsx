'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Phone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { NewLawnReview } from '@/types/new-lawns.types';

const serviceIcons: Record<string, string> = {
  'Lawn Mowing': '🌱',
  'Garden Clean-Ups': '🌿',
  'Stump Grinding': '',
  'Artificial Lawns': '🧹',
  'Garden Landscaping': '🏡',
  'Small Tree Removal / Pruning': '🌳',
  'Weed Control': '🌾',
  'Hedge Trimming': '✂️',
};

function getServiceIcon(title: string): string {
  const key = Object.keys(serviceIcons).find(
    (k) =>
      title.toLowerCase().includes(k.toLowerCase()) ||
      k.toLowerCase().includes(title.toLowerCase()),
  );
  return key ? serviceIcons[key] : '🌿';
}

const serviceBenefits: Record<string, string[]> = {
  'Lawn Mowing': [
    'Professional zero-turn mowing for a perfect finish',
    'Edging, trimming and complete cleanup',
    'Flexible weekly or fortnightly scheduling',
    'Seasonal lawn health assessments',
  ],
  'Garden Clean-Ups': [
    'Leaf and debris removal from all garden areas',
    'Green waste disposal and composting',
    'Garden bed weeding and rejuvenation',
    'Seasonal tidy-up and ongoing maintenance',
  ],
  'Stump Grinding': [
    'Complete stump removal below ground level',
    'Root grinding to prevent regrowth',
    'Site restoration and fill placement',
    'Same-day cleanup and debris haulage',
  ],
  'Artificial Lawns': [
    'Professional synthetic turf installation',
    'Base preparation and drainage planning',
    'Weed membrane and edge fixing',
    'Infill grooming and UV-stable materials',
  ],
  'Garden Landscaping': [
    'Full landscape design and consultation',
    'Plant selection suited to your climate',
    'Hardscape elements: patios, paths, walls',
    'Drainage solutions and site preparation',
  ],
  'Small Tree Removal / Pruning': [
    'Safe tree removal in tight access areas',
    'Crown reduction and thinning for health',
    'Deadwood removal and storm damage pruning',
    'Limb clearance from structures and power lines',
  ],
  'Weed Control': [
    'Targeted spraying for broadleaf and grass weeds',
    'Manual weeding in garden beds and borders',
    'Mulch application to suppress regrowth',
    'Pre-emergent treatment for long-term control',
  ],
  'Hedge Trimming': [
    'Formal hedge shaping and levelling',
    'Overgrown hedge reduction and recovery',
    'Complete cut cleanup and waste removal',
    'Regular maintenance schedule available',
  ],
};

const defaultBenefits = [
  'Professional service tailored to your needs',
  'Quality workmanship guaranteed',
  'Eco-friendly practices and products',
  '100% satisfaction guaranteed',
];

function getBenefits(title: string): string[] {
  const key = Object.keys(serviceBenefits).find(
    (k) =>
      title.toLowerCase().includes(k.toLowerCase()) ||
      k.toLowerCase().includes(title.toLowerCase()),
  );
  return key ? serviceBenefits[key] : defaultBenefits;
}

interface ServiceDetailModalProps {
  service: {
    title: string;
    description: string;
    image?: string;
    price?: number;
  };
  phone?: string;
  areas?: { city?: string; country?: string };
  testimonial?: NewLawnReview;
  children: React.ReactNode;
}

export function ServiceDetailModal({
  service,
  phone,
  areas,
  testimonial,
  children,
}: ServiceDetailModalProps) {
  const [open, setOpen] = useState(false);

  const benefits = getBenefits(service.title);
  const icon = getServiceIcon(service.title);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="
          w-screen h-screen max-w-none
          sm:max-w-[1100px] sm:w-[95%] sm:h-auto sm:max-h-[90vh]
          !top-0 !left-0 !translate-x-0 !translate-y-0
          sm:!top-1/2 sm:!left-1/2 sm:!-translate-x-1/2 sm:!-translate-y-1/2
          !rounded-none sm:rounded-xl
          p-0 gap-0 overflow-hidden flex flex-col
        "
      >
        <DialogClose className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div className="relative h-[320px] sm:h-[220px] w-full shrink-0 bg-gray-100">
          <img
            src={service.image || '/images/hero-lawn.jpg'}
            alt={service.title}
            loading="lazy"
            className="w-full h-full object-cover outline outline-1 -outline-offset-1 outline-black/10"
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-6 pt-4 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-primary-dark">
                {icon} {service.title}
              </h2>
              <div className="flex items-center gap-1 mt-1 text-sm">
                <span className="text-amber-500">⭐⭐⭐⭐⭐</span>
                <span className="text-muted-foreground ml-1">
                  Rated by {areas?.city || 'Auckland'} homeowners
                </span>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {service.description}
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="text-primary">✓</span> Free Quote
              </span>
              <span className="flex items-center gap-1">
                <span className="text-primary">✓</span> Auckland Wide
              </span>
              <span className="flex items-center gap-1">
                <span className="text-primary">✓</span> Fully Insured
              </span>
              <span className="flex items-center gap-1">
                <span className="text-primary">✓</span> Same Week
                Availability
              </span>
            </div>

            {benefits.length > 0 && (
              <div>
                <h3 className="font-semibold text-primary-dark mb-2">
                  What&apos;s Included
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {benefits.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-primary mt-0.5 shrink-0">
                        ✓
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {testimonial && (
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  &ldquo;{testimonial.comment}&rdquo;
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-amber-500 text-sm">
                    {'★'.repeat(Math.round(testimonial.rating))}
                    {'☆'.repeat(5 - Math.round(testimonial.rating))}
                  </span>
                  <span className="text-sm font-medium text-primary-dark">
                    — {testimonial.reviewerName}
                  </span>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              {service.price && (
                <div>
                  <span className="text-xl font-bold text-primary">
                    From ${service.price}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">
                    per visit
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="sticky bottom-0 bg-white border-t p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/quote?service=${encodeURIComponent(service.title)}`}
                className="flex-1"
                onClick={() => setOpen(false)}
              >
                <Button className="w-full gap-2" size="lg">
                  Get Free Quote
                </Button>
              </Link>
              {phone && (
                <a href={`tel:${phone}`} className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    size="lg"
                  >
                    <Phone className="h-4 w-4" />
                    Call Now
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
