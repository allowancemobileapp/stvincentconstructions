'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { summarizeDescription } from '@/ai/flows/summarize-description';
import { Sparkles, Loader2, ChevronLeft, Plus, Trash2, Star } from 'lucide-react';
import Link from 'next/link';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';

export default function EditProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = use(params);
  const router = useRouter();
  const db = useFirestore();
  const [loading, setLoading] = useState(false);
  const [summarizing, setSummarizing] = useState(false);
  
  const projectRef = useMemoFirebase(() => doc(db, 'projects', projectId), [db, projectId]);
  const { data: project, loading: fetching } = useDoc(projectRef);

  const [formData, setFormData] = useState({
    title: '',
    category: 'For Sale',
    price: '',
    location: '',
    description: '',
    isFeatured: false,
    thumbnailUrl: '',
    galleryUrls: [''],
    features: '',
  });

  useEffect(() => {
    if (project) {
      const urls = project.images?.map((img: any) => img.imageUrl) || [];
      setFormData({
        title: project.title || '',
        category: project.category || 'For Sale',
        price: project.price || '',
        location: project.location || '',
        description: project.description || '',
        isFeatured: project.isFeatured || false,
        thumbnailUrl: project.thumbnail?.imageUrl || '',
        galleryUrls: urls.length > 0 ? urls : [''],
        features: project.features?.join(', ') || '',
      });
    }
  }, [project]);

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

  const handleAddGalleryUrl = () => {
    setFormData({
      ...formData,
      galleryUrls: [...formData.galleryUrls, '']
    });
  };

  const handleRemoveGalleryUrl = (index: number) => {
    const newUrls = formData.galleryUrls.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      galleryUrls: newUrls.length > 0 ? newUrls : ['']
    });
  };

  const handleGalleryUrlChange = (index: number, value: string) => {
    const newUrls = [...formData.galleryUrls];
    newUrls[index] = value;
    setFormData({
      ...formData,
      galleryUrls: newUrls
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const galleryImages = formData.galleryUrls
      .map(url => url.trim())
      .filter(url => url !== '')
      .map(url => ({
        imageUrl: url,
        description: formData.title,
        imageHint: 'property'
      }));

    const projectData = {
      title: formData.title,
      category: formData.category,
      price: formData.price,
      location: formData.location,
      description: formData.description,
      isFeatured: formData.isFeatured,
      features: formData.features.split(',').map(f => f.trim()).filter(f => f !== ''),
      thumbnail: {
        imageUrl: formData.thumbnailUrl || 'https://placehold.co/600x400',
        description: formData.title,
        imageHint: 'property'
      },
      images: galleryImages.length > 0 ? galleryImages : [{
        imageUrl: formData.thumbnailUrl || 'https://placehold.co/600x400',
        description: formData.title,
        imageHint: 'property'
      }],
      updatedAt: serverTimestamp(),
    };

    updateDoc(projectRef, projectData)
      .then(() => {
        router.push('/admin/dashboard');
      })
      .catch(async (err) => {
        const permissionError = new FirestorePermissionError({
          path: projectRef.path,
          operation: 'update',
          requestResourceData: projectData,
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
        setLoading(false);
      });
  };

  if (fetching) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Link href="/admin/dashboard" className="inline-flex items-center text-sm mb-6 hover:text-accent font-medium">
        <ChevronLeft className="mr-1 h-4 w-4" /> Back to Dashboard
      </Link>
      
      <Card className="shadow-lg border-2">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Edit Property</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-accent/5 border border-accent/20">
              <div className="space-y-0.5">
                <Label htmlFor="featured" className="text-base font-bold flex items-center gap-2">
                  <Star className="h-4 w-4 fill-accent text-accent" /> Featured Property
                </Label>
                <p className="text-xs text-muted-foreground">Mark this to show in the homepage hero section.</p>
              </div>
              <Switch 
                id="featured" 
                checked={formData.isFeatured} 
                onCheckedChange={(checked) => setFormData({...formData, isFeatured: checked})}
              />
            </div>

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
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                  <option value="Sold">Sold</option>
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
              <Input 
                id="thumbnailUrl" 
                placeholder="Paste URL (e.g., https://...)" 
                value={formData.thumbnailUrl} 
                onChange={e => setFormData({...formData, thumbnailUrl: e.target.value})} 
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Gallery Image URLs</Label>
                <Button type="button" variant="outline" size="sm" onClick={handleAddGalleryUrl} className="h-8">
                  <Plus className="mr-1 h-4 w-4" /> Add Image
                </Button>
              </div>
              <div className="space-y-3">
                {formData.galleryUrls.map((url, index) => (
                  <div key={index} className="flex gap-2">
                    <Input 
                      placeholder={`Gallery URL ${index + 1}`}
                      value={url}
                      onChange={(e) => handleGalleryUrlChange(index, e.target.value)}
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleRemoveGalleryUrl(index)}
                      disabled={formData.galleryUrls.length <= 1 && url === ''}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
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
                  className="text-accent"
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

            <Button type="submit" className="w-full h-12 text-lg font-bold" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}