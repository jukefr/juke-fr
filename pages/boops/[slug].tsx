import { Container, Flex } from '@chakra-ui/react';
import { Box, Heading, Text, Divider, Highlight, Code } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Head from 'next/head';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostById(id: any): any {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  return {
    id,
    ...matterResult.data,
    content: matterResult.content,
  };
}

export function getSortedPostsData(): any {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a: any, b: any) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getStaticProps({ params }: any) {
  const boop = getPostById(params.slug.replace('.html', ''));

  return {
    props: {
      boop,
    },
  };
}

export async function getStaticPaths() {
  const boops = getSortedPostsData();

  return {
    paths: boops.map((boop: any) => {
      return {
        params: {
          slug: `${boop.id}.html`,
        },
      };
    }),
    fallback: false,
  };
}

const BoopPage = ({ boop }: any): JSX.Element => {
  const wipSentence = 'this post is still a work in progress';

  const mdTheme = {
    code: (props: any) => {
      const { inline, children, className } = props;

      if (inline) {
        return <Code px={2} children={children} />;
      }

      return (
        <Code
          className={className}
          whiteSpace="break-spaces"
          display="block"
          w="full"
          p={2}
          children={children}
        />
      );
    },
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      direction="column"
      mb={12}
    >
      <Head>
        <title>{boop.title}</title>
        <meta
          name="description"
          content={boop.description}
          key="meta-description"
        />
        <meta property="og:title" content={boop.title} key="meta-og-title" />
        <meta
          property="og:description"
          content={boop.description}
          key="meta-og-description"
        />
        <meta property="og:type" content="website" key="meta-og-type" />
        <meta
          property="og:url"
          content={`https://juke.fr/boops/${boop.id}.html`}
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
          content={`https://juke.fr/boops/${boop.id}.html`}
          key="meta-twitter-url"
        />
        <meta
          property="twitter:domain"
          content="juke.fr"
          key="meta-twitter-domain"
        />
        <meta
          property="twitter:title"
          content={boop.title}
          key="meta-twitter-title"
        />
        <meta
          property="twitter:description"
          content={boop.description}
          key="meta-twitter-description"
        />
        <meta
          property="twitter:image"
          content="https://juke.fr/og.png"
          key="meta-twitter-image"
        />
      </Head>
      <Container className="boop">
        <Box>
          {boop.wip && (
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
          )}
          <Text>{boop.date}</Text>
          <Heading as="h2">{boop.title}</Heading>
          <Text fontSize="xl">{boop.description}</Text>
          <Divider mb={6} />

          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={ChakraUIRenderer(mdTheme)}
            skipHtml
          >
            {boop.content}
          </ReactMarkdown>
        </Box>
      </Container>
    </Flex>
  );
};

export default BoopPage;
