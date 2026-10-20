/**
 * Frequently asked questions.
 * Home FAQ follows docs/superpowers/specs/2026-10-20-uk-redesign-spec.md §7.1 step 8.
 * Never state a price or a timescale we have not agreed with the client.
 */

export interface Faq {
  q: string;
  a: string;
}

export const homeFaqs: readonly Faq[] = [
  {
    q: 'How much does it cost, and how do you quote?',
    a: 'Every project is different, so we do not publish a price list. After a 15-minute call we send a plain-English plan with a fixed scope and a fixed price in pounds. There is nothing to pay for the call or the plan, and no obligation to go ahead.',
  },
  {
    q: 'Do you work with very small businesses?',
    a: 'Yes. Most of our clients are small businesses and independent sellers, often one person or a small team. If a job is small, we will say so and keep the scope and price small to match. If we are not the right fit, we will tell you that too.',
  },
  {
    q: 'Do you work on Amazon UK and Amazon US?',
    a: "Yes. We work in Seller Central for amazon.co.uk and amazon.com, and we are listed on Amazon's Service Provider Network for A+ Content and Cataloguing. Our published Amazon work includes Brand Story and A+ Content for a brand selling on amazon.com.",
  },
  {
    q: 'How long does a Shopify store take?',
    a: 'It depends on how many products you have, whether you need custom design and what needs moving from an old platform. We give you a date in the plan and we keep to it. Small fixes and speed work are usually much quicker than a new build.',
  },
  {
    q: 'Do you offer ongoing support after launch?',
    a: 'Yes. The team that built your store, listings or website stays available afterwards for fixes, changes and improvements. We agree how that works in the plan, either as a monthly arrangement or as and when you need us.',
  },
] as const;
