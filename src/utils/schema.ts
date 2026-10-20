import { site, credentialLinks } from '../data/site';
import { services } from '../data/services';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface CaseStudySchemaInput {
  title: string;
  summary: string;
  heroImageUrl: string;
  publishDate?: Date;
  industry?: string;
  categoryLabel?: string;
  client?: string;
  liveUrl?: string;
}

/** One service page – emits a `Service` node provided by the organisation. */
export interface ServiceSchemaInput {
  name: string;
  description: string;
  /** Absolute or site-relative URL of the service page. */
  url: string;
  slug: string;
}

/**
 * One Insights article – emits a `BlogPosting` (a subtype of `Article`) whose
 * author and publisher are the organisation. Case studies keep using `caseStudy`.
 */
export interface ArticleSchemaInput {
  headline: string;
  description: string;
  /** Absolute or site-relative URL of the social/hero image (1200×630). */
  imageUrl: string;
  datePublished: Date;
  dateModified?: Date;
  /** Category label, e.g. "Amazon & marketplaces". */
  section?: string;
  keywords?: string[];
  wordCount?: number;
}

export interface FaqSchemaInput {
  q: string;
  a: string;
}

export type SchemaPageType = 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage' | 'ServicePage';

export interface SchemaGeneratorOptions {
  pathname: string;
  pageTitle: string;
  pageDescription: string;
  /** `ServicePage` is emitted as a `WebPage` whose `about` is the `Service` node. */
  pageType?: SchemaPageType;
  breadcrumbs?: BreadcrumbItem[];
  caseStudy?: CaseStudySchemaInput;
  /** Present on /insights/<slug>/ pages only. */
  article?: ArticleSchemaInput;
  /** Present on /services/<slug>/ pages only. */
  service?: ServiceSchemaInput;
  /** Emits `FAQPage` only when provided and non-empty, i.e. only where FAQs render. */
  faqs?: FaqSchemaInput[];
  ogImageUrl?: string;
}

/** Build time, used as dateModified for pages without their own date. */
const BUILD_DATE = new Date().toISOString();

const AREA_SERVED_GB = { '@type': 'Country', name: 'United Kingdom', identifier: 'GB' } as const;

function toSlugId(value: string): string {
  return encodeURIComponent(value.toLowerCase().replace(/\s+/g, '-'));
}

/**
 * Builds a unified, interlinked Schema.org @graph JSON-LD structure following
 * docs/superpowers/specs/2026-10-20-uk-redesign-spec.md §10:
 * Organization + OnlineBusiness (no LocalBusiness subtype: there is no public address yet),
 * WebSite, WebPage/CollectionPage/AboutPage/ContactPage, BreadcrumbList,
 * Service on service pages, FAQPage only where FAQs render, Article on case studies.
 * No PostalAddress or geo data until company details are confirmed.
 */
