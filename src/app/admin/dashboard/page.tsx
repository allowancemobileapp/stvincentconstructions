
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Edit, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminDashboard() {
  const router = useRouter();
  const db = useFirestore();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (!auth) {
      router.push('/admin');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  // Stable query reference to prevent infinite loading loops
  const projectsQuery = useMemoFirebase(() => {
    return query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
  }, [db]);
  
  const { data: projects, loading } = useCollection(projectsQuery);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteDoc(doc(db, 'projects', id));
    }
  };

  if (!isAuthorized) return null;

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Project Management</h1>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/admin/dashboard/new">
            <Plus className="mr-2 h-4 w-4" /> Add New Project
          </Link>
        </Button>
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
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/dashboard/edit/${project.id}`}>
                      <Edit className="h-4 w-4" />
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
              <p className="text-muted-foreground">No projects found. Add your first one to get started!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
