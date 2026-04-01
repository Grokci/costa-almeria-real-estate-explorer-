/**
 * RelatedLinks Component
 * 
 * Displays related wiki page links at the bottom of each wiki article.
 * Uses proper semantic markup for SEO.
 */

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { WikiEntry } from '@/data/wiki';

interface RelatedLinksProps {
  entries: WikiEntry[];
  title?: string;
}

export function RelatedLinks({ entries, title = 'Related Pages' }: RelatedLinksProps) {
  if (!entries || entries.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {entries.map((entry) => (
          <Link
            key={entry.slug}
            href={`/wiki/${entry.slug}`}
            className="group block bg-gray-50 rounded-lg p-4 hover:bg-emerald-50 hover:shadow-md transition-all"
          >
            <h3 className="text-base font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors mb-2 flex items-center gap-2">
              {entry.title}
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600" />
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {entry.shortDescription}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}