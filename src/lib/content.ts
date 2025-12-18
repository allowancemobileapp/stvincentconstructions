import type { SiteConfig } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    throw new Error(`Image with id "${id}" not found.`);
  }
  return image;
};

export const siteConfig: SiteConfig = {
  companyName: 'St. Vincent Construction Limited',
  companyAddress:
    '28b Atlantic Boulevard, Oceanbay Estate, Off Dreamworld Africana way, Lekki. Lagos',
  companyEmail: 'info@stvincentconstruction.com',
  companyPhone: '(+234) 800-000-0000',
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
      title: 'Luxury Residential Villa',
      category: 'New Build',
      description:
        'A stunning contemporary villa featuring state-of-the-art amenities and sustainable design principles. This project showcases our commitment to luxury and precision.',
      thumbnail: getImage('project-1-thumb'),
      images: [
        getImage('project-1-gallery-1'),
        getImage('project-1-gallery-2'),
        getImage('project-1-gallery-3'),
      ],
    },
    {
      id: 'project-2',
      title: 'Downtown Corporate Headquarters',
      category: 'Commercial',
      description:
        'A multi-story office complex designed for a leading tech firm. The project involved complex structural engineering and a fast-tracked schedule.',
      thumbnail: getImage('project-2-thumb'),
      images: [
        getImage('project-2-gallery-1'),
        getImage('project-2-gallery-2'),
        getImage('project-2-gallery-3'),
      ],
    },
    {
      id: 'project-3',
      title: 'Modern Kitchen & Bath Remodel',
      category: 'Renovation',
      description:
        'A complete overhaul of a residential kitchen and bathroom, featuring custom cabinetry, high-end finishes, and improved functional layouts.',
      thumbnail: getImage('project-3-thumb'),
      images: [
        getImage('project-3-gallery-1'),
        getImage('project-3-gallery-2'),
        getImage('project-3-gallery-3'),
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
