'use client';

import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Divider,
  UnorderedList,
  ListItem,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import {
  title as scrTitle,
  id as scrId,
} from './natural-screen-reader-voice-on-linux/meta';
// import {
//   title as prvTitle,
//   id as prvId,
// } from './boops/better-privacy-when-browsing-online.html';
// import {
//   title as encTitle,
//   id as encId,
// } from './boops/in-place-encryption-raspberry-pi-yunohost.html';

const BoopsPage = (): JSX.Element => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      direction="column"
      mb={12}
    >
      <Container>
        <Box>
          <Heading as="h2" size="xl">
            boops
          </Heading>
          <Text fontSize="xl">
            these are just blog posts but with a silly name because i&apos;m
            quirky like that
          </Text>
          <Divider mb={6} />
          <UnorderedList spacing={3}>
            {/* <ListItem key={encId}>
              <Link
                as={NextLink}
                href={`/boops/${encId}.html`}
                passHref
                scroll={false}
                color={useColorModeValue('blue.500', 'blue.100')}
                fontSize="lg"
              >
                {encTitle}
              </Link>
            </ListItem>

            <ListItem key={prvId}>
              <Link
                as={NextLink}
                href={`/boops/${prvId}.html`}
                passHref
                scroll={false}
                color={useColorModeValue('blue.500', 'blue.100')}
                fontSize="lg"
              >
                {prvTitle}
              </Link>
            </ListItem> */}
            <ListItem key={scrId}>
              <Link
                as={NextLink}
                href={`/boops/${scrId}`}
                passHref
                scroll={false}
                color={useColorModeValue('blue.500', 'blue.100')}
                fontSize="lg"
              >
                {scrTitle}
              </Link>
            </ListItem>
          </UnorderedList>
        </Box>
      </Container>
    </Flex>
  );
};

export default BoopsPage;
