import {
  Box,
  Heading,
  ListItem,
  Link,
  UnorderedList,
  Text,
  Divider,
} from '@chakra-ui/react';
import NextLink from 'next/link';

const AboutLink = ({ url, text }: { url: string; text: string }) => {
  return (
    <ListItem>
      <Link as={NextLink} href={url} passHref scroll={false}>
        {text}
      </Link>
    </ListItem>
  );
};

const Boops = ({ boops }: any) => {
  return (
    <Box>
      <Heading as="h2">boops</Heading>
      <Text fontSize="xl">
        these are just blog posts but with a silly name because i&apos;m quirky
        like that
      </Text>
      <Divider mb={6} />

      <UnorderedList spacing={3}>
        {boops.map(({ id, title }: any) => (
          <AboutLink url={'/boops/' + id + '.html'} text={title} key={id} />
        ))}
      </UnorderedList>
    </Box>
  );
};

export default Boops;
