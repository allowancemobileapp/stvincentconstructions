'use client';

import Image from 'next/image';
import type { Project } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { GalleryHorizontal } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Dialog>
      <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-lg">
        <div className="relative h-48 w-full">
          <Image
            src={project.thumbnail.imageUrl}
            alt={project.thumbnail.description}
            fill
            className="object-cover"
            data-ai-hint={project.thumbnail.imageHint}
          />
        </div>
        <CardHeader>
          <CardTitle className="text-xl">{project.title}</CardTitle>
          <Badge variant="secondary" className="w-fit">{project.category}</Badge>
          <CardDescription className="pt-2">{project.description}</CardDescription>
        </CardHeader>
        <CardFooter className="mt-auto">
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <GalleryHorizontal className="mr-2 h-4 w-4" />
              View Gallery
            </Button>
          </DialogTrigger>
        </CardFooter>
      </Card>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
        </DialogHeader>
        <Carousel className="w-full">
          <CarouselContent>
            {project.images.map((image) => (
              <CarouselItem key={image.id}>
                <div className="relative aspect-video w-full">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="rounded-md object-cover"
                    data-ai-hint={image.imageHint}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
