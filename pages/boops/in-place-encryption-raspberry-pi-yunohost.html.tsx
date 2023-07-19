import {
  Container,
  Divider,
  Heading,
  Highlight,
  Text,
  Code,
  Box,
  SimpleGrid,
  useColorModeValue,
  Link,
  LightMode,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import Head from 'next/head';
import TerminalCodePreview from '../../components/TerminalCodePreview';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export const title =
  'in place full disk encryption on a raspberry pi running yunohost';
export const description =
  'guiding you through setting up full disk encryption on a yunohost raspberry install';
export const id = 'in-place-encryption-raspberry-pi-yunohost';

const Boop = (): JSX.Element => {
  const wipSentence = 'this post is still a work in progress';

  return (
    <>
      <Container maxW="container.xl">
        <Head>
          <title>{title}</title>
          <meta
            name="description"
            content={description}
            key="meta-description"
          />
          <meta property="og:title" content={title} key="meta-og-title" />
          <meta
            property="og:description"
            content={description}
            key="meta-og-description"
          />
          <meta property="og:type" content="website" key="meta-og-type" />
          <meta
            property="og:url"
            content={`https://juke.fr/boops/${id}.html`}
            key="meta-og-url"
          />
          <meta
            property="og:image"
            content="https://juke.fr/og.png"
            key="meta-og-image"
          />
          <meta
            property="twitter:card"
            content="summary_large_image"
            key="meta-twitter-card"
          />
          <meta
            property="twitter:url"
            content={`https://juke.fr/boops/${id}.html`}
            key="meta-twitter-url"
          />
          <meta
            property="twitter:domain"
            content="juke.fr"
            key="meta-twitter-domain"
          />
          <meta
            property="twitter:title"
            content={title}
            key="meta-twitter-title"
          />
          <meta
            property="twitter:description"
            content={description}
            key="meta-twitter-description"
          />
          <meta
            property="twitter:image"
            content="https://juke.fr/og.png"
            key="meta-twitter-image"
          />
        </Head>
        <Text align="center" mb={2}>
          <Highlight
            query={wipSentence}
            styles={{
              px: '1',
              py: '1',
              bg: 'orange.100',
              whiteSpace: 'initial',
            }}
          >
            {wipSentence}
          </Highlight>
        </Text>
        <Text>2023-07-01</Text>
        <Heading as="h2" size="xl">
          {title}
        </Heading>
        <Text fontSize="xl">{description}</Text>
        <Divider mb={6} />
      </Container>
    </>
  );
};

export default Boop;
