import { getCollection, type CollectionEntry } from 'astro:content';
import type { CategoryKey } from '../data/content';

export type CaseStudy = CollectionEntry<'caseStudies'>;

const byOrder = (a: CaseStudy, b: CaseStudy) => a.data.order - b.data.order;

/**
 * Published case studies only (`placeholder: false`), sorted by `order` ascending.
 * Placeholder entries are never built, listed, linked or included in schema.
 */
export async function getPublishedCaseStudies(): Promise<CaseStudy[]> {
  const entries = await getCollection('caseStudies', (entry) => !entry.data.placeholder);
  return entries.sort(byOrder);
}

/** First `n` published studies marked `featured`, falling back to the first `n` published. */
export async function getFeaturedCaseStudies(n = 3): Promise<CaseStudy[]> {
  const published = await getPublishedCaseStudies();
  const featured = published.filter((entry) => entry.data.featured);
  return (featured.length >= n ? featured : published).slice(0, n);
}

/** Published studies tagged with `key` (any position in `categories`). */
export async function getCaseStudiesByCategory(key: CategoryKey): Promise<CaseStudy[]> {
  const published = await getPublishedCaseStudies();
  return published.filter((entry) => entry.data.categories.includes(key));
}

/**
 * Up to `n` other published studies, preferring those that share a category
 * with `current` (more shared categories first), then falling back to `order`.
 */
export async function getRelatedCaseStudies(current: CaseStudy, n = 2): Promise<CaseStudy[]> {
  const published = await getPublishedCaseStudies();
  const others = published.filter((entry) => entry.id !== current.id);
  const shared = (entry: CaseStudy) =>
    entry.data.categories.filter((c) => current.data.categories.includes(c)).length;

  return others
    .map((entry, index) => ({ entry, score: shared(entry), index }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, n)
    .map(({ entry }) => entry);
}

/** One published study by id, or undefined if missing or a placeholder. */
export async function getPublishedCaseStudy(id: string): Promise<CaseStudy | undefined> {
  const published = await getPublishedCaseStudies();
  return published.find((entry) => entry.id === id);
}
