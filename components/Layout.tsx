import { Container, Flex, Text } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import Navbar from './Navbar';
import Jinx from './jinx/Jinx';
import { useState } from 'react';

const Layout = ({
  children,
  title = 'juke.fr',
  store,
}: {
  children: React.ReactElement;
  title?: string;
  store: any; // TODO store type
}) => {
  const [fronter, setFronter] = useState('kay');
  fetch('https://api.pluralkit.me/v2/systems/wzylv/fronters')
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      return res;
    })
    .then((res) => setFronter(
//       res.members[0].name
      res.members.reduce((acc, val) => `${val.name} (${val.pronouns}), ${acc}`, '')
    ));
  return (
    <>
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
      <Container maxW="container.lg">
        <Navbar store={store} />
      </Container>
      <main>
        {store.getter.showJinx && (
          <Container
            maxW="container.md"
            centerContent
            padding={8}
            overflowX="hidden"
          >
            <div
              style={{
                minHeight: 420,
                width: '100%',
              }}
            >
              <Jinx store={store} />
            </div>

            <>
              <Flex
                direction="column"
                background={'purple.200'}
                px={6}
                py={4}
                rounded={6}
                roundedTop={
                  store.getter.showEditor && store.getter.showJinx ? 0 : 6
                }
                mb={6}
                mt={-6}
                w="100%"
                color="#2b2e3b"
              >
                <Text>
                  hello, it&apos;s <b>{fronter}</b> web development mainly (mostly, no
                  clue what we&apos;re doing)
                </Text>
              </Flex>
              <Text mb={12}>
                we&apos;re a <b>26 year-old trans 🏳️‍⚧️ non-binary borg system</b>.
                you can use any <b>neutral pronouns</b> for us (english: they or
                it, french: ielle/iel ou lae/lea ou ca/cela). currently lives
                near <b>paris</b>. likes anything that has to do with{' '}
                <b>technology</b> and hacking stuff (code, video, music, games,
                electronics, etc.). likes to share what we make and learn and
                teach stuff. very much pro <b>data rights</b> and more broadly
                against rising worldwide fascistic ideology and oppression.
              </Text>
            </>
          </Container>
        )}
        {!store.getter.showJinx && (
          <Container
            maxW="container.md"
            centerContent
            padding={8}
            overflowX="hidden"
          >
            <Flex
              direction="column"
              background={'purple.200'}
              px={6}
              py={4}
              rounded={6}
              roundedTop={6}
              mb={6}
              mt={-6}
              w="100%"
              color="#2b2e3b"
            >
              <Text>
                hello, it&apos;s <b>{fronter}</b> web development mainly (mostly, no
                clue what we&apos;re doing)
              </Text>
            </Flex>
          </Container>
        )}
        {children}
      </main>
    </>
  );
};

export default Layout;
