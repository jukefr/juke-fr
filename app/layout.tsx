import Layout from '../components/Layout';
import { GET as getFronters } from './api/fronters/route';
import './globals.css';

// export const metadata: Metadata = {
//   title: 'My Page Title',
// };

export default async function LayoutC({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const fronter = await getFronters()
    .then((res) => res.json())
    .then((res) =>
      res.members.reduce(
        (acc: string, val: any) => `${val.name} (${val.pronouns}), ${acc}`,
        '',
      ),
    );

  return (
    <html>
      <body className="bg-light-50 dark:bg-darker-900 text-darker-900 dark:text-light-50">
        {/* <Head>
          <title>juke.fr</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta
            name="description"
            content="creates mostly ephemeral, always open source pet projects, sometimes."
            key="meta-description"
          />
          <meta
            name="keywords"
            content="Javascript, Node, Typescript, React, Next.js, Docker"
            key="meta-keywords"
          />
          <meta name="author" content="Kay" key="meta-author" />

          <meta property="og:title" content="juke.fr" key="meta-og-title" />
          <meta
            property="og:description"
            content="creates mostly ephemeral, always open source pet projects, sometimes."
            key="meta-og-description"
          />
          <meta
            property="og:image"
            content="https://juke.fr/og.png"
            key="meta-og-image"
          />
          <meta property="og:type" content="website" key="meta-og-type" />
          <meta
            property="og:site_name"
            content="juke.fr"
            key="meta-og-site_name"
          />
          <meta property="og:locale" content="en_US" key="meta-og-locale" />

          <meta name="twitter:card" content="summary" key="meta-twitter-card" />
          <meta name="twitter:site" content="@jukefr" key="meta-twitter-site" />
          <meta
            name="twitter:creator"
            content="@jukefr"
            key="meta-twitter-creator"
          />
          <meta
            name="twitter:title"
            content="juke.fr"
            key="meta-twitter-title"
          />
          <meta
            name="twitter:description"
            content="creates mostly ephemeral, always open source pet projects, sometimes."
            key="meta-twitter-description"
          />
          <meta
            name="twitter:image"
            content="https://juke.fr/og.png"
            key="meta-twitter-image"
          />
        </Head> */}
        <Layout fronter={fronter}></Layout>
        {children}
      </body>
    </html>
  );
}
