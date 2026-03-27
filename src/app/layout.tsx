import type { Metadata } from 'next';
import './globals.css';
import { siteConfig } from '@/lib/content';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { ThemeProvider } from '@/components/theme-provider';

const canonicalUrl = 'https://www.stvincentconstruction.com';
const ogImageUrl =
  'https://images.unsplash.com/photo-1651836173050-6a926e8775aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxjb25zdHJ1Y3Rpb24lMjBza3lsaW5lfGVufDB8fHx8MTc2NjA1MzkxMXww&ixlib=rb-4.1.0&q=80&w=1200';

export const metadata: Metadata = {
  metadataBase: new URL(canonicalUrl),
  title:
    'St. Vincent Construction Limited | Trusted Construction Company in Lagos',
  description:
    'St. Vincent Construction Limited is a professional construction company in Lekki, Lagos, delivering high-quality residential and commercial building projects with reliability and excellence.',
  keywords: [
    'construction company in Lagos',
    'Lekki construction',
    'building contractors Nigeria',
    'residential construction',
    'commercial construction',
  ],
  openGraph: {
    title:
      'St. Vincent Construction Limited | Trusted Construction Company in Lagos',
    description:
      'Professional construction services in Lekki, Lagos for residential and commercial projects.',
    type: 'website',
    url: canonicalUrl,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'St. Vincent Construction Limited building project.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'St. Vincent Construction Limited | Trusted Construction Company in Lagos',
    description:
      'Professional construction services in Lekki, Lagos for residential and commercial projects.',
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
    '@type': 'ConstructionCompany',
    name: 'St. Vincent Construction Limited',
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        '28b Atlantic Boulevard, Oceanbay Estate, Off Dreamworld Africana way',
      addressLocality: 'Lekki',
      addressRegion: 'Lagos',
      addressCountry: 'NG',
    },
    url: 'https://www.stvincentconstruction.com',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+2348033256854',
      contactType: 'customer service',
    },
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
      </body>
    </html>
  );
}
