'use client';

import { useActionState, useEffect, useRef } from 'react';
import { handleContactSubmit, type FormState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { siteConfig } from '@/lib/content';

const initialState: FormState = {
  message: '',
  errors: undefined,
  type: 'idle',
};

export function ContactForm() {
  const [state, formAction] = useActionState(handleContactSubmit, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.type === 'success') {
      toast({
        title: 'Message Sent!',
        description: state.message,
      });
      formRef.current?.reset();
    } else if (state.type === 'error' && state.message) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="John Doe" required />
        {state.errors?.name && (
          <p className="text-sm text-destructive">{state.errors.name[0]}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john.doe@example.com"
          required
        />
        {state.errors?.email && (
          <p className="text-sm text-destructive">{state.errors.email[0]}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your project..."
          rows={5}
          required
        />
        {state.errors?.message && (
          <p className="text-sm text-destructive">{state.errors.message[0]}</p>
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        Your inquiry will be sent to {siteConfig.companyEmail}.
      </p>
      <Button type="submit" className="w-full">
        Send Message
      </Button>
    </form>
  );
}
