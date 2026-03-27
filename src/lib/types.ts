import type { ImagePlaceholder } from './placeholder-images';

export type NavItem = {
  title: string;
  href: string;
};

export type Service = {
  title: string;
  description: string;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnail: ImagePlaceholder;
  images: ImagePlaceholder[];
  features?: string[];
  location?: string;
  price?: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type SiteConfig = {
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  companyPhone: string;
  nav: NavItem[];
  hero: {
    tagline: string;
  };
  about: {
    text: string;
  };
  services: Service[];
  projects: Project[];
  faqs: FaqItem[];
};
