'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, deleteDoc, doc, query, orderBy, setDoc } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Loader2, Database, Pencil, LogOut, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/content';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboard() {
  const router = useRouter();
  const db = useFirestore();
  const { toast } = useToast();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (!auth) {
      router.push('/admin');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  const projectsQuery = useMemoFirebase(() => {
    return query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
  }, [db]);
  
  const { data: projects, loading } = useCollection(projectsQuery);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    router.push('/admin');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const docRef = doc(db, 'projects', id);
      deleteDoc(docRef)
        .catch(async (err) => {
          const permissionError = new FirestorePermissionError({
            path: docRef.path,
            operation: 'delete',
          } satisfies SecurityRuleContext);
          errorEmitter.emit('permission-error', permissionError);
        });
    }
  };

  const handleSeedData = async () => {
    setSeeding(true);
    try {
      for (const p of siteConfig.projects) {
        const docRef = doc(db, 'projects', p.id);
        const data = {
          ...p,
          isFeatured: true, // Default seeded to featured
          createdAt: new Date().toISOString(),
        };
        setDoc(docRef, data, { merge: true })
          .catch(async (err) => {
            const permissionError = new FirestorePermissionError({
              path: docRef.path,
              operation: 'write',
              requestResourceData: data,
            } satisfies SecurityRuleContext);
            errorEmitter.emit('permission-error', permissionError);
          });
      }
      toast({
        title: "Success",
        description: "Initial projects have been imported to the database.",
      });
    } catch (error) {
      console.error("Seeding process failed", error);
    } finally {
      setSeeding(false);
    }
  };

  if (!isAuthorized) return null;

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Project Management</h1>
          <p className="text-muted-foreground mt-1">Control your property listings and visibility.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" onClick={handleLogout} className="border-destructive/20 text-destructive hover:bg-destructive/5">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
          {projects?.length === 0 && (
            <Button variant="outline" size="sm" onClick={handleSeedData} disabled={seeding}>
              {seeding ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Database className="mr-2 h-4 w-4" />}
              Seed Initial Data
            </Button>
          )}
          <Button asChild size="sm" className="font-bold">
            <Link href="/admin/dashboard/new">
              <Plus className="mr-2 h-4 w-4" /> Add New Project
            </Link>
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="h-12 w-12 animate-spin text-accent mb-4" />
          <p className="text-muted-foreground font-medium animate-pulse">Retrieving your properties...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map((project: any) => (
            <Card key={project.id} className="group overflow-hidden flex flex-col shadow-lg border hover:border-accent/40 transition-all duration-300">
              <div className="relative h-56 w-full bg-muted">
                <Image
                  src={project.thumbnail?.imageUrl || 'https://placehold.co/600x400'}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Badge variant={project.category === 'Sold' ? 'destructive' : 'accent'} className="shadow-lg">
                    {project.category}
                  </Badge>
                  {project.isFeatured && (
                    <Badge variant="secondary" className="bg-yellow-500 text-white border-none shadow-lg flex items-center gap-1">
                      <Star className="h-3 w-3 fill-white" /> Featured
                    </Badge>
                  )}
                </div>
              </div>
              <CardHeader className="flex-1">
                <CardTitle className="text-xl line-clamp-1 group-hover:text-accent transition-colors">{project.title}</CardTitle>
                <p className="text-lg text-accent font-black">{project.price}</p>
                <p className="text-sm text-muted-foreground truncate font-medium">{project.location}</p>
              </CardHeader>
              <CardContent className="pt-0 border-t bg-muted/30 p-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
                    Actions
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild className="h-9 w-9 p-0 rounded-full">
                      <Link href={`/admin/dashboard/edit/${project.id}`} title="Edit">
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(project.id)} className="h-9 w-9 p-0 rounded-full" title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {projects?.length === 0 && (
            <div className="col-span-full text-center py-24 bg-muted/20 rounded-3xl border-2 border-dashed flex flex-col items-center">
              <Database className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
              <p className="text-muted-foreground text-xl font-medium mb-6">No live projects found.</p>
              <Button variant="outline" onClick={handleSeedData} disabled={seeding} className="rounded-full px-8">
                Click here to import initial properties
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
