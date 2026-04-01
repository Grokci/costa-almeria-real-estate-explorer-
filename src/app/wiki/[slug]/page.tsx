/**
 * Wiki Page - Dynamic Route
 * 
 * Generates SEO-optimized wiki pages for Costa de Almería and all towns.
 * Uses static generation for optimal performance and SEO.
 */

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getWikiEntry, getRelatedEntries, getWikiSlugs } from '@/data/wiki';
import { 
  generateWikiMetadata, 
  generateBreadcrumbs, 
  generateAllStructuredData 
} from '@/lib/wiki-seo';
import { Breadcrumbs } from '@/components/wiki/Breadcrumbs';
import { WikiImage } from '@/components/wiki/WikiImage';
import { RelatedLinks } from '@/components/wiki/RelatedLinks';
import { FAQ } from '@/components/wiki/FAQ';

// Generate static params for all wiki pages
export async function generateStaticParams() {
  const slugs = getWikiSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each wiki page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWikiEntry(slug);
  
  if (!entry) {
    return {
      title: 'Page Not Found',
      robots: { index: false, follow: false },
    };
  }
  
  return generateWikiMetadata(entry);
}

// Wiki page content component
async function WikiPageContent({ slug }: { slug: string }) {
  const entry = getWikiEntry(slug);
  
  if (!entry) {
    notFound();
  }
  
  const breadcrumbs = generateBreadcrumbs(entry);
  const structuredData = generateAllStructuredData(entry);
  const relatedEntries = getRelatedEntries(slug);

  return (
    <>
      {/* Structured Data */}
      {structuredData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      
      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbs} />
        
        {/* Hero Image */}
        {entry.heroImage && (
          <WikiImage
            src={entry.heroImage}
            alt={entry.imageAlt || entry.title}
            caption={entry.imageCaption}
            priority
          />
        )}
        
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {entry.title}
        </h1>
        
        {/* Short Description */}
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          {entry.shortDescription}
        </p>
        
        {/* Overview Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            {entry.overview.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </section>
        
        {/* Location Context */}
        {entry.locationContext && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              {entry.locationContext.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </section>
        )}
        
        {/* Beaches */}
        {entry.beaches && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Beaches & Coastline</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              {entry.beaches.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </section>
        )}
        
        {/* Property Market */}
        {entry.propertyMarket && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Market</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              {entry.propertyMarket.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </section>
        )}
        
        {/* Lifestyle */}
        {entry.lifestyle && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Lifestyle</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              {entry.lifestyle.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </section>
        )}
        
        {/* Best For */}
        {entry.bestFor && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Who It Suits Best</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              {entry.bestFor.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </section>
        )}
        
        {/* Connections / Getting There */}
        {entry.connections && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting There & Connections</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              {entry.connections.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </section>
        )}
        
        {/* FAQ Section */}
        {entry.faq && entry.faq.length > 0 && (
          <FAQ items={entry.faq} />
        )}
        
        {/* Related Links */}
        {relatedEntries.length > 0 && (
          <RelatedLinks 
            entries={relatedEntries.slice(0, 6)} 
            title={entry.type === 'region' ? 'Explore the Towns' : 'Related Destinations'}
          />
        )}
      </article>
    </>
  );
}

// Main page component
export default async function WikiPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  return <WikiPageContent slug={slug} />;
}