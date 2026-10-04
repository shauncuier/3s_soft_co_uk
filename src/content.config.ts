import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { categoryKeys } from './data/content';

/**
 * Case studies – one MDX file per project in src/content/case-studies/.
 * The file name becomes the URL: /case-studies/<file-name>/
 * The MDX body is rendered as the "Implementation" section.
 */
const caseStudies = defineCollection({
  loader: glob({ base: './src/content/case-studies', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** One-line headline shown under the title in the case-study hero. */
      tagline: z.string(),
      /** Short description used on cards and meta descriptions (keep under ~160 characters). */
      summary: z.string(),
      /** Filter categories. First entry is treated as the primary category. */
      categories: z.array(z.enum(categoryKeys)).min(1),
      /** Display label, e.g. "Shopify · E-commerce". */
      categoryLabel: z.string(),
      client: z.string(),
      industry: z.string(),
      year: z.string(),
      platforms: z.array(z.string()).default([]),
      services: z.array(z.string()).default([]),
      heroImage: image(),
      heroAlt: z.string(),
      featured: z.boolean().default(false),
      /** Lower numbers appear first. */
      order: z.number().default(100),
      /** Marks demo content – shows a visible notice until replaced with real project information. */
      placeholder: z.boolean().default(false),
      challenge: z.string(),
      approach: z.string(),
      solution: z.string(),
      /** Qualitative outcomes. Only include numbers that are verified. */
      outcome: z.array(z.string()).min(1),
      gallery: z
        .array(
          z.object({
            image: image(),
            alt: z.string(),
            caption: z.string().optional(),
          }),
        )
        .default([]),
      publishDate: z.coerce.date().optional(),
      liveUrl: z.string().url().optional(),
      market: z.string().optional(),
      builtBy: z.string().optional(),
      portfolioLine: z.string().optional(),
      bestForPitching: z.string().optional(),
      nextImprovements: z.array(z.string()).default([]),
      resultsNote: z.string().optional(),
    }),
});

export const collections = { caseStudies };
