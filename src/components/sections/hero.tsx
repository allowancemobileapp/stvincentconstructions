
'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/content';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';

export function HeroSection() {
  const db = useFirestore();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 25 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Fetch projects from Firestore
  const heroQuery = useMemoFirebase(() => {
    return query(collection(db, 'projects'), orderBy('createdAt', 'desc'), limit(5));
  }, [db]);
  const { data: dbProjects, loading } = useCollection(heroQuery);

  // Fallback to static data if Firestore is empty or loading
  const displayProjects = dbProjects && dbProjects.length > 0 ? dbProjects : siteConfig.projects;

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
          {displayProjects.map((project: any) => (
            <div key={project.id} className="relative min-w-0 flex-[0_0_100%] h-[600px] md:h-[700px]">
              <Image
                src={project.thumbnail?.imageUrl || 'https://placehold.co/600x400'}
                alt={project.title}
                fill
                className="object-cover"
                priority
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
        {displayProjects.map((_, index) => (
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
