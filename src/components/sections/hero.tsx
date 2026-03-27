'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/content';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, where, limit } from 'firebase/firestore';

export function HeroSection() {
  const db = useFirestore();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 25 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Fetch only FEATURED projects from Firestore
  const heroQuery = useMemoFirebase(() => {
    return query(
      collection(db, 'projects'), 
      where('isFeatured', '==', true),
      orderBy('createdAt', 'desc'), 
      limit(5)
    );
  }, [db]);
  const { data: dbProjects, loading } = useCollection(heroQuery);

  // Fallback to static data if no featured projects exist
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
    }, 4000);

    return () => {
      clearInterval(interval);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="hero" className="relative overflow-hidden rounded-[2rem] bg-muted shadow-2xl">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {displayProjects.map((project: any) => (
            <div key={project.id} className="relative min-w-0 flex-[0_0_100%] h-[600px] md:h-[800px]">
              <Image
                src={project.thumbnail?.imageUrl || 'https://placehold.co/600x400'}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 md:pb-32 px-4 text-center text-white">
                <div className="max-w-4xl space-y-4 md:space-y-6">
                  <span className="inline-block bg-accent px-3 py-0.5 md:px-4 md:py-1 rounded-full text-[10px] md:text-sm font-black uppercase tracking-widest shadow-lg">
                    {project.category}
                  </span>
                  <h1 className="text-3xl font-black tracking-tighter md:text-7xl lg:text-8xl drop-shadow-2xl leading-tight md:leading-none">
                    {project.title}
                  </h1>
                  <p className="text-base md:text-3xl font-bold text-white/90 drop-shadow-md tracking-tight">
                    {project.price} • {project.location}
                  </p>
                  <div className="pt-2 md:pt-4">
                    <Button size="lg" variant="accent" asChild className="rounded-full px-8 py-6 md:px-12 md:py-8 text-lg md:text-xl font-black transition-all hover:scale-105 shadow-2xl hover:shadow-accent/40">
                      <Link href={`/projects/${project.id}`}>View Property Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-6 md:bottom-10 left-1/2 flex -translate-x-1/2 space-x-2 md:space-x-3 z-30">
        {displayProjects.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-1 md:h-1.5 rounded-full transition-all duration-500",
              selectedIndex === index ? "w-10 md:w-16 bg-accent shadow-[0_0_15px_rgba(var(--accent),0.8)]" : "w-2 md:w-4 bg-white/30"
            )}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </section>
  );
}
