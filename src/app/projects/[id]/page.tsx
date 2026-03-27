'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ChevronLeft, MapPin, CheckCircle2, Phone, MessageSquare } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = siteConfig.projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hello, I'm interested in the ${project.title} located at ${project.location}.`);
    window.open(`https://wa.me/2348033256854?text=${message}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8">
      <Link href="/#projects" className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Properties
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <Carousel className="w-full">
            <CarouselContent>
              {project.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-xl">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>

          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <Badge variant="accent" className="mb-2 px-3 py-1 text-sm font-semibold">
                  {project.category}
                </Badge>
                <h1 className="text-3xl font-bold tracking-tight md:text-5xl">{project.title}</h1>
                <div className="flex items-center mt-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{project.location}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground font-medium">Price</p>
                <p className="text-3xl md:text-4xl font-black text-accent">{project.price}</p>
              </div>
            </div>

            <div className="prose prose-slate max-w-none dark:prose-invert">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            </div>

            {project.features && (
              <div className="pt-8 border-t">
                <h3 className="text-xl font-bold mb-6">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-secondary/30 rounded-xl border">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-6 sticky top-24 shadow-2xl border-2">
            <h3 className="text-xl font-bold mb-6">Interested in this Property?</h3>
            <div className="space-y-4">
              <Button className="w-full py-6 text-lg font-bold rounded-xl" size="lg" onClick={handleWhatsApp}>
                <MessageSquare className="mr-2 h-5 w-5" />
                Contact via WhatsApp
              </Button>
              <Button variant="outline" className="w-full py-6 text-lg font-bold rounded-xl" size="lg" asChild>
                <a href={`tel:${siteConfig.companyPhone}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </a>
              </Button>
            </div>
            <div className="mt-8 pt-6 border-t text-sm text-muted-foreground">
              <p className="font-semibold text-foreground mb-2">Our Office</p>
              <p>{siteConfig.companyAddress}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
