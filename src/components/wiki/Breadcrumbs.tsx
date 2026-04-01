/**
 * Breadcrumbs Component
 * 
 * Displays visible breadcrumbs for wiki pages with proper semantic markup.
 * Also generates breadcrumb structured data for SEO.
 */

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="mb-6"
    >
      <ol 
        className="flex items-center flex-wrap gap-1 text-sm"
        itemscope 
        itemType="https://schema.org/BreadcrumbList"
      >
        {/* Home Link */}
        <li 
          className="flex items-center"
          itemProp="itemListElement"
          itemScope 
          itemType="https://schema.org/ListItem"
        >
          <Link 
            href="/"
            className="flex items-center text-gray-500 hover:text-emerald-600 transition-colors"
            itemProp="item"
          >
            <Home className="w-4 h-4" />
            <span className="sr-only">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>

        {/* Wiki Link */}
        <li 
          className="flex items-center"
          itemProp="itemListElement"
          itemScope 
          itemType="https://schema.org/ListItem"
        >
          <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
          <Link 
            href="/wiki"
            className="text-gray-500 hover:text-emerald-600 transition-colors"
            itemProp="item"
          >
            <span itemProp="name">Wiki</span>
          </Link>
          <meta itemProp="position" content="2" />
        </li>

        {/* Current Page */}
        {items.map((item, index) => {
          const position = index + 3;
          const isLast = index === items.length - 1;

          return (
            <li 
              key={item.href}
              className="flex items-center"
              itemProp="itemListElement"
              itemScope 
              itemType="https://schema.org/ListItem"
            >
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              {isLast ? (
                <span 
                  className="text-gray-900 font-medium"
                  aria-current="page"
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </span>
              ) : (
                <Link 
                  href={item.href}
                  className="text-gray-500 hover:text-emerald-600 transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              )}
              <meta itemProp="position" content={String(position)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}