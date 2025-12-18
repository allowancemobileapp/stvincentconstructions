'use client';

import Image from 'next/image';
import type { Project } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-lg">
      <Carousel className="w-full">
        <CarouselContent>
          {project.images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative h-48 w-full">
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
        <CarouselPrevious className="absolute left-4" />
        <CarouselNext className="absolute right-4" />
      </Carousel>

      <CardHeader>
        <CardTitle className="text-xl">{project.title}</CardTitle>
        <Badge variant="secondary" className="w-fit">
          {project.category}
        </Badge>
        <CardDescription className="pt-2">
          {project.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
