'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, deleteDoc, doc, query, orderBy, setDoc } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Loader2, Database, Pencil } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/content';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Project Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your live property listings.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {projects?.length === 0 && (
            <Button variant="outline" onClick={handleSeedData} disabled={seeding}>
              {seeding ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Database className="mr-2 h-4 w-4" />}
              Import Initial Projects
            </Button>
          )}
          <Button asChild>
            <Link href="/admin/dashboard/new">
              <Plus className="mr-2 h-4 w-4" /> Add New Project
            </Link>
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-accent mb-4" />
          <p className="text-muted-foreground animate-pulse">Loading properties...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project: any) => (
            <Card key={project.id} className="overflow-hidden flex flex-col shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full bg-muted">
                <Image
                  src={project.thumbnail?.imageUrl || 'https://placehold.co/600x400'}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="flex-1">
                <CardTitle className="text-lg line-clamp-1">{project.title}</CardTitle>
                <p className="text-sm text-accent font-bold">{project.price}</p>
                <p className="text-xs text-muted-foreground truncate">{project.location}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/dashboard/edit/${project.id}`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(project.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {projects?.length === 0 && (
            <div className="col-span-full text-center py-20 bg-muted/50 rounded-2xl border-2 border-dashed">
              <p className="text-muted-foreground mb-4">No live projects found.</p>
              <Button variant="outline" onClick={handleSeedData} disabled={seeding}>
                Click to seed initial property data
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
