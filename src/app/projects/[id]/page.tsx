
'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ChevronLeft, MapPin, CheckCircle2, Phone, MessageSquare, Loader2, AlertCircle } from 'lucide-react';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const db = useFirestore();

  const projectRef = useMemoFirebase(() => doc(db, 'projects', id), [db, id]);
  const { data: dbProject, loading } = useDoc(projectRef);

  const staticProject = siteConfig.projects.find((p) => p.id === id);
  const project: any = dbProject || staticProject;

  if (loading && !dbProject) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-accent" />
      </div>
    );
  }

  if (!project) {
    notFound();
  }

  const isSold = project.category === 'Sold';

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hello, I'm interested in the ${project.title} located at ${project.location}.`);
    window.open(`https://wa.me/2348033256854?text=${message}`, '_blank');
  };

  const hasImages = project.images && project.images.length > 0;

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8">
      <Link href="/#projects" className="mb-8 inline-flex items-center text-sm font-bold text-muted-foreground hover:text-accent transition-colors">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Properties
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <Carousel className="w-full relative">
            <CarouselContent>
              {hasImages ? (
                project.images.map((image: any, index: number) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-xl bg-muted">
                      <Image
                        src={image.imageUrl}
                        alt={image.description || project.title}
                        fill
                        className={cn("object-cover", isSold && "grayscale-[0.3]")}
                        sizes="(max-width: 768px) 100vw, 66vw"
                      />
                    </div>
                  </CarouselItem>
                ))
              ) : project.thumbnail ? (
                <CarouselItem>
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-xl bg-muted">
                    <Image
                      src={project.thumbnail.imageUrl}
                      alt={project.title}
                      fill
                      className={cn("object-cover", isSold && "grayscale-[0.3]")}
                      sizes="(max-width: 768px) 100vw, 66vw"
                    />
                  </div>
                </CarouselItem>
              ) : null}
            </CarouselContent>
            {hasImages && project.images.length > 1 && (
              <>
                <CarouselPrevious className="left-4 bg-white/90 text-primary border-none" />
                <CarouselNext className="right-4 bg-white/90 text-primary border-none" />
              </>
            )}
            {isSold && (
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <div className="bg-destructive/90 text-white px-12 py-4 font-black text-5xl md:text-7xl -rotate-12 shadow-2xl tracking-[0.2em] animate-in zoom-in-50 duration-500">
                  SOLD
                </div>
              </div>
            )}
          </Carousel>

          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex-1 space-y-2">
                <Badge variant={isSold ? "destructive" : "accent"} className="px-4 py-1 text-sm font-black uppercase tracking-widest shadow-md">
                  {project.category}
                </Badge>
                <h1 className="text-3xl font-black tracking-tight md:text-6xl text-primary leading-tight">{project.title}</h1>
                <div className="flex items-center text-muted-foreground text-lg font-medium">
                  <MapPin className="h-5 w-5 mr-2 text-accent" />
                  <span>{project.location}</span>
                </div>
              </div>
              <div className="bg-accent/10 px-8 py-6 rounded-3xl border border-accent/20 text-center md:text-right">
                <p className="text-xs text-accent font-black uppercase tracking-widest mb-1">Asking Price</p>
                <p className="text-4xl md:text-5xl font-black text-accent">{project.price}</p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-xl leading-relaxed text-muted-foreground whitespace-pre-wrap font-medium">
                {project.description}
              </p>
            </div>

            {project.features && project.features.length > 0 && (
              <div className="pt-10 border-t">
                <h3 className="text-2xl font-black mb-8 flex items-center gap-2">
                  Key Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center space-x-4 p-5 bg-card/40 rounded-2xl border shadow-sm">
                      <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0" />
                      <span className="font-bold text-lg">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-8 sticky top-24 shadow-2xl border-none bg-card rounded-[2rem]">
            <h3 className="text-2xl font-black mb-8 leading-tight">
              {isSold ? "Interested in similar properties?" : "Secure this property today!"}
            </h3>
            
            {isSold && (
              <div className="mb-8 p-4 bg-destructive/5 rounded-2xl border border-destructive/20 flex gap-3 items-start">
                <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm font-bold text-destructive">This property has been sold. Contact us to find something similar in this area.</p>
              </div>
            )}

            <div className="space-y-4">
              <Button className="w-full py-8 text-xl font-black rounded-2xl shadow-xl transition-all hover:scale-[1.02]" size="lg" onClick={handleWhatsApp}>
                <MessageSquare className="mr-3 h-6 w-6" />
                Message via WhatsApp
              </Button>
              <Button variant="outline" className="w-full py-8 text-xl font-black rounded-2xl border-2 transition-all hover:scale-[1.02]" size="lg" asChild>
                <a href={`tel:${siteConfig.companyPhone}`}>
                  <Phone className="mr-3 h-6 w-6" />
                  Call Agent Now
                </a>
              </Button>
            </div>
            
            <div className="mt-10 pt-8 border-t text-sm text-muted-foreground font-medium">
              <p className="font-black text-primary mb-3 uppercase tracking-widest text-xs">Our Lekki Office</p>
              <p className="text-base leading-relaxed">{siteConfig.companyAddress}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
