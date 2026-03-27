
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { summarizeDescription } from '@/ai/flows/summarize-description';
import { Sparkles, Loader2, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';

export default function NewProjectPage() {
  const router = useRouter();
  const db = useFirestore();
  const [loading, setLoading] = useState(false);
  const [summarizing, setSummarizing] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'For Sale',
    price: '',
    location: '',
    description: '',
    thumbnailUrl: '',
    features: '',
  });

  const handleSummarize = async () => {
    if (!formData.description) return;
    setSummarizing(true);
    try {
      const result = await summarizeDescription({ description: formData.description });
      setFormData({ ...formData, description: result.summary });
    } catch (error) {
      console.error('AI Summary failed', error);
    } finally {
      setSummarizing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const projectData = {
      ...formData,
      features: formData.features.split(',').map(f => f.trim()).filter(f => f !== ''),
      thumbnail: {
        imageUrl: formData.thumbnailUrl || 'https://placehold.co/600x400',
        description: formData.title,
        imageHint: 'property'
      },
      images: [
        {
          imageUrl: formData.thumbnailUrl || 'https://placehold.co/600x400',
          description: formData.title,
          imageHint: 'property'
        }
      ],
      createdAt: serverTimestamp(),
    };

    addDoc(collection(db, 'projects'), projectData)
      .then(() => {
        router.push('/admin/dashboard');
      })
      .catch(async (err) => {
        const permissionError = new FirestorePermissionError({
          path: 'projects',
          operation: 'create',
          requestResourceData: projectData,
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
        setLoading(false);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Link href="/admin/dashboard" className="inline-flex items-center text-sm mb-6 hover:text-accent">
        <ChevronLeft className="mr-1 h-4 w-4" /> Back to Dashboard
      </Link>
      
      <Card className="shadow-lg border-2">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add New Property</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input id="title" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select 
                  id="category" 
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.category} 
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option>For Sale</option>
                  <option>For Rent</option>
                  <option>Sold</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (e.g., N750m)</Label>
                <Input id="price" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnailUrl">Thumbnail Image URL</Label>
              <Input id="thumbnailUrl" placeholder="https://..." value={formData.thumbnailUrl} onChange={e => setFormData({...formData, thumbnailUrl: e.target.value})} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="description">Description</Label>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleSummarize} 
                  disabled={summarizing || !formData.description}
                  className="text-accent hover:text-accent/80"
                >
                  {summarizing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                  AI Summarize
                </Button>
              </div>
              <Textarea id="description" rows={5} required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="features">Features (comma separated)</Label>
              <Input id="features" placeholder="Pool, Gym, Security" value={formData.features} onChange={e => setFormData({...formData, features: e.target.value})} />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Create Project'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
