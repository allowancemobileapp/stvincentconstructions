import { siteConfig } from '@/lib/content';
import { Construction } from 'lucide-react';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Construction className="h-6 w-6" />
          <p className="text-center text-sm leading-loose md:text-left">
            © {currentYear} {siteConfig.companyName}. All rights reserved.
          </p>
        </div>
        <p className="text-center text-sm text-primary-foreground/70 md:text-right">
          {siteConfig.companyAddress}
        </p>
      </div>
    </footer>
  );
}
