'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import {
  Card,
  CardContent,
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
            src={project.thumbnail.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            data-ai-hint={project.thumbnail.imageHint}
          />
          <div className="absolute top-4 left-4">
            <Badge variant="accent" className="px-3 py-1 font-bold shadow-lg">
              {project.category}
            </Badge>
          </div>
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <CardHeader className="p-6">
          <div className="flex items-center text-accent font-bold mb-1">
            <span className="text-lg">{project.price}</span>
          </div>
          <CardTitle className="text-xl font-bold tracking-tight mb-2 group-hover:text-accent transition-colors">
            {project.title}
          </CardTitle>
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="truncate">{project.location}</span>
          </div>
          <CardDescription className="line-clamp-2">
            {project.description}
          </CardDescription>
        </CardHeader>
        
        <div className="mt-auto p-6 pt-0 flex justify-end">
          <span className="inline-flex items-center text-sm font-bold text-accent group-hover:underline">
            Details <ArrowRight className="ml-1 h-4 w-4" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
