import { HeroSection } from '@/components/sections/hero';
import { AboutSection } from '@/components/sections/about';
import { ServicesSection } from '@/components/sections/services';
import { ProjectsSection } from '@/components/sections/projects';
import { FaqSection } from '@/components/sections/faq';
import { ContactSection } from '@/components/sections/contact';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <FaqSection />
        <ContactSection />
      </div>
    </div>
  );
}
