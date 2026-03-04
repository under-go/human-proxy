import type { Metadata } from 'next';

type JsonLdRecord = Record<string, unknown>;

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
};

type FaqItem = {
  question: string;
  answer: string;
};

type HowToStep = {
  name: string;
  text: string;
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

const FALLBACK_SITE_URL = 'https://humanproxy.kr';

function normalizeSiteUrl(input?: string) {
  const candidate = (input ?? '').trim();
  if (!candidate) {
    return FALLBACK_SITE_URL;
  }

  try {
    const withProtocol = candidate.startsWith('http://') || candidate.startsWith('https://') ? candidate : `https://${candidate}`;
    return new URL(withProtocol).origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export const siteMetadata = {
  name: 'Human Proxy',
  shortName: 'Human Proxy KR',
  description:
    'AI가 단독으로 해결하기 어려운 작업을 신뢰 가능한 사람에게 위임하고 결과를 검토/정산하는 서비스',
  locale: 'ko-KR',
  siteUrl: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  alternates: {
    languages: {
      'ko-KR': '/',
      'x-default': '/'
    }
  }
};

export function absoluteUrl(path: string) {
  if (!path.startsWith('/')) {
    return `${siteMetadata.siteUrl}/${path}`;
  }
  return `${siteMetadata.siteUrl}${path}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  noIndex
}: MetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const robots = noIndex
    ? {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
          index: false,
          follow: false,
          noimageindex: true
        }
      }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-snippet': -1,
          'max-video-preview': -1,
          'max-image-preview': 'large' as const
        }
      };

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteMetadata.name,
      locale: siteMetadata.locale,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    },
    robots
  };
}

export function organizationJsonLd(): JsonLdRecord {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteMetadata.name,
    url: siteMetadata.siteUrl,
    description: siteMetadata.description,
    areaServed: 'KR',
    sameAs: []
  };
}

export function websiteJsonLd(): JsonLdRecord {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteMetadata.name,
    url: siteMetadata.siteUrl,
    inLanguage: siteMetadata.locale
  };
}

export function faqJsonLd(items: FaqItem[]): JsonLdRecord {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

export function howToJsonLd(name: string, description: string, steps: HowToStep[]): JsonLdRecord {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step) => ({
      '@type': 'HowToStep',
      name: step.name,
      text: step.text
    }))
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]): JsonLdRecord {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}
