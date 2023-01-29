import { Container, Flex, useColorModeValue } from '@chakra-ui/react';
import { LinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';

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
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      direction="column"
      mb={12}
    >
      <Container>
        <Box>
          <Heading mb={6} as="h2" size="md">
            {boop.title}
          </Heading>
          <ReactMarkdown>{boop.content}</ReactMarkdown>
        </Box>
      </Container>
    </Flex>
  );
};

export default BoopPage;
