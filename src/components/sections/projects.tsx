
'use client';

import { siteConfig } from '@/lib/content';
import { ProjectCard } from '@/components/project-card';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

export function ProjectsSection() {
  const db = useFirestore();

  // Fetch all projects from Firestore
  const projectsQuery = useMemoFirebase(() => {
    return query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
  }, [db]);
  const { data: dbProjects, loading } = useCollection(projectsQuery);

  // Fallback to static data if Firestore is empty or loading
  const displayProjects = dbProjects && dbProjects.length > 0 ? dbProjects : siteConfig.projects;

  return (
    <section id="projects" className="py-16 md:py-24 bg-background">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
          Featured Properties
        </h2>
        <p className="mt-2 max-w-2xl mx-auto text-lg text-muted-foreground">
          A glimpse into our available properties.
        </p>
      </div>

      {loading && dbProjects === null ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project: any) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
