import { Metadata } from 'next';
import Layout from '../components/Layout';
import { getFronter } from './api/fronter/route';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://juke.fr'),
  title: 'juke.fr',
  description:
    'creates mostly ephemeral, always open source pet projects, sometimes.',
  twitter: {
    card: 'summary',
    site: '@jukefr',
    creator: '@jukefr',
    title: 'juke.fr',
    description:
      'creates mostly ephemeral, always open source pet projects, sometimes.',
    images: ['/og.png'],
  },
  openGraph: {
    title: 'juke.fr',
    description:
      'creates mostly ephemeral, always open source pet projects, sometimes.',
    type: 'website',
    locale: 'en_US',
    url: 'https://juke.fr',
    siteName: 'juke.fr',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'juke.fr screenshot',
      },
    ],
  },
  keywords: ['Javascript', 'Node', 'Typescript', 'React', 'Next.js', 'Docker'],
  authors: [{ name: 'kay' }],
  referrer: 'origin-when-cross-origin',
  creator: 'kay',
  publisher: 'kay',
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export default async function LayoutC({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const fronter = await getFronter();

  return (
    <html>
      <body className="bg-light-50 dark:bg-darker-900 text-darker-900 dark:text-light-50">
        <Layout fronter={fronter}></Layout>
        {children}
      </body>
    </html>
  );
}
