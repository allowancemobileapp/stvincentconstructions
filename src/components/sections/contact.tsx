import { ContactForm } from '@/components/contact-form';
import { siteConfig } from '@/lib/content';
import { Mail, Phone, MapPin } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-2 max-w-2xl mx-auto text-lg text-muted-foreground">
            Have a project in mind? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 rounded-md bg-accent/10 p-3">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">Address</h3>
                <p className="text-muted-foreground">
                  {siteConfig.companyAddress}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 rounded-md bg-accent/10 p-3">
                <Mail className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">Email</h3>
                <a
                  href={`mailto:${siteConfig.companyEmail}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {siteConfig.companyEmail}
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 rounded-md bg-accent/10 p-3">
                <Phone className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">Phone</h3>
                <p className="text-muted-foreground">{siteConfig.companyPhone}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-6 text-xl font-semibold text-primary">
              Send Us a Message
            </h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
