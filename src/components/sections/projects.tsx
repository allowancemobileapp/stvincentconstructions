import { siteConfig } from '@/lib/content';
import { ProjectCard } from '@/components/project-card';

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-24 bg-background">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
          Featured Projects
        </h2>
        <p className="mt-2 max-w-2xl mx-auto text-lg text-muted-foreground">
          A glimpse into our commitment to quality and excellence.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {siteConfig.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
