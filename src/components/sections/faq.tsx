import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { siteConfig } from '@/lib/content';

export function FaqSection() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Find answers to common questions about our services and processes.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {siteConfig.faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-lg text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
