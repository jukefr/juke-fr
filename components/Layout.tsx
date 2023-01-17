import { Container } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import { useAppContext } from './AppWrapper';
import Navbar from './Navbar';

const Layout = ({
  children,
  title = 'juke.fr',
}: {
  children: React.ReactElement;
  title?: string;
}) => {
  const context = useAppContext() as any;
  return (
    <Container maxW="container.lg" style={{ overflowX: 'hidden' }}>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="creates mostly ephemeral, always open source pet projects, sometimes."
        />
        <meta
          name="keywords"
          content="Javascript, Node, Typescript, React, Next.js, Docker"
        />
        <meta name="author" content="Kay Yakimenko" />

        <meta property="og:title" content="juke.fr" />
        <meta
          property="og:description"
          content="creates mostly ephemeral, always open source pet projects, sometimes."
        />
        <meta property="og:image" content="https://juke.fr/og.png" />
        <meta property="og:url" content="https://juke.fr" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="juke.fr" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@jukefr" />
        <meta name="twitter:creator" content="@jukefr" />
        <meta name="twitter:title" content="juke.fr" />
        <meta
          name="twitter:description"
          content="creates mostly ephemeral, always open source pet projects, sometimes."
        />
        <meta name="twitter:image" content="https://juke.fr/og.png" />
      </Head>
      <Navbar />
      <main>
        {context.appState.introInstance}
        {children}
      </main>
    </Container>
  );
};

export default Layout;
