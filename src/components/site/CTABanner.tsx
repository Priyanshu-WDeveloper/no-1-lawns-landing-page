import { Leaf, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTABanner({ phone }: { phone?: string }) {
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="rounded-xl bg-[#1e5631] text-white p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 md:justify-between">
        <div className="flex items-center gap-5">
          <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <Leaf className="h-6 w-6 md:h-8 md:w-8 text-primary" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold">
              Let's Keep Your Garden Looking Its Best!
            </h3>
            <p className="text-white/80 mt-1 text-sm">
              Get in touch today for a free quote and expert garden
              care.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          {phone && (
            <>
              <div className="hidden md:block h-16 w-px bg-white/20" />
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-white/70">Call Us Now</div>
                  <div className="font-bold text-lg">{phone}</div>
                </div>
              </div>
            </>
          )}
          <a href="/quote">
            <Button className="bg-white text-primary hover:bg-white/90">
              Get a Free Quote
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
