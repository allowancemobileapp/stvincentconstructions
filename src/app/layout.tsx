
import type { Metadata } from 'next';
import './globals.css';
import { siteConfig } from '@/lib/content';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { ThemeProvider } from '@/components/theme-provider';
import { FirebaseClientProvider } from '@/firebase';

const canonicalUrl = 'https://www.stvincentconstruction.com';
const ogImageUrl = 'https://images.unsplash.com/photo-1651836173050-6a926e8775aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxjb25zdHJ1Y3Rpb24lMjBza3lsaW5lfGVufDB8fHx8MTc2NjA1MzkxMXww&ixlib=rb-4.1.0&q=80&w=1200';

export const metadata: Metadata = {
  metadataBase: new URL(canonicalUrl),
  title: {
    default: 'St. Vincent Construction | Luxury Homes & Land in Lagos',
    template: '%s | St. Vincent Construction'
  },
  description: 'Buy, rent or lease premium duplexes, serviced apartments & verified land with C of O in Lekki, Lagos. Trusted realtors for Nigerians at home and diaspora.',
  keywords: [
    'houses for sale in Lekki Phase 1',
    '4 bedroom duplex Sangotedo',
    'luxury shortlets Victoria Island',
    'buy land in Ibeju Lekki C of O',
    'affordable serviced apartments Lagos',
    'verified land for sale Abuja Maitama',
    'commercial space for lease Lagos',
    'real estate developers Lekki',
    'Governor\'s Consent land Lagos',
    'Nigerian diaspora property investment'
  ],
  openGraph: {
    title: 'St. Vincent Construction | Trusted Real Estate in Lagos & Abuja',
    description: 'Expert construction and premium property listings in Nigeria. Discover verified land and luxury homes in Lekki, VI, and beyond.',
    type: 'website',
    url: canonicalUrl,
    siteName: 'St. Vincent Construction Limited',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Modern real estate development in Lagos by St. Vincent Construction',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'St. Vincent Construction | Nigerian Real Estate Experts',
    description: 'Discover luxury duplexes and verified land with C of O in Lagos and Abuja.',
    images: [ogImageUrl],
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    'name': 'St. Vincent Construction Limited',
    'image': ogImageUrl,
    'description': 'Leading construction and real estate agency in Lekki, Lagos, specializing in luxury residential builds, verified land sales, and property management.',
    'url': canonicalUrl,
    'telephone': siteConfig.companyPhone,
    'priceRange': '₦₦₦',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '28b Atlantic Boulevard, Oceanbay Estate, Off Dreamworld Africana way',
      'addressLocality': 'Lekki',
      'addressRegion': 'Lagos',
      'postalCode': '101245',
      'addressCountry': 'NG',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 6.4444,
      'longitude': 3.5186,
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      'opens': '08:00',
      'closes': '18:00',
    },
    'sameAs': [
      'https://www.facebook.com/stvincentconstruction',
      'https://www.instagram.com/stvincentconstruction'
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={cn('font-body antialiased min-h-screen bg-background')}>
        <FirebaseClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
            <Toaster />
          </ThemeProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
