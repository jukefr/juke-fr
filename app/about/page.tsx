'use client';

import {
  Container,
  Flex,
  Box,
  Heading,
  ListItem,
  Link,
  UnorderedList,
  Text,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const AboutLink = ({ href, children }: any): JSX.Element => {
  return (
    <ListItem>
      <Link
        href={href}
        color={useColorModeValue('blue.500', 'blue.100')}
        isExternal
        fontSize="lg"
      >
        {children} <ExternalLinkIcon mx="2px" />
      </Link>
    </ListItem>
  );
};
const AboutPage = (): JSX.Element => {
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
            hypertext references
          </Heading>
          <Text fontSize="xl">just some links that relate to us</Text>
          <Divider mb={6} />

          <UnorderedList spacing={3}>
            <AboutLink href="https://code.juke.fr/kay">
              code is hosted on code.juke.fr
            </AboutLink>
            <AboutLink href="https://matrix.to/#/@kay:juke.fr">
              chat via matrix at @kay:juke.fr
            </AboutLink>
            <AboutLink href="mailto:site[at]juke[dot]fr?subject=Make sure to replace the [at] and [dot] in the email">
              email is site[at]juke[dot]fr
            </AboutLink>
            <AboutLink href="https://ko-fi.com/memoryleak/">
              donate on ko-fi
            </AboutLink>
            <AboutLink href="https://liberapay.com/memoryleak/">
              donate on liberapay
            </AboutLink>
            <AboutLink href="https://paypal.me/kaythn/">
              donate on paypal
            </AboutLink>
          </UnorderedList>
        </Box>
      </Container>
    </Flex>
  );
};

export default AboutPage;
