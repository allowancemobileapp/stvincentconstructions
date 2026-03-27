import type { SiteConfig } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
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
    { title: 'Home', href: '/' },
    { title: 'About', href: '/#about' },
    { title: 'Properties', href: '/#projects' },
    { title: 'Contact', href: '/#contact' },
  ],
  hero: {
    tagline: 'Building Durable Spaces, Delivering On Time.',
  },
  about: {
    text: 'St. Vincent Construction Limited is a premier construction company with expertise in both residential and commercial projects. Our mission is to deliver high-quality, durable, and beautiful spaces that exceed our clients’ expectations. We are built on a foundation of trust, integrity, and an unwavering commitment to safety and client satisfaction.',
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
        'Our experienced project managers provide expert guidance and oversight, ensuring seamless coordination throughout the project lifecycle.',
    },
  ],
  projects: [
    {
      id: 'project-1',
      title: 'Warehouse In Ibeju Lekki',
      category: 'For Sale',
      price: 'N750m',
      location: 'Ibeju Lekki, Lagos',
      description:
        "2 bay warehouse sitting on 2500sq mts immediately after Pan Africa University and before the Ibeju low bridge. Title: Governor's Consent",
      thumbnail: getImage('project-1-thumb'),
      images: [
        getImage('project-1-gallery-1'),
        getImage('project-1-gallery-2'),
        getImage('project-1-gallery-3'),
        getImage('project-1-gallery-4'),
      ],
      features: ['2 Bay Warehouse', '2500sq mts Land', 'Strategic Location', "Governor's Consent Title"],
    },
    {
      id: 'project-2',
      title: '4-Bedroom Duplex Wing',
      category: 'For Sale',
      price: 'N120m',
      location: 'Peninsula Estate, Sangotedo, Lekki',
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
      features: ['4 Bedrooms', 'Spacious Living Area', 'Modern Kitchen', 'Gated Estate'],
    },
    {
      id: 'project-3',
      title: '2 Hectares of Dry Land',
      category: 'For Sale',
      price: 'N80m/plot',
      location: 'Behind SkyMall, Sangotedo, Lekki',
      description:
        'Located behind SkyMall, before Sangotedo, Lekki. Title: C of O with registered Survey.',
      thumbnail: getImage('project-3-thumb'),
      images: [
        getImage('project-3-gallery-1'),
        getImage('project-3-gallery-2'),
        getImage('project-3-gallery-3'),
      ],
      features: ['2 Hectares Total', '100% Dry Land', 'C of O Title', 'Registered Survey'],
    },
    {
      id: 'project-4',
      title: '4-Bedroom Terrace Houses',
      category: 'For Sale',
      price: 'N250m',
      location: 'Discovery Park, Lekki Conservation Road, Lekki',
      description:
        "2 No's. 4 bedroom Terrace Houses located within a fully serviced estate with a swimming pool.",
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
      features: ['4 Bedrooms', 'Fully Serviced Estate', 'Swimming Pool', '24/7 Security', 'Lekki Conservation Area'],
    },
  ],
  faqs: [
    {
      question: 'What services does St. Vincent Construction Limited provide?',
      answer:
        'We offer full-service construction solutions including general contracting for residential and commercial projects, renovations, and project management.',
    },
    {
      question: 'How does St. Vincent ensure project timelines and quality?',
      answer:
        'We use experienced project managers, clear milestones, and regular site inspections to ensure timelines and quality standards are met.',
    },
    {
      question: 'Do you provide cost estimates before starting?',
      answer:
        'Yes, we offer detailed cost estimates and feasibility consultations to help you plan your budget confidently.',
    },
  ],
};
