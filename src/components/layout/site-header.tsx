'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Construction, Menu } from 'lucide-react';
import { siteConfig } from '@/lib/content';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from '@/components/ui/sheet';

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-transparent transition-colors duration-300',
        scrolled
          ? 'border-border bg-background/80 backdrop-blur-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Construction className="h-6 w-6 text-accent" />
          <span className="font-bold sm:inline-block">
            {siteConfig.companyName}
          </span>
        </Link>

        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground/80 transition-colors hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button asChild className="hidden md:inline-flex">
            <Link href="#contact">Request a Quote</Link>
          </Button>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="flex items-center space-x-2"
                  onClick={closeMobileMenu}
                >
                  <Construction className="h-6 w-6 text-accent" />
                  <span className="font-bold">{siteConfig.companyName}</span>
                </Link>
                <nav className="flex flex-col space-y-2">
                  {siteConfig.nav.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className="rounded-md p-2 text-foreground/80 transition-colors hover:bg-accent/10 hover:text-foreground"
                      >
                        {item.title}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <SheetClose asChild>
                  <Button asChild>
                    <Link href="#contact">Request a Quote</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
