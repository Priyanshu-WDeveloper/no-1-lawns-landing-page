'use client';

import * as React from 'react';
import { CalendarIcon, Check, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import workerImage from '@public/images/quote.png';
import Image from 'next/image';
import type { NewLawnService } from '@/types/new-lawns.types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.no1lawns.com/api/v1/websites';

const benefits = [
  'Free and obligation free',
  'Fast response',
  'Custom solutions',
  'Best prices guaranteed',
];

export default function QuotePage() {
  const [date, setDate] = React.useState<Date>();
  const [services, setServices] = React.useState<NewLawnService[]>([]);

  React.useEffect(() => {
    fetch(`${API_URL}/services`)
      .then((res) => res.json() as Promise<{ services: NewLawnService[] }>)
      .then((data) => setServices(data.services))
      .catch(() => {});
  }, []);

  return (
    <section className="container mx-auto px-4 py-14 grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white border rounded-xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-primary-dark">
          Get a Free Quote
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Fill out the form and we'll get back to you as soon as
          possible.
        </p>
        <form className="mt-8 grid md:grid-cols-2 gap-5">
          <div>
            <Label>Full Name</Label>
            <Input placeholder="Your name" className="mt-1" />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input placeholder="022 123 4567" className="mt-1" />
          </div>
          <div>
            <Label>Email Address</Label>
            <Input placeholder="you@example.com" className="mt-1" />
          </div>
          <div>
            <Label>Service Required</Label>
            <Select>
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((s) => (
                  <SelectItem key={s._id} value={s._id}>
                    {s.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Label>Property Address</Label>
            <Input
              placeholder="Enter your address"
              className="mt-1"
            />
          </div>
          <div>
            <Label>Property Size</Label>
            <Select>
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="s">Small</SelectItem>
                <SelectItem value="m">Medium</SelectItem>
                <SelectItem value="l">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Preferred Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'mt-1 w-full justify-start text-left font-normal',
                    !date && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date
                    ? date.toLocaleDateString('en-NZ', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) =>
                    d < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="md:col-span-2">
            <Label>Additional Details</Label>
            <Textarea
              placeholder="Tell us about your project"
              className="mt-1 h-[160px]"
            />
          </div>
          <div className="md:col-span-2">
            <Label>Upload Documents (Optional)</Label>
            <Input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              multiple
              className="mt-1 text-muted-foreground "
            />
          </div>
          <div className="md:col-span-2">
            <Button className="bg-primary hover:bg-primary/90 text-white w-full md:w-auto">
              Send Request
            </Button>
          </div>
        </form>
      </div>
      <div className="space-y-6">
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-primary-dark">
            Why Get a Quote?
          </h3>
          <ul className="mt-4 space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-primary" /> {b}
              </li>
            ))}
          </ul>
        </div>
        {/* <div className="bg-primary/10 rounded-xl p-6 text-center">
          <Phone className="h-6 w-6 text-primary mx-auto" />
          <div className="font-bold text-primary-dark mt-2">Or Call Us Directly</div>
          <a href="tel:0223234429" className="text-primary text-lg font-bold block mt-1">022 323 4429</a>
          <p className="text-xs text-muted-foreground mt-2">We're happy to help!</p>
        </div> */}
        <div className="relative overflow-hidden rounded-2xl">
          {/* IMAGE */}
          <Image
            src={workerImage}
            alt="Lawn Worker"
            className="h-[540px] w-full object-cover"
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/25" />

          {/* TEXT CONTENT */}
          <div className="absolute inset-0 flex flex-col justify-start p-6 text-white">
            <div className="mt-3 text-xl font-bold">
              Or Call Us Directly
            </div>

            <a
              href="tel:0223234429"
              className="mt-2 text-2xl font-black tracking-wide flex items-center gap-2"
            >
              <Phone className="h-6 w-6 text-white pt-1" />
              022 323 4429
            </a>

            <p className="mt-2 text-sm text-white/80">
              We&apos;re happy to help!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
