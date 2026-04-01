import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

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
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Header Image */}
      <section className="relative h-screen w-full">
        <Image
          src="/images/costa-de-almeria.jpg"
          alt="Costa de Almería coastline with golden beaches and Mediterranean sea"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Costa de Almería
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-12">
            Discover your Mediterranean paradise
          </p>
          <Link 
            href="/explorer"
            className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105"
          >
            Explore the Coast
          </Link>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Find Your Perfect Coastal Town
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            From pristine beaches to charming whitewashed villages, Almería's coast offers an incomparable Mediterranean lifestyle. 
            Whether you're seeking a dream vacation, planning a relocation, or looking for the ideal remote work destination, 
            discover towns that fit your vision of coastal living.
          </p>
        </div>
      </section>

      {/* Audience Sections */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-24">
          
          {/* Section 1: Vacationing */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 w-full rounded-2xl overflow-hidden">
              <Image
                src="/images/playa-de-los-muertos.jpg"
                alt="Beautiful beach in Almería for vacationers"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                For Vacationers
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Discover unspoiled beaches, crystal-clear waters, and authentic Spanish culture. 
                From bustling resort towns to secluded coves, find your perfect getaway in the sun.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  300+ days of sunshine annually
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  Pristine, uncrowded beaches
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  Authentic local culture and cuisine
                </li>
              </ul>
              <Link 
                href="/explorer"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
              >
                Find Vacation Towns
              </Link>
            </div>
          </div>

          {/* Section 2: Visiting */}
          <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
            <div className="md:order-2">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                For Visitors
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Experience the charm of coastal Spain without the tourist crowds. 
                Explore historic whitewashed villages, private golf courses, and world-class dining.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  Charming historic towns
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  Excellent golf resorts
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  World-class seafood restaurants
                </li>
              </ul>
              <Link 
                href="/explorer"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
              >
                Explore Visiting Options
              </Link>
            </div>
            <div className="relative h-96 w-full rounded-2xl overflow-hidden md:order-1">
              <Image
                src="/images/l_mojacar.jpg"
                alt="Charming Mojácar village for visitors"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Section 3: Year-Round Living / Remote Work */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 w-full rounded-2xl overflow-hidden">
              <Image
                src="/images/roquetas-de-mar.jpg"
                alt="Roquetas de Mar for year-round living and remote work"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                For Year-Round Living & Remote Work
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Embrace the Mediterranean lifestyle as your permanent home. 
                With excellent infrastructure, international communities, and year-round pleasant climate, 
                Almería is ideal for digital nomads and retirees.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3" />
                  Affordable cost of living
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3" />
                  Fast internet connectivity
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3" />
                  International community
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3" />
                  Excellent healthcare facilities
                </li>
              </ul>
              <Link 
                href="/explorer"
                className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors"
              >
                Discover Living Options
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Explore?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Use our interactive coastal map to discover every town pinned to its real location. 
            Compare amenities, lifestyle fit, and find your perfect Mediterranean home.
          </p>
          <Link 
            href="/explorer"
            className="inline-block bg-white text-gray-900 px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            Open Interactive Map
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="md:col-span-2">
            <h4 className="text-2xl font-bold text-white mb-4">
              Costa de Almería
            </h4>
            <p className="text-gray-400 mb-6 max-w-md">
              Discover the beauty of Spain's Mediterranean coast. Find your perfect beach town for vacations, 
              relocations, or remote working life in one of Europe's most desirable coastal regions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-3">
              <li>
                <Link href="/explorer" className="hover:text-white transition-colors">
                  Town Explorer
                </Link>
              </li>
              <li>
                <Link href="/explorer?bestFor=vacation" className="hover:text-white transition-colors">
                  Vacation Towns
                </Link>
              </li>
              <li>
                <Link href="/explorer?bestFor=relocation" className="hover:text-white transition-colors">
                  Relocation Guide
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-white transition-colors">
                  Compare Towns
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h5 className="text-white font-semibold mb-4">Information</h5>
            <ul className="space-y-3">
              <li>
                <span>Province: Almería</span>
              </li>
              <li>
                <span>Region: Andalusia</span>
              </li>
              <li>
                <span>Country: Spain</span>
              </li>
              <li>
                <a href="https://www.juntadeandalucia.es" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Andalusia Tourism
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Costa de Almería. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}