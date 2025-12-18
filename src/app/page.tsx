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
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <FaqSection />
      <ContactSection />
    </div>
  );
}
