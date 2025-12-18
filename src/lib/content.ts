import type { SiteConfig } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    // Return a fallback or throw an error if you want to be strict
    return {
      id: 'fallback',
      imageUrl: 'https://placehold.co/600x400',
      description: 'Placeholder image',
      imageHint: 'placeholder',
    };
  }
  return image;
};

export const siteConfig: SiteConfig = {
  companyName: 'St. Vincent Construction Limited',
  companyAddress:
    '28b Atlantic Boulevard, Oceanbay Estate, Off Dreamworld Africana way, Lekki. Lagos',
  companyEmail: 'info@stvincentconstruction.com',
  companyPhone: '+234 803 325 6854',
  nav: [
    { title: 'About', href: '#about' },
    { title: 'Services', href: '#services' },
    { title: 'Projects', href: '#projects' },
    { title: 'Contact', href: '#contact' },
  ],
  hero: {
    tagline: 'Building Durable Spaces, Delivering On Time.',
  },
  about: {
    text: 'St. Vincent Construction Limited is a premier construction company with expertise in both residential and commercial projects. Our mission is to deliver high-quality, durable, and beautiful spaces that exceed our clients’ expectations. We are built on a foundation of trust, integrity, and an unwavering commitment to safety and client satisfaction. From initial concept to final handover, we ensure every detail is perfected.',
  },
  services: [
    {
      title: 'General Contracting & New Builds',
      description:
        'We manage all aspects of your new construction project, ensuring it is completed on time, within budget, and to the highest standards of quality.',
    },
    {
      title: 'Renovations & Refurbishments',
      description:
        'Transform your existing space with our expert renovation services. We handle everything from minor updates to complete structural overhauls.',
    },
    {
      title: 'Project Management & Consultation',
      description:
        'Our experienced project managers provide expert guidance and oversight, ensuring seamless coordination and communication throughout the project lifecycle.',
    },
  ],
  projects: [
    {
      id: 'project-1',
      title: 'Warehouse In Ibeju Lekki',
      category: 'For Sale - N750m',
      description:
        "2 bay warehouse sitting on 2500sq mts immediately after Pan Africa University and before the Ibeju low bridge. Title: Governor's Consent",
      thumbnail: getImage('project-1-thumb'),
      images: [
        getImage('project-1-gallery-1'),
        getImage('project-1-gallery-2'),
        getImage('project-1-gallery-3'),
        getImage('project-1-gallery-4'),
      ],
    },
    {
      id: 'project-2',
      title: '4-Bedroom Duplex Wing',
      category: 'For Sale - N120m',
      description:
        'A Wing of 4 bedroom duplex in Peninsula Estate, behind Blenco Sangotedo, Lekki.',
      thumbnail: getImage('project-2-thumb'),
      images: [
        getImage('project-2-gallery-1'),
        getImage('project-2-gallery-2'),
        getImage('project-2-gallery-3'),
        getImage('project-2-gallery-4'),
        getImage('project-2-gallery-5'),
        getImage('project-2-gallery-6'),
      ],
    },
    {
      id: 'project-3',
      title: '2 Hectares of Dry Land',
      category: 'For Sale - N80m/plot',
      description:
        'Located behind SkyMall, before Sangotedo, Lekki. Title: C of O with registered Survey.',
      thumbnail: getImage('project-3-thumb'),
      images: [
        getImage('project-3-gallery-1'),
        getImage('project-3-gallery-2'),
        getImage('project-3-gallery-3'),
      ],
    },
    {
      id: 'project-4',
      title: '4-Bedroom Terrace Houses',
      category: 'For Sale - N250m',
      description:
        "2 No's. 4 bedroom Terrace Houses located within a fully serviced estate with a swimming pool. Location: Discovery Park, Lekki Conservation Road, Lekki.",
      thumbnail: getImage('project-4-thumb'),
      images: [
        getImage('project-4-gallery-1'),
        getImage('project-4-gallery-2'),
        getImage('project-4-gallery-3'),
        getImage('project-4-gallery-4'),
        getImage('project-4-gallery-5'),
        getImage('project-4-gallery-6'),
        getImage('project-4-gallery-7'),
        getImage('project-4-gallery-8'),
      ],
    },
  ],
  faqs: [
    {
      question: 'What services does St. St. Vincent Construction Limited provide?',
      answer:
        'We offer full-service construction solutions including general contracting for residential and commercial projects, renovations, and project management from concept to completion.',
    },
    {
      question: 'How does St. St. Vincent ensure project timelines and quality?',
      answer:
        'We use experienced project managers, clear milestones, reliable subcontractor partnerships, and regular site inspections to ensure timelines and quality standards are met.',
    },
    {
      question:
        'Do you provide cost estimates and consultation before starting a project?',
      answer:
        'Yes — we offer detailed cost estimates, scope reviews, and feasibility consultations to help you plan and budget confidently.',
    },
    {
      question: 'How can I arrange a site visit or request a quote?',
      answer:
        'You can use the contact form on this website, call the number listed in the Contact section, or email us at info@stvincentconstruction.com to schedule a site visit or request a quote.',
    },
  ],
};
