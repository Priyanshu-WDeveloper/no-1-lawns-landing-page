import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

export interface Service {
  title: string;
  description: string;
  image?: string;
  icon?: LucideIcon;
}

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden flex flex-col group hover:shadow-lg transition">
      <div className="relative">
        <img
          src={service.image || '/images/hero-lawn.jpg'}
          className="w-full h-44 object-cover"
          alt={service.title}
        />
        {Icon && (
          <div className="absolute -bottom-6 left-5 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white shadow-md">
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
      <div className={Icon ? 'p-5 pt-8 flex flex-col flex-1' : 'p-5 pt-3 flex flex-col flex-1'}>
        <h3 className="font-bold text-primary-dark text-lg">
          {service.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground flex-1">
          {service.description}
        </p>
        <a
          href="#"
          className="mt-4 inline-flex items-center gap-1 text-primary text-sm font-semibold"
        >
          Learn More <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
