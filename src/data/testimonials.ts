/**
 * Client testimonials. Only real quotes supplied by the owner, reproduced
 * verbatim with the person's name and business. The section renders nothing
 * while this is empty.
 */
export interface Testimonial {
  quote: string;
  name: string;
  /** Role and/or business, e.g. "Founder, Tailwater Supply Co." */
  role: string;
  /** Where the quote was given, e.g. "Fiverr review" or "LinkedIn recommendation". Optional. */
  source?: string;
}

export const testimonials: readonly Testimonial[] = [
  {
    quote:
      'I have had the pleasure of working with Shaun on several projects and have always found them to be highly professional, efficient and dependable. They bring great integrity and specialist knowledge to their work, and I would have no hesitation in recommending them.',
    name: 'David Cronin',
    role: 'Hotelier · Director of Sales & Marketing',
    source: 'LinkedIn recommendation, September 2026',
  },
  {
    quote:
      'He built an excellent transaction capable website via Amazon and Walmart. It turned out great and creates a perfect chassis to build my business on.',
    name: 'cromwelltoby',
    role: 'Client, United States',
    source: 'Fiverr review, 5 stars',
  },
  {
    quote: 'Very professional and polite. 100% recommended.',
    name: 'lana_sabir',
    role: 'Client, United Kingdom',
    source: 'Fiverr review, 5 stars',
  },
  {
    quote:
      'It was nice working with Jashedul - was very patient and understood my expectations. I have no complaints and I would love to work with him in the future. Will be placing my next order with him shortly. - thank you once again.',
    name: 'leonglobal',
    role: 'Client, United Kingdom',
    source: 'Fiverr review, 4 stars',
  },
  {
    quote: 'Great work! Fast delivery. Thanks',
    name: 'alexvoskov',
    role: 'Client, United States',
    source: 'Fiverr review, 5 stars',
  },
];
