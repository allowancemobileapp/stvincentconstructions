'use client';

import { useRef, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    const whatsAppMessage = `Hello, my name is ${name} (${email}).\n\n${message}`;
    const encodedMessage = encodeURIComponent(whatsAppMessage);

    const whatsappUrl = `https://wa.me/2348033256854?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="John Doe" required />
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
      </div>
      <p className="text-xs text-muted-foreground">
        Your inquiry will be sent to WhatsApp.
      </p>
      <Button type="submit" className="w-full">
        Send Message via WhatsApp
      </Button>
    </form>
  );
}
