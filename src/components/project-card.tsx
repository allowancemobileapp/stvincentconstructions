
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isSold = project.category === 'Sold';

  return (
    <Link href={`/projects/${project.id}`}>
      <Card className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-none bg-card/50 backdrop-blur-sm shadow-lg relative">
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={project.thumbnail?.imageUrl || 'https://placehold.co/600x400'}
            alt={`${project.title} for sale in ${project.location} - St. Vincent Construction`}
            fill
            className={cn(
              "object-cover transition-transform duration-500 group-hover:scale-110",
              isSold && "grayscale-[0.5] opacity-80"
            )}
            data-ai-hint={project.thumbnail?.imageHint || 'property'}
          />
          
          <div className="absolute top-4 left-4 z-10">
            <Badge variant={isSold ? "destructive" : "accent"} className="px-4 py-1.5 font-black shadow-xl uppercase tracking-widest text-sm">
              {project.category}
            </Badge>
          </div>

          {isSold && (
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <div className="bg-destructive/90 text-white px-8 py-3 font-black text-4xl -rotate-12 shadow-2xl tracking-[0.2em]">
                SOLD
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <CardHeader className="p-6 pb-2">
          <div className="flex items-center text-accent font-black mb-1">
            <span className="text-xl">{project.price}</span>
          </div>
          <CardTitle className="text-xl font-bold tracking-tight mb-2 group-hover:text-accent transition-colors">
            {project.title}
          </CardTitle>
          <div className="flex items-center text-sm text-muted-foreground mb-3 font-medium">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0 text-accent" />
            <span className="truncate">{project.location}</span>
          </div>
          <CardDescription className="line-clamp-2 mb-4 text-sm leading-relaxed text-muted-foreground/80">
            {project.description}
          </CardDescription>
          
          {project.features && project.features.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {project.features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 bg-secondary/80 font-bold border-transparent">
                  {feature}
                </Badge>
              ))}
            </div>
          )}
        </CardHeader>
        
        <div className="mt-auto p-6 pt-2 flex justify-end">
          <span className="inline-flex items-center text-sm font-black text-accent group-hover:translate-x-1 transition-transform">
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
