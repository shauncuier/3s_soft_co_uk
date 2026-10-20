import { getCollection, type CollectionEntry } from 'astro:content';
import type { ServiceSlug } from '../data/services';

export type Insight = CollectionEntry<'insights'>;

/** Display labels for the article categories (keyed by service slug). */
export const insightCategories: Record<ServiceSlug, string> = {
  shopify: 'Shopify',
  'amazon-marketplaces': 'Amazon & marketplaces',
  automation: 'Automation',
  'web-development': 'Websites',
};

const WORDS_PER_MINUTE = 225;

const newestFirst = (a: Insight, b: Insight) =>
  b.data.publishDate.getTime() - a.data.publishDate.getTime() || a.data.title.localeCompare(b.data.title, 'en-GB');

/** All articles, newest first. */
export async function getInsights(): Promise<Insight[]> {
  const entries = await getCollection('insights');
  return entries.sort(newestFirst);
}

/** Up to `n` articles in one category, newest first. */
export async function getInsightsByCategory(category: ServiceSlug, n = 3): Promise<Insight[]> {
  const all = await getInsights();
  return all.filter((entry) => entry.data.category === category).slice(0, n);
}

/**
 * Up to `n` other articles, preferring the same category, then newest.
 */
export async function getRelatedInsights(current: Insight, n = 3): Promise<Insight[]> {
  const all = await getInsights();
  const others = all.filter((entry) => entry.id !== current.id);
  const same = others.filter((entry) => entry.data.category === current.data.category);
  const rest = others.filter((entry) => entry.data.category !== current.data.category);
  return [...same, ...rest].slice(0, n);
}

/** Whole minutes to read the MDX body at a steady reading pace; never less than one. */
export function readingTime(entry: Insight): number {
  const words = (entry.body ?? '')
    .replace(/^---[\s\S]*?---/, '')
    .replace(/^import .*$/gm, '')
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** Word count of the MDX body, for Article schema. */
export function wordCount(entry: Insight): number {
  return (entry.body ?? '')
    .replace(/^import .*$/gm, '')
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** "21 October 2026" */
export function formatDate(date: Date): string {
  return dateFormat.format(date);
}

/** Latest of publishDate and updatedDate. */
export function modifiedDate(entry: Insight): Date {
  return entry.data.updatedDate ?? entry.data.publishDate;
}
