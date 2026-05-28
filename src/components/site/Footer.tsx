import {
  ShieldCheck,
  DollarSign,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { Logo } from './Logo';

const items = [
  { icon: ShieldCheck, label: 'Reliable Service' },
  { icon: DollarSign, label: 'Affordable Pricing' },
  { icon: MapPin, label: 'Local NZ Team' },
  { icon: CheckCircle2, label: '100% Satisfaction' },
];

export function Footer() {
  return (
    <footer className="bg-[#0e2a18] text-white/90">
      <div className="container mx-auto px-4 py-10 flex flex-col items-center md:flex-row md:items-center md:justify-between gap-6">
        <Logo footer />
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 md:flex md:items-center md:gap-6">
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
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4 text-center text-xs text-white/60">
          © 2026 No.1 Lawns Garden Maintenance. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
