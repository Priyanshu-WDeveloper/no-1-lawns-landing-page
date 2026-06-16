'use client';

import * as React from 'react';
import { CalendarIcon, Check, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
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
import { useSubmitQuoteMutation } from '@/lib/redux/api';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://api.no1lawns.com/api/v1/websites';

const benefits = [
  'Free and obligation free',
  'Fast response',
  'Custom solutions',
  'Best prices guaranteed',
];

interface QuoteFormData {
  name: string;
  phone: string;
  email: string;
  serviceRequired: string;
  propertyAddress: string;
  propertySize: string;
  preferredDate: string;
  additionalDetails: string;
  documents?: FileList;
}

function QuoteForm() {
  const [services, setServices] = React.useState<NewLawnService[]>([]);
  const [submitQuote, { isLoading }] = useSubmitQuoteMutation();
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<QuoteFormData>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      serviceRequired: '',
      propertyAddress: '',
      propertySize: '',
      preferredDate: '',
      additionalDetails: '',
    },
  });

  React.useEffect(() => {
    fetch(`${API_URL}/services`)
      .then((res) => res.json() as Promise<{ services: NewLawnService[] }>)
      .then((data) => setServices(data.services))
      .catch(() => {});
  }, []);

  React.useEffect(() => {
    register('serviceRequired', { required: 'Service is required' });
    register('propertySize', { required: 'Property size is required' });
    register('preferredDate', { required: 'Preferred date is required' });
  }, [register]);

  React.useEffect(() => {
    if (serviceParam && services.length > 0) {
      const match = services.find(
        (s) => s.title.toLowerCase() === serviceParam.toLowerCase()
      );
      if (match) {
        setValue('serviceRequired', match.title);
      } else {
        setValue('serviceRequired', serviceParam);
      }
    }
  }, [serviceParam, services, setValue]);

  const onSubmit = async (data: QuoteFormData) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('phone', data.phone);
      formData.append('email', data.email);
      formData.append('serviceRequired', data.serviceRequired);
      formData.append('propertyAddress', data.propertyAddress);
      formData.append('propertySize', data.propertySize);
      formData.append('preferredDate', data.preferredDate);
      formData.append('additionalDetails', data.additionalDetails);

      if (data.documents && data.documents.length > 0) {
        for (let i = 0; i < data.documents.length; i++) {
          formData.append('documents', data.documents[i]);
        }
      }

      await submitQuote(formData).unwrap();
      toast.success("Quote request sent successfully! We'll contact you shortly.");
      reset();
    } catch {
      toast.error('Failed to submit quote request. Please try again.');
    }
  };

  const selectedDateStr = watch('preferredDate');
  const selectedDate = selectedDateStr ? new Date(selectedDateStr) : undefined;

  return (
    <section className="container mx-auto px-4 py-14 grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white border rounded-xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-primary-dark">
          Send Quote
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Fill out the form and we'll get back to you as soon as
          possible.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid md:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Your name"
              className="mt-1"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="022 123 4567"
              className="mt-1"
              {...register('phone', { required: 'Phone is required' })}
            />
            {errors.phone && (
              <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="mt-1"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="serviceRequired">Service Required</Label>
            <Select
              value={watch('serviceRequired')}
              onValueChange={(val) => setValue('serviceRequired', val, { shouldValidate: true })}
            >
              <SelectTrigger id="serviceRequired" className="mt-1 w-full">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((s) => (
                  <SelectItem key={s._id} value={s.title}>
                    {s.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.serviceRequired && (
              <p className="text-sm text-red-500 mt-1">{errors.serviceRequired.message}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="propertyAddress">Property Address</Label>
            <Input
              id="propertyAddress"
              placeholder="Enter your address"
              className="mt-1"
              {...register('propertyAddress', { required: 'Property address is required' })}
            />
            {errors.propertyAddress && (
              <p className="text-sm text-red-500 mt-1">{errors.propertyAddress.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="propertySize">Property Size</Label>
            <Select
              value={watch('propertySize')}
              onValueChange={(val) => setValue('propertySize', val, { shouldValidate: true })}
            >
              <SelectTrigger id="propertySize" className="mt-1 w-full">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Small">Small</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Large">Large</SelectItem>
              </SelectContent>
            </Select>
            {errors.propertySize && (
              <p className="text-sm text-red-500 mt-1">{errors.propertySize.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="preferredDate">Preferred Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="preferredDate"
                  variant="outline"
                  type="button"
                  className={cn(
                    'mt-1 w-full justify-start text-left font-normal',
                    !selectedDateStr && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate
                    ? selectedDate.toLocaleDateString('en-NZ', {
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
                  selected={selectedDate}
                  onSelect={(d) => {
                    if (d) {
                      const year = d.getFullYear();
                      const month = String(d.getMonth() + 1).padStart(2, '0');
                      const day = String(d.getDate()).padStart(2, '0');
                      setValue('preferredDate', `${year}-${month}-${day}`, { shouldValidate: true });
                    }
                  }}
                  disabled={(d) =>
                    d < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                />
              </PopoverContent>
            </Popover>
            {errors.preferredDate && (
              <p className="text-sm text-red-500 mt-1">{errors.preferredDate.message}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="additionalDetails">Additional Details</Label>
            <Textarea
              id="additionalDetails"
              placeholder="Tell us about your project"
              className="mt-1 h-[160px]"
              {...register('additionalDetails', { required: 'Additional details are required' })}
            />
            {errors.additionalDetails && (
              <p className="text-sm text-red-500 mt-1">{errors.additionalDetails.message}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="documents">Upload Documents (Optional)</Label>
            <Input
              id="documents"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              multiple
              className="mt-1 text-muted-foreground"
              {...register('documents')}
            />
          </div>
          <div className="md:col-span-2">
            <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 text-white w-full md:w-auto">
              {isLoading ? 'Sending...' : 'Send Request'}
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
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src={workerImage}
            alt="Lawn Worker"
            className="h-[540px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/25" />
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

export default function QuotePage() {
  return (
    <React.Suspense fallback={<div className="container mx-auto px-4 py-14 text-center">Loading quote form...</div>}>
      <QuoteForm />
    </React.Suspense>
  );
}
