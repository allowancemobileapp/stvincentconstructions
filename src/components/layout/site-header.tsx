
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
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme-toggle';

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

  const navItems = [...siteConfig.nav, { title: 'Admin', href: '/admin' }];

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-transparent transition-colors duration-300',
        scrolled
          ? 'border-border bg-background/80 backdrop-blur-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-16 items-center px-4 md:px-8 lg:px-16">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Construction className="h-6 w-6 text-accent" />
          <span className="font-bold sm:inline-block">
            {siteConfig.companyName}
          </span>
        </Link>

        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground/80 transition-colors hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
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
            <SheetContent side="bottom" className="rounded-t-3xl h-[70vh] p-0">
              <SheetHeader className="px-6 pt-6">
                <SheetTitle className="text-left text-xl font-bold flex items-center gap-2">
                  <Construction className="h-6 w-6 text-accent" />
                  Menu
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col h-full overflow-y-auto px-6 pt-6 pb-20">
                <nav className="flex flex-col space-y-6">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className="text-xl font-semibold text-foreground/80 transition-colors hover:text-accent border-b border-border/50 pb-2"
                      >
                        {item.title}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-8">
                  <SheetClose asChild>
                    <Button asChild size="lg" className="w-full rounded-xl">
                      <Link href="#contact">Request a Quote</Link>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
