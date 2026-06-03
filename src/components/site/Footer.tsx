import { ShieldCheck, DollarSign, MapPin, CheckCircle2, Phone, Mail } from 'lucide-react';
import { Logo } from './Logo';
import type { WebsiteContactDetails } from '@/types/new-lawns.types';

const items = [
  { icon: ShieldCheck, label: 'Reliable Service' },
  { icon: DollarSign, label: 'Affordable Pricing' },
  { icon: MapPin, label: 'Local NZ Team' },
  { icon: CheckCircle2, label: '100% Satisfaction' },
];

export function Footer({
  contactDetails,
}: {
  contactDetails?: WebsiteContactDetails;
}) {
  return (
    <footer className="bg-[#0e2a18] text-white/90">
      <div className="container mx-auto px-4 py-10 flex flex-col items-center md:flex-row md:items-center md:justify-between gap-6">
        <Logo footer />
        <div className="flex flex-col items-center md:items-end gap-3">
          {contactDetails?.phone && (
            <a
              href={`tel:${contactDetails.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4 text-primary" />
              {contactDetails.phone}
            </a>
          )}
          {contactDetails?.email && (
            <a
              href={`mailto:${contactDetails.email}`}
              className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4 text-primary" />
              {contactDetails.email}
            </a>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center gap-x-6 gap-y-3 pb-6 flex-wrap px-4">
        {items.map((it) => (
          <div
            key={it.label}
            className="flex items-center gap-2 text-sm"
          >
            <it.icon className="h-4 w-4 text-primary" />
            <span>{it.label}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4 text-center text-xs text-white/60">
          © {new Date().getFullYear()} No.1 Lawns Garden Maintenance. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
