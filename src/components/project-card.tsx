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

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <Card className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-none bg-card/50 backdrop-blur-sm shadow-lg">
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={project.thumbnail?.imageUrl || 'https://placehold.co/600x400'}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            data-ai-hint={project.thumbnail?.imageHint || 'property'}
          />
          <div className="absolute top-4 left-4">
            <Badge variant="accent" className="px-3 py-1 font-bold shadow-lg">
              {project.category}
            </Badge>
          </div>
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <CardHeader className="p-6 pb-2">
          <div className="flex items-center text-accent font-bold mb-1">
            <span className="text-lg">{project.price}</span>
          </div>
          <CardTitle className="text-xl font-bold tracking-tight mb-2 group-hover:text-accent transition-colors">
            {project.title}
          </CardTitle>
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="truncate">{project.location}</span>
          </div>
          <CardDescription className="line-clamp-2 mb-4 text-sm leading-relaxed">
            {project.description}
          </CardDescription>
          
          {project.features && project.features.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {project.features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-[10px] uppercase tracking-wider px-2 py-0 bg-secondary/50 font-semibold">
                  {feature}
                </Badge>
              ))}
              {project.features.length > 3 && (
                <span className="text-[10px] text-muted-foreground self-center italic">
                  +{project.features.length - 3} more
                </span>
              )}
            </div>
          )}
        </CardHeader>
        
        <div className="mt-auto p-6 pt-2 flex justify-end">
          <span className="inline-flex items-center text-sm font-bold text-accent group-hover:underline">
            View Details <ArrowRight className="ml-1 h-4 w-4" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
