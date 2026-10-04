import { site } from '../data/site';

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

export interface SchemaGeneratorOptions {
  pathname: string;
  pageTitle: string;
  pageDescription: string;
  pageType?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';
  breadcrumbs?: BreadcrumbItem[];
  caseStudy?: CaseStudySchemaInput;
  ogImageUrl?: string;
}

/**
 * Builds a unified, interlinked Schema.org @graph JSON-LD structure adhering to
 * Google Search Central and Rich Results guidelines.
 */
export function buildSchemaGraph(options: SchemaGeneratorOptions) {
  const {
    pathname,
    pageTitle,
    pageDescription,
    pageType = 'WebPage',
    breadcrumbs = [],
    caseStudy,
    ogImageUrl,
  } = options;

  const siteUrl = site.url.replace(/\/+$/, '');
  const cleanPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const canonicalUrl = `${siteUrl}${cleanPath === '/' ? '/' : cleanPath}`;
  const websiteId = `${siteUrl}/#website`;
  const organizationId = `${siteUrl}/#organization`;
  const logoId = `${siteUrl}/#logo`;
  const webpageId = `${canonicalUrl}#webpage`;
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;

  // 1. Primary Organization & ProfessionalService entity
  const organizationEntity = {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': organizationId,
    name: site.name,
    alternateName: site.ukName,
    url: `${siteUrl}/`,
    logo: {
      '@type': 'ImageObject',
      '@id': logoId,
      url: `${siteUrl}/icon-512.png`,
      contentUrl: `${siteUrl}/icon-512.png`,
      caption: `${site.ukName} Logo`,
      width: 512,
      height: 512,
    },
    image: { '@id': logoId },
    description: site.description,
    telephone: site.contact.phone,
    email: site.contact.email,
    priceRange: '££',
    currenciesAccepted: 'GBP, USD, EUR, AUD',
    paymentAccepted: 'Bank Transfer, Card, Invoice',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'London',
      addressCountry: 'GB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.5074,
      longitude: -0.1278,
    },
    areaServed: [
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'Australia' },
      { '@type': 'Country', name: 'European Union' },
    ],
    knowsAbout: [
      'E-Commerce Storefront Architecture',
      'Shopify Plus & Liquid Engineering',
      'Marketplace Listing Optimization (Amazon & Walmart)',
      'Custom WooCommerce Plugin Engineering',
      'High-Performance Order Storage (HPOS)',
      'Inventory & ERP Order Synchronization',
      'Astro & Modern Web Application Development',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Commerce & Technology Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Shopify Storefront Design & Engineering',
            description: 'Custom Shopify themes, Liquid templates, and checkout performance optimization.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Marketplace Operations & Channel Syndication',
            description: 'Amazon, Walmart, and multi-channel catalog health, pricing rules, and listing management.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom Web & WooCommerce Plugin Development',
            description: 'High-throughput API synchronization, custom middleware, and tailored digital platforms.',
          },
        },
      ],
    },
    sameAs: [
      site.social.linkedin,
      site.social.facebook,
      site.social.instagram,
      site.mainSiteUrl,
    ].filter(Boolean),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: site.contact.phone,
        contactType: 'customer service',
        areaServed: 'GB',
        availableLanguage: ['English'],
      },
    ],
  };

  // 2. Global WebSite entity
  const websiteEntity = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: `${siteUrl}/`,
    name: site.ukName,
    alternateName: '3s-Soft UK Technology & E-Commerce',
    description: site.description,
    publisher: { '@id': organizationId },
    inLanguage: site.lang,
  };

  // 3. WebPage entity
  const webpageEntity: Record<string, any> = {
    '@type': pageType,
    '@id': webpageId,
    url: canonicalUrl,
    name: pageTitle,
    description: pageDescription,
    isPartOf: { '@id': websiteId },
    about: { '@id': organizationId },
    inLanguage: site.lang,
  };

  if (ogImageUrl) {
    webpageEntity.primaryImageOfPage = {
      '@type': 'ImageObject',
      url: ogImageUrl.startsWith('http') ? ogImageUrl : `${siteUrl}${ogImageUrl}`,
    };
  }

  // 4. BreadcrumbList entity
  let breadcrumbEntity: Record<string, any> | null = null;
  const allBreadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    ...breadcrumbs,
  ];

  if (cleanPath !== '/') {
    breadcrumbEntity = {
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: allBreadcrumbItems.map((item, index) => {
        const isLast = index === allBreadcrumbItems.length - 1;
        const itemUrl = item.href
          ? new URL(item.href, siteUrl).href
          : (isLast ? canonicalUrl : undefined);

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

  const graph: any[] = [organizationEntity, websiteEntity, webpageEntity];
  if (breadcrumbEntity) {
    graph.push(breadcrumbEntity);
  }

  // 5. Specialised Entity: AboutPage Leadership Person
  if (pageType === 'AboutPage' && site.ukPresence.name) {
    const personId = `${siteUrl}/about/#${encodeURIComponent(site.ukPresence.name.toLowerCase().replace(/\s+/g, '-'))}`;
    const personEntity = {
      '@type': 'Person',
      '@id': personId,
      name: site.ukPresence.name,
      jobTitle: site.ukPresence.role,
      worksFor: { '@id': organizationId },
      description: site.ukPresence.summary,
    };
    graph.push(personEntity);
    webpageEntity.mainEntity = { '@id': personId };
  }

  // 6. Specialised Entity: Case Study / Article
  if (caseStudy) {
    const articleId = `${canonicalUrl}#article`;
    const publishDate = caseStudy.publishDate || new Date('2026-01-15T00:00:00Z');
    const articleEntity: Record<string, any> = {
      '@type': ['Article', 'TechArticle'],
      '@id': articleId,
      isPartOf: { '@id': webpageId },
      headline: caseStudy.title,
      description: caseStudy.summary,
      image: caseStudy.heroImageUrl.startsWith('http')
        ? caseStudy.heroImageUrl
        : `${siteUrl}${caseStudy.heroImageUrl}`,
      datePublished: publishDate.toISOString(),
      dateModified: publishDate.toISOString(),
      inLanguage: site.lang,
      mainEntityOfPage: { '@id': webpageId },
      author: { '@id': organizationId },
      publisher: { '@id': organizationId },
    };

    if (caseStudy.industry) {
      articleEntity.about = {
        '@type': 'Thing',
        name: caseStudy.industry,
      };
    }

    if (caseStudy.categoryLabel) {
      articleEntity.genre = caseStudy.categoryLabel;
    }

    if (caseStudy.liveUrl) {
      articleEntity.relatedLink = caseStudy.liveUrl;
    }

    webpageEntity.mainEntity = { '@id': articleId };
    graph.push(articleEntity);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
