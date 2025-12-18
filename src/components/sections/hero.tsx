import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/content';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function HeroSection() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

  return (
    <section
      id="hero"
      className="relative flex h-[calc(100vh-4rem)] w-full items-center justify-center"
    >
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-primary/70" />
      <div className="relative z-10 mx-auto max-w-4xl text-center text-primary-foreground">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
          {siteConfig.hero.tagline}
        </h1>
        <p className="mb-8 text-lg text-primary-foreground/80 md:text-xl">
          Excellence and Integrity in Every Build.
        </p>
        <Button size="lg" variant="accent" asChild>
          <Link href="#contact">Request a Quote</Link>
        </Button>
      </div>
    </section>
  );
}
