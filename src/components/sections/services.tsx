import { siteConfig } from '@/lib/content';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Wrench, Home, Briefcase } from 'lucide-react';

const serviceIcons = {
  'General Contracting & New Builds': <Briefcase className="h-8 w-8 text-accent" />,
  'Renovations & Refurbishments': <Wrench className="h-8 w-8 text-accent" />,
  'Project Management & Consultation': <Home className="h-8 w-8 text-accent" />,
};

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-secondary/50">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
          Our Services
        </h2>
        <p className="mt-2 max-w-2xl mx-auto text-lg text-muted-foreground">
          Comprehensive solutions for all your construction needs.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {siteConfig.services.map((service) => (
          <Card key={service.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex justify-center mb-4">
                {serviceIcons[service.title as keyof typeof serviceIcons]}
              </div>
              <CardTitle className="text-xl font-semibold text-primary">
                {service.title}
              </CardTitle>
              <CardDescription className="pt-2 text-base text-muted-foreground">
                {service.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
