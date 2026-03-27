'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/content';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 25 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    return () => {
      clearInterval(interval);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="hero" className="relative overflow-hidden rounded-2xl bg-muted">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {siteConfig.projects.map((project) => (
            <div key={project.id} className="relative min-w-0 flex-[0_0_100%] h-[600px] md:h-[700px]">
              <Image
                src={project.thumbnail.imageUrl}
                alt={project.title}
                fill
                className="object-cover"
                priority
                data-ai-hint={project.thumbnail.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl drop-shadow-lg">
                  {project.title}
                </h1>
                <p className="mb-8 text-xl font-medium text-white/90 md:text-2xl">
                  {project.price} • {project.location}
                </p>
                <Button size="lg" variant="accent" asChild className="rounded-full px-8 py-6 text-lg font-bold transition-transform hover:scale-105">
                  <Link href={`/projects/${project.id}`}>View Property Details</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 space-x-2">
        {siteConfig.projects.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-1.5 w-12 rounded-full transition-all duration-300",
              selectedIndex === index ? "bg-accent" : "bg-white/40"
            )}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </section>
  );
}
