import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { categoryKeys } from './data/content';
import { serviceSlugs } from './data/services';

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
            /** Tile shape in the gallery grid. `tall` = top-cropped 3:4 tile (Amazon A+ pages). Defaults to landscape in the UI. */
            aspect: z.enum(['landscape', 'portrait', 'tall']).optional(),
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

/**
 * Insights – plain-English articles, one MDX file per article in src/content/insights/.
 * The file name becomes the URL: /insights/<file-name>/
 * `category` matches a service slug so each service page can list its own articles.
 */
const insights = defineCollection({
  loader: glob({ base: './src/content/insights', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        /** Meta description and card summary. Hard limit so search snippets are not cut. */
        description: z.string().max(155),
        publishDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        /** One of the four service slugs; drives the "From the insights" block on that service page. */
        category: z.enum(serviceSlugs),
        tags: z.array(z.string()).default([]),
        /** Service page this article supports (/services/<slug>/). */
        relatedService: z.enum(serviceSlugs),
        /** Optional published case study shown under "Related work". Must match a file in src/content/case-studies/. */
        relatedCaseStudyId: z.string().optional(),
        heroImage: image().optional(),
        heroAlt: z.string().optional(),
        /** Short FAQ rendered at the end of the article and emitted as FAQPage schema. */
        faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
      })
      .refine((data) => !data.heroImage || Boolean(data.heroAlt), {
        message: 'heroAlt is required when heroImage is set',
        path: ['heroAlt'],
      }),
});

export const collections = { caseStudies, insights };
