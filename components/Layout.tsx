import { Container } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import Navbar from './Navbar';
import Introduction from './about/Introduction';

const Layout = ({
  children,
  title = 'juke.fr',
  store,
}: {
  children: React.ReactElement;
  title?: string;
  store: any; // TODO store type
}) => {
  return (
    <Container maxW="container.lg" style={{ overflowX: 'hidden' }}>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
        <meta name="twitter:title" content="juke.fr" key="meta-twitter-title" />
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
      </Head>
      <Navbar store={store} />
      <main>
        <Introduction store={store} />
        {children}
      </main>
    </Container>
  );
};

export default Layout;
