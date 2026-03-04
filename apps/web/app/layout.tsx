import type { Metadata } from 'next';
import './globals.css';
import { siteMetadata } from '../src/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: 'Human Proxy KR',
    template: '%s | Human Proxy KR'
  },
  description: siteMetadata.description,
  alternates: siteMetadata.alternates,
  openGraph: {
    title: 'Human Proxy KR',
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.name,
    locale: siteMetadata.locale,
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Human Proxy KR',
    description: siteMetadata.description
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
