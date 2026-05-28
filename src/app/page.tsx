import Image from 'next/image';
import heroImg from '@public/images/hero.png';
import { Phone, Leaf, ShieldCheck, User, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServiceCard } from '@/components/site/ServiceCard';
import { SectionHeading } from '@/components/site/SectionHeading';
import { CTABanner } from '@/components/site/CTABanner';
import { services } from '@/lib/services';

const features = [
  {
    icon: Leaf,
    title: 'Reliable & Professional',
    sub: 'On time, every time',
  },
  {
    icon: ShieldCheck,
    title: 'Satisfaction Guaranteed',
    sub: 'Quality you can trust',
  },
  {
    icon: User,
    title: 'Experienced Team',
    sub: 'Skilled & fully equipped',
  },
  { icon: MapPin, title: 'Proudly Serving', sub: 'New Zealand' },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <section className="relative h-[85vh] overflow-hidden">
          <Image
            src={heroImg}
            fill
            priority
            className="object-cover"
            alt="Beautiful maintained garden"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f10]/85 via-[#0a1f10]/40 to-transparent" />
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Beautiful Gardens,
                <br />
                Well Maintained,
                <br />
                <span className="text-primary">All Year Round.</span>
              </h1>
              <div className="mt-4 h-1 w-16 bg-primary" />
              <p className="mt-5 text-white/85 text-lg">
                Professional garden maintenance services
                <br />
                to keep your outdoor spaces healthy,
                <br />
                clean and beautiful.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="/quote">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white gap-2"
                  >
                    Get a Free Quote
                  </Button>
                </a>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                >
                  <Phone className="h-4 w-4" /> 022 323 4429
                </Button>
              </div>
            </div>
          </div>
        </section>
        {/* Feature bar */}
        <div className="container mx-auto px-4 -mt-10 relative z-10">
          <div className="bg-primary text-white rounded-md grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/20">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex items-center gap-3 p-5"
              >
                <f.icon className="h-7 w-7 shrink-0" />
                <div>
                  <div className="font-semibold text-sm">
                    {f.title}
                  </div>
                  <div className="text-xs text-white/80">{f.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container mx-auto px-4 py-16">
        <SectionHeading
          eyebrow="OUR SERVICES"
          title="Complete Garden Maintenance"
          subtitle="One stop solution for all your garden care needs."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