export function buildSchemaGraph(options: SchemaGeneratorOptions) {
  const {
    pathname,
    pageTitle,
    pageDescription,
    pageType = 'WebPage',
    breadcrumbs = [],
    caseStudy,
    article,
    service,
    faqs,
    ogImageUrl,
  } = options;

  const siteUrl = site.url.replace(/\/+$/, '');
  const absolute = (url: string) => (url.startsWith('http') ? url : `${siteUrl}${url.startsWith('/') ? '' : '/'}${url}`);
  const cleanPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const canonicalUrl = `${siteUrl}${cleanPath === '/' ? '/' : cleanPath}`;
  const websiteId = `${siteUrl}/#website`;
  const organizationId = `${siteUrl}/#organization`;
  const logoId = `${siteUrl}/#logo`;
  const founderId = `${siteUrl}/about/#${toSlugId(site.founder.name)}`;
  const ukDirectorId = `${siteUrl}/about/#${toSlugId(site.ukDirector.name)}`;
  const webpageId = `${canonicalUrl}#webpage`;
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;

  // People – referenced from the organisation, expanded on the About page.
  const founderEntity = {
    '@type': 'Person',
    '@id': founderId,
    name: site.founder.name,
    jobTitle: site.founder.role,
    url: site.founder.url,
    worksFor: { '@id': organizationId },
    sameAs: credentialLinks.filter((c) => c.key === 'fiverr' || c.key === 'upwork').map((c) => c.href),
  };

  const ukDirectorEntity = {
    '@type': 'Person',
    '@id': ukDirectorId,
    name: site.ukDirector.name,
    jobTitle: site.ukDirector.role,
    worksFor: { '@id': organizationId },
    description: site.ukDirector.summary,
  };

  // 1. Organization & ProfessionalService entity
  const organizationEntity: Record<string, any> = {
    '@type': ['Organization', 'OnlineBusiness'],
    '@id': organizationId,
    name: site.name,
    alternateName: site.ukName,
    url: `${siteUrl}/`,
    slogan: site.tagline,
    logo: {
      '@type': 'ImageObject',
      '@id': logoId,
      url: `${siteUrl}/icon-512.png`,
      contentUrl: `${siteUrl}/icon-512.png`,
      caption: `${site.ukName} logo`,
      width: 512,
      height: 512,
    },
    image: { '@id': logoId },
    description: site.description,
    telephone: site.contact.phone,
    email: site.contact.email,
    founder: { '@id': founderId },
    areaServed: AREA_SERVED_GB,
    knowsAbout: [
      'Shopify store development',
      'WooCommerce development',
      'Amazon listing optimisation',
      'Amazon A+ Content and Brand Story',
      'Amazon brand store design',
      'Amazon cataloguing',
      'E-commerce automation and integrations',
      'WordPress plugin development',
      'Small business website development',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': `${siteUrl}${s.href}#service`,
          name: s.title,
          url: `${siteUrl}${s.href}`,
        },
      })),
    },
    sameAs: [
      ...credentialLinks.filter((c) => c.key !== 'fiverr' && c.key !== 'upwork').map((c) => c.href),
      site.social.linkedin,
      site.social.facebook,
      site.social.instagram,
      site.social.youtube,
      site.mainSiteUrl,
    ].filter(Boolean),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: site.contact.phone,
        email: site.contact.email,
        contactType: 'customer service',
        areaServed: 'GB',
        availableLanguage: ['English'],
      },
    ],
  };

  if (site.legal.companyName) {
    organizationEntity.legalName = site.legal.companyName;
  }

  // 2. Global WebSite entity
  const websiteEntity = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: `${siteUrl}/`,
    name: site.ukName,
    alternateName: site.name,
    description: site.description,
    publisher: { '@id': organizationId },
    inLanguage: site.lang,
  };

  // 3. WebPage entity
  const webpageEntity: Record<string, any> = {
    '@type': pageType === 'ServicePage' ? 'WebPage' : pageType,
    '@id': webpageId,
    url: canonicalUrl,
    name: pageTitle,
    description: pageDescription,
    isPartOf: { '@id': websiteId },
    about: { '@id': organizationId },
    inLanguage: site.lang,
    dateModified: BUILD_DATE,
  };

  if (ogImageUrl) {
    webpageEntity.primaryImageOfPage = {
      '@type': 'ImageObject',
      url: absolute(ogImageUrl),
    };
  }

  // 4. BreadcrumbList entity
  let breadcrumbEntity: Record<string, any> | null = null;
  const allBreadcrumbItems: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, ...breadcrumbs];

  if (cleanPath !== '/') {
    breadcrumbEntity = {
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: allBreadcrumbItems.map((item, index) => {
        const isLast = index === allBreadcrumbItems.length - 1;
        const itemUrl = item.href ? new URL(item.href, siteUrl).href : isLast ? canonicalUrl : undefined;

        const listItem: Record<string, any> = {
          '@type': 'ListItem',
          position: index + 1,
          name: item.label,
        };

        if (itemUrl) {
          listItem.item = itemUrl;
        }

        return listItem;
      }),
    };
    webpageEntity.breadcrumb = { '@id': breadcrumbId };
  }

  const graph: any[] = [organizationEntity, founderEntity, websiteEntity, webpageEntity];
  if (breadcrumbEntity) {
    graph.push(breadcrumbEntity);
  }

  // 5. AboutPage – name both people and make the organisation the main entity.
  if (pageType === 'AboutPage') {
    graph.push(ukDirectorEntity);
    organizationEntity.employee = [{ '@id': founderId }, { '@id': ukDirectorId }];
    webpageEntity.mainEntity = { '@id': organizationId };
  }

  // 6. Service page – Service node provided by the organisation.
  if (service) {
    const serviceUrl = absolute(service.url);
    const serviceId = `${serviceUrl}#service`;
    const serviceEntity: Record<string, any> = {
      '@type': 'Service',
      '@id': serviceId,
      name: service.name,
      description: service.description,
      url: serviceUrl,
      serviceType: service.name,
      provider: { '@id': organizationId },
      areaServed: AREA_SERVED_GB,
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: site.booking.url,
        name: site.booking.label,
      },
    };
    webpageEntity.about = { '@id': serviceId };
    webpageEntity.mainEntity = { '@id': serviceId };
    graph.push(serviceEntity);
  }

  // 7. Case study / Article
  if (caseStudy) {
    const articleId = `${canonicalUrl}#article`;
    const publishDate = caseStudy.publishDate || new Date('2026-01-15T00:00:00Z');
    const articleEntity: Record<string, any> = {
      '@type': ['Article', 'TechArticle'],
      '@id': articleId,
      isPartOf: { '@id': webpageId },
      headline: caseStudy.title,
      description: caseStudy.summary,
      image: {
        '@type': 'ImageObject',
        url: absolute(caseStudy.heroImageUrl),
        width: 1200,
        height: 630,
      },
      datePublished: publishDate.toISOString(),
      dateModified: publishDate.toISOString(),
      inLanguage: site.lang,
      mainEntityOfPage: { '@id': webpageId },
      author: { '@type': 'Organization', '@id': organizationId, name: site.ukName, url: `${siteUrl}/` },
      publisher: { '@type': 'Organization', '@id': organizationId, name: site.ukName, logo: { '@id': logoId } },
    };
    webpageEntity.datePublished = publishDate.toISOString();
    webpageEntity.dateModified = publishDate.toISOString();

    if (caseStudy.industry) {
      articleEntity.about = { '@type': 'Thing', name: caseStudy.industry };
    }

    if (caseStudy.categoryLabel) {
      articleEntity.genre = caseStudy.categoryLabel;
    }

    if (caseStudy.liveUrl) {
      // relatedLink belongs to WebPage, not Article (schema.org validator warning otherwise).
      webpageEntity.relatedLink = caseStudy.liveUrl;
      articleEntity.citation = caseStudy.liveUrl;
    }

    webpageEntity.mainEntity = { '@id': articleId };
    graph.push(articleEntity);
  }

  // 7b. Insights article – BlogPosting authored and published by the organisation.
  if (article) {
    const articleId = `${canonicalUrl}#article`;
    const published = article.datePublished.toISOString();
    const modified = (article.dateModified ?? article.datePublished).toISOString();
    const articleEntity: Record<string, any> = {
      '@type': 'BlogPosting',
      '@id': articleId,
      isPartOf: { '@id': webpageId },
      headline: article.headline,
      description: article.description,
      image: {
        '@type': 'ImageObject',
        url: absolute(article.imageUrl),
        width: 1200,
        height: 630,
      },
      datePublished: published,
      dateModified: modified,
      inLanguage: site.lang,
      mainEntityOfPage: { '@id': webpageId },
      author: { '@type': 'Organization', '@id': organizationId, name: site.ukName, url: `${siteUrl}/` },
      publisher: { '@type': 'Organization', '@id': organizationId, name: site.ukName, logo: { '@id': logoId } },
    };
    if (article.section) articleEntity.articleSection = article.section;
    if (article.keywords && article.keywords.length) articleEntity.keywords = article.keywords.join(', ');
    if (article.wordCount) articleEntity.wordCount = article.wordCount;

    webpageEntity.datePublished = published;
    webpageEntity.dateModified = modified;
    webpageEntity.mainEntity = { '@id': articleId };
    graph.push(articleEntity);
  }

  // 8. FAQPage – only where FAQs actually render on the page.
  if (faqs && faqs.length > 0) {
    const faqId = `${canonicalUrl}#faq`;
    graph.push({
      '@type': 'FAQPage',
      '@id': faqId,
      isPartOf: { '@id': webpageId },
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
