/**
 * WikiImage Component
 * 
 * SEO-optimized image wrapper with proper alt text, caption support,
 * and Next.js Image optimization for performance.
 */

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface WikiImageProps {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  className?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://costa-almeria.com';

export function WikiImage({ 
  src, 
  alt, 
  caption, 
  priority = false,
  className 
}: WikiImageProps) {
  // Handle relative URLs - convert to absolute for images
  const imageSrc = src.startsWith('/') 
    ? `${BASE_URL}${src}` 
    : src;

  // Validate alt text for accessibility
  const hasValidAlt = alt && alt.trim().length > 0;

  return (
    <figure className={cn('mb-8', className)}>
      <div className="relative rounded-xl overflow-hidden bg-gray-100">
        <Image
          src={imageSrc}
          alt={hasValidAlt ? alt : 'Wiki image'}
          width={800}
          height={500}
          priority={priority}
          className="w-full h-auto object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          unoptimized={src.startsWith('http')} // Allow external images
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-gray-600 text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}