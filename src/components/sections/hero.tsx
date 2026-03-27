
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

  // Fetch all recent projects and filter in-memory to avoid composite index requirements
  const heroQuery = useMemoFirebase(() => {
    return query(
      collection(db, 'projects'), 
      orderBy('createdAt', 'desc'), 
      limit(20)
    );
  }, [db]);
  
  const { data: dbProjects, loading } = useCollection(heroQuery);

  // Filter for featured projects from the database
  const featuredDbProjects = dbProjects?.filter((p: any) => p.isFeatured === true) || [];

  // Fallback logic: Use DB featured projects if they exist, otherwise use static data
  const displayProjects = featuredDbProjects.length > 0 ? featuredDbProjects : siteConfig.projects;

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);

    return () => {
      clearInterval(interval);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (loading && !dbProjects) {
    return (
      <div className="h-[500px] md:h-[800px] w-full bg-muted animate-pulse rounded-[2rem]" />
    );
  }

  return (
    <section id="hero" className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-muted shadow-2xl">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {displayProjects.map((project: any, index: number) => (
            <div key={project.id || `static-${index}`} className="relative min-w-0 flex-[0_0_100%] h-[500px] md:h-[800px]">
              <Image
                src={project.thumbnail?.imageUrl || 'https://placehold.co/600x400'}
                alt={project.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 md:pb-32 px-4 text-center text-white">
                <div className="max-w-4xl space-y-3 md:space-y-6">
                  <span className="inline-block bg-accent px-3 py-0.5 rounded-full text-[10px] md:text-sm font-black uppercase tracking-widest shadow-lg">
                    {project.category}
                  </span>
                  <h1 className="text-2xl font-black tracking-tighter md:text-6xl lg:text-7xl drop-shadow-2xl leading-tight md:leading-none px-2">
                    {project.title}
                  </h1>
                  <p className="text-sm md:text-2xl font-bold text-white/90 drop-shadow-md tracking-tight">
                    {project.price} • {project.location}
                  </p>
                  <div className="pt-2 md:pt-4">
                    <Button size="lg" variant="accent" asChild className="rounded-full px-6 py-4 md:px-10 md:py-6 text-xs md:text-lg font-black transition-all hover:scale-105 shadow-2xl hover:shadow-accent/40">
                      <Link href={project.id ? `/projects/${project.id}` : '#'}>View Property Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-4 md:bottom-10 left-1/2 flex -translate-x-1/2 space-x-2 md:space-x-3 z-30">
        {displayProjects.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-1 md:h-1.5 rounded-full transition-all duration-500",
              selectedIndex === index ? "w-8 md:w-16 bg-accent shadow-[0_0_10px_rgba(255,100,0,0.8)]" : "w-1.5 md:w-4 bg-white/30"
            )}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </section>
  );
}
