/**
 * FAQ Component
 * 
 * Displays frequently asked questions in an accordion-style format.
 * Includes proper semantic markup and structured data for SEO.
 */

'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-4">
        {items.map((faq, index) => (
          <FAQAccordion 
            key={index} 
            question={faq.question} 
            answer={faq.answer} 
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

interface FAQAccordionProps {
  question: string;
  answer: string;
  index: number;
}

function FAQAccordion({ question, answer, index }: FAQAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span className="font-medium text-gray-900 pr-4">
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
        )}
      </button>
      
      <div 
        id={`faq-answer-${index}`}
        className={cn(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-96' : 'max-h-0'
        )}
      >
        <div className="p-4 bg-gray-50 text-gray-700 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}