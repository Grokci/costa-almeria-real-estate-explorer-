import type { Metadata } from 'next';
import './globals.css';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

export const metadata: Metadata = {
  title: 'Costa de Almería | Discover Your Mediterranean Paradise',
  description: 'Explore the beautiful coastal towns of Almería, Spain. Find your perfect beach destination for vacations, relocations, or remote work. Interactive map with every town pinned to its real location.',
  keywords: ['Almería', 'Spain', 'coastal property', 'beach towns', 'Mediterranean', 'vacation', 'relocation', 'remote work', 'Costa de Almería', 'Spanish coast', 'Andalusia'],
  authors: [{ name: 'Costa de Almería' }],
  openGraph: {
    title: 'Costa de Almería | Discover Your Mediterranean Paradise',
    description: 'Explore the beautiful coastal towns of Almería, Spain. Find your perfect beach destination for vacations, relocations, or remote work.',
    url: 'https://costa-almeria.com',
    siteName: 'Costa de Almería',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Costa de Almería | Discover Your Mediterranean Paradise',
    description: 'Explore the beautiful coastal towns of Almería, Spain. Find your perfect beach destination.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
