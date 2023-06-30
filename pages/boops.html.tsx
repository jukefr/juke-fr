import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Divider,
  UnorderedList,
  List,
  ListItem,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import {
  title as scrTitle,
  id as scrId,
} from './boops/natural-screen-reader-voice-on-linux.html';

const BoopsPage = ({ boops }: any): JSX.Element => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      direction="column"
      mb={12}
    >
      <Container>
        <Box>
          <Heading as="h2">boops</Heading>
          <Text fontSize="xl">
            these are just blog posts but with a silly name because i&apos;m
            quirky like that
          </Text>
          <Divider mb={6} />

          <UnorderedList spacing={3}>
            <ListItem key={scrId}>
              <Link
                as={NextLink}
                href={`/boops/${scrId}.html`}
                passHref
                scroll={false}
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
