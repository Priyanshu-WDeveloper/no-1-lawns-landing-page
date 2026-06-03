import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { CTABanner } from '@/components/site/CTABanner';
import Image from 'next/image';

import serviceAreaImg from '@public/images/service-area.png';
import { getWebsiteConfig } from '@/lib/server-data';

export const metadata: Metadata = {
  title: 'Service Areas — No.1 Lawns',
};

export const dynamic = 'force-dynamic';

export default async function AreasPage() {
  let areas: { city: string; title: string; desc: string }[] = [];
  let config;
  try {
    config = await getWebsiteConfig();
    const provinces = config?.websiteContactDetails?.provinces;
    areas = provinces
      ? provinces.split(',').map((s: string) => s.trim()).filter(Boolean).map((city: string) => ({
          city,
          title: 'Garden Services in ' + city,
          desc: 'Professional garden maintenance services for ' + city + ' and surrounding areas.',
        }))
      : [];
  } catch {}

  return (
    <>
      <section className="container mx-auto px-4 py-14 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-primary-dark">
              Areas We Serve
            </h1>
            <p className="text-lg text-muted-foreground mt-3 leading-relaxed max-w-lg">
              Providing professional garden maintenance services
              across New Zealand.
            </p>
          </div>
          <div className="space-y-4">
            {areas.map((a: { city: string; title: string; desc: string }) => (
              <a
                key={a.city}
                href="#"
                className="flex items-center justify-between bg-white border rounded-xl p-6 hover:shadow-lg transition-all duration-200 group"
              >
                <div>
                  <div className="font-bold text-primary-dark text-lg">
                    {a.title}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                    {a.desc}
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-primary shrink-0 ml-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden h-[850px] relative top-0 lg:sticky lg:top-24">
          <Image
            src={serviceAreaImg}
            fill
            priority
            className="object-contain"
            alt="Beautiful maintained garden"
          />
        </div>
      </section>
      <CTABanner phone={config?.websiteContactDetails?.phone} />
    </>
  );
}
