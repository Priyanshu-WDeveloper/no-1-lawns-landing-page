import type { Metadata } from 'next';
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  Globe,
  Leaf,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import contactMap from '@public/images/contact-map.png';
import { PageHero } from '@/components/site/PageHero';
import { getWebsiteConfig } from '@/lib/server-data';

export const metadata: Metadata = {
  title: 'Contact — No.1 Lawns',
};

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  let contact;
  let banner;
  try {
    const config = await getWebsiteConfig();
    contact = config.websiteContactDetails;
    banner = config.websiteBannerList?.[3];
  } catch {
    contact = null;
    banner = null;
  }

  const phone = contact?.phone || '';
  const email = contact?.email || '';
  const businessHours = contact?.businessHours || '';
  const areas = [contact?.city, contact?.country]
    .filter(Boolean)
    .join(', ');

  const contactCards = [
    { icon: Phone, title: 'Call Us', value: phone },
    { icon: Mail, title: 'Email Us', value: email },
    { icon: Clock, title: 'Business Hours', value: businessHours },
    { icon: MapPin, title: 'Service Areas', value: areas },
  ];

  return (
    <>
      <PageHero
        title={banner?.title || 'Contact Us'}
        subtitle={banner?.description || "We'd love to hear from you!"}
        image="/images/garden-plants.jpg"
      />
      <section className="container mx-auto px-4 py-14 grid lg:grid-cols-2 gap-12">
        <div>
          <div className="mt-8 space-y-5">
            {contactCards.map((it) => (
              <div key={it.title} className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <it.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-primary-dark">
                    {it.title}
                  </div>
                  <div className="text-sm text-muted-foreground whitespace-pre-line">
                    {it.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border rounded-xl p-10 shadow-sm">
          <form className="grid md:grid-cols-2 gap-5">
            <div>
              <Label>Your Name</Label>
              <Input placeholder="Your name" className="mt-1" />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input placeholder="022 123 4567" className="mt-1" />
            </div>
            <div className="md:col-span-2">
              <Label>Email Address</Label>
              <Input placeholder="you@example.com" className="mt-1" />
            </div>
            <div className="md:col-span-2">
              <Label>Message</Label>
              <Textarea
                placeholder="How can we help you?"
                className="mt-1 min-h-[140px]"
              />
            </div>
            <div className="md:col-span-2">
              <Button className="bg-primary hover:bg-primary/90 text-white w-full">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-14">
        <div className="relative overflow-hidden rounded-[32px] border bg-white shadow-xl">
          <div className="absolute left-10 top-10 z-20">
            <h3 className="text-sm font-semibold text-primary-dark">
              Follow Us
            </h3>

            <div className="mt-4 flex items-center gap-4">
              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-md transition-[brightness] duration-300 hover:brightness-90"
              >
                <FacebookIcon />
              </a>

              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 text-white shadow-md transition-[brightness] duration-300 hover:brightness-90"
              >
                <InstagramIcon />
              </a>

              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DB4437] text-white shadow-md transition-[brightness] duration-300 hover:brightness-90"
              >
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="relative h-[420px] w-full">
            <Image
              src={contactMap}
              fill
              priority
              alt="Map"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />

            <div className="absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-white via-white/95 to-transparent hidden md:block" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute left-1/2 top-1/2 w-full max-w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-7 shadow-2xl border">
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-15 w-15 text-white fill-red-500" />
                  </div>
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                        <Leaf className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <h3 className="mt-2 text-3xl md:text-4xl font-bold text-primary-dark">
                          NO.1 LAWNS
                        </h3>
                        <p className="text-lg font-bold text-primary tracking-[0.15em]">
                          Garden Maintenance
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 mx-auto text-center text-sm leading-6 text-muted-foreground">
                      Proudly serving New Zealand.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
