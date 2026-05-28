'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Logo } from './Logo';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About Us' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/areas', label: 'Service Areas' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3 lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="flex items-center justify-center h-9 w-9 rounded-md hover:bg-muted transition-colors">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[260px] pt-10">
              <nav className="flex flex-col gap-2">
                {nav.map((n) => {
                  const isActive = pathname === n.href;
                  return (
                    <Link
                      key={n.href}
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'text-primary bg-muted'
                          : 'text-foreground/80 hover:text-primary hover:bg-muted'
                      }`}
                    >
                      {n.label}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <Logo />
        <nav className="hidden lg:flex items-center gap-7">
          {nav.map((n) => {
            const isActive = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`group relative text-sm font-medium pb-1 transition-colors duration-300 ${
                  isActive
                    ? 'text-primary'
                    : 'text-foreground/80 hover:text-primary'
                }`}
              >
                {n.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 w-full bg-primary rounded-full transition-transform duration-300 ease-out ${
                    isActive
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            );
          })}
        </nav>
        <a href="tel:0223234429">
          <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
            <Phone className="h-4 w-4" />
            <span className="hidden sm:block">022 323 4429</span>
          </Button>
        </a>
      </div>
    </header>
  );
}
