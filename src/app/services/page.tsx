import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/site/PageHero';
import { CTABanner } from '@/components/site/CTABanner';
import { services } from '@/lib/services';

export const metadata: Metadata = {
  title: 'Our Services — No.1 Lawns',
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Professional garden maintenance services tailored to your needs."
        image="/images/hero.png"
      />
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-4">
          {services.map((s) => (
            <div
              key={s.slug}
              className="bg-white border rounded-xl p-5 shadow-sm"
            >
              <div className="flex items-start gap-5">
                <Image
                  src={s.image}
                  alt={s.title}
                  width={112}
                  height={80}
                  className="h-20 w-28 object-cover rounded-md shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div>
                      <h3 className="font-bold text-primary-dark">
                        {s.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {s.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3 items-end">
                      <a
                        href="tel:0223234429"
                        className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center"
                      >
                        <Phone className="h-3.5 w-3.5" />
                      </a>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span className="text-sm font-semibold text-primary-dark whitespace-nowrap">
                          {s.price}
                        </span>
                      <Button asChild className="bg-primary hover:bg-primary/90 text-white text-sm h-9">
                        <Link href="/quote">Book Now</Link>
                      </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <CTABanner />
    </>
  );
}
