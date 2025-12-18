import { siteConfig } from '@/lib/content';
import { Building, MapPin } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
            About {siteConfig.companyName}
          </h2>
          <p className="text-lg text-muted-foreground">
            {siteConfig.about.text}
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-semibold text-primary">
            Our Headquarters
          </h3>
          <div className="flex items-start space-x-4">
            <MapPin className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
            <p className="text-muted-foreground">
              {siteConfig.companyAddress}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
